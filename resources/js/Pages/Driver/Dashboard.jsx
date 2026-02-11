import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaTruckFast, FaRoute, FaArrowLeft, FaLocationDot, FaMoneyBillTrendUp, FaCircleCheck, FaClockRotateLeft, FaPlus, FaBoxOpen, FaStar, FaArrowRight, FaClock } from "react-icons/fa6";

export default function DriverDashboard({ auth, trips, orders, stats }) {
    const user = auth.user;
    const totalEarnings = stats?.total_earnings || 0;
    const completedOrdersValue = stats?.completed_orders || 0;
    const activeOrdersValue = stats?.active_orders || 0;
    const completedTripsValue = stats?.completed_trips || 0;

    const statCards = [
        {
            title: 'إجمالي الأرباح',
            value: totalEarnings.toLocaleString(),
            suffix: 'ل.س',
            icon: <FaMoneyBillTrendUp />,
            gradient: 'from-green-500 to-emerald-600',
            textColor: 'text-green-600'
        },
        {
            title: 'الطلبات النشطة',
            value: activeOrdersValue,
            suffix: 'قيد التنفيذ',
            icon: <FaBoxOpen />,
            gradient: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-600'
        },
        {
            title: 'طلبات مكتملة',
            value: completedOrdersValue,
            suffix: 'بنجاح',
            icon: <FaCircleCheck />,
            gradient: 'from-purple-500 to-violet-600',
            textColor: 'text-purple-600'
        },
        {
            title: 'رحلات منتهية',
            value: completedTripsValue,
            suffix: 'رحلة',
            icon: <FaRoute />,
            gradient: 'from-yellow-400 to-orange-500',
            textColor: 'text-yellow-600'
        }
    ];

    return (
        <AuthenticatedLayout
            user={user}
            header="لوحة تحكم الكابتن"
        >
            <Head title="لوحة التحكم" />

            <div className="max-w-7xl mx-auto pb-12 space-y-10">
                {/* Hero / Welcome Section */}
                <div className="bg-gray-900 rounded-[3rem] p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 lg:flex items-center justify-between gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse ml-2"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">حالة الحساب: نشط وجاهز</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                                مرحباً بك مجدداً، <br />
                                <span className="text-primary">كابتن {user.name}</span> 👋
                            </h2>
                            <p className="text-gray-400 text-lg font-bold max-w-lg leading-relaxed">
                                نقدّر جهودك في تقديم خدمة متميزة. لديك <span className="text-white underline decoration-primary decoration-4 underline-offset-4">{activeOrdersValue} طلبات</span> قيد المتابعة حالياً.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/driver/trips/create"
                                    className="px-8 py-5 bg-primary text-gray-900 font-black rounded-2xl shadow-xl shadow-yellow-900/20 hover:bg-yellow-400 transition-all flex items-center group/btn"
                                >
                                    <FaPlus className="ml-3 group-hover:rotate-90 transition-transform" />
                                    نشر رحلة جديدة
                                </Link>
                                <Link
                                    href={route('driver.orders.available')}
                                    className="px-8 py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all flex items-center"
                                >
                                    <FaBoxOpen className="ml-3" />
                                    تصفح الطلبات المتاحة
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col items-center gap-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-sm shadow-inner group-hover:scale-105 transition-transform duration-700">
                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary text-4xl shadow-2xl border border-primary/20">
                                <FaStar className="animate-pulse" />
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-black text-white">4.9</p>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">تقييم الكابتن</p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48 opacity-40"></div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statCards.map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[180px]">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-500 ${stat.textColor}`}>
                                    {stat.icon}
                                </div>
                                <div className="h-2 w-10 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${stat.gradient}`} style={{ width: '70%' }}></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.title}</h3>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-black text-gray-900 tabular-nums">{stat.value}</p>
                                    <span className={`text-[10px] font-black ${stat.textColor} uppercase tracking-tight`}>{stat.suffix}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    {/* Recent Trips Section */}
                    <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary text-xl border border-gray-100">
                                    <FaRoute />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">الرحلات النشطة</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المسارات التي قمت بنشرها</p>
                                </div>
                            </div>
                            <Link href="/driver/trips" className="h-10 w-10 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all">
                                <FaArrowLeft size={16} />
                            </Link>
                        </div>
                        <div className="p-8 flex-1">
                            {trips && trips.length > 0 ? (
                                <div className="space-y-6">
                                    {trips.slice(0, 3).map((trip) => (
                                        <div key={trip.id} className="group p-6 rounded-[2rem] border border-gray-50 hover:bg-gray-50/50 hover:border-primary/20 hover:shadow-xl hover:shadow-gray-100/50 transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center font-black text-gray-900 text-sm">
                                                    <span className="w-2 h-2 bg-primary rounded-full ml-3"></span>
                                                    {trip.from_location}
                                                    <FaArrowRight className="mx-3 text-gray-300 text-[10px] scale-x-[-1]" />
                                                    {trip.to_location}
                                                </div>
                                                <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl border ${trip.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                                    {trip.status === 'active' ? 'نشطة' : 'منتهية'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <span className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                                                        <FaClock className="text-primary/60" />
                                                        {new Date(trip.departure_time).toLocaleDateString('ar-SA')}
                                                    </span>
                                                    <span className="text-sm font-black text-gray-900">
                                                        {trip.price_per_seat.toLocaleString()} <span className="text-xs text-primary">ل.س</span>
                                                    </span>
                                                </div>
                                                <div className="px-3 py-1 bg-white rounded-lg border border-gray-100 text-[10px] font-black text-gray-700">
                                                    {trip.booked_seats}/{trip.available_seats} مقاعد
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 flex flex-col items-center">
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 text-5xl mb-6 shadow-inner">
                                        <FaRoute />
                                    </div>
                                    <h4 className="text-lg font-black text-gray-900 mb-2">لا توجد رحلات نشطة</h4>
                                    <p className="text-gray-400 font-bold text-sm max-w-[240px] leading-relaxed">انشر مسار رحلتك الآن لجذب الركاب وزيادة أرباحك.</p>
                                    <Link href="/driver/trips/create" className="mt-8 px-8 py-4 bg-primary text-gray-900 font-black rounded-2xl shadow-lg hover:bg-yellow-400 transition-all">
                                        إنشاء أول رحلة
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Orders Section */}
                    <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500 text-xl border border-gray-100">
                                    <FaBoxOpen />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">الطلبات الحالية</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">الشحنات قيد التوصيل</p>
                                </div>
                            </div>
                            <Link href="/driver/orders" className="h-10 w-10 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all">
                                <FaArrowLeft size={16} />
                            </Link>
                        </div>
                        <div className="p-8 flex-1">
                            {orders && orders.length > 0 ? (
                                <div className="space-y-6">
                                    {orders.slice(0, 3).map((order) => (
                                        <Link key={order.id} href={route('driver.orders.show', order.id)} className="flex items-center p-6 bg-gray-50/50 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 transition-all border border-transparent hover:border-blue-100 group">
                                            <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-blue-500 shadow-sm ml-5 text-xl group-hover:scale-110 transition-transform">
                                                <FaTruckFast />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h4 className="font-black text-gray-900">طلب #{order.id}</h4>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate max-w-[150px] mt-1">
                                                            {order.delivery_address}
                                                        </p>
                                                    </div>
                                                    <div className="text-left">
                                                        <span className={`block px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-xl mb-2 ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                            {order.status === 'delivered' ? 'مكتمل' : 'نشط'}
                                                        </span>
                                                        <p className="text-sm font-black text-gray-900 tabular-nums">{order.price.toLocaleString()} <span className="text-[10px]">ل.س</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 flex flex-col items-center">
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 text-5xl mb-6 shadow-inner">
                                        <FaBoxOpen />
                                    </div>
                                    <h4 className="text-lg font-black text-gray-900 mb-2">لا توجد طلبات نشطة</h4>
                                    <p className="text-gray-400 font-bold text-sm max-w-[240px] leading-relaxed">اقبل الطلبات المتاحة في السوق لتبدأ رحلة العمل اليوم.</p>
                                    <Link href={route('driver.orders.available')} className="mt-8 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl shadow-lg hover:bg-primary hover:text-gray-900 transition-all">
                                        تصفح السوق
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Promotional / Pro Tip Section */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex items-center gap-8">
                            <div className="hidden sm:flex h-20 w-20 bg-white/10 rounded-[2rem] shadow-inner items-center justify-center text-4xl text-primary border border-white/5 group-hover:rotate-12 transition-transform duration-500">
                                <FaMoneyBillTrendUp />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-2xl font-black text-white">ضاعف أرباحك اليومية 💰</h4>
                                <p className="text-gray-400 font-bold max-w-lg leading-relaxed">كن كابتن متميزاً! تحديث حالات الطلبات باستمرار ونشر رحلات دقيقة يزيد من فرص اختيارك من قبل العملاء.</p>
                            </div>
                        </div>
                        <button className="whitespace-nowrap px-10 py-5 bg-primary text-gray-900 font-black rounded-2xl hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-900/20 transform hover:-translate-y-1 active:scale-95">
                            دليل النجاح ككابتن
                        </button>
                    </div>
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
