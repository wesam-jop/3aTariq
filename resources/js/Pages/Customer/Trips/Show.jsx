import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaLocationDot, FaArrowRight, FaTruckFast, FaCalendarDay, FaUsers, FaMoneyBillWave, FaUser, FaPhone, FaCircleInfo, FaShieldHalved } from "react-icons/fa6";
import toast from 'react-hot-toast';

export default function Show({ user, trip }) {
    const { data, setData, post, processing, errors } = useForm({
        seats: 1,
    });

    const handleBooking = (e) => {
        e.preventDefault();
        post(`/customer/trips/${trip.id}/book`, {
            onSuccess: () => toast.success('تم إرسال طلب الحجز بنجاح!'),
        });
    };

    const remainingSeats = trip.available_seats - trip.booked_seats;

    return (
        <AuthenticatedLayout
            user={user}
            header={`تفاصيل الرحلة #${trip.id}`}
        >
            <Head title={`رحلة من ${trip.from_location}`} />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/customer/trips"
                        className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium"
                    >
                        <FaArrowRight className="ml-2" />
                        العودة للرحلات
                    </Link>
                    <div className="flex items-center text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                        <FaShieldHalved className="ml-2" />
                        سائق موثق
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Route Map Card (Visual Representation) */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-900 p-8 text-white relative overflow-hidden">
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center">
                                        <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary text-2xl ml-4">
                                            <FaLocationDot />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-widest">من اين يقلع</p>
                                            <p className="text-2xl font-black">{trip.from_location}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-1 items-center justify-center px-4">
                                        <div className="h-px bg-white/20 flex-1 relative">
                                            <FaTruckFast className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center text-red-500 text-2xl ml-4">
                                            <FaLocationDot />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-widest text-right">وجهته</p>
                                            <p className="text-2xl font-black">{trip.to_location}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            </div>

                            <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-8 text-center bg-gray-50/50">
                                <div className="space-y-1">
                                    <FaCalendarDay className="mx-auto text-primary mb-2" size={20} />
                                    <p className="text-xs text-gray-400 font-bold uppercase">التاريخ والوقت</p>
                                    <p className="text-gray-900 font-bold">{new Date(trip.departure_time).toLocaleString('ar-SA')}</p>
                                </div>
                                <div className="space-y-1 border-x border-gray-100">
                                    <FaUsers className="mx-auto text-primary mb-2" size={20} />
                                    <p className="text-xs text-gray-400 font-bold uppercase">المقاعد المتاحة</p>
                                    <p className="text-gray-900 font-bold">{remainingSeats} / {trip.available_seats}</p>
                                </div>
                                <div className="space-y-1 col-span-2 md:col-span-1">
                                    <FaMoneyBillWave className="mx-auto text-green-500 mb-2" size={20} />
                                    <p className="text-xs text-gray-400 font-bold uppercase">السعر للمقعد</p>
                                    <p className="text-xl font-black text-gray-900">{trip.price_per_seat} <span className="text-sm font-bold text-primary">ل.س</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaCircleInfo className="ml-3 text-primary" />
                                معلومات الرحلة
                            </h3>
                            <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                {trip.description || "لا يوجد وصف إضافي متوفر لهذه الرحلة. يرجى التواصل مع السائق للمزيد من التفاصيل."}
                            </p>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="space-y-6">
                        {/* Booking Card */}
                        <div className="bg-white rounded-3xl shadow-lg border border-primary/20 p-8 sticky top-24">
                            <h3 className="text-2xl font-black text-gray-900 mb-2 text-center">احجز مكانك</h3>
                            <p className="text-gray-500 text-sm text-center mb-8 font-medium">اختر عدد المقاعد المطلوبة</p>

                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">عدد المقاعد</label>
                                    <select
                                        value={data.seats}
                                        onChange={e => setData('seats', parseInt(e.target.value))}
                                        className="w-full bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary py-3 font-bold"
                                    >
                                        {[...Array(remainingSeats > 0 ? remainingSeats : 0)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1} مقعد</option>
                                        ))}
                                    </select>
                                    {remainingSeats <= 0 && <p className="text-red-500 text-xs mt-2 font-bold">عذراً، لا يوجد مقاعد متاحة</p>}
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-50">
                                    <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                                        <span>سعر المقعد</span>
                                        <span>{trip.price_per_seat} ل.س</span>
                                    </div>
                                    <div className="flex justify-between items-center text-lg font-black text-gray-900">
                                        <span>المجموع الكلي</span>
                                        <span className="text-primary">{(trip.price_per_seat * data.seats).toLocaleString()} ل.س</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                disabled={processing || remainingSeats <= 0}
                                className="w-full py-4 bg-primary text-gray-900 font-bold rounded-2xl shadow-xl hover:bg-yellow-400 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:transform-none"
                            >
                                {processing ? 'جاري المعالجة...' : 'تأكيد الحجز الآن'}
                            </button>
                        </div>

                        {/* Driver Card */}
                        <div className="bg-gray-100 rounded-3xl p-6">
                            <h4 className="text-gray-900 font-bold mb-4 flex items-center">
                                <FaUser className="ml-2 text-primary" />
                                عن السائق
                            </h4>
                            <div className="flex items-center mb-6">
                                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary text-xl ml-3">
                                    <FaUser />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{trip.driver?.name || 'سائق ع الطريق'}</p>
                                    <p className="text-gray-400 text-xs">سائق منذ 2024</p>
                                </div>
                            </div>
                            <div className="flex items-center text-sm font-bold text-primary bg-white py-3 px-4 rounded-xl border border-gray-200">
                                <FaPhone className="ml-3" />
                                {trip.driver?.phone || '09xx xxx xxx'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
