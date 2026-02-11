import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import { FaTruckPickup, FaTruckMoving, FaTruck, FaBoxOpen, FaCar, FaBusSimple } from "react-icons/fa6";

export default function Services() {
    const vehicles = [
        {
            id: 1,
            slug: 'internal-passenger',
            title: 'نقل ركاب داخلي',
            description: 'رحلات داخل المدينة أو المنطقة، مريحة وآمنة بأسعار مناسبة.',
            price: 'حسب المسافة',
            icon: <FaCar />,
        },
        {
            id: 2,
            slug: 'external-passenger',
            title: 'نقل ركاب خارجي',
            description: 'رحلات بين المحافظات والمدن، راحة وأمان طوال الطريق.',
            price: 'حسب الوجهة',
            icon: <FaBusSimple />,
        },
        {
            id: 3,
            slug: 'parcel',
            title: 'شحن طرد (Single Parcel)',
            description: 'عندك طرد واحد بس؟ بنوصلك ياه مع أقرب رحلة بنفس الاتجاه بأقل تكلفة.',
            price: 'اقتصادي جداً',
            icon: <FaBoxOpen className="text-primary" />,
        },
        {
            id: 4,
            slug: 'suzuki',
            title: 'سوزوكي (Suzuki)',
            description: 'الخيار الأوفر لنقل الأغراض الصغيرة، حقائب السفر، أو مشتريات المنزل.',
            price: 'ابتداءً من 5,000 ل.س',
            icon: <FaTruckPickup />,
        },
        {
            id: 5,
            slug: 'h100',
            title: 'فان H100 (Van)',
            description: 'مساحة مغلقة وآمنة، مثالية لنقل البضائع الحساسة أو عدد متوسط من الكراتين.',
            price: 'ابتداءً من 15,000 ل.س',
            icon: <FaTruckMoving />,
        },
        {
            id: 6,
            slug: 'kia',
            title: 'كيا / هيونداي (Kia)',
            description: 'شاحنة متوسطة ومفتوحة، الخيار الأول لنقل عفش الغرف والمفروشات.',
            price: 'ابتداءً من 25,000 ل.س',
            icon: <FaTruck />,
        },
        {
            id: 7,
            slug: 'heavy',
            title: 'انتر / قاطرة (Heavy Truck)',
            description: 'للنقل الثقيل والبضائع التجارية الضخمة بين المحافظات.',
            price: 'حسب المسافة',
            icon: <FaTruck className="text-3xl" />,
        },
        {
            id: 8,
            slug: 'refrigerated',
            title: 'براد (Refrigerated)',
            description: 'للنقل المبرد (لحوم، خضار، أدوية) لضمان سلامة بضائعك.',
            price: 'حسب الطلب',
            icon: <FaTruckMoving className="text-blue-400" />,
        },
    ];

    return (
        <GuestLayout>
            <Head title="خدماتنا" />

            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-primary tracking-wide uppercase">خدماتنا</h2>
                        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            نقل ركاب وبضائع بكل احترافية
                        </p>
                        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                            نوفر لك خيارات متعددة لنقل الركاب والبضائع، من رحلة قصيرة لشحنة كبيرة.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                        {vehicles.map((vehicle) => (
                            <Card key={vehicle.id} className="flex flex-col border-t-4 border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className="flex-1 bg-white p-8 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-yellow-50 mx-auto text-primary text-4xl group-hover:scale-110 transition-transform duration-300 mb-6">
                                            {vehicle.icon}
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                                {vehicle.title}
                                            </h3>
                                            <p className="mt-3 text-base text-gray-500 leading-relaxed">
                                                {vehicle.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                        <div className="text-xl font-bold text-gray-900 mb-4">
                                            {vehicle.price}
                                        </div>
                                        <Link href={`/customer/orders/create?type=${vehicle.slug}`}>
                                            <Button className="w-full justify-center py-3 text-lg font-bold shadow-md">
                                                قُم بالطلب الآن
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
