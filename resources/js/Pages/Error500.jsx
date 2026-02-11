import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';
import { FaTriangleExclamation, FaHouse, FaArrowRotateRight } from 'react-icons/fa6';

export default function Error500() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <GuestLayout>
            <Head title="500 - خطأ في الخادم" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="relative w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                                <FaTriangleExclamation className="text-6xl text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <h1 className="text-9xl font-extrabold text-gray-200 mb-4">500</h1>

                    {/* Title */}
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        عطل مؤقت في الخادم
                    </h2>

                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        عذراً، حدث خطأ غير متوقع في الخادم.
                        <br />
                        فريقنا التقني تم إشعاره تلقائياً وسيعمل على حل المشكلة في أقرب وقت.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            onClick={handleRefresh}
                            className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            <FaArrowRotateRight className="ml-2" />
                            إعادة المحاولة
                        </Button>
                        <Link href="/">
                            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
                                <FaHouse className="ml-2" />
                                العودة للرئيسية
                            </Button>
                        </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
                        <p className="text-gray-600 mb-3">
                            <span className="font-bold text-gray-900">ماذا يمكنك فعله؟</span>
                        </p>
                        <ul className="text-right text-gray-600 space-y-2 max-w-md mx-auto">
                            <li>• انتظر بضع دقائق ثم أعد المحاولة</li>
                            <li>• تحقق من اتصالك بالإنترنت</li>
                            <li>• إذا استمرت المشكلة، تواصل مع <Link href="/contact" className="text-primary hover:underline font-medium">الدعم الفني</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
