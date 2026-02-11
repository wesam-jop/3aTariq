import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';
import { FaFileContract, FaUserCheck, FaTruckFast, FaCircleExclamation } from "react-icons/fa6";

export default function Terms() {
    return (
        <GuestLayout>
            <Head title="شروط التسجيل والاستخدام" />

            <div className="bg-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl">
                                <FaFileContract />
                            </div>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">شروط التسجيل والاستخدام</h1>
                        <p className="mt-4 text-xl text-gray-500">
                            يرجى قراءة الشروط والأحكام التالية بعناية لضمان حقوقك وحقوق الآخرين.
                        </p>
                    </div>

                    {/* Driver Terms */}
                    <div className="mb-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gray-900 p-6 flex items-center gap-4">
                            <FaTruckFast className="text-primary text-3xl" />
                            <h2 className="text-2xl font-bold text-white">شروط التسجيل للسائقين (الكباتن)</h2>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <FaCircleExclamation className="text-primary mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">يجب أن يمتلك السائق رخصة قيادة سارية المفعول ونوعها متناسب مع المركبة.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCircleExclamation className="text-primary mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">أن تكون استمارة المركبة سارية، والمركبة بحالة فنية ممتازة وجاهزة للنقل.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCircleExclamation className="text-primary mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">خلو السجل الجنائي للسائق من أي سوابق مخلة بالشرف أو الأمانة.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCircleExclamation className="text-primary mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">الالتزام بالمواعيد المحددة مع العميل والمحافظة على سلامة الشحنة.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCircleExclamation className="text-primary mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">دفع الرسوم المستحقة للمنصة (إن وجدت) في المواعيد المحددة.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Customer Terms */}
                    <div className="mb-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 p-6 flex items-center gap-4 border-b">
                            <FaUserCheck className="text-gray-900 text-3xl" />
                            <h2 className="text-2xl font-bold text-gray-900">شروط الاستخدام للعملاء</h2>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="text-gray-700">الإفصاح الدقيق عن نوع وحجم ومحتويات الشحنة.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="text-gray-700">عدم شحن أي مواد ممنوعة قانونياً أو خطرة (مواد قابلة للاشتعال، أسلحة، مخدرات، إلخ).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="text-gray-700">الالتزام بدفع المبلغ المتفق عليه عند إتمام الخدمة.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="text-gray-700">التعامل باحترام مع السائقين وموظفي خدمة العملاء.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-12 bg-yellow-50 rounded-2xl p-8 border border-primary/20">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">موافق على الشروط؟</h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            انضم إلينا الآن وابدأ رحلتك مع "عَ الطريق". التسجيل مفتوح للعملاء والسائقين.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/register">
                                <Button size="lg" className="px-12 py-4">سجل الآن</Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" size="lg" className="px-12 py-4 bg-white">العودة للرئيسية</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
