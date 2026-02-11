import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaTruckFast, FaHandshake, FaUsers, FaLightbulb } from "react-icons/fa6";

export default function About() {
    return (
        <GuestLayout>
            <Head title="من نحن" />

            {/* Hero Section */}
            <div className="relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover opacity-30"
                        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                        alt="Transportation Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            نحن نصنع <span className="text-primary">مستقبل النقل</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
                            في "عَ الطريق"، نجمع بين التكنولوجيا الحديثة والخبرة لنقدم لك تجربة نقل ركاب وبضائع لا مثيل لها.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="relative bg-white py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-right">
                                قصتنا
                            </h2>
                            <div className="mt-4 text-lg text-gray-500 space-y-4 text-right">
                                <p>
                                    بدأت رحلتنا من فكرة بسيطة: "ليش نقل العفش أو البضائع لازم يكون صعب ومكلف؟"
                                </p>
                                <p>
                                    لاحظنا الفجوة الكبيرة بين أصحاب المركبات اللي عم يدوروا على شغل، والناس اللي محتاجة نقل ركاب أو بضائع موثوق. فقررنا نبني جسر يربط بينهم بتقنية ذكية وسهلة.
                                </p>
                                <p>
                                    اليوم، "عَ الطريق" مو بس تطبيق، هو شبكة ضخمة بتغطي كل المحافظات السورية، وبتخدم آلاف الركاب والعملاء يومياً بكل أمان ومصداقية.
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-0 relative">
                            <div className="absolute -inset-4 bg-primary/20 rounded-2xl transform rotate-3"></div>
                            <img
                                className="relative rounded-2xl shadow-xl w-full"
                                src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                alt="Team working"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">قيمنـا</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            مبادئنا اللي ما بنحيد عنها
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: 'السرعة', desc: 'الوقت من ذهب، ولهيك التزامنا بالمواعيد مقدس.', icon: <FaTruckFast /> },
                            { title: 'الأمان', desc: 'ركابنا وبضائعنا بتوصل بكل أمان وراحة.', icon: <FaHandshake /> },
                            { title: 'الابتكار', desc: 'دايماً عم نطور تقنياتنا لنسهل عليك المهمة.', icon: <FaLightbulb /> },
                            { title: 'المجتمع', desc: 'بندعم السائقين وبنخلق فرص عمل حقيقية.', icon: <FaUsers /> },
                        ].map((value, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary text-center group">
                                <div className="text-4xl text-gray-400 mb-4 mx-auto w-fit group-hover:text-primary transition-colors">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-500 text-sm">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">جاهز لتجربة نقل مختلفة؟</span>
                        <span className="block text-primary">انضم لعائلة "عَ الطريق" اليوم.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:shrink-0 gap-4">
                        <div className="inline-flex rounded-md shadow">
                            <a href="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-primary hover:bg-yellow-400">
                                ابدأ الآن
                            </a>
                        </div>
                        <div className="inline-flex rounded-md shadow ml-3">
                            <a href="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-gray-800 hover:bg-gray-700">
                                تواصل معنا
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
