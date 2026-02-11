import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';
import { FaShieldHalved, FaHouse } from 'react-icons/fa6';

export default function Error403() {
    return (
        <GuestLayout>
            <Head title="403 - غير مصرح" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="relative w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                                <FaShieldHalved className="text-6xl text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <h1 className="text-9xl font-extrabold text-gray-200 mb-4">403</h1>

                    {/* Title */}
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        غير مصرح لك بالوصول
                    </h2>

                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        عذراً، ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة.
                        <br />
                        إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع الدعم الفني.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/">
                            <Button size="lg" className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                <FaHouse className="ml-2" />
                                العودة للرئيسية
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
                                تواصل معنا
                            </Button>
                        </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
                        <p className="text-gray-600">
                            <span className="font-bold text-gray-900">نصيحة:</span> تأكد من تسجيل الدخول بالحساب الصحيح الذي يملك الصلاحيات المطلوبة.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
