import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';
import { FaMapLocationDot, FaHouse, FaMagnifyingGlass } from 'react-icons/fa6';

export default function Error404() {
    return (
        <GuestLayout>
            <Head title="404 - الصفحة غير موجودة" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary opacity-20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
                                <FaMapLocationDot className="text-6xl text-gray-900" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <h1 className="text-9xl font-extrabold text-gray-200 mb-4">404</h1>

                    {/* Title */}
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        ضعنا بالطريق! 🗺️
                    </h2>

                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        يبدو أن الصفحة اللي بتدور عليها مش موجودة أو تم نقلها.
                        <br />
                        ما تقلق، رح نوصلك للمكان الصح!
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/">
                            <Button size="lg" className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                <FaHouse className="ml-2" />
                                العودة للرئيسية
                            </Button>
                        </Link>
                        <Link href="/services">
                            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
                                <FaMagnifyingGlass className="ml-2" />
                                تصفح الخدمات
                            </Button>
                        </Link>
                    </div>

                    {/* Popular Links */}
                    <div className="mt-12 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
                        <p className="text-gray-700 font-bold mb-4">صفحات قد تهمك:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href="/services" className="text-primary hover:text-yellow-600 font-medium transition-colors">
                                الخدمات
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/about" className="text-primary hover:text-yellow-600 font-medium transition-colors">
                                من نحن
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/contact" className="text-primary hover:text-yellow-600 font-medium transition-colors">
                                تواصل معنا
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/customer/orders/create" className="text-primary hover:text-yellow-600 font-medium transition-colors">
                                احجز الآن
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
