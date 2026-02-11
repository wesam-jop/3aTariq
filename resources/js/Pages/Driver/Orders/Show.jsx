import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaBoxOpen, FaLocationDot, FaMoneyBillWave, FaClock, FaCircleCheck, FaUser, FaPhone, FaArrowRight, FaTruckFast, FaSnowflake, FaTruckPickup, FaTruckMoving, FaTruck, FaMessage, FaMap } from "react-icons/fa6";
import toast from 'react-hot-toast';

export default function Show({ auth, order }) {
    const { post, processing } = useForm();

    const getOrderIcon = (type) => {
        switch (type) {
            case 'suzuki': return <FaTruckPickup />;
            case 'h100': return <FaTruckMoving />;
            case 'kia': return <FaTruck />;
            case 'heavy': return <FaTruckMoving className="rotate-180" />;
            case 'refrigerated': return <FaSnowflake />;
            default: return <FaBoxOpen />;
        }
    };

    const getOrderTypeName = (type) => {
        const types = {
            suzuki: 'سوزوكي',
            h100: 'فان H100',
            kia: 'كيا / هيونداي',
            heavy: 'شاحنة ثقيلة',
            refrigerated: 'براد',
            parcel: 'طرد'
        };
        return types[type] || type;
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed':
            case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'active':
            case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
            case 'delivered': return 'تم التسليم بنجاح';
            case 'active':
            case 'in_progress': return 'جاري التوصيل';
            case 'pending': return 'تحت المراجعة';
            case 'cancelled': return 'طلب ملغي';
            default: return status;
        }
    };

    const handleStatusUpdate = (newStatus) => {
        post(route('driver.orders.status', order.id) + `?status=${newStatus}`, {
            onSuccess: () => toast.success('تم تحديث حالة الطلب بنجاح'),
            onError: () => toast.error('عذراً، حدث خطأ أثناء التحديث'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={`تفاصيل الشحنة #${order.id}`}
        >
            <Head title={`طلب شحن #${order.id}`} />

            <div className="max-w-7xl mx-auto pb-12 space-y-8">
                {/* Custom Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-5">
                        <Link
                            href="/driver/orders"
                            className="h-12 w-12 bg-gray-50 text-gray-500 rounded-2xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all transform hover:rotate-12"
                        >
                            <FaArrowRight size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 leading-none">إدارة الشحنة #{order.id}</h2>
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-2">تاريخ الطلب: {new Date(order.created_at).toLocaleDateString('ar-SA')}</p>
                        </div>
                    </div>
                    <div className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 ${getStatusStyle(order.status)}`}>
                        {getStatusText(order.status)}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Route Map Visualizer */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary text-3xl shadow-sm border border-primary/20 group-hover:rotate-6 transition-transform">
                                        <FaTruckMoving />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">مصدر الشحن</span>
                                    <p className="text-lg font-black text-gray-900 text-center">{order.pickup_address}</p>
                                </div>

                                <div className="flex-1 h-px bg-gradient-to-l from-primary/30 via-gray-100 to-red-400/30 relative mt-[-2rem] md:mt-0">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center animate-pulse">
                                        <FaMap className="text-gray-300" />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-3 text-left md:text-center">
                                    <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 text-3xl shadow-sm border border-red-100 group-hover:-rotate-6 transition-transform">
                                        <FaLocationDot />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">وجهة التسليم</span>
                                    <p className="text-lg font-black text-gray-900 text-center">{order.delivery_address}</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-8 text-gray-50/50 text-8xl font-black select-none pointer-events-none">ROUTE</div>
                        </div>

                        {/* Shipment Specs */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden">
                            <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-2 h-6 bg-primary rounded-full"></span>
                                تفاصيل الحمولة
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary text-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                        {getOrderIcon(order.type)}
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">نوع المركبة المطلوبة</span>
                                    <p className="text-sm font-black text-gray-900">{getOrderTypeName(order.type)}</p>
                                </div>

                                <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-500 text-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                        <FaMoneyBillWave />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">الميزانية المقررة</span>
                                    <p className="text-sm font-black text-gray-900">{order.price.toLocaleString()} ل.س</p>
                                </div>

                                <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-500 text-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                        <FaClock />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">تاريخ الإنشاء</span>
                                    <p className="text-sm font-black text-gray-900">{new Date(order.created_at).toLocaleDateString('ar-SA')}</p>
                                </div>
                            </div>

                            {order.description && (
                                <div className="mt-8 bg-blue-50/30 p-8 rounded-[2rem] border border-blue-100/30">
                                    <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <FaMessage size={14} />
                                        ملاحظات إضافية من العميل
                                    </h4>
                                    <p className="text-sm text-blue-800/80 font-bold leading-relaxed">{order.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Customer Profile Card */}
                        <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-4xl mb-6 shadow-2xl border-4 border-white/5 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(order.customer?.name)}&background=ffcc00&color=111&size=128&bold=true`} alt={order.customer?.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-black mb-1">{order.customer?.name}</h3>
                                <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-8 opacity-80">صاحب الشحنة</p>

                                <div className="w-full space-y-4">
                                    <a
                                        href={`tel:${order.customer?.phone || '#'}`}
                                        className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-primary transition-colors active:scale-95"
                                    >
                                        <FaPhone size={16} />
                                        تواصل عبر الهاتف
                                    </a>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">تأكد من مراجعة تفاصيل الموقع قبل التواصل</p>
                                </div>
                            </div>
                            {/* Decoration */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                        </div>

                        {/* Action Sidebar Area */}
                        <div className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden">
                            <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center justify-center gap-3">
                                <span className="w-3 h-3 bg-primary rounded-full animate-ping"></span>
                                إدارة حالة التوصيل
                            </h3>

                            <div className="space-y-4">
                                {(order.status === 'active' || order.status === 'assigned' || order.status === 'accepted') && (
                                    <button
                                        onClick={() => handleStatusUpdate('in_progress')}
                                        disabled={processing}
                                        className="w-full py-6 bg-primary text-gray-900 font-black rounded-[2rem] shadow-xl shadow-yellow-100 hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-2 active:scale-95"
                                    >
                                        <FaTruckFast size={22} />
                                        تأكيد بدء التحميل
                                    </button>
                                )}

                                {order.status === 'in_progress' && (
                                    <button
                                        onClick={() => handleStatusUpdate('delivered')}
                                        disabled={processing}
                                        className="w-full py-6 bg-green-600 text-white font-black rounded-[2rem] shadow-xl shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-2 active:scale-95"
                                    >
                                        <FaCircleCheck size={22} />
                                        إتمام عملية التسليم
                                    </button>
                                )}

                                {order.status === 'delivered' || order.status === 'completed' && (
                                    <div className="p-8 bg-green-50 text-green-700 rounded-[2.5rem] border-2 border-dashed border-green-200 text-center font-black flex flex-col items-center gap-4 animate-in zoom-in duration-500">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm border border-green-100">
                                            <FaCircleCheck />
                                        </div>
                                        <div>
                                            <p className="text-lg">تم الانتهاء</p>
                                            <p className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-70">المهمة مكتملة بنجاح</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
