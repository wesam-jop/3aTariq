import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaLocationDot, FaMoneyBillWave, FaBoxOpen, FaTruckPickup, FaTruckMoving, FaTruck, FaSnowflake, FaArrowLeft, FaCircleCheck, FaEye, FaCarSide, FaBuilding, FaMapPin, FaGlobe } from "react-icons/fa6";

import toast from 'react-hot-toast';
import Pagination from '@/Components/Pagination';

export default function Available({ auth, orders }) {
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

    const handleAccept = (orderId) => {
        if (confirm('هل أنت متأكد من رغبتك في قبول هذا الطلب؟ بمجرد القبول ستكون مسؤولاً عن توصيله.')) {
            post(route('driver.orders.accept', orderId), {
                onSuccess: () => toast.success('تم قبول الطلب بنجاح!'),
                onError: () => toast.error('عذراً، حدث خطأ ما أو أن الطلب لم يعد متاحاً.'),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="الطلبات المتاحة"
        >
            <Head title="تصفح الطلبات" />

            <div className="max-w-7xl mx-auto pb-12 space-y-8">
                {/* Header Section */}
                <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-black mb-2 flex items-center">
                                <span className="w-2 h-8 bg-primary ml-4 rounded-full"></span>
                                طلبات شحن جديدة
                            </h2>
                            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">تصفح الشحنات المتاحة الآن واقبل ما يناسبك</p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                href="/driver/dashboard"
                                className="px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-xs transition-all flex items-center gap-2"
                            >
                                <FaArrowLeft />
                                العودة للرئيسية
                            </Link>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Orders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {orders.data.length > 0 ? (
                        orders.data.map((order) => (
                            <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full hover:-translate-y-2 border-b-4 border-b-transparent hover:border-b-primary">
                                {/* Card Header */}
                                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary text-xl border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                                            {order.category === 'passenger' ? <FaCarSide /> : getOrderIcon(order.type)}
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider border ${order.category === 'passenger' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                    {order.category === 'passenger' ? 'نقل ركاب' : 'نقل بضائع'}
                                                </span>
                                                {order.trip_type === 'internal' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider bg-green-50 text-green-600 border border-green-100">
                                                        داخلي
                                                    </span>
                                                )}
                                                {order.trip_type === 'external' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-100">
                                                        خارجي
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-sm font-black text-gray-900 block">{getOrderTypeName(order.type)}</span>
                                        </div>

                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">الميزانية</span>
                                        <span className="text-lg font-black text-green-600 tabular-nums">{order.price.toLocaleString()} <span className="text-[10px]">ل.س</span></span>
                                    </div>
                                </div>

                                {/* Route */}
                                <div className="p-8 flex-1 space-y-6">
                                    <div className="relative">
                                        <div className="absolute top-2 bottom-2 right-2.5 w-0.5 border-r-2 border-dashed border-gray-100"></div>

                                        <div className="relative pr-8 mb-6">
                                            <div className="absolute right-0 top-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            </div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">من</label>
                                            <p className="text-sm font-bold text-gray-900">{order.pickup_address}</p>
                                        </div>

                                        <div className="relative pr-8">
                                            <div className="absolute right-0 top-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                                                <FaLocationDot className="text-red-500 text-[10px]" />
                                            </div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">إلى</label>
                                            <p className="text-sm font-bold text-gray-900">{order.delivery_address}</p>
                                        </div>
                                    </div>

                                    {/* Location Info for Internal Transport */}
                                    {order.trip_type === 'internal' && order.governorate && order.region && (
                                        <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaBuilding className="text-green-600" size={16} />
                                                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">الموقع</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs font-bold text-green-800 border border-green-200">
                                                    <FaBuilding size={12} />
                                                    {order.governorate.name}
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs font-bold text-green-800 border border-green-200">
                                                    <FaMapPin size={12} />
                                                    {order.region.name}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {order.description && (
                                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                                            <p className="text-xs text-blue-800 font-bold line-clamp-2 leading-relaxed">
                                                {order.description}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="p-6 bg-gray-50/50 flex gap-3">
                                    <button
                                        onClick={() => handleAccept(order.id)}
                                        disabled={processing}
                                        className="flex-1 h-14 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-gray-900 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                    >
                                        <FaCircleCheck size={18} />
                                        قبول الطلب
                                    </button>
                                    <Link
                                        href={route('driver.orders.show', order.id)}
                                        className="w-14 h-14 bg-white border border-gray-200 text-gray-400 rounded-2xl flex items-center justify-center hover:text-primary hover:border-primary transition-all shadow-sm"
                                    >
                                        <FaEye size={20} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 text-5xl mb-6">
                                <FaBoxOpen />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">لا يوجد طلبات متاحة حالياً</h3>
                            <p className="text-gray-400 font-bold text-sm">سيتم إخطارك فور نشر طلبات جديدة تناسبك</p>
                        </div>
                    )}
                </div>

                {orders.links && orders.links.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination links={orders.links} />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
