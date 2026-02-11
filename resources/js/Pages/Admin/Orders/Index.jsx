import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaBox, FaClock, FaCircleCheck, FaCircleXmark, FaFilter, FaTruck, FaUser, FaLocationDot, FaMoneyBillWave, FaArrowRight, FaBuilding, FaMapPin } from "react-icons/fa6";

import Pagination from '@/Components/Pagination';
import toast from 'react-hot-toast';

export default function Index({ auth, orders, currentStatus }) {
    const handleStatusChange = (status) => {
        router.get(route('admin.orders.index'), { status }, { preserveState: true });
    };

    const handleApprove = (orderId) => {
        if (confirm('هل أنت متأكد من الموافقة على هذا الطلب؟ سيصبح متاحاً للسائقين فوراً.')) {
            router.post(route('admin.orders.approve', orderId), {}, {
                onSuccess: () => toast.success('تمت الموافقة على الطلب بنجاح'),
            });
        }
    };

    const getStatusStyle = (status) => {
        const styles = {
            pending_review: 'bg-orange-50 text-orange-600 border-orange-100',
            pending: 'bg-blue-50 text-blue-600 border-blue-100',
            active: 'bg-green-50 text-green-600 border-green-100',
            completed: 'bg-gray-50 text-gray-500 border-gray-100',
            cancelled: 'bg-red-50 text-red-600 border-red-100',
        };
        return styles[status] || styles.pending;
    };

    const getStatusLabel = (status) => {
        const labels = {
            pending_review: 'بانتظار المراجعة',
            pending: 'بانتظار سائق',
            active: 'قيد التنفيذ',
            completed: 'مكتمل',
            cancelled: 'ملغي',
        };
        return labels[status] || status;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="إدارة الطلبات"
        >
            <Head title="إدارة الطلبات" />

            <div className="space-y-8 pb-12">
                {/* Stats & Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 flex flex-wrap gap-3 bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
                        {[
                            { id: 'pending_review', name: 'بانتظار المراجعة', icon: FaClock },
                            { id: 'pending', name: 'بانتظار سائق', icon: FaBox },
                            { id: 'active', name: 'قيد التنفيذ', icon: FaTruck },
                            { id: 'completed', name: 'المكتملة', icon: FaCircleCheck },
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => handleStatusChange(filter.id)}
                                className={`flex items-center px-6 py-3 rounded-2xl text-sm font-black transition-all ${currentStatus === filter.id
                                    ? 'bg-gray-900 text-white shadow-xl shadow-gray-200'
                                    : 'bg-gray-50 text-gray-500 hover:bg-white hover:shadow-md'
                                    }`}
                            >
                                <filter.icon className="ml-2" />
                                {filter.name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-primary p-4 rounded-[2rem] shadow-lg shadow-primary/20 flex items-center justify-between overflow-hidden relative">
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-gray-900/60 uppercase tracking-widest">إجمالي الطلبات</p>
                            <p className="text-3xl font-black text-gray-900">{orders.total}</p>
                        </div>
                        <FaBox className="text-gray-900/10 text-6xl absolute -left-2 rotate-12" />
                    </div>
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-xl font-black text-gray-900 flex items-center">
                            <FaFilter className="ml-3 text-primary" />
                            {getStatusLabel(currentStatus)}
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">العميل</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">نوع الشحنة / الخدمة</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">المسار</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">التكلفة</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.data.length > 0 ? (
                                    orders.data.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 ml-3 group-hover:bg-primary group-hover:text-gray-900 transition-colors duration-300">
                                                        <FaUser size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-900">{order.customer?.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold">{order.customer?.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider w-fit mb-1 ${order.category === 'passenger' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                                        }`}>
                                                        {order.category === 'passenger' ? 'نقل ركاب' : 'نقل بضائع'}
                                                    </span>
                                                    {order.category === 'passenger' && (
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider mb-1 border ${order.trip_type === 'internal' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-purple-50 text-purple-600 border-purple-100'
                                                            }`}>
                                                            {order.trip_type === 'internal' ? 'داخلي' : 'خارجي'}
                                                        </span>
                                                    )}
                                                    <span className="text-xs font-bold text-gray-700">{order.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                {order.trip_type === 'internal' ? (
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center text-xs font-bold text-gray-900">
                                                            <FaBuilding className="text-primary ml-2" size={12} />
                                                            {order.governorate?.name}
                                                        </div>
                                                        <div className="flex items-center text-xs font-bold text-gray-600">
                                                            <FaMapPin className="text-gray-400 ml-2" size={12} />
                                                            {order.region?.name}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center text-xs font-bold text-gray-600">
                                                            <FaLocationDot className="text-primary ml-2" size={12} />
                                                            {order.pickup_address}
                                                        </div>
                                                        <div className="flex items-center text-xs font-bold text-gray-600">
                                                            <FaLocationDot className="text-red-500 ml-2" size={12} />
                                                            {order.delivery_address}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-8 py-6">
                                                <div className="flex items-center text-sm font-black text-gray-900">
                                                    <FaMoneyBillWave className="text-green-500 ml-2" />
                                                    {parseFloat(order.price).toLocaleString()} <span className="text-[10px] text-gray-400 mr-1">ل.س</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    {order.status === 'pending_review' && (
                                                        <button
                                                            onClick={() => handleApprove(order.id)}
                                                            className="flex items-center px-4 py-2 bg-green-500 text-white text-[10px] font-black rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-100"
                                                        >
                                                            <FaCircleCheck className="ml-2" />
                                                            موافقة ونشر
                                                        </button>
                                                    )}
                                                    <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                        <FaArrowRight className="rotate-180" size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 mb-4">
                                                    <FaBox size={40} />
                                                </div>
                                                <p className="text-gray-400 font-bold">لا توجد طلبات في هذا القسم حالياً</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {orders.links && <Pagination links={orders.links} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
