import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaLocationDot, FaCommentDots, FaMoneyBillWave, FaCircleCheck, FaTruckPickup, FaTruckMoving, FaTruck, FaBoxOpen, FaSnowflake, FaArrowRight, FaPersonWalkingLuggage, FaCarSide, FaVanShuttle } from "react-icons/fa6";
import MapPicker from '@/Components/MapPicker';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function Create({ user: propUser }) {
    const { props } = usePage();
    const user = propUser || props.auth.user;

    const queryParams = new URLSearchParams(window.location.search);
    const initialType = queryParams.get('type');

    if (!user) return null;
    const { data, setData, post, processing, errors } = useForm({
        pickup_address: '',
        delivery_address: '',
        pickup_latitude: null,
        pickup_longitude: null,
        delivery_latitude: null,
        delivery_longitude: null,
        description: '',
        type: initialType || 'car',
        category: 'passenger',
        trip_type: 'external', // default to external
        governorate_id: '',
        region_id: '',
        price: '',
    });

    const [showPickupMap, setShowPickupMap] = useState(false);
    const [showDeliveryMap, setShowDeliveryMap] = useState(false);
    const [showInternalPickupMap, setShowInternalPickupMap] = useState(false);
    const [showInternalDeliveryMap, setShowInternalDeliveryMap] = useState(false);



    const vehicleTypes = {
        passenger: [
            { id: 'car', name: 'سيارة (4 ركاب)', icon: <FaCarSide />, description: 'سيارة عادية صغيرة' },
            { id: 'suv', name: 'سيارة جيب (7 ركاب)', icon: <FaVanShuttle />, description: 'سيارة عائلية كبيرة' },
            { id: 'van', name: 'فان لنقل الركاب', icon: <FaVanShuttle className="scale-x-[-1]" />, description: 'رحلات جماعية مريحة' },
        ],
        goods: [
            { id: 'suzuki', name: 'سوزوكي', icon: <FaTruckPickup />, description: 'للأغراض الصغيرة' },
            { id: 'h100', name: 'فان H100', icon: <FaTruckMoving />, description: 'بضائع متوسطة آمنة' },
            { id: 'kia', name: 'كيا / هيونداي', icon: <FaTruck />, description: 'نقل عفش ومفروشات' },
            { id: 'heavy', name: 'شاحنة ثقيلة', icon: <FaTruckMoving className="rotate-180" />, description: 'حمولات ضخمة' },
            { id: 'refrigerated', name: 'براد', icon: <FaSnowflake />, description: 'شحن مبرد للحوم والأدوية' },
            { id: 'parcel', name: 'طرد/موتور', icon: <FaBoxOpen />, description: 'شحن طرد بسيط' },
        ]
    };

    useEffect(() => {
        if (initialType) {
            if (vehicleTypes.goods.some(t => t.id === initialType)) {
                setData(d => ({ ...d, category: 'goods', type: initialType }));
            } else if (vehicleTypes.passenger.some(t => t.id === initialType)) {
                setData(d => ({ ...d, category: 'passenger', type: initialType }));
            }
        }
    }, [initialType]);

    const currentVehicleTypes = data.category ? vehicleTypes[data.category] : vehicleTypes.passenger;


    const handleSubmit = (e) => {
        e.preventDefault();
        post('/customer/orders', {
            onSuccess: () => toast.success('تم إنشاء الطلب بنجاح!'),
            onError: () => toast.error('يرجى التحقق من البيانات المدخلة'),
        });
    };

    return (
        <AuthenticatedLayout
            user={user}
            header="إنشاء طلب جديد"
        >
            <Head title="طلب جديد" />

            <div className="max-w-4xl mx-auto pb-12 space-y-8">
                {/* Custom Header */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                    <Link
                        href="/customer/orders"
                        className="h-12 w-12 bg-gray-50 text-gray-500 rounded-2xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all transform hover:rotate-12"
                    >
                        <FaArrowRight size={20} />
                    </Link>
                    <div>
                        <h2 className="text-xl font-black text-gray-900">إنشاء شحنة جديدة</h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">اختر نوع الخدمة واملأ التفاصيل</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative">
                    {/* Progress Indicator Decorative */}
                    <div className="absolute top-0 right-0 left-0 h-1.5 bg-gray-50 flex">
                        <div className="h-full bg-primary shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-700" style={{ width: data.pickup_address && data.delivery_address && data.price ? '100%' : '60%' }}></div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-10">
                        {/* Section 0: Service Category */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-black text-gray-900 flex items-center underline decoration-primary decoration-4 underline-offset-4">
                                    <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary ml-3 font-black text-lg">١</span>
                                    اختر نوع الخدمة
                                </label>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData(d => ({ ...d, category: 'passenger', type: 'car' }))}
                                    className={`flex items-center p-6 rounded-3xl border-2 transition-all ${data.category === 'passenger'
                                        ? 'border-primary bg-yellow-50 shadow-lg scale-[1.02]'
                                        : 'border-gray-50 bg-gray-50/30 hover:bg-white hover:border-gray-200'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ml-4 ${data.category === 'passenger' ? 'bg-primary text-gray-900' : 'bg-gray-100 text-gray-400'}`}>
                                        <FaPersonWalkingLuggage />
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-gray-900">نقل ركاب / سفر</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">اتصال مباشر وسريع</div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setData(d => ({ ...d, category: 'goods', type: 'parcel' }))}
                                    className={`flex items-center p-6 rounded-3xl border-2 transition-all ${data.category === 'goods'
                                        ? 'border-primary bg-yellow-50 shadow-lg scale-[1.02]'
                                        : 'border-gray-50 bg-gray-50/30 hover:bg-white hover:border-gray-200'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ml-4 ${data.category === 'goods' ? 'bg-primary text-gray-900' : 'bg-gray-100 text-gray-400'}`}>
                                        <FaBoxOpen />
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-gray-900">نقل بضائع / عفش</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">مراجعة من قبل الإدارة</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Section 0.1: Trip Type (for Passenger Only) */}
                        {data.category === 'passenger' && (
                            <div className="space-y-6 pt-10 border-t-2 border-dashed border-gray-50">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-black text-gray-900 flex items-center underline decoration-primary decoration-4 underline-offset-4">
                                        <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary ml-3 font-black text-lg">١.٥</span>
                                        نطاق الرحلة
                                    </label>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('trip_type', 'internal')}
                                        className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all ${data.trip_type === 'internal'
                                            ? 'border-primary bg-yellow-50 shadow-lg scale-[1.02]'
                                            : 'border-gray-50 bg-gray-50/30 hover:bg-white hover:border-gray-200'
                                            }`}
                                    >
                                        <div className="font-black text-gray-900">نقل داخلي</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">داخل المحافظة والمنطقة</div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setData('trip_type', 'external')}
                                        className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all ${data.trip_type === 'external'
                                            ? 'border-primary bg-yellow-50 shadow-lg scale-[1.02]'
                                            : 'border-gray-50 bg-gray-50/30 hover:bg-white hover:border-gray-200'
                                            }`}
                                    >
                                        <div className="font-black text-gray-900">سفر خارجي</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">بين المحافظات والمدن</div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Section 1: Vehicle Type */}

                        <div className="space-y-6 pt-10 border-t-2 border-dashed border-gray-50">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-black text-gray-900 flex items-center underline decoration-primary decoration-4 underline-offset-4">
                                    <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary ml-3 font-black text-lg">٢</span>
                                    {data.category === 'passenger' ? 'اختر نوع المركبة المطلوبة' : 'اختر نوع الشاحنة المطلوبة'}
                                </label>
                                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">خطوة 2 من 4</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                {currentVehicleTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setData('type', type.id)}
                                        className={`flex flex-col items-center justify-center p-5 rounded-[2rem] border-2 transition-all duration-300 relative group ${data.type === type.id
                                            ? 'border-primary bg-yellow-50/50 shadow-xl shadow-yellow-100/50 scale-[1.05] z-10'
                                            : 'border-gray-50 bg-gray-50/30 hover:border-gray-200 hover:bg-white'
                                            }`}
                                    >
                                        <div className={`text-3xl mb-3 transition-transform duration-500 group-hover:scale-110 ${data.type === type.id ? 'text-primary' : 'text-gray-300'
                                            }`}>
                                            {type.icon}
                                        </div>
                                        <span className={`text-[10px] font-black text-center whitespace-nowrap ${data.type === type.id ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                            {type.name}
                                        </span>
                                        {data.type === type.id && (
                                            <div className="absolute -top-1 -left-1">
                                                <div className="bg-primary text-gray-900 p-1 rounded-full shadow-lg scale-75 border-4 border-white">
                                                    <FaCircleCheck size={14} />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            {errors.type && <p className="text-red-500 text-xs mt-2 font-bold">{errors.type}</p>}
                        </div>


                        {/* Section 2: Route & Details */}
                        <div className="space-y-8 pt-10 border-t-2 border-dashed border-gray-50">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-black text-gray-900 flex items-center underline decoration-primary decoration-4 underline-offset-4">
                                    <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary ml-3 font-black text-lg">٣</span>
                                    {data.trip_type === 'internal' ? 'تحديد الموقع' : 'تفاصيل المسار والطلب'}
                                </label>
                                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">خطوة 3 من 4</span>
                            </div>



                            {data.trip_type === 'internal' ? (
                                <div className="space-y-8 px-2">
                                    {/* Governorate and Region Selection */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mr-2">المحافظة</label>
                                            <select
                                                value={data.governorate_id || ''}
                                                onChange={e => setData(d => ({ ...d, governorate_id: e.target.value, region_id: '' }))}
                                                className={`w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold ${errors.governorate_id ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                            >
                                                <option value="">اختر المحافظة</option>
                                                {props.governorates.map(gov => (
                                                    <option key={gov.id} value={gov.id}>{gov.name}</option>
                                                ))}
                                            </select>
                                            {errors.governorate_id && <p className="text-red-500 text-[10px] font-black mr-2">{errors.governorate_id}</p>}
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mr-2">المنطقة</label>
                                            <select
                                                value={data.region_id || ''}
                                                onChange={e => setData('region_id', e.target.value)}
                                                disabled={!data.governorate_id}
                                                className={`w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold disabled:opacity-50 ${errors.region_id ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                            >
                                                <option value="">اختر المنطقة</option>
                                                {props.governorates.find(g => g.id == data.governorate_id)?.regions.map(reg => (
                                                    <option key={reg.id} value={reg.id}>{reg.name}</option>
                                                ))}
                                            </select>
                                            {errors.region_id && <p className="text-red-500 text-[10px] font-black mr-2">{errors.region_id}</p>}
                                        </div>
                                    </div>

                                    {/* Internal Pickup Location - Map Required */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-red-500">نقطة الاستلام (إجباري من الخريطة)</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowInternalPickupMap(!showInternalPickupMap)}
                                                className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                                            >
                                                <FaLocationDot className={showInternalPickupMap ? 'text-red-500' : 'text-primary'} />
                                                {showInternalPickupMap ? 'إخفاء الخريطة' : 'اختر من الخريطة'}
                                            </button>
                                        </div>
                                        
                                        {showInternalPickupMap && (
                                            <div className="space-y-4">
                                                <MapPicker
                                                    onLocationSelect={(location) => {
                                                        setData({
                                                            pickup_latitude: location.lat,
                                                            pickup_longitude: location.lng
                                                        });
                                                    }}
                                                    initialLat={33.513}
                                                    initialLng={36.277}
                                                    placeholder="انقر على الخريطة لتحديد نقطة الاستلام (إجباري)"
                                                />
                                                {data.pickup_latitude && data.pickup_longitude && (
                                                    <div className="text-center p-3 bg-green-50 border border-green-200 rounded-xl">
                                                        <p className="text-green-800 font-bold text-sm">
                                                            ✓ تم تحديد نقطة الاستلام: {data.pickup_latitude.toFixed(6)}, {data.pickup_longitude.toFixed(6)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        
                                        {errors.pickup_latitude && (
                                            <p className="text-red-500 text-[10px] mt-1 font-black leading-none">
                                                {errors.pickup_latitude}
                                            </p>
                                        )}
                                    </div>

                                    {/* Internal Delivery Location - Map Required */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-red-500">نقطة التسليم (إجباري من الخريطة)</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowInternalDeliveryMap(!showInternalDeliveryMap)}
                                                className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                                            >
                                                <FaLocationDot className={showInternalDeliveryMap ? 'text-red-500' : 'text-red-500'} />
                                                {showInternalDeliveryMap ? 'إخفاء الخريطة' : 'اختر من الخريطة'}
                                            </button>
                                        </div>
                                        
                                        {showInternalDeliveryMap && (
                                            <div className="space-y-4">
                                                <MapPicker
                                                    onLocationSelect={(location) => {
                                                        setData({
                                                            delivery_latitude: location.lat,
                                                            delivery_longitude: location.lng
                                                        });
                                                    }}
                                                    initialLat={33.513}
                                                    initialLng={36.277}
                                                    placeholder="انقر على الخريطة لتحديد نقطة التسليم (إجباري)"
                                                />
                                                {data.delivery_latitude && data.delivery_longitude && (
                                                    <div className="text-center p-3 bg-green-50 border border-green-200 rounded-xl">
                                                        <p className="text-green-800 font-bold text-sm">
                                                            ✓ تم تحديد نقطة التسليم: {data.delivery_latitude.toFixed(6)}, {data.delivery_longitude.toFixed(6)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        
                                        {errors.delivery_latitude && (
                                            <p className="text-red-500 text-[10px] mt-1 font-black leading-none">
                                                {errors.delivery_latitude}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 px-2">
                                    {/* Pickup Location Section */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">نقطة الانطلاق</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowPickupMap(!showPickupMap)}
                                                className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                                            >
                                                <FaLocationDot className={showPickupMap ? 'text-red-500' : 'text-primary'} />
                                                {showPickupMap ? 'إخفاء الخريطة' : 'اختر من الخريطة'}
                                            </button>
                                        </div>
                                        
                                        {showPickupMap ? (
                                            <div className="space-y-4">
                                                <MapPicker
                                                    onLocationSelect={(location) => {
                                                        setData({
                                                            pickup_latitude: location.lat,
                                                            pickup_longitude: location.lng
                                                        });
                                                    }}
                                                    initialLat={33.513}
                                                    initialLng={36.277}
                                                    placeholder="انقر على الخريطة لتحديد نقطة الاستلام"
                                                />
                                                {data.pickup_latitude && data.pickup_longitude && (
                                                    <div className="text-center p-3 bg-green-50 border border-green-200 rounded-xl">
                                                        <p className="text-green-800 font-bold text-sm">
                                                            ✓ تم تحديد نقطة الاستلام: {data.pickup_latitude.toFixed(6)}, {data.pickup_longitude.toFixed(6)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="relative group/field">
                                                <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-primary group-focus-within/field:scale-125 transition-transform duration-300">
                                                    <FaLocationDot />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.pickup_address || ''}
                                                    onChange={e => setData('pickup_address', e.target.value)}
                                                    placeholder="مثلاً: دمشق، المزة"
                                                    className={`w-full pr-12 pl-4 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold placeholder:text-gray-400/60 ${errors.pickup_address ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                                />
                                            </div>
                                        )}
                                        {errors.pickup_address && <p className="text-red-500 text-[10px] mt-1 font-black leading-none">{errors.pickup_address}</p>}
                                    </div>

                                    {/* Delivery Location Section */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">نقطة التسليم (اختياري)</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowDeliveryMap(!showDeliveryMap)}
                                                className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                                            >
                                                <FaLocationDot className={showDeliveryMap ? 'text-red-500' : 'text-red-500'} />
                                                {showDeliveryMap ? 'إخفاء الخريطة' : 'اختر من الخريطة'}
                                            </button>
                                        </div>
                                        
                                        {showDeliveryMap ? (
                                            <div className="space-y-4">
                                                <MapPicker
                                                    onLocationSelect={(location) => {
                                                        setData({
                                                            delivery_latitude: location.lat,
                                                            delivery_longitude: location.lng
                                                        });
                                                    }}
                                                    initialLat={33.513}
                                                    initialLng={36.277}
                                                    placeholder="انقر على الخريطة لتحديد نقطة التسليم (اختياري)"
                                                />
                                                {data.delivery_latitude && data.delivery_longitude && (
                                                    <div className="text-center p-3 bg-green-50 border border-green-200 rounded-xl">
                                                        <p className="text-green-800 font-bold text-sm">
                                                            ✓ تم تحديد نقطة التسليم: {data.delivery_latitude.toFixed(6)}, {data.delivery_longitude.toFixed(6)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="relative group/field">
                                                <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-red-500 group-focus-within/field:scale-125 transition-transform duration-300">
                                                    <FaLocationDot />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.delivery_address || ''}
                                                    onChange={e => setData('delivery_address', e.target.value)}
                                                    placeholder="مثلاً: حلب، العزيزية (اختياري)"
                                                    className={`w-full pr-12 pl-4 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold placeholder:text-gray-400/60 ${errors.delivery_address ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                                />
                                            </div>
                                        )}
                                        {errors.delivery_address && <p className="text-red-500 text-[10px] mt-1 font-black leading-none">{errors.delivery_address}</p>}
                                    </div>
                                </div>
                            )}


                            <div className="space-y-3 px-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mr-2">ملاحظات إضافية</label>
                                <div className="relative group/field">
                                    <div className="absolute right-0 top-4 w-12 flex items-center justify-center text-gray-300 group-focus-within/field:text-primary transition-colors duration-300">
                                        <FaCommentDots />
                                    </div>
                                    <textarea
                                        value={data.description || ''}
                                        onChange={e => setData('description', e.target.value)}
                                        rows="4"
                                        placeholder={data.category === 'passenger' ? "مثلاً: عدد الركاب، وجود أمتعة، موعد الرحلة المفضل..." : "ماذا سننقل؟ (مثلاً: بضائع تجارية مغلفة، أثاث منزل، قطع إلكترونية...)"}
                                        className="w-full pr-12 pl-4 py-4 bg-gray-50/50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold resize-none leading-relaxed placeholder:text-gray-400/60 shadow-inner"
                                    ></textarea>
                                </div>
                            </div>
                        </div>


                        {/* Section 3: Budget/Price */}
                        <div className="space-y-8 pt-10 border-t-2 border-dashed border-gray-50">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-black text-gray-900 flex items-center underline decoration-primary decoration-4 underline-offset-4">
                                    <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary ml-3 font-black text-lg">٤</span>
                                    الميزانية المتوقعة
                                </label>
                                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">خطوة 4 من 4</span>
                            </div>


                            <div className="flex flex-col md:flex-row items-center gap-8 px-2">
                                <div className="relative w-full md:max-w-xs group/field">
                                    <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-green-500 text-xl group-focus-within/field:scale-125 transition-transform duration-300">
                                        <FaMoneyBillWave />
                                    </div>
                                    <input
                                        type="number"
                                        value={data.price || ''}
                                        onChange={e => setData('price', e.target.value)}
                                        placeholder="0.00"
                                        className={`w-full pr-12 pl-16 py-5 bg-gray-50/50 border-2 border-transparent rounded-[1.8rem] focus:bg-white focus:border-primary focus:ring-0 transition-all text-3xl font-black tabular-nums shadow-inner text-gray-900 placeholder:text-gray-200 ${errors.price ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                    />
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xs uppercase bg-white/10 px-2 py-1 rounded">ل.س</div>
                                </div>

                                <div className="flex-1 bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
                                    <p className="text-blue-700 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full ml-2 animate-pulse"></span>
                                        ملاحظة مهمة
                                    </p>
                                    <p className="text-blue-600/80 text-xs font-bold leading-relaxed">
                                        {data.category === 'passenger'
                                            ? 'طلب الركاب سيتم نشره فوراً للسائقين المتاحين في منطقتك.'
                                            : 'طلبات نقل البضائع تتطلب مراجعة من الإدارة قبل نشرها للسائقين لضمان الجودة والأمان.'}
                                    </p>
                                </div>
                            </div>

                            {errors.price && <p className="text-red-500 text-[10px] font-black mr-4">{errors.price}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-6 bg-gray-900 text-white font-black text-xl rounded-[2.5rem] shadow-2xl shadow-gray-200 hover:bg-primary hover:text-gray-900 transition-all transform hover:-translate-y-2 active:scale-95 flex items-center justify-center group disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <span className="relative z-10 flex items-center">
                                    {processing ? 'جاري تنفيذ طلبك...' : (data.category === 'goods' ? 'إرسال الطلب للمراجعة' : 'تأكيد ونشر الطلب فوراً')}
                                    <FaCircleCheck className="mr-3 text-2xl group-hover:scale-125 transition-transform" />
                                </span>
                            </button>

                            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-6">عَ الطريق - شحنتك بأمان، وبأفضل سعر</p>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
