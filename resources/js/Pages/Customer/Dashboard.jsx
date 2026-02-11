import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaBoxOpen, FaTruckFast, FaRoute, FaArrowLeft, FaLocationDot, FaMoneyBillWave, FaClock, FaCalendarCheck } from "react-icons/fa6";

export default function Dashboard({ auth, orders, bookings, availableTrips, stats }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={user}
            header="لوحة التحكم"
        >
            <Head title="لوحة التحكم" />

            <div className="space-y-10 pb-12">
                {/* Welcome & Quick Actions */}
                <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">مرحباً بك، {user.name} 🚀</h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-md">أهلاً بك في "عَ الطريق". تتبع شحناتك، احجز رحلاتك، واستمتع بتجربة نقل ذكية.</p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/customer/orders/create"
                                    className="px-8 py-4 bg-primary text-gray-900 font-bold rounded-2xl shadow-xl hover:bg-yellow-400 transition-all transform hover:-translate-y-1"
                                >
                                    اطلب توصيل الآن
                                </Link>
                                <Link
                                    href="/customer/trips"
                                    className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    تصفح الرحلات
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-end opacity-20 transform rotate-12">
                            <FaBoxOpen className="text-[12rem]" />
                        </div>
                    </div>
                    {/* Abstract Shapes */}
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'طلبات نشطة', value: stats.active_orders, icon: <FaBoxOpen />, color: 'blue' },
                        { label: 'طلبات مكتملة', value: stats.completed_orders, icon: <FaTruckFast />, color: 'green' },
                        { label: 'رحلاتي', value: stats.trips_count, icon: <FaCalendarCheck />, color: 'purple' },
                        { label: 'إجمالي الإنفاق', value: `${stats.total_spent} ل.س`, icon: <FaMoneyBillWave />, color: 'yellow' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">{stat.label}</p>
                                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors">{stat.value}</h3>
                                </div>
                                <div className={`h-12 w-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-xl`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    {/* Recent Activities Split */}
                    <div className="space-y-8">
                        {/* Recent Orders */}
                        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">أحدث الطلبات</h3>
                                <Link href="/customer/orders" className="text-sm text-primary font-bold hover:underline">عرض الكل</Link>
                            </div>
                            <div className="p-8">
                                {orders && orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order.id} className="group p-4 bg-gray-50 rounded-2xl hover:bg-primary transition-all duration-300">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                                            <FaBoxOpen className="text-xl" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 group-hover:text-gray-900">طلب #{order.id}</h4>
                                                            <p className="text-xs text-gray-500 font-medium group-hover:text-gray-800 transition-colors uppercase">{new Date(order.created_at).toLocaleDateString('ar-SA')}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-4 py-1 text-[10px] font-black rounded-full uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {order.status === 'completed' ? 'مكتمل' : order.status === 'pending' ? 'بانتظار سائق' : 'قيد التوصيل'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200 text-3xl">
                                            <FaBoxOpen />
                                        </div>
                                        <p className="text-gray-400 font-bold">لا توجد طلبات بعد</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Bookings */}
                        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">رحلاتي القادمة</h3>
                                <Link href="/customer/trips" className="text-sm text-primary font-bold hover:underline">عرض الكل</Link>
                            </div>
                            <div className="p-8">
                                {bookings && bookings.length > 0 ? (
                                    <div className="space-y-4">
                                        {bookings.map((booking) => (
                                            <div key={booking.id} className="p-4 border border-gray-100 rounded-2xl hover:border-primary/50 transition-all">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                        <FaLocationDot className="text-primary text-xs" />
                                                        {booking.trip?.from_location} ← {booking.trip?.to_location}
                                                    </div>
                                                    <span className="text-xs font-bold text-primary">{booking.seats_booked} مقاعد</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <FaClock /> {new Date(booking.trip?.departure_time).toLocaleString('ar-SA')}
                                                    </div>
                                                    <span className="font-bold">{booking.total_price} ل.س</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200 text-3xl">
                                            <FaRoute />
                                        </div>
                                        <p className="text-gray-400 font-bold">لم تطلب أي رحلة بعد</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Available Trips Spotlight */}
                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">رحلات متاحة الآن ✨</h3>
                            <Link href="/customer/trips" className="text-sm text-primary font-bold hover:underline">المزيد</Link>
                        </div>
                        <div className="p-8 space-y-6 flex-1">
                            {availableTrips && availableTrips.length > 0 ? (
                                availableTrips.map((trip) => (
                                    <div key={trip.id} className="p-6 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-primary/20 group relative overflow-hidden">
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                        <FaRoute className="text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 font-black uppercase mb-1">المسار</p>
                                                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                            {trip.from_location} <FaArrowLeft className="text-[10px] text-gray-300" /> {trip.to_location}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1 text-right">السعر</p>
                                                    <span className="text-lg font-black text-primary">{trip.price_per_seat} ل.س</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                                        <FaBoxOpen className="text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-900 uppercase leading-none">{trip.driver?.name}</p>
                                                        <p className="text-[8px] text-gray-400 mt-1 uppercase">{new Date(trip.departure_time).toLocaleDateString('ar-SA')}</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={`/customer/trips/${trip.id}`}
                                                    className="px-6 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl group-hover:bg-primary group-hover:text-gray-900 transition-all"
                                                >
                                                    حجز المقعد
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center py-20">
                                    <FaRoute className="text-6xl text-gray-100 mb-4" />
                                    <p className="text-gray-400 font-bold">لا توجد رحلات متاحة حالياً</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
