import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaShieldHalved, FaLock, FaUserSecret, FaDatabase, FaCookieBite } from "react-icons/fa6";

export default function PrivacyPolicy() {
    return (
        <GuestLayout>
            <Head title="سياسة الخصوصية" />

            <div className="bg-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-4xl">
                                <FaShieldHalved />
                            </div>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">سياسة الخصوصية</h1>
                        <p className="mt-4 text-xl text-gray-500">
                            خصوصيتك تهمنا. نوضح هنا كيفية جمعنا واستخدامنا لبياناتك الشخصية.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Section 1 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600 text-2xl"><FaDatabase /></div>
                                <h2 className="text-2xl font-bold text-gray-900">1. البيانات التي نجمعها</h2>
                            </div>
                            <div className="text-gray-600 space-y-4 leading-relaxed">
                                <p>نقوم بجمع المعلومات التالية لتقديم خدماتنا بشكل أفضل:</p>
                                <ul className="list-disc list-inside space-y-2 mr-4">
                                    <li><span className="font-bold text-gray-800">بيانات الهوية:</span> الاسم، رقم الهاتف، والبريد الإلكتروني عند التسجيل.</li>
                                    <li><span className="font-bold text-gray-800">بيانات الموقع:</span> نستخدم موقعك الجغرافي لتوجيه السائقين إليك أو تتبع شحنتك.</li>
                                    <li><span className="font-bold text-gray-800">تفاصيل الشحنة:</span> نوع البضاعة، صور الشحنة، والوجهة.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600 text-2xl"><FaUserSecret /></div>
                                <h2 className="text-2xl font-bold text-gray-900">2. كيف نستخدم بياناتك</h2>
                            </div>
                            <div className="text-gray-600 space-y-4 leading-relaxed">
                                <p>نستخدم بياناتك للأغراض التالية:</p>
                                <ul className="list-disc list-inside space-y-2 mr-4">
                                    <li>تسهيل عمليات الحجز والتوصيل بين العميل والسائق.</li>
                                    <li>تحسين جودة خدماتنا وتطوير التطبيق بناءً على تجربة المستخدم.</li>
                                    <li>التواصل معك بخصوص حالة طلبك أو العروض الترويجية.</li>
                                    <li>ضمان أمان الشحنات ومنع العمليات الاحتيالية.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-50 rounded-lg text-red-600 text-2xl"><FaLock /></div>
                                <h2 className="text-2xl font-bold text-gray-900">3. حماية البيانات ومشاركتها</h2>
                            </div>
                            <div className="text-gray-600 space-y-4 leading-relaxed">
                                <p>
                                    نحن نلتزم بحماية بياناتك الشخصية باستخدام أحدث تقنيات التشفير. لا نقوم ببيع بياناتك لأي طرف ثالث.
                                </p>
                                <p>
                                    قد نشارك بعض البيانات الضرورية (مثل الاسم، الموقع، ورقم الهاتف) فقط مع السائق المكلف بتنفيذ طلبك لضمان إتمام الخدمة.
                                </p>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-purple-50 rounded-lg text-purple-600 text-2xl"><FaCookieBite /></div>
                                <h2 className="text-2xl font-bold text-gray-900">4. ملفات تعريف الارتباط (Cookies)</h2>
                            </div>
                            <div className="text-gray-600 space-y-4 leading-relaxed">
                                <p>
                                    نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا، مثل تذكر تفاصيل تسجيل الدخول وتفضيلاتك الشخصية. يمكنك إيقافها من إعدادات المتصفح، ولكن قد يؤثر ذلك على بعض وظائف الموقع.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                            <p className="text-gray-700">
                                إذا كان لديك أي استفسار حول سياسة الخصوصية، يرجى التواصل معنا عبر صفحة <a href="/contact" className="text-primary font-bold hover:underline">اتصل بنا</a>.
                            </p>
                        </div>

                        <p className="text-center text-gray-400 text-sm">
                            آخر تحديث: 10 فبراير 2026
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
