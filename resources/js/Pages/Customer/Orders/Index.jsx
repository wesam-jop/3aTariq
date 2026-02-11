import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaBoxOpen, FaTruckFast, FaClock, FaCircleInfo, FaPlus, FaTriangleExclamation, FaXmark, FaLocationDot, FaTruckPickup, FaTruckMoving, FaTruck, FaSnowflake } from "react-icons/fa6";
import { useState } from 'react';
import toast from 'react-hot-toast';
import Pagination from '@/Components/Pagination';


export default function Index({ user: propUser, orders }) {
    const { props } = usePage();
    const user = propUser || props.auth.user;
    const [cancellingOrder, setCancellingOrder] = useState(null);

    if (!user) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'active': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
        if (!cancellingOrder) return;

        router.post(`/customer/orders/${cancellingOrder.id}/cancel`, {}, {
            onSuccess: () => {
                toast.success('تم إلغاء الطلب بنجاح');
                setCancellingOrder(null);
            },
            onError: () => {
                toast.error('عذراً، تعذر إلغاء الطلب');
                setCancellingOrder(null);
            },
            preserveScroll: true
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
            header="طلباتي"
        >
            <Head title="طلباتي" />

            <div className="space-y-8 pb-12">
                {/* Header Section */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">إدارة الشحنات</h2>
                        <p className="text-gray-500 font-medium">تابع حالة طلباتك وعروض السائقين في مكان واحد</p>
                    </div>
                    <Link
                        href="/customer/orders/create"
                        className="inline-flex items-center px-8 py-4 bg-primary text-gray-900 font-black rounded-2xl shadow-xl shadow-yellow-100 hover:bg-yellow-400 transition-all transform hover:-translate-y-1 active:scale-95"
                    >
                        <FaPlus className="ml-2 text-xl" />
                        طلب شحن جديد
                    </Link>
                </div>

                {/* Orders Grid */}
                {orders.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {orders.data.map((order) => (
                            <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center">
                                            <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 text-2xl ml-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                {getOrderIcon(order.type)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-lg">طلب #{order.id}</p>
                                                <p className="text-xs font-bold text-primary uppercase tracking-widest">{getOrderTypeName(order.type)}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-xl text-xs font-bold border ${getStatusColor(order.status)} whitespace-nowrap`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>

                                    <div className="space-y-4 relative">
                                        {/* Dotted Line */}
                                        <div className="absolute top-2 right-2 bottom-2 border-r-2 border-dotted border-gray-100"></div>

                                        <div className="relative flex items-center pr-8">
                                            <div className="absolute right-0 w-4 h-4 rounded-full bg-primary/20 border-4 border-white"></div>
                                            <div className="text-sm">
                                                <p className="text-gray-400 text-[10px] font-bold uppercase mb-0.5">من</p>
                                                <p className="text-gray-700 font-bold truncate max-w-[200px]">{order.pickup_address}</p>
                                            </div>
                                        </div>

                                        <div className="relative flex items-center pr-8">
                                            <div className="absolute right-0 w-4 h-4 rounded-full bg-red-100 border-4 border-white"></div>
                                            <div className="text-sm">
                                                <p className="text-gray-400 text-[10px] font-bold uppercase mb-0.5">إلى</p>
                                                <p className="text-gray-700 font-bold truncate max-w-[200px]">{order.delivery_address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                                        <div className="flex items-center text-gray-400 text-xs font-bold">
                                            <FaClock className="ml-2" />
                                            {new Date(order.created_at).toLocaleDateString('ar-SA')}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">الميزانية</p>
                                            <p className="text-lg font-black text-gray-900">{order.price} <span className="text-xs text-primary">ل.س</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto px-8 pb-8 flex gap-3">
                                    <Link
                                        href={`/customer/orders/${order.id}`}
                                        className="flex-1 py-4 bg-gray-900 text-white text-center font-bold rounded-2xl hover:bg-primary hover:text-gray-900 transition-all shadow-lg shadow-gray-100"
                                    >
                                        التفاصيل
                                    </Link>
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => setCancellingOrder(order)}
                                            className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                            title="إلغاء الطلب"
                                        >
                                            <FaXmark size={24} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] p-24 text-center border border-gray-100 shadow-sm">
                        <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200 text-6xl shadow-inner">
                            <FaBoxOpen />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-3">لا توجد طلبات بعد</h3>
                        <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">ابدأ بطلبك الأول الآن واستمتع بتوصيل سريع وموثوق في جميع المحافظات السورية.</p>
                        <Link
                            href="/customer/orders/create"
                            className="px-10 py-4 bg-primary text-gray-900 font-black rounded-2xl shadow-xl shadow-yellow-100 hover:bg-yellow-400 transition-all inline-flex items-center transform hover:-translate-y-1"
                        >
                            <FaPlus className="ml-2 text-xl" />
                            اطلب الآن
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {orders.links && orders.links.length > 3 && (
                    <Pagination links={orders.links} />
                )}

            </div>

            {/* Confirmation Modal */}
            {cancellingOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <button
                            onClick={() => setCancellingOrder(null)}
                            className="absolute top-8 left-8 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <FaXmark size={24} />
                        </button>

                        <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-5xl mx-auto mb-8">
                            <FaTriangleExclamation />
                        </div>

                        <h3 className="text-3xl font-black text-gray-900 text-center mb-3">تأكيد الإلغاء</h3>
                        <p className="text-gray-500 text-center mb-10 font-medium leading-relaxed">
                            هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟ <br /> لا يمكن التراجع عن هذا الإجراء.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCancellingOrder(null)}
                                className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-[1.5rem] hover:bg-gray-200 transition-all font-black"
                            >
                                تراجع
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 py-4 bg-red-600 text-white font-black rounded-[1.5rem] hover:bg-red-700 shadow-xl shadow-red-100 transition-all hover:scale-[1.02] active:scale-95"
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
