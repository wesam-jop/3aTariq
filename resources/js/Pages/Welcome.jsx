import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            <Head title="عَ الطريق - 3aTariq | منصة التوصيل الذكية" />
            
            {/* Header */}
            <header className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">عَ الطريق</h1>
                                <p className="text-xs text-yellow-400 font-medium">3aTariq</p>
                            </div>
                        </div>
                        
                        <nav className="hidden md:flex space-x-8">
                            <a href="#features" className="text-white/80 hover:text-white transition-colors">المميزات</a>
                            <a href="#download" className="text-white/80 hover:text-white transition-colors">تحميل التطبيق</a>
                            <a href="#contact" className="text-white/80 hover:text-white transition-colors">تواصل معنا</a>
                        </nav>
                        
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                تسجيل الدخول
                            </Link>
                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-semibold"
                            >
                                إنشاء حساب
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
                            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-white/90 text-sm">منصة التوصيل الأكثر تطوراً في المنطقة</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            عَ الطريق
                            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                                3aTariq
                            </span>
                        </h1>
                        
                        <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                            منصة شاملة تربط بين العملاء والسائقين لتقديم تجربة توصيل سريعة وآمنة وموثوقة
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                            >
                                ابدأ الآن مجاناً
                            </Link>
                            <Link
                                href="/login"
                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
                            >
                                تسجيل الدخول
                            </Link>
                        </div>
                        
                        <div className="mt-12 flex justify-center items-center space-x-8 text-white/60">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>توصيل سريع</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>أمان عالي</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>أسعار تنافسية</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            مميزات منصتنا
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto">
                            نقدم حلول متطورة تجعل التوصيل أسهل وأسرع وأكثر أماناً
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">توصيل فوري</h3>
                            <p className="text-white/80 leading-relaxed">
                                نظام توصيل ذكي يربط بين العملاء والسائقين في ثوانٍ معدودة
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">أمان متقدم</h3>
                            <p className="text-white/80 leading-relaxed">
                                نظام حماية متطور مع تتبع الموقع المباشر وضمانات الأمان
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">أسعار تنافسية</h3>
                            <p className="text-white/80 leading-relaxed">
                                أسعار شفافة ومنافسة مع خيارات دفع متعددة وخصومات حصرية
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">تتبع مباشر</h3>
                            <p className="text-white/80 leading-relaxed">
                                تتبع طلبك في الوقت الفعلي مع تحديثات فورية عن حالة التوصيل
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">دعم فني 24/7</h3>
                            <p className="text-white/80 leading-relaxed">
                                فريق دعم فني متاح على مدار الساعة لمساعدتك في أي وقت
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">تقارير ذكية</h3>
                            <p className="text-white/80 leading-relaxed">
                                تقارير مفصلة وإحصائيات ذكية لمساعدتك في اتخاذ قرارات أفضل
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section id="download" className="py-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            حمل التطبيق الآن
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto">
                            احصل على تجربة أفضل مع تطبيقنا المحمول المتاح على جميع المنصات
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">واجهة سهلة الاستخدام</h3>
                                        <p className="text-white/80">تصميم بديهي يجعل الطلب والتتبع أمراً سهلاً</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">إشعارات فورية</h3>
                                        <p className="text-white/80">تحديثات فورية عن حالة طلبك في الوقت الفعلي</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">دفع آمن</h3>
                                        <p className="text-white/80">خيارات دفع متعددة مع أعلى معايير الأمان</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">تطبيق التوصيل</h3>
                                <p className="text-white/80 mb-6">متاح على جميع المنصات</p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>App Store</span>
                                    </button>
                                    <button className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Google Play</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-black/50 backdrop-blur-sm border-t border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">عَ الطريق</h3>
                                    <p className="text-xs text-yellow-400 font-medium">3aTariq</p>
                                </div>
                            </div>
                            <p className="text-white/80 mb-6 max-w-md">
                                منصة التوصيل الأكثر تطوراً في المنطقة، نربط بين العملاء والسائقين لتقديم تجربة توصيل استثنائية.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">روابط سريعة</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="text-white/80 hover:text-white transition-colors">المميزات</a></li>
                                <li><a href="#download" className="text-white/80 hover:text-white transition-colors">تحميل التطبيق</a></li>
                                <li><Link href="/login" className="text-white/80 hover:text-white transition-colors">تسجيل الدخول</Link></li>
                                <li><Link href="/register" className="text-white/80 hover:text-white transition-colors">إنشاء حساب</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">تواصل معنا</h4>
                            <ul className="space-y-2">
                                <li className="text-white/80">البريد الإلكتروني: info@delivery-app.com</li>
                                <li className="text-white/80">الهاتف: +966 50 123 4567</li>
                                <li className="text-white/80">العنوان: الرياض، المملكة العربية السعودية</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/20 mt-12 pt-8 text-center">
                        <p className="text-white/60">
                            © 2024 تطبيق التوصيل. جميع الحقوق محفوظة.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
