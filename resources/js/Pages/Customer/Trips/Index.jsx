import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaLocationDot, FaArrowLeft, FaTruckFast, FaCalendarDay, FaUsers, FaMagnifyingGlass, FaArrowRightLong } from "react-icons/fa6";
import Pagination from '@/Components/Pagination';


export default function Index({ user, trips }) {
    return (
        <AuthenticatedLayout
            user={user}
            header="الرحلات المتاحة"
        >
            <Head title="الرحلات" />

            <div className="space-y-8 pb-12">
                {/* Search & Filter Bar */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h2 className="text-xl font-black text-gray-900 mb-6">ابحث عن رحلتك القادمة</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <FaMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="مدينة الاستلام"
                                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                                />
                            </div>
                            <div className="relative">
                                <FaLocationDot className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
                                <input
                                    type="text"
                                    placeholder="وجهة الوصول"
                                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                                />
                            </div>
                            <button className="bg-gray-900 text-white font-black py-4 px-8 rounded-2xl hover:bg-primary hover:text-gray-900 transition-all duration-300 shadow-xl shadow-gray-100 flex items-center justify-center">
                                تصفية النتائج
                            </button>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
                </div>

                {/* Trips Grid */}
                {trips.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.data.map((trip) => (
                            <div key={trip.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-yellow-100/30 transition-all duration-500 group flex flex-col h-full border-b-4 border-b-transparent hover:border-b-primary transform hover:-translate-y-2">
                                {/* Route Header */}
                                <div className="p-8 bg-gradient-to-l from-gray-50 to-white border-b border-gray-50 relative overflow-hidden">
                                    <div className="relative z-10 flex justify-between items-start mb-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-primary font-black uppercase tracking-widest mb-2">رحلة نشطة</span>
                                            <div className="flex items-center text-xl font-black text-gray-900">
                                                {trip.from_location}
                                                <FaArrowLeft className="mx-3 text-gray-300 text-sm group-hover:text-primary transition-colors duration-300" />
                                                {trip.to_location}
                                            </div>
                                        </div>
                                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-black text-[10px] uppercase">
                                            متاح
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex items-center text-gray-400 text-xs font-bold gap-6">
                                        <div className="flex items-center">
                                            <FaCalendarDay className="ml-2 text-primary" />
                                            {new Date(trip.departure_time).toLocaleDateString('ar-SA')}
                                        </div>
                                        <div className="flex items-center">
                                            <FaUsers className="ml-2 text-primary" />
                                            {trip.available_seats - trip.booked_seats} شاغر
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
                                </div>

                                {/* Body */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 mb-8 flex-1">
                                        <p className="text-gray-600 text-sm italic line-clamp-2 leading-relaxed">
                                            {trip.description || "لا يوجد وصف إضافي لهذه الرحلة. تواصل مع السائق للمزيد."}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 ml-4 shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                                                <FaTruckFast size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">السائق</p>
                                                <p className="text-sm font-black text-gray-900 truncate max-w-[120px]">{trip.driver?.name || 'سائق عَ الطريق'}</p>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">للمقعد</p>
                                            <p className="text-2xl font-black text-gray-900">{trip.price_per_seat} <span className="text-xs text-primary">ل.س</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-8 pt-0 mt-auto">
                                    <Link
                                        href={`/customer/trips/${trip.id}`}
                                        className="inline-flex items-center justify-center w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-primary hover:text-gray-900 transition-all duration-300 shadow-lg group-hover:shadow-primary/20"
                                    >
                                        احجز مكانك الآن
                                        <FaArrowRightLong className="mr-3 text-lg" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] p-24 text-center border border-gray-100 shadow-sm">
                        <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200 text-6xl shadow-inner">
                            <FaTruckFast />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-3">لا توجد رحلات متاحة</h3>
                        <p className="text-gray-500 max-w-sm mx-auto font-medium mb-0">نعتذر، لا توجد رحلات نشطة في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقاً.</p>
                    </div>
                )}

                {/* Pagination */}
                {trips.links && trips.links.length > 3 && (
                    <Pagination links={trips.links} />
                )}

            </div>
        </AuthenticatedLayout>
    );
}
