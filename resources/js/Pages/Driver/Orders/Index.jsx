import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaBoxOpen, FaTruckFast, FaLocationDot, FaMoneyBillWave, FaClock, FaCircleCheck, FaEye, FaArrowRight, FaTruckPickup, FaTruckMoving, FaTruck, FaSnowflake } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, orders }) {
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

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed':
            case 'delivered':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'active':
            case 'in_progress':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
            case 'delivered': return 'مكتمل';
            case 'active':
            case 'in_progress': return 'جاري التوصيل';
            case 'pending': return 'قيد الانتظار';
            case 'cancelled': return 'ملغي';
            default: return status;
        }
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        post(route('driver.orders.status', orderId) + `?status=${newStatus}`, {
            onSuccess: () => toast.success('تم تحديث حالة الطلب بنجاح'),
            onError: () => toast.error('عذراً، تعذر تحديث الحالة'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="طلباتي المخصصة"
        >
            <Head title="إدارة طلباتي" />

            <div className="max-w-7xl mx-auto pb-12 space-y-8">
                {/* Header Info */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">طلبات الشحن النشطة</h2>
                        <p className="text-gray-500 font-bold text-sm tracking-wide">تابع الشحنات التي قبلتها وقم بتحديث حالتها حتى التسليم</p>
                    </div>
                    <Link
                        href={route('driver.orders.available')}
                        className="inline-flex items-center px-8 py-4 bg-primary text-gray-900 font-black rounded-2xl shadow-xl shadow-yellow-100 hover:bg-yellow-400 transition-all transform hover:-translate-y-1 active:scale-95"
                    >
                        تصفح الطلبات المتاحة
                        <FaArrowRight className="mr-3 scale-x-[-1]" />
                    </Link>
                </div>

                {/* Orders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {orders.data && orders.data.length > 0 ? (
                        orders.data.map((order) => (
                            <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col border-b-4 border-b-transparent hover:border-b-primary">
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-8 text-right">
                                        <div className="flex items-center">
                                            <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 text-2xl ml-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                {getOrderIcon(order.type)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-lg">طلب #{order.id}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">
                                                    العميل: {order.customer?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(order.status)} whitespace-nowrap`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>

                                    <div className="space-y-6 relative px-2">
                                        {/* Dotted Line Tracking UI */}
                                        <div className="absolute top-2 right-2 bottom-2 border-r-2 border-dotted border-gray-100"></div>

                                        <div className="relative pr-8">
                                            <div className="absolute right-0 top-1 w-4 h-4 rounded-full bg-primary shadow-lg border-4 border-white"></div>
                                            <div className="text-sm">
                                                <p className="text-gray-400 text-[10px] font-black uppercase mb-1">نقطة الاستلام</p>
                                                <p className="text-gray-900 font-black text-sm">{order.pickup_address}</p>
                                            </div>
                                        </div>

                                        <div className="relative pr-8">
                                            <div className="absolute right-0 top-1 w-4 h-4 rounded-full bg-red-500 shadow-lg border-4 border-white"></div>
                                            <div className="text-sm">
                                                <p className="text-gray-400 text-[10px] font-black uppercase mb-1">نقطة التسليم</p>
                                                <p className="text-gray-900 font-black text-sm">{order.delivery_address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                                        <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                            <FaClock className="ml-2 text-primary" />
                                            {new Date(order.created_at).toLocaleDateString('ar-SA')}
                                        </div>
                                        <div className="text-left font-black">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">الميزانية المتفق عليها</p>
                                            <p className="text-2xl text-gray-900 tabular-nums">
                                                {order.price.toLocaleString()} <span className="text-[10px] text-green-500">ل.س</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 pb-8 flex gap-3">
                                    {(order.status === 'active' || order.status === 'assigned') && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'in_progress')}
                                            disabled={processing}
                                            className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-primary hover:text-gray-900 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <FaTruckFast size={18} />
                                            بدء التوصيل
                                        </button>
                                    )}
                                    {order.status === 'in_progress' && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'delivered')}
                                            disabled={processing}
                                            className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <FaCircleCheck size={18} />
                                            تم التسليم بنجاح
                                        </button>
                                    )}
                                    <Link
                                        href={route('driver.orders.show', order.id)}
                                        className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all shadow-sm"
                                    >
                                        <FaEye size={20} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 bg-white rounded-[3rem] border border-dashed border-gray-100 text-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200 text-4xl">
                                <FaBoxOpen />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">ليس لديك طلبات نشطة حالياً</h3>
                            <p className="text-gray-400 font-bold mb-8">ابدأ بقبول طلبات جديدة لزيادة أرباحك وجذب العملاء</p>
                            <Link
                                href={route('driver.orders.available')}
                                className="inline-flex items-center px-10 py-4 bg-primary text-gray-900 font-black rounded-2xl shadow-xl shadow-yellow-100 hover:bg-yellow-400 transition-all"
                            >
                                تصفح الطلبات المتاحة
                                <FaArrowRight className="mr-3 scale-x-[-1]" />
                            </Link>
                        </div>
                    )}
                </div>

                {orders.links && orders.links.length > 3 && (
                    <div className="mt-12 flex justify-center pb-8 font-black">
                        <Pagination links={orders.links} />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
