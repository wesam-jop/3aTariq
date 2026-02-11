import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { FaMobileScreenButton, FaLock, FaArrowRight, FaUserShield } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        identifier: '',
        password: '',
        remember: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login', {
            onError: () => toast.error('بيانات الدخول غير صحيحة'),
        });
    };

    return (
        <div className="min-h-screen flex bg-gray-50" dir="rtl">
            <Head title="تسجيل دخول المشرفين" />
            <Toaster position="top-center" />

            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-[600px] z-10 bg-white">
                <div className="mx-auto w-full max-w-sm lg:w-[400px]">
                    <div className="text-center">
                        <Link href="/" className="inline-block mb-10">
                            <ApplicationLogo className="h-14 w-auto text-primary mx-auto" />
                        </Link>

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border-4 border-gray-50 shadow-xl">
                            <FaUserShield className="text-primary" />
                            بوابة الإدارة المركزية
                        </div>

                        <h2 className="text-4xl font-black text-gray-900 mb-3">تسجيل الدخول</h2>
                        <p className="text-sm text-gray-500 font-bold mb-10">أدخل رقم الهاتف وكلمة المرور للوصول إلى لوحة التحكم</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">رقم الهاتف</label>
                            <div className="relative group">
                                <FaMobileScreenButton className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="tel"
                                    value={data.identifier}
                                    onChange={e => setData('identifier', e.target.value)}
                                    className="w-full bg-gray-50 border-0 rounded-[1.25rem] py-5 pr-14 pl-6 focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-black text-sm text-center tabular-nums"
                                    placeholder="09xxxxxxxx"
                                    dir="ltr"
                                />
                            </div>
                            {errors.identifier && <p className="text-red-500 text-[10px] font-bold px-4">{errors.identifier}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">كلمة المرور</label>
                            <div className="relative group">
                                <FaLock className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-gray-50 border-0 rounded-[1.25rem] py-5 pr-14 pl-6 focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-black text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-[10px] font-bold px-4">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-5 w-5 rounded-lg border-gray-300 text-primary focus:ring-primary transition-all cursor-pointer"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                />
                                <label htmlFor="remember" className="mr-3 block text-xs font-black text-gray-500 cursor-pointer">
                                    تذكرني دائماً
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-16 bg-gray-900 text-white rounded-[1.5rem] font-black text-sm flex items-center justify-center gap-3 hover:bg-primary hover:text-gray-900 transition-all shadow-2xl shadow-gray-200 active:scale-95 disabled:opacity-50 group mt-10"
                        >
                            دخول آمن للوحة التحكم
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-50 text-center">
                        <p className="text-xs font-bold text-gray-400">
                            هذه المنطقة مخصصة لإدارة النظام فقط. <br />
                            <Link href="/login" className="text-primary hover:underline mt-2 inline-block">تسجيل دخول المستخدمين</Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-0 flex-1 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-gray-900/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,193,7,0.1),transparent_70%)] opacity-50"></div>
                <img
                    className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                    alt="Data analysis"
                />

                <div className="absolute inset-0 flex items-center justify-center z-20 p-20">
                    <div className="max-w-2xl text-center">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-primary text-5xl mx-auto mb-10 shadow-2xl border border-white/10">
                            <FaUserShield />
                        </div>
                        <h2 className="text-6xl font-black text-white mb-8 leading-tight">
                            القوة والمرونة <br />
                            <span className="text-primary italic">في الإدارة</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed">
                            نظام عَ الطريق يمنحك جميع الأدوات اللازمة لمراقبة الرحلات، إدارة الطلبات، وضمان سير العمل بدقة متناهية.
                        </p>
                    </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute bottom-10 left-10 flex gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/20"></div>)}
                </div>
            </div>
        </div>
    );
}
