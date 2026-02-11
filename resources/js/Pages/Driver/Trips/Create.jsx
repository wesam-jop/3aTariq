import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaRoute, FaLocationDot, FaCalendarDays, FaChair, FaMoneyBillWave, FaAlignRight, FaCircleCheck, FaArrowRight } from "react-icons/fa6";
import toast from 'react-hot-toast';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        from_location: '',
        to_location: '',
        departure_time: '',
        available_seats: 1,
        price_per_seat: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/driver/trips', {
            onSuccess: () => toast.success('تم إنشاء الرحلة ونشرها بنجاح!'),
            onError: () => toast.error('يرجى التحقق من البيانات المدخلة'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="إنشاء رحلة جديدة"
        >
            <Head title="نشر رحلة جديدة" />

            <div className="max-w-4xl mx-auto pb-12 space-y-8">
                {/* Custom Page Header */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                    <Link
                        href="/driver/dashboard"
                        className="h-12 w-12 bg-gray-50 text-gray-500 rounded-2xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all transform hover:rotate-12"
                    >
                        <FaArrowRight size={20} />
                    </Link>
                    <div>
                        <h2 className="text-xl font-black text-gray-900">نشر مسار رحلة</h2>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">أضف رحلتك القادمة لجذب المسافرين</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative">
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-l from-primary to-yellow-300"></div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-12">
                        {/* Section 1: Route */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b-2 border-dashed border-gray-50 pb-4">
                                <label className="text-sm font-black text-gray-900 flex items-center">
                                    <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary ml-3 font-black text-lg">١</span>
                                    تحديد المسار والوجهة
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mr-2">مدينة الانطلاق</label>
                                    <div className="relative group/field">
                                        <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-primary group-focus-within/field:scale-125 transition-transform duration-300">
                                            <FaLocationDot />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.from_location}
                                            onChange={e => setData('from_location', e.target.value)}
                                            placeholder="مثلاً: دمشق"
                                            className={`w-full pr-12 pl-4 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold placeholder:text-gray-400/60 ${errors.from_location ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                        />
                                    </div>
                                    {errors.from_location && <p className="text-red-500 text-[10px] mt-1 font-black leading-none mr-2">{errors.from_location}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mr-2">مدينة الوصول</label>
                                    <div className="relative group/field">
                                        <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-red-500 group-focus-within/field:scale-125 transition-transform duration-300">
                                            <FaLocationDot />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.to_location}
                                            onChange={e => setData('to_location', e.target.value)}
                                            placeholder="مثلاً: حلب أو اللاذقية"
                                            className={`w-full pr-12 pl-4 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold placeholder:text-gray-400/60 ${errors.to_location ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                        />
                                    </div>
                                    {errors.to_location && <p className="text-red-500 text-[10px] mt-1 font-black leading-none mr-2">{errors.to_location}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Time & Pricing */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b-2 border-dashed border-gray-50 pb-4">
                                <label className="text-sm font-black text-gray-900 flex items-center">
                                    <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary ml-3 font-black text-lg">٢</span>
                                    التوقيت والسعة والتكلفة
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mr-2">وقت المغادرة</label>
                                    <div className="relative group/field">
                                        <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-primary group-focus-within/field:scale-125 transition-transform duration-300">
                                            <FaCalendarDays />
                                        </div>
                                        <input
                                            type="datetime-local"
                                            value={data.departure_time}
                                            onChange={e => setData('departure_time', e.target.value)}
                                            className={`w-full pr-12 pl-4 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold ${errors.departure_time ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                        />
                                    </div>
                                    {errors.departure_time && <p className="text-red-500 text-[10px] mt-1 font-black mr-2">{errors.departure_time}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mr-2">عدد المقاعد المتاحة</label>
                                    <div className="relative group/field">
                                        <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-primary group-focus-within/field:scale-125 transition-transform duration-300">
                                            <FaChair />
                                        </div>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.available_seats}
                                            onChange={e => setData('available_seats', e.target.value)}
                                            className={`w-full pr-12 pl-4 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold ${errors.available_seats ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                        />
                                    </div>
                                    {errors.available_seats && <p className="text-red-500 text-[10px] mt-1 font-black mr-2">{errors.available_seats}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mr-2">سعر المقعد الواحد</label>
                                    <div className="relative group/field">
                                        <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-green-500 group-focus-within/field:scale-125 transition-transform duration-300">
                                            <FaMoneyBillWave />
                                        </div>
                                        <input
                                            type="number"
                                            value={data.price_per_seat}
                                            onChange={e => setData('price_per_seat', e.target.value)}
                                            placeholder="0.00"
                                            className={`w-full pr-12 pl-14 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold ${errors.price_per_seat ? 'border-red-400/50 bg-red-50/30' : ''}`}
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-black">ل.س</div>
                                    </div>
                                    {errors.price_per_seat && <p className="text-red-500 text-[10px] mt-1 font-black mr-2">{errors.price_per_seat}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Description */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b-2 border-dashed border-gray-50 pb-4">
                                <label className="text-sm font-black text-gray-900 flex items-center">
                                    <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary ml-3 font-black text-lg">٣</span>
                                    تفاصيل إضافية (اختياري)
                                </label>
                            </div>

                            <div className="px-4">
                                <div className="relative group/field">
                                    <div className="absolute right-0 top-4 w-12 flex items-center justify-center text-gray-300 group-focus-within/field:text-primary transition-colors duration-300">
                                        <FaAlignRight size={18} />
                                    </div>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows="4"
                                        placeholder="اكتب أي ملاحظات للمسافرين (نوع السيارة، شروط معينة، تفاصيل المسار...)"
                                        className="w-full pr-12 pl-4 py-4 bg-gray-50/50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold resize-none leading-relaxed placeholder:text-gray-400/60 shadow-inner"
                                    ></textarea>
                                </div>
                                {errors.description && <p className="text-red-500 text-[10px] mt-1 font-black mr-2">{errors.description}</p>}
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-10 flex flex-col md:flex-row items-center gap-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full md:flex-1 py-6 bg-gray-900 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-gray-200 hover:bg-primary hover:text-gray-900 transition-all transform hover:-translate-y-2 active:scale-95 flex items-center justify-center group disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {processing ? 'جاري النشر...' : 'تأكيد ونشر الرحلة'}
                                <FaCircleCheck className="mr-3 text-2xl group-hover:scale-125 transition-transform" />
                            </button>
                            <Link
                                href="/driver/dashboard"
                                className="w-full md:w-auto px-10 py-6 text-gray-400 font-black text-sm uppercase tracking-widest hover:text-red-500 transition-colors text-center"
                            >
                                إلغاء العملية
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Tip Card Decorative */}
                <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-dashed border-primary/20 flex items-center gap-6">
                    <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center text-primary text-3xl shadow-sm border border-primary/10">
                        <FaRoute />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-black text-gray-900 mb-1">اجذب المزيد من الركاب</h4>
                        <p className="text-xs text-gray-500 font-bold leading-relaxed">كلما كانت تفاصيل رحلتك دقيقة وسعر المقعد منافساً، زادت فرصك في الحصول على حجوزات سريعة.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
