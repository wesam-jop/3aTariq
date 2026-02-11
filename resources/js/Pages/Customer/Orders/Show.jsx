import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaBoxOpen, FaTruckFast, FaLocationDot, FaMoneyBillWave, FaClock, FaArrowRight, FaUser, FaTriangleExclamation, FaXmark, FaTruckMoving, FaTruck, FaSnowflake, FaTruckPickup, FaPhone, FaMessage } from "react-icons/fa6";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Show({ user, order }) {
    const [showCancelModal, setShowCancelModal] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-500 shadow-green-100';
            case 'active': return 'bg-blue-500 shadow-blue-100';
            case 'pending': return 'bg-yellow-500 shadow-yellow-100';
            case 'cancelled': return 'bg-red-500 shadow-red-100';
            default: return 'bg-gray-500 shadow-gray-100';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'مكتمل';
            case 'active': return 'جاري التوصيل';
            case 'pending': return 'قيد الانتظار';
            case 'cancelled': return 'ملغي';
            default: return status;
        }
    };

    const handleCancel = () => {
        router.post(`/customer/orders/${order.id}/cancel`, {}, {
            onSuccess: () => {
                toast.success('تم إلغاء الطلب بنجاح');
                setShowCancelModal(false);
            },
            onError: () => {
                toast.error('عذراً، تعذر إلغاء الطلب');
                setShowCancelModal(false);
            }
        });
    };

    const getOrderIcon = (type) => {
        switch (type) {
            case 'suzuki': return <FaTruckPickup />;
            case 'h100': return <FaTruckMoving />;
            case 'kia': return <FaTruck />;
            case 'heavy': return <FaTruckMoving className="rotate-180" />;
            case 'refrigerated': return <FaSnowflake />;
            case 'parcel': return <FaBoxOpen />;
            default: return <FaBoxOpen />;
        }
    };

    const getOrderTypeName = (type) => {
        switch (type) {
            case 'suzuki': return 'سوزوكي';
            case 'h100': return 'فان H100';
            case 'kia': return 'كيا / هيونداي';
            case 'heavy': return 'شاحنة ثقيلة';
            case 'refrigerated': return 'براد';
            case 'parcel': return 'طرد';
            default: return 'شحنة';
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={`تفاصيل الطلب #${order.id}`}
        >
            <Head title={`طلب #${order.id}`} />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/customer/orders"
                            className="h-12 w-12 bg-gray-50 text-gray-500 rounded-2xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all transform hover:rotate-12"
                        >
                            <FaArrowRight size={20} />
                        </Link>
                        <div>
                            <h2 className="text-xl font-black text-gray-900">الطلب #{order.id}</h2>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{getOrderTypeName(order.type)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {order.status === 'pending' && (
                            <button
                                onClick={() => setShowCancelModal(true)}
                                className="px-6 py-3 bg-red-50 text-red-600 font-black text-sm rounded-xl hover:bg-red-600 hover:text-white transition-all"
                            >
                                إلغاء الطلب
                            </button>
                        )}
                        <div className={`px-6 py-3 rounded-xl text-white font-black text-sm shadow-xl ${getStatusColor(order.status)} animate-pulse-subtle`}>
                            {getStatusText(order.status)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Route Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group">
                            <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-lg font-black text-gray-900 flex items-center">
                                    <div className="w-2 h-8 bg-primary rounded-full ml-3"></div>
                                    مسار الشحنة
                                </h3>
                                <div className="text-primary text-2xl group-hover:scale-110 transition-transform duration-500">
                                    {getOrderIcon(order.type)}
                                </div>
                            </div>

                            <div className="p-10 relative">
                                {/* Vertical dotted line */}
                                <div className="absolute top-16 right-14 bottom-16 border-r-2 border-dashed border-gray-100"></div>

                                <div className="space-y-16">
                                    <div className="relative flex items-start group/loc">
                                        <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary z-10 ml-8 ring-[12px] ring-white group-hover/loc:bg-primary group-hover/loc:text-white transition-colors duration-300 shadow-sm">
                                            <FaLocationDot />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2 text-right">نقطة الاستلام</p>
                                            <p className="text-gray-900 font-black text-xl leading-tight">{order.pickup_address || 'غير محدد'}</p>
                                            {order.pickup_latitude && order.pickup_longitude && (
                                                <p className="text-xs text-primary font-bold mt-2">
                                                    📍 الإحداثيات: {order.pickup_latitude.toFixed(6)}, {order.pickup_longitude.toFixed(6)}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative flex items-start group/loc">
                                        <div className="h-10 w-10 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 z-10 ml-8 ring-[12px] ring-white group-hover/loc:bg-red-500 group-hover/loc:text-white transition-colors duration-300 shadow-sm">
                                            <FaLocationDot />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2 text-right">نقطة التسليم</p>
                                            <p className="text-gray-900 font-black text-xl leading-tight">{order.delivery_address || 'غير محدد'}</p>
                                            {order.delivery_latitude && order.delivery_longitude && (
                                                <p className="text-xs text-red-500 font-bold mt-2">
                                                    📍 الإحداثيات: {order.delivery_latitude.toFixed(6)}, {order.delivery_longitude.toFixed(6)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center">
                                <div className="w-2 h-8 bg-primary rounded-full ml-3"></div>
                                تفاصيل ومحتوى الطلب
                            </h3>
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative">
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {order.description || 'لا يوجد وصف متاح لهذا الطلب لغاية الآن.'}
                                </p>
                                <FaBoxOpen className="absolute -bottom-6 -left-6 text-gray-100 text-7xl rotate-12" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Details */}
                    <div className="space-y-8">
                        {/* Price Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="h-16 w-16 bg-green-50 rounded-[1.5rem] flex items-center justify-center text-green-500 text-3xl mx-auto mb-6 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                                    <FaMoneyBillWave />
                                </div>
                                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">الميزانية المقررة</p>
                                <h4 className="text-4xl font-black text-gray-900 tabular-nums">{order.price.toLocaleString()} <span className="text-sm font-bold text-primary">ل.س</span></h4>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-green-100 transition-colors duration-500"></div>
                        </div>

                        {/* Driver Card */}
                        <div className="bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 text-white relative overflow-hidden group">
                            <h3 className="text-lg font-black mb-8 relative z-10 flex items-center">
                                <span className="w-2 h-6 bg-primary rounded-full ml-3"></span>
                                السائق المعني
                            </h3>

                            {order.status === 'cancelled' ? (
                                <div className="relative z-10 text-center py-8">
                                    <div className="h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 text-3xl mx-auto mb-6">
                                        <FaXmark />
                                    </div>
                                    <p className="text-red-400 font-black text-lg">الطلب ملغي</p>
                                    <p className="text-gray-500 text-xs mt-3 font-medium">لا يمكن متابعة السائق لطلب ملغي</p>
                                </div>
                            ) : order.driver ? (
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center p-4 bg-white/5 rounded-3xl border border-white/10">
                                        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-gray-900 text-2xl ml-4 overflow-hidden shadow-lg">
                                            {order.driver.profile_image ? (
                                                <img src={order.driver.profile_image} alt={order.driver.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <FaUser />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-black text-xl">{order.driver.name}</p>
                                            <div className="flex items-center text-primary text-xs font-black mt-1">
                                                <span className="bg-primary/20 px-2 py-0.5 rounded mr-2">سائق موثق</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <a href={`tel:${order.driver.phone}`} className="flex flex-col items-center justify-center py-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-primary hover:text-gray-900 transition-all duration-300">
                                            <FaPhone className="mb-2 text-xl" />
                                            <span className="text-xs font-black">اتصال</span>
                                        </a>
                                        <button className="flex flex-col items-center justify-center py-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white hover:text-gray-900 transition-all duration-300">
                                            <FaMessage className="mb-2 text-xl" />
                                            <span className="text-xs font-black">دردشة</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative z-10 text-center py-10">
                                    <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center text-gray-600 text-4xl mx-auto mb-6 relative">
                                        <FaClock className="animate-spin-slow" />
                                        <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping"></div>
                                    </div>
                                    <p className="text-gray-400 font-black mb-2 px-4 shadow-sm">بانتظار قبول الطلب</p>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">سيظهر السائق هنا قريباً</p>
                                </div>
                            )}
                            {/* Decorative background truck */}
                            <FaTruckFast className="absolute -bottom-6 -left-6 text-white/5 text-[10rem] group-hover:translate-x-4 transition-transform duration-700" />
                        </div>

                        {/* Enhanced Order Timeline */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                            <h4 className="text-sm font-black text-gray-900 mb-8 border-r-4 border-primary pr-3 uppercase">تتبع الحالة الزمنية</h4>
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 relative">
                                    <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-100"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700 font-black">تم إرسال الطلب</p>
                                        <p className="text-[10px] text-gray-400 font-bold">{new Date(order.created_at).toLocaleString('ar-SA')}</p>
                                    </div>
                                </div>

                                {order.status === 'cancelled' ? (
                                    <div className="flex items-center gap-4 relative animate-in fade-in slide-in-from-right-4 duration-700">
                                        <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-100 scale-125"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-red-600 font-black">تم إلغاء الطلب</p>
                                            <p className="text-[10px] text-gray-400 font-bold">{new Date(order.updated_at).toLocaleString('ar-SA')}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className={`flex items-center gap-4 transition-opacity duration-300 ${order.status === 'pending' ? 'opacity-30' : 'opacity-100'}`}>
                                            <div className={`h-3 w-3 rounded-full ${order.status !== 'pending' ? 'bg-green-500 shadow-lg shadow-green-100' : 'bg-gray-300'}`}></div>
                                            <div>
                                                <p className="text-sm text-gray-700 font-black">تم قبول الطلب</p>
                                                {order.status !== 'pending' && <p className="text-[10px] text-gray-400 font-bold">بواسطة السائق</p>}
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-4 transition-opacity duration-300 ${['pending', 'accepted'].includes(order.status) ? 'opacity-30' : 'opacity-100'}`}>
                                            <div className={`h-3 w-3 rounded-full ${['active', 'completed'].includes(order.status) ? 'bg-green-500 shadow-lg shadow-green-100' : 'bg-gray-300'}`}></div>
                                            <p className="text-sm text-gray-700 font-black">جاري تنفيذ الشحن</p>
                                        </div>
                                        <div className={`flex items-center gap-4 transition-opacity duration-300 ${order.status !== 'completed' ? 'opacity-30' : 'opacity-100'}`}>
                                            <div className={`h-3 w-3 rounded-full ${order.status === 'completed' ? 'bg-green-500 shadow-lg shadow-green-100' : 'bg-gray-300'}`}></div>
                                            <p className="text-sm text-gray-700 font-black">تم التسليم بنجاح</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <button
                            onClick={() => setShowCancelModal(false)}
                            className="absolute top-8 left-8 text-gray-300 hover:text-gray-900 transition-colors"
                        >
                            <FaXmark size={24} />
                        </button>

                        <div className="h-24 w-24 bg-red-100 rounded-[2rem] flex items-center justify-center text-red-600 text-5xl mx-auto mb-8 shadow-inner">
                            <FaTriangleExclamation />
                        </div>

                        <h3 className="text-3xl font-black text-gray-900 text-center mb-3">تأكيد الإلغاء</h3>
                        <p className="text-gray-500 text-center mb-10 font-medium leading-relaxed">
                            هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟ <br />
                            <span className="text-red-500 font-bold">لا يمكن التراجع عن هذا الإجراء بعد التأكيد.</span>
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all"
                            >
                                تراجع
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 shadow-xl shadow-red-200 transition-all hover:scale-[1.05] active:scale-95"
                            >
                                نعم، إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
