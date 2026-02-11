import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import { FaPhone, FaEnvelope, FaLocationDot, FaWhatsapp, FaRegPaperPlane } from "react-icons/fa6";

export default function Contact() {
    return (
        <GuestLayout>
            <Head title="تواصل معنا" />

            {/* Hero Section */}
            <div className="bg-gray-900 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                        نحن هنا <span className="text-primary">لمساعدتك</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-400">
                        لديك استفسار؟ شكوى؟ أو حتى اقتراح لتطوير خدماتنا؟ فريقنا جاهز للرد عليك في أي وقت.
                    </p>
                </div>
            </div>

            <div className="relative bg-white mt-12  pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Contact Info (Left Side - Colored) */}
                            <div className="bg-primary p-10 sm:p-14 text-gray-900 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl font-extrabold mb-8">معلومات الاتصال</h2>
                                    <p className="text-lg mb-12 text-gray-800 leading-relaxed">
                                        يمكنك زيارتنا في مكتبنا الرئيسي أو التواصل معنا عبر الهاتف والبريد الإلكتروني.
                                    </p>

                                    <div className="space-y-8 text-lg">
                                        <div className="flex items-center gap-6 group">
                                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl group-hover:bg-white group-hover:text-primary transition-colors">
                                                <FaPhone />
                                            </div>
                                            <div>
                                                <p className="font-bold">اتصل بنا</p>
                                                <p dir="ltr" className="text-right group-hover:text-white transition-colors">+963 11 222 3333</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 group">
                                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl group-hover:bg-white group-hover:text-primary transition-colors">
                                                <FaEnvelope />
                                            </div>
                                            <div>
                                                <p className="font-bold">البريد الإلكتروني</p>
                                                <p className="group-hover:text-white transition-colors">info@3atariq.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 group">
                                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl group-hover:bg-white group-hover:text-primary transition-colors">
                                                <FaLocationDot />
                                            </div>
                                            <div>
                                                <p className="font-bold">الموقع</p>
                                                <p className="group-hover:text-white transition-colors">دمشق، المزة، أوتوستراد المزة</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 relative z-10">
                                    <h3 className="font-bold text-xl mb-4">تابعنا على</h3>
                                    <div className="flex gap-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-colors cursor-pointer">
                                                <span className="font-bold">f</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form (Right Side) */}
                            <div className="p-10 sm:p-14 bg-white">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">أرسل لنا رسالة</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                                            <Input type="text" className="w-full h-12 bg-gray-50 border-gray-200 focus:bg-white" placeholder="اسمك الكامل" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                                            <Input type="email" className="w-full h-12 bg-gray-50 border-gray-200 focus:bg-white" placeholder="example@email.com" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                                        <Input type="text" className="w-full h-12 bg-gray-50 border-gray-200 focus:bg-white" placeholder="كيف يمكننا مساعدتك؟" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                                        <textarea
                                            className="w-full h-32 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-primary p-4 resize-none"
                                            placeholder="اكتب رسالتك هنا..."
                                        ></textarea>
                                    </div>

                                    <Button className="w-full justify-center h-14 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                        <span className="ml-2">إرسال الرسالة</span>
                                        <FaRegPaperPlane />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Placeholder or Additional Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">هل تفضل المحادثة المباشرة؟</h2>
                    <a href="https://wa.me/963912345678" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="lg" className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 text-xl flex items-center gap-3 mx-auto transition-all">
                            <FaWhatsapp className="text-3xl" />
                            <span>تواصل معنا عبر واتساب</span>
                        </Button>
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}
