import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import OtpInput from 'react-otp-input';
import toast, { Toaster } from 'react-hot-toast';
import { FaMobileScreenButton } from "react-icons/fa6";

export default function Login() {
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const sendOtp = async (e) => {
        e.preventDefault();
        if (!phone.trim()) {
            toast.error('يرجى إدخال رقم الهاتف');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/send-login-otp', { phone });

            if (response.data.success) {
                toast.success('تم إرسال رمز التحقق بنجاح');
                setStep('otp');
            } else {
                toast.error(response.data.message || 'Error sending OTP');
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                toast.error(error.response.data.message);
            } else {
                toast.error('حدث خطأ في الاتصال');
            }
        }
        setLoading(false);
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length < 6) {
            toast.error('يرجى إدخال رمز التحقق كاملاً');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/verify-login-otp', {
                phone,
                otp,
            });

            if (response.data.success) {
                toast.success('تم تسجيل الدخول بنجاح');
                window.location.href = '/dashboard';
            } else {
                toast.error(response.data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'حدث خطأ في الاتصال');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-white" dir="rtl">
            <Head title="تسجيل الدخول" />
            <Toaster position="top-center" reverseOrder={false} />

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-[500px] z-10 bg-white shadow-2xl">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center">
                        <Link href="/" className="inline-block mb-10">
                            <ApplicationLogo className="h-16 w-auto text-primary mx-auto" />
                        </Link>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                            {step === 'phone' ? 'مرحباً بعودتك' : 'التحقق من الدخول'}
                        </h2>
                        <p className="text-sm text-gray-600 mb-8">
                            {step === 'phone'
                                ? 'سجل دخولك الآن لمتابعة شحناتك وإدارة طلباتك'
                                : `أدخل رمز التحقق المرسل إلى ${phone}`
                            }
                        </p>
                    </div>

                    <div className="mt-8">
                        {step === 'phone' ? (
                            <form onSubmit={sendOtp} className="space-y-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        رقم الهاتف
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-400 sm:text-sm"><FaMobileScreenButton /></span>
                                        </div>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            required
                                            className="block w-full pl-10 text-right h-12 border-gray-300 focus:border-primary focus:ring-primary rounded-xl"
                                            placeholder="05xxxxxxxx"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {loading ? 'جاري الإرسال...' : 'متابعة'}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={verifyOtp} className="space-y-8">
                                <div className="flex justify-center" dir="ltr">
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span className="mx-1 sm:mx-2"></span>}
                                        renderInput={(props) => <input {...props} />}
                                        inputType="tel"
                                        shouldAutoFocus
                                        inputStyle={{
                                            width: '3rem',
                                            height: '3.5rem',
                                            margin: '0',
                                            fontSize: '1.5rem',
                                            borderRadius: '0.75rem',
                                            border: '2px solid #e5e7eb',
                                            outline: 'none',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: '#1f2937',
                                            backgroundColor: '#f9fafb',
                                            transition: 'all 0.2s',
                                        }}
                                        focusStyle={{
                                            borderColor: '#FFC107',
                                            boxShadow: '0 0 0 4px rgba(255, 193, 7, 0.1)',
                                            backgroundColor: '#ffffff',
                                        }}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading || otp.length < 6}
                                    className="w-full flex justify-center py-3 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {loading ? 'جاري التحقق...' : 'تأكيد الدخول'}
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setStep('phone')}
                                        className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                                    >
                                        تغيير رقم الهاتف
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-10 relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    ليس لديك حساب؟
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                href="/register"
                                className="font-bold text-primary hover:text-yellow-500 transition-colors"
                            >
                                سجل الآن مجاناً
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left Side - Image/Background */}
            <div className="hidden lg:block relative w-0 flex-1 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-gray-900/90 z-10 mix-blend-multiply"></div>
                <img
                    className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                    alt="Logistics background"
                />
                <div className="absolute z-20 bottom-20 right-20 text-white max-w-lg">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight">
                        شحناتك.. <br />
                        <span className="text-primary">بأمان وسرعة</span>
                    </h2>
                    <p className="text-xl text-gray-300">
                        انضم لآلاف العملاء والسائقين في المنصة الأحدث للخدمات اللوجستية في المملكة.
                    </p>
                </div>
            </div>
        </div>
    );
}
