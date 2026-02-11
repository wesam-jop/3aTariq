import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';
import { FaWrench, FaHouse, FaArrowRotateRight } from 'react-icons/fa6';

export default function Error503() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <GuestLayout>
            <Head title="503 - الخدمة غير متاحة" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                                <FaWrench className="text-6xl text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <h1 className="text-9xl font-extrabold text-gray-200 mb-4">503</h1>

                    {/* Title */}
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        صيانة مؤقتة
                    </h2>

                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        نحن نعمل على تحسين خدماتنا لتقديم تجربة أفضل لك.
                        <br />
                        الموقع سيعود للعمل قريباً، شكراً لصبرك!
                    </p>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-primary to-yellow-400 h-3 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">جاري العمل على التحديثات...</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            onClick={handleRefresh}
                            className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            <FaArrowRotateRight className="ml-2" />
                            تحديث الصفحة
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
                            <span className="font-bold text-gray-900">💡 هل تعلم؟</span>
                        </p>
                        <p className="text-gray-600">
                            نحن نعمل باستمرار على تطوير المنصة لتوفير أفضل تجربة نقل ركاب وبضائع في سوريا.
                            تابعنا على وسائل التواصل الاجتماعي لمعرفة آخر التحديثات!
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
