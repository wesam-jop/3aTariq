import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import MapPicker from '../../Components/MapPicker';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    Car,
    Plus,
    MapPin,
    Users,
    Calendar,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    X,
    Wallet,
    Banknote
} from 'lucide-react';

export default function CustomerRides({ rides, routes, privatePricePerKm, publicPricePerKm }) {
    const { trans } = useTranslation();
    const { flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    
    // دالة للحصول على التاريخ والوقت الحالي بتنسيق datetime-local
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    const [formData, setFormData] = useState({
        pickup_location: '',
        dropoff_location: '',
        pickup_latitude: null,
        pickup_longitude: null,
        dropoff_latitude: null,
        dropoff_longitude: null,
        ride_type: 'public',
        passenger_count: 1,
        scheduled_at: getCurrentDateTime(),
        payment_method: 'cash',
        notes: '',
    });

    const [pickupPosition, setPickupPosition] = useState(null);
    const [dropoffPosition, setDropoffPosition] = useState(null);
    const [distance, setDistance] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(0);

    // حساب المسافة بين نقطتين باستخدام صيغة Haversine
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // نصف قطر الأرض بالكيلومترات
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // المسافة بالكيلومترات
    };

    // تحديث الإحداثيات والمسافة عند تغيير المواقع
    useEffect(() => {
        if (pickupPosition) {
            setFormData(prev => ({
                ...prev,
                pickup_latitude: pickupPosition.lat,
                pickup_longitude: pickupPosition.lng,
            }));
        }
    }, [pickupPosition]);

    useEffect(() => {
        if (dropoffPosition) {
            setFormData(prev => ({
                ...prev,
                dropoff_latitude: dropoffPosition.lat,
                dropoff_longitude: dropoffPosition.lng,
            }));
        }
    }, [dropoffPosition]);

    useEffect(() => {
        if (pickupPosition && dropoffPosition) {
            const dist = calculateDistance(
                pickupPosition.lat,
                pickupPosition.lng,
                dropoffPosition.lat,
                dropoffPosition.lng
            );
            setDistance(dist);
            
            // حساب السعر حسب نوع النقل
            let price = 0;
            if (formData.ride_type === 'private') {
                // نقل خاص: المسافة × سعر الكيلومتر الخاص (بدون ضرب بعدد الركاب)
                price = dist * (privatePricePerKm || 1.00);
            } else {
                // نقل عام: المسافة × سعر الكيلومتر العام × عدد الركاب
                price = dist * (publicPricePerKm || 0.50) * (formData.passenger_count || 1);
            }
            setCalculatedPrice(price);
        } else {
            setDistance(0);
            setCalculatedPrice(0);
        }
    }, [pickupPosition, dropoffPosition, formData.passenger_count, formData.ride_type, privatePricePerKm, publicPricePerKm]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ar-SY', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        // إضافة المسافة والسعر المحسوب
        const submitData = {
            ...formData,
            distance_km: distance,
            price: calculatedPrice,
            calculated_price: calculatedPrice,
        };
        
        router.post('/customer/rides/create', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    pickup_location: '',
                    dropoff_location: '',
                    pickup_latitude: null,
                    pickup_longitude: null,
                    dropoff_latitude: null,
                    dropoff_longitude: null,
                    ride_type: 'public',
                    passenger_count: 1,
                    scheduled_at: getCurrentDateTime(),
                    payment_method: 'cash',
                    notes: '',
                });
                setPickupPosition(null);
                setDropoffPosition(null);
                setDistance(0);
                setCalculatedPrice(0);
                setProcessing(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            }
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: trans('pending_status') },
            accepted: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, text: trans('accepted_status') },
            in_progress: { color: 'bg-purple-100 text-purple-800', icon: AlertCircle, text: trans('in_progress_status') },
            completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: trans('completed_status') },
            cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, text: trans('cancelled_status') },
        };
        return badges[status] || badges.pending;
    };

    return (
        <DashboardLayout>
            <Head title={trans('my_rides')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{trans('my_rides')}</h1>
                        <p className="text-sm text-gray-600 mt-1">{trans('browse_book')}</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        {trans('new_ride')}
                    </button>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-800">{flash.success}</p>
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-800">{flash.error}</p>
                    </div>
                )}

                {/* Rides List */}
                {rides && rides.length > 0 ? (
                    <div className="space-y-4">
                        {rides.map((ride) => {
                            const badge = getStatusBadge(ride.status);
                            const StatusIcon = badge.icon;
                            
                            return (
                                <div 
                                    key={ride.id}
                                    className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 bg-blue-50 rounded-lg">
                                                    <Car className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-xs px-2 py-1 rounded font-medium flex items-center gap-1 ${badge.color}`}>
                                                            <StatusIcon className="w-3 h-3" />
                                                            {badge.text}
                                                        </span>
                                                        <span className="text-xs text-gray-500">#{ride.ride_number}</span>
                                                    </div>
                                                    {ride.driver && (
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            {trans('driver')}: <span className="font-semibold">{ride.driver.user?.name}</span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-600">{trans('from')}:</span>
                                                    <span className="font-medium text-gray-900">{ride.route?.from_city?.name_ar}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-600">{ride.pickup_location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-red-600" />
                                                    <span className="text-gray-600">{trans('to')}:</span>
                                                    <span className="font-medium text-gray-900">{ride.route?.to_city?.name_ar}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-600">{ride.dropoff_location}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {ride.passenger_count} {trans('passenger')}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(ride.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-600 mb-1">{trans('price')}</p>
                                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(ride.price)}</p>
                                            </div>
                                            {ride.status === 'pending' && (
                                                <button className="btn bg-red-100 hover:bg-red-200 text-red-700 text-sm px-4 py-1.5 rounded-lg transition-all">
                                                    {trans('cancel_ride')}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="card bg-white border border-gray-200 shadow text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Car className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{trans('no_rides_yet')}</h3>
                        <p className="text-gray-600 mb-6">{trans('start_first_ride')}</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow"
                        >
                            <Plus className="w-5 h-5" />
                            {trans('book_new_ride')}
                        </button>
                    </div>
                )}
            </div>

            {/* Modal for New Ride */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Car className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{trans('book_new_ride_title')}</h2>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Pickup & Dropoff */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {trans('pickup_location')}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.pickup_location}
                                        onChange={(e) => setFormData({...formData, pickup_location: e.target.value})}
                                        className="input"
                                        placeholder={trans('example_street')}
                                        required
                                    />
                                    {errors.pickup_location && <p className="text-red-500 text-sm mt-1">{errors.pickup_location}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {trans('dropoff_location')}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.dropoff_location}
                                        onChange={(e) => setFormData({...formData, dropoff_location: e.target.value})}
                                        className="input"
                                        placeholder={trans('example_square')}
                                        required
                                    />
                                    {errors.dropoff_location && <p className="text-red-500 text-sm mt-1">{errors.dropoff_location}</p>}
                                </div>
                            </div>

                            {/* Map Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    <MapPin className="w-4 h-4 inline ml-1" />
                                    {trans('select_locations_on_map')}
                                </label>
                                <MapPicker
                                    pickupPosition={pickupPosition}
                                    setPickupPosition={setPickupPosition}
                                    dropoffPosition={dropoffPosition}
                                    setDropoffPosition={setDropoffPosition}
                                />
                            </div>

                            {/* Ride Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    <Car className="w-4 h-4 inline ml-1" />
                                    {trans('ride_type')}
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div 
                                        onClick={() => setFormData({...formData, ride_type: 'private'})}
                                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                                            formData.ride_type === 'private' 
                                                ? 'border-orange-500 bg-orange-50' 
                                                : 'border-gray-200 hover:border-orange-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="ride_type"
                                                value="private"
                                                checked={formData.ride_type === 'private'}
                                                onChange={(e) => setFormData({...formData, ride_type: e.target.value})}
                                                className="w-4 h-4 text-orange-600"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{trans('private_ride')}</p>
                                                <p className="text-xs text-gray-600 mt-1">{trans('private_transport_desc')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div 
                                        onClick={() => setFormData({...formData, ride_type: 'public'})}
                                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                                            formData.ride_type === 'public' 
                                                ? 'border-green-500 bg-green-50' 
                                                : 'border-gray-200 hover:border-green-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="ride_type"
                                                value="public"
                                                checked={formData.ride_type === 'public'}
                                                onChange={(e) => setFormData({...formData, ride_type: e.target.value})}
                                                className="w-4 h-4 text-green-600"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{trans('public_ride')}</p>
                                                <p className="text-xs text-gray-600 mt-1">{trans('public_transport_desc')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {errors.ride_type && <p className="text-red-500 text-sm mt-1">{errors.ride_type}</p>}
                            </div>

                            {/* Distance & Price Display */}
                            {distance > 0 && (
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-4">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">{trans('distance')}</p>
                                            <p className="text-2xl font-bold text-blue-600">{distance.toFixed(2)} {trans('km')}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">{trans('price_per_km')}</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {formatCurrency(formData.ride_type === 'private' ? privatePricePerKm : publicPricePerKm)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">{trans('calculated_price')}</p>
                                            <p className="text-2xl font-bold text-green-600">{formatCurrency(calculatedPrice)}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-center text-gray-600">
                                        {formData.ride_type === 'private' ? (
                                            <>
                                                {distance.toFixed(2)} {trans('km')} × {formatCurrency(privatePricePerKm)} = {formatCurrency(calculatedPrice)}
                                                <p className="text-orange-600 mt-1">نقل خاص - السعر ثابت</p>
                                            </>
                                        ) : (
                                            <>
                                                {distance.toFixed(2)} {trans('km')} × {formatCurrency(publicPricePerKm)} × {formData.passenger_count} = {formatCurrency(calculatedPrice)}
                                                <p className="text-green-600 mt-1">نقل عام - السعر لكل راكب</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Passenger Count & Scheduled Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Users className="w-4 h-4 inline ml-1" />
                                        {trans('passenger_count')}
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.passenger_count}
                                        onChange={(e) => setFormData({...formData, passenger_count: parseInt(e.target.value)})}
                                        className="input"
                                        min="1"
                                        max="10"
                                        required
                                    />
                                    {errors.passenger_count && <p className="text-red-500 text-sm mt-1">{errors.passenger_count}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Calendar className="w-4 h-4 inline ml-1" />
                                        {trans('scheduled_time')}
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.scheduled_at}
                                        onChange={(e) => setFormData({...formData, scheduled_at: e.target.value})}
                                        className="input"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">الموعد الافتراضي: الآن، يمكنك التعديل إذا أردت</p>
                                    {errors.scheduled_at && <p className="text-red-500 text-sm mt-1">{errors.scheduled_at}</p>}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign className="w-4 h-4 inline ml-1" />
                                    {trans('payment_method')}
                                </label>
                                <div className="flex items-center gap-3 p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cash"
                                        checked={true}
                                        readOnly
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <Banknote className="w-5 h-5 text-green-600" />
                                    <span className="font-medium">{trans('cash')}</span>
                                    <span className="text-xs text-gray-500 mr-auto">({trans('only_payment_method')})</span>
                                </div>
                                {errors.payment_method && <p className="text-red-500 text-sm mt-1">{errors.payment_method}</p>}
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {trans('notes')} ({trans('optional')})
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    className="input"
                                    rows="3"
                                    placeholder={trans('notes') + '...'}
                                ></textarea>
                                {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg transition-all"
                                >
                                    {trans('cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || !pickupPosition || !dropoffPosition}
                                    className="flex-1 btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow transition-all disabled:opacity-50"
                                >
                                    {processing ? trans('booking_in_progress') : trans('confirm_booking')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
