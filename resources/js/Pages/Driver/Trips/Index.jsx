import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaPlus, FaRoute, FaLocationDot, FaArrowLeft, FaClockRotateLeft, FaCircleCheck, FaPenToSquare, FaEye, FaUsers, FaCalendarCheck } from "react-icons/fa6";
import Pagination from '@/Components/Pagination';

export default function Index({ auth, trips }) {
    const { props } = usePage();

    const totalTrips = trips.total || 0;
    const activeTrips = trips.data?.filter(t => t.status === 'active').length || 0;

    const getStatusStyle = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700 border-green-200';
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active': return 'نشطة';
            case 'completed': return 'مكتملة';
            case 'cancelled': return 'ملغاة';
            default: return status;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="إدارة رحلاتي"
        >
            <Head title="رحلاتي" />

            <div className="max-w-7xl mx-auto pb-12 space-y-8">
                {/* Stats Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl group flex flex-col justify-between min-h-[160px]">
                        <div className="relative z-10">
                            <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">إجمالي الرحلات</p>
                            <h3 className="text-4xl font-black">{totalTrips}</h3>
                        </div>
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                        <FaRoute className="absolute bottom-8 left-8 text-5xl text-white/5 group-hover:scale-125 transition-transform duration-500" />
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden group flex flex-col justify-between min-h-[160px]">
                        <div className="relative z-10">
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 text-right">الرحلات النشطة</p>
                            <h3 className="text-4xl font-black text-gray-900 text-right">{activeTrips}</h3>
                        </div>
                        <FaCalendarCheck className="absolute bottom-8 right-8 text-5xl text-primary/10 group-hover:rotate-12 transition-transform duration-500" />
                    </div>

                    <div className="bg-primary rounded-[2.5rem] p-8 text-gray-900 shadow-xl shadow-yellow-100/50 flex flex-col justify-center items-center text-center group active:scale-95 transition-all">
                        <Link href="/driver/trips/create" className="w-full h-full flex flex-col items-center justify-center gap-2">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 text-2xl shadow-sm mb-1 group-hover:scale-110 transition-transform">
                                <FaPlus />
                            </div>
                            <span className="font-black text-lg">إنشاء رحلة جديدة</span>
                        </Link>
                    </div>
                </div>

                {/* Content Header */}
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gray-900 rounded-full"></span>
                        قائمة الرحلات المنشورة
                    </h2>
                </div>

                {/* Trips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trips.data && trips.data.length > 0 ? (
                        trips.data.map((trip) => (
                            <div key={trip.id} className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full hover:-translate-y-2">
                                {/* Card Header */}
                                <div className="p-8 border-b border-gray-50 flex justify-between items-start bg-gray-50/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary text-xl border border-gray-100 group-hover:rotate-12 transition-transform">
                                            <FaRoute />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">معرف الرحلة</span>
                                            <span className="text-sm font-black text-gray-900">#TRP-{trip.id}</span>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${getStatusStyle(trip.status)}`}>
                                        {getStatusText(trip.status)}
                                    </span>
                                </div>

                                {/* Route Visualization */}
                                <div className="p-8 flex-1 space-y-6">
                                    <div className="relative">
                                        {/* Connecting Line */}
                                        <div className="absolute top-2 bottom-2 right-2.5 w-0.5 border-r-2 border-dashed border-gray-100"></div>

                                        <div className="relative pr-8 mb-6">
                                            <div className="absolute right-0 top-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            </div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">المنطلق</label>
                                            <p className="text-sm font-black text-gray-900">{trip.from_location}</p>
                                        </div>

                                        <div className="relative pr-8">
                                            <div className="absolute right-0 top-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                                                <FaLocationDot className="text-red-500 text-[10px]" />
                                            </div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">الوجهة</label>
                                            <p className="text-sm font-black text-gray-900">{trip.to_location}</p>
                                        </div>
                                    </div>

                                    {/* Trip Meta */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                        <div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">وقت الرحلة</span>
                                            <p className="text-xs font-bold text-gray-600 flex items-center gap-2">
                                                <FaClockRotateLeft className="text-primary" />
                                                {new Date(trip.departure_time).toLocaleDateString('ar-SA')}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1 text-left">التكلفة</span>
                                            <p className="text-sm font-black text-gray-900 text-left">{trip.price_per_seat.toLocaleString()} <span className="text-[10px] text-primary">ل.س</span></p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FaUsers className="text-gray-400" />
                                            <span className="text-xs font-black text-gray-900">{trip.booked_seats} من {trip.available_seats} محجوز</span>
                                        </div>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary"
                                                style={{ width: `${(trip.booked_seats / trip.available_seats) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="p-6 bg-gray-50/50 flex gap-3">
                                    <Link
                                        href={`/driver/trips/${trip.id}/edit`}
                                        className="flex-1 h-14 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-gray-900 transition-all shadow-lg active:scale-95"
                                    >
                                        <FaPenToSquare />
                                        تعديل
                                    </Link>
                                    <Link
                                        href={`/driver/trips/${trip.id}`}
                                        className="w-14 h-14 bg-white border border-gray-200 text-gray-400 rounded-2xl flex items-center justify-center hover:text-primary hover:border-primary transition-all shadow-sm"
                                    >
                                        <FaEye size={20} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 text-5xl mb-8 shadow-inner">
                                <FaRoute />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3">سجلك خالي من الرحلات</h3>
                            <p className="text-gray-500 font-bold mb-10 max-w-sm text-center leading-relaxed">ابدأ بنشر رحلتك الأولى اليوم واستقطب المسافرين للانضمام إليك برحلة آمنة ومربحة.</p>
                            <Link
                                href="/driver/trips/create"
                                className="px-12 py-5 bg-primary text-gray-900 font-black rounded-2xl shadow-xl shadow-yellow-100 hover:bg-yellow-400 transition-all transform hover:-translate-y-1"
                            >
                                <FaPlus className="ml-3 text-xl" />
                                انشر رحلتك الأولى الآن
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {trips.links && trips.links.length > 3 && (
                    <div className="mt-12 flex justify-center pb-8">
                        <Pagination links={trips.links} />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
