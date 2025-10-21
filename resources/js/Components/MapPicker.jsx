import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Locate, Search, X, Loader } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

// إصلاح مشكلة أيقونات Leaflet الافتراضية
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// أيقونات مخصصة للعلامات
const createCustomIcon = (type) => {
    const color = type === 'pickup' ? 'green' : 'red';
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="position: relative;">
                <div style="
                    position: absolute;
                    transform: translate(-50%, -100%);
                    background-color: ${color === 'green' ? '#10b981' : '#ef4444'};
                    color: white;
                    border-radius: 50%;
                    padding: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                </div>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });
};

// مكون لالتقاط النقرات على الخريطة
function MapClickHandler({ activeType, setPickupPosition, setDropoffPosition }) {
    useMapEvents({
        click(e) {
            const position = { lat: e.latlng.lat, lng: e.latlng.lng };
            if (activeType === 'pickup') {
                setPickupPosition(position);
            } else {
                setDropoffPosition(position);
            }
        },
    });
    return null;
}

// مكون للتحكم بموقع الخريطة
function MapController({ center, zoom }) {
    const map = useMap();
    
    useEffect(() => {
        if (center && center[0] && center[1]) {
            map.setView(center, zoom || 13);
        }
    }, [center, zoom, map]);
    
    return null;
}

export default function MapPicker({ pickupPosition, setPickupPosition, dropoffPosition, setDropoffPosition }) {
    const { trans } = useTranslation();
    const [activeType, setActiveType] = useState('pickup'); // pickup or dropoff
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [mapCenter, setMapCenter] = useState([33.5138, 36.2765]); // مركز سوريا (دمشق) كنقطة بداية
    const [mapZoom, setMapZoom] = useState(12);
    const searchTimeoutRef = useRef(null);

    // دالة للحصول على الموقع الحالي
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert(trans('geolocation_not_supported') || 'المتصفح لا يدعم تحديد الموقع');
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPosition = { lat: latitude, lng: longitude };
                
                // تحديد الموقع حسب النوع النشط
                if (activeType === 'pickup') {
                    setPickupPosition(newPosition);
                } else {
                    setDropoffPosition(newPosition);
                }
                
                // تحريك الخريطة للموقع الحالي
                setMapCenter([latitude, longitude]);
                setMapZoom(15);
                setIsLocating(false);
            },
            (error) => {
                console.error('Error getting location:', error);
                alert(trans('location_error') || 'فشل تحديد موقعك. الرجاء التأكد من السماح بالوصول للموقع.');
                setIsLocating(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    // دالة للبحث في الخريطة باستخدام Nominatim API
    const performSearch = async (query) => {
        if (!query || query.trim().length < 3) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            // إضافة "Syria" للبحث للحصول على نتائج سورية بشكل أساسي
            const searchTerm = `${query}, Syria`;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}&limit=5&accept-language=ar`
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // البحث مع تأخير (debounce)
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            performSearch(searchQuery);
        }, 500);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    // اختيار نتيجة بحث
    const selectSearchResult = (result) => {
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        const position = { lat, lng: lon };

        if (activeType === 'pickup') {
            setPickupPosition(position);
        } else {
            setDropoffPosition(position);
        }

        setMapCenter([lat, lon]);
        setMapZoom(15);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => setActiveType('pickup')}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        activeType === 'pickup'
                            ? 'bg-green-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <MapPin className="w-5 h-5" />
                    {trans('set_pickup')}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveType('dropoff')}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        activeType === 'dropoff'
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <Navigation className="w-5 h-5" />
                    {trans('set_dropoff')}
                </button>
            </div>

            {/* Search and Location Bar */}
            <div className="flex gap-2">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={trans('search_location') || 'ابحث عن موقع...'}
                            className="w-full pr-10 pl-10 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSearchResults([]);
                                }}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                        {isSearching && (
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                            </div>
                        )}
                    </div>
                    
                    {/* Search Results Dropdown */}
                    {searchResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {searchResults.map((result, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => selectSearchResult(result)}
                                    className="w-full text-right px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{result.display_name}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Current Location Button */}
                <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isLocating}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    title={trans('current_location') || 'موقعي الحالي'}
                >
                    {isLocating ? (
                        <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                        <Locate className="w-5 h-5" />
                    )}
                    <span className="hidden md:inline">{trans('current_location') || 'موقعي'}</span>
                </button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                    <strong>{activeType === 'pickup' ? trans('pickup_location') : trans('dropoff_location')}</strong>: {trans('click_on_map') || 'انقر على الخريطة أو ابحث عن موقع'}
                </p>
            </div>

            {/* Map */}
            <div className="h-96 rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg">
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapController center={mapCenter} zoom={mapZoom} />
                    <MapClickHandler 
                        activeType={activeType}
                        setPickupPosition={setPickupPosition}
                        setDropoffPosition={setDropoffPosition}
                    />
                    {pickupPosition && (
                        <Marker position={[pickupPosition.lat, pickupPosition.lng]} icon={createCustomIcon('pickup')}>
                            <Popup>
                                <div className="text-sm">
                                    <p className="font-bold mb-1">{trans('pickup_location')}</p>
                                    <p className="text-xs text-gray-600">
                                        {pickupPosition.lat.toFixed(6)}, {pickupPosition.lng.toFixed(6)}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                    {dropoffPosition && (
                        <Marker position={[dropoffPosition.lat, dropoffPosition.lng]} icon={createCustomIcon('dropoff')}>
                            <Popup>
                                <div className="text-sm">
                                    <p className="font-bold mb-1">{trans('dropoff_location')}</p>
                                    <p className="text-xs text-gray-600">
                                        {dropoffPosition.lat.toFixed(6)}, {dropoffPosition.lng.toFixed(6)}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>

            {/* Selected Locations Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg border-2 ${pickupPosition ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <MapPin className={`w-4 h-4 ${pickupPosition ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium text-gray-700">{trans('pickup_location')}</span>
                    </div>
                    {pickupPosition ? (
                        <p className="text-xs text-gray-600 font-mono">
                            {pickupPosition.lat.toFixed(6)}, {pickupPosition.lng.toFixed(6)}
                        </p>
                    ) : (
                        <p className="text-xs text-gray-400">{trans('not_selected')}</p>
                    )}
                </div>
                
                <div className={`p-3 rounded-lg border-2 ${dropoffPosition ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <Navigation className={`w-4 h-4 ${dropoffPosition ? 'text-red-600' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium text-gray-700">{trans('dropoff_location')}</span>
                    </div>
                    {dropoffPosition ? (
                        <p className="text-xs text-gray-600 font-mono">
                            {dropoffPosition.lat.toFixed(6)}, {dropoffPosition.lng.toFixed(6)}
                        </p>
                    ) : (
                        <p className="text-xs text-gray-400">{trans('not_selected')}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

