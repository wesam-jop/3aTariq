import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';
import { useEffect, useRef, useState } from 'react';
import { FaTruckFast, FaBoxesPacking, FaRoute, FaQuoteRight, FaGooglePlay, FaAppStore, FaShieldHalved, FaMapLocationDot, FaHandHoldingDollar, FaHeadset, FaUserGroup } from "react-icons/fa6";
import { HiCheckCircle, HiCurrencyDollar, HiCube, HiLocationMarker, HiStar } from "react-icons/hi";

// Simple FadeIn Component for Scroll Animations
const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        });
        const { current } = domRef;
        if (current) observer.observe(current);
        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    const translateClass = direction === 'up' ? 'translate-y-10' : direction === 'left' ? '-translate-x-10' : 'translate-x-10';

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${translateClass}`}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default function Welcome({ auth, stats }) {
    return (
        <GuestLayout>
            <Head title="الرئيسية" />

            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden h-screen flex items-center pt-20">
                <div className="absolute inset-0 z-0 select-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-white/40 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                        alt="Transportation Services"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
                    <FadeIn delay={200}>
                        <div className="lg:w-2/3">
                            <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl mb-6 leading-tight">
                                <span className="block text-gray-300">رحلتك وشحنتك بأمان..</span>
                                <span className="block text-primary">وين ما كانت!</span>
                            </h1>
                            <p className="mt-4 text-xl text-gray-300 sm:mt-5 sm:max-w-xl md:mt-5 lg:text-2xl font-medium">
                                من رحلة قصيرة لنقلة كبيرة، "عَ الطريق" بيوصلك ويوصل بضائعك بأمان في كل سوريا.
                            </p>
                            <div className="mt-8 sm:mt-10 sm:flex gap-4">
                                <Link href="/customer/orders/create">
                                    <Button size="lg" className="w-full sm:w-auto px-10 py-4 text-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:bg-yellow-400">
                                        احجز الآن
                                    </Button>
                                </Link>
                                <Link href="/services">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-4 text-xl border-2 bg-white/80 hover:bg-white hover:border-primary hover:text-primary">
                                        خدماتنا
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Partners/Clients Marquee */}
            {/* <div className="bg-gray-50 py-8 overflow-hidden border-b border-gray-200">
                <p className="text-center text-gray-400 font-medium mb-6 text-sm tracking-wider uppercase">شركاء النجاح</p>
                <div className="relative flex overflow-x-hidden group">
                    <div className="py-2 animate-marquee whitespace-nowrap flex items-center gap-16 px-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <span key={i} className="text-2xl font-bold text-gray-300 mx-4 flex items-center gap-2">
                                <FaTruckFast className="text-gray-200" /> PARTNER {i}
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex items-center gap-16 px-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <span key={`dup-${i}`} className="text-2xl font-bold text-gray-300 mx-4 flex items-center gap-2">
                                <FaTruckFast className="text-gray-200" /> PARTNER {i}
                            </span>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* Service Comparison: Single Parcel vs Full Truck */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-base text-primary font-bold tracking-wide uppercase">خدماتنا المتكاملة</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                نقل ركاب وبضائع بكل أمان
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Option 1: Internal Passenger */}
                        <FadeIn direction="up" delay={0}>
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl overflow-hidden shadow-xl border-2 border-blue-100 hover:border-blue-400 transition-all duration-300 relative group">
                                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">الأكثر طلباً</div>
                                <div className="p-8 text-center">
                                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center text-5xl text-blue-500 shadow-md mb-6 group-hover:scale-110 transition-transform">
                                        <FaUserGroup />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">نقل ركاب داخلي</h3>
                                    <p className="text-gray-500 mb-6">رحلات مريحة داخل المدينة</p>
                                    <ul className="text-right space-y-3 mb-8 text-gray-600">
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-green-500 text-xl" /> رحلات سريعة ومريحة.</li>
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-green-500 text-xl" /> سائقين محترفين وموثوقين.</li>
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-green-500 text-xl" /> أسعار مناسبة للجميع.</li>
                                    </ul>
                                    <Link href="/customer/orders/create?type=internal-passenger">
                                        <Button className="w-full justify-center bg-blue-500 hover:bg-blue-600">احجز رحلة</Button>
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Option 2: Single Parcel */}
                        <FadeIn direction="up" delay={100}>
                            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-primary/10 hover:border-primary transition-all duration-300 relative group">
                                <div className="absolute top-0 right-0 bg-primary text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">الخيار الاقتصادي</div>
                                <div className="p-8 text-center bg-gradient-to-b from-yellow-50 to-white">
                                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center text-5xl text-primary shadow-md mb-6 group-hover:scale-110 transition-transform">
                                        <HiCube />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">شحن طرد واحد</h3>
                                    <p className="text-gray-500 mb-6">عندك غرض صغير وبدك توفّر؟</p>
                                    <ul className="text-right space-y-3 mb-8 text-gray-600">
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-green-500 text-xl" /> سعر رمزي وموفر جداً.</li>
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-green-500 text-xl" /> مشاركة مساحة بسيارة مسافرة.</li>
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-green-500 text-xl" /> مثالي للكراتين، الهدايا، والأجهزة.</li>
                                    </ul>
                                    <Link href="/customer/orders/create?type=parcel">
                                        <Button className="w-full justify-center">أرسل طرد</Button>
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Option 3: Full Truck */}
                        <FadeIn direction="up" delay={200}>
                            <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 relative">
                                <div className="p-8 text-center text-white">
                                    <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-5xl text-white shadow-inner mb-6">
                                        <FaTruckFast />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">حجز سيارة كاملة</h3>
                                    <p className="text-gray-400 mb-6">نقل عفش أو بضاعة تجارية؟</p>
                                    <ul className="text-right space-y-3 mb-8 text-gray-300">
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-primary text-xl" /> السيارة بالكامل تحت تصرفك.</li>
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-primary text-xl" /> تحميل مباشر لوجهتك.</li>
                                        <li className="flex items-center gap-2"><HiCheckCircle className="text-primary text-xl" /> خيارات متعددة: وكيا، وسوزوكي، وانتر.</li>
                                    </ul>
                                    <Link href="/services">
                                        <Button variant="outline" className="w-full justify-center border-white text-white hover:bg-white hover:text-gray-900">احجز سيارة</Button>
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Safety & Trust Section (New) */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <FadeIn direction="right">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                                    ليش تطمن مع "عَ الطريق"؟
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    نحنا بنعرف إنو بضائعك غالية عليك، لهيك عملنا نظام أمان متكامل بيضمن حقك وحق السائق.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-2xl">
                                            <FaShieldHalved />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">سائقين موثوقين</h3>
                                            <p className="text-gray-500">كل السائقين عنا مسجلين بهوياتهم وأوراق سياراتهم النظامية.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-2xl">
                                            <FaMapLocationDot />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">تتبع مباشر</h3>
                                            <p className="text-gray-500">خليك عارف وين صارت شحنتك بأي لحظة من موبايلك.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-2xl">
                                            <FaHandHoldingDollar />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">ضمان التعويض</h3>
                                            <p className="text-gray-500">لا سمح الله صار شي؟ نحن بنضمنلك حقك بالكامل.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                        <div className="mt-12 lg:mt-0 relative">
                            <FadeIn direction="left">
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary opacity-20 rounded-full blur-3xl"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1351&q=80"
                                    className="relative rounded-3xl shadow-2xl z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500"
                                    alt="Trust and Safety"
                                />
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coverage Areas (New) */}
            <div className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-extrabold mb-8">وين بنوصل؟</h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
                            شبكتنا بتغطي أهم المحافظات والطرق الرئيسية في سوريا. وين ما كنت، سياراتنا حدك.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                'دمشق',
                                'ريف دمشق',
                                'حلب',
                                'حمص',
                                'حماة',
                                'اللاذقية',
                                'طرطوس',
                                'إدلب',
                                'دير الزور',
                                'الرقة',
                                'الحسكة',
                                'درعا',
                                'السويداء',
                                'القنيطرة'
                            ].map((city, i) => (
                                <span
                                    key={i}
                                    className="px-6 py-3 bg-gray-800 rounded-full border border-gray-700 hover:border-primary hover:text-primary transition-colors cursor-default text-lg font-medium"
                                >
                                    {city}
                                </span>
                            ))}
                        </div>

                    </FadeIn>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-primary py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
                        {[
                            { label: 'شحنة منقولة', value: stats?.orders || '+15K', icon: <HiCube /> },
                            { label: 'كابتن مسجل', value: stats?.drivers || '+800', icon: <FaTruckFast /> },
                            { label: 'مدينة', value: stats?.cities || '14', icon: <HiLocationMarker /> },
                            { label: 'تقييم 5 نجوم', value: stats?.rating || '98%', icon: <HiStar /> },
                        ].map((stat, i) => (
                            <FadeIn key={i} delay={i * 100}>
                                <div className="flex flex-col items-center">
                                    <div className="text-4xl mb-2 text-gray-900 opacity-80">{stat.icon}</div>
                                    <div className="text-4xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-gray-800 font-bold">{stat.label}</div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>

            {/* Driver Recruitment CTA (New) */}
            <div className="relative py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl lg:grid lg:grid-cols-2">
                        <div className="p-10 sm:p-16 flex flex-col justify-center">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
                                عندك سيارة شحن؟ <br />
                                <span className="text-primary">زيد دخلك معنا!</span>
                            </h2>
                            <p className="text-lg text-gray-300 mb-8">
                                انضم لأكبر شبكة سائقين في سوريا. حمل التطبيق، سجل سيارتك، وبلش استقبل طلبات فوراً بدون عمولات مخفية.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/register">
                                    <Button className="justify-center text-lg py-3 px-8">سجل كسائق</Button>
                                </Link>
                                <Link href="/terms">
                                    <Button variant="outline" className="justify-center text-lg py-3 px-8 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">شروط التسجيل</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-64 lg:h-auto">
                            <img
                                className="absolute inset-0 w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                alt="Driver"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support/FAQ Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">الأسئلة المتكررة</h2>
                    </FadeIn>
                    <div className="space-y-4">
                        {[
                            { q: 'كيف بحجز سيارة؟', a: 'سجل دخولك، اختار نوع السيارة (سوزوكي، كيا، انتر)، حدد من وين لوين، وبيجيك السعر فوراً.' },
                            { q: 'شو يعني شحن طرد؟', a: 'خدمة للطرد الواحد (كمبيوتر، كرتونة، هدية) بنرسلها مع سيارة مسافرة بنفس الطريق بسعر رمزي.' },
                            { q: 'هل البضاعة مؤمنة؟', a: 'طبعاً، كل عملية نقل عبر التطبيق مشمولة بضماننا ضد التلف أو الضياع.' },
                            { q: 'كيف بدفع؟', a: 'الدفع عند الاستلام كاش للسائق.' },
                        ].map((faq, i) => (
                            <details key={i} className="group bg-white rounded-xl shadow-sm cursor-pointer p-6">
                                <summary className="flex justify-between items-center font-bold text-gray-900 list-none">
                                    <span>{faq.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p className="text-gray-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
