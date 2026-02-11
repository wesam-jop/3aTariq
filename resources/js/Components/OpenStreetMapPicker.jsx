import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function OpenStreetMapPicker({ 
    onLocationSelect, 
    initialLat = 33.513, 
    initialLng = 36.277, 
    className = '',
    placeholder = 'اختر الموقع من الخريطة'
}) {
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [mapReady, setMapReady] = useState(false);
    const [position, setPosition] = useState([initialLat, initialLng]);
    const [isLocating, setIsLocating] = useState(false);

    useEffect(() => {
        setMapReady(true);
    }, []);

    const handleMapClick = (event) => {
        const { lat, lng } = event.latlng;
        const newPosition = [lat, lng];
        
        setPosition(newPosition);
        setSelectedLocation({ lat, lng });
        
        if (onLocationSelect) {
            onLocationSelect({ lat, lng });
        }
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('متصفحك لا يدعم تحديد الموقع الجغرافي');
            return;
        }
        
        setIsLocating(true);
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPosition = [latitude, longitude];
                
                setPosition(newPosition);
                setSelectedLocation({ lat: latitude, lng: longitude });
                
                if (onLocationSelect) {
                    onLocationSelect({ lat: latitude, lng: longitude });
                }
                
                setIsLocating(false);
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('تعذر الحصول على موقعك الحالي. يرجى التأكد من أنك سمحت للموقع بالوصول إلى موقعك.');
                setIsLocating(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    return (
        <div className={`relative ${className}`}>
            <div 
                ref={mapRef} 
                className="w-full h-80 rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm"
                style={{ minHeight: '320px' }}
            >
                {mapReady && (
                    <MapContainer 
                        center={position} 
                        zoom={13} 
                        zoomControl={true}
                        style={{ height: '100%', width: '100%' }}
                        whenCreated={(map) => {
                            // Add click event to the map
                            map.on('click', handleMapClick);
                        }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {selectedLocation && (
                            <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                                <Popup>الموقع المحدد</Popup>
                            </Marker>
                        )}
                        {/* Current Location Button */}
                        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
                            <button
                                type="button"
                                onClick={getCurrentLocation}
                                disabled={isLocating}
                                className={`p-3 rounded-full shadow-lg ${isLocating ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'} transition-colors`}
                                title="تحديد موقعي الحالي"
                            >
                                {isLocating ? (
                                    <svg className="w-5 h-5 text-current animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </MapContainer>
                )}
            </div>
            
            {selectedLocation && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-800 font-bold text-sm text-center">
                        ✓ تم تحديد الموقع: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </p>
                </div>
            )}
            
            {!selectedLocation && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-yellow-800 font-bold text-sm text-center">
                        {placeholder}
                    </p>
                </div>
            )}
        </div>
    );
}