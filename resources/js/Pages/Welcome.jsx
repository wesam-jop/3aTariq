import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import TestimonialsSlider from '../Components/TestimonialsSlider';
import { useTranslation } from '../hooks/useTranslation';
import { 
    Car, 
    Package, 
    DollarSign, 
    Zap, 
    Star,
    MapPin,
    CheckCircle,
    Users,
    TrendingUp,
    MessageSquare,
    Mail,
    Phone,
    Home,
    UserPlus,
    LogIn,
    Shield,
    Clock,
    Award
} from 'lucide-react';

export default function Welcome({ drivers = [], reviews = [] }) {
    const { auth } = usePage().props;
    const { trans } = useTranslation();

    const getDashboardUrl = () => {
        if (!auth.user) return '/register';
        
        if (auth.user.user_type === 'admin') return '/admin';
        if (auth.user.user_type === 'driver') return '/driver/dashboard';
        return '/customer/dashboard';
    };

    return (
        <Layout>
            <Head title={trans('home')} />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm">
                            <Car className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            {trans('hero_welcome')}
                        </h1>
                        <p className="text-xl mb-3 text-blue-100 max-w-2xl mx-auto">
                            {trans('smart_delivery_system')}
                        </p>
                        <div className="flex items-center justify-center gap-6 mb-8 text-sm text-blue-100">
                            <span className="flex items-center gap-1">
                                <Shield className="w-4 h-4" />
                                {trans('safe')}
                            </span>
                            <span className="flex items-center gap-1">
                                <Zap className="w-4 h-4" />
                                {trans('fast')}
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                {trans('reliable')}
                            </span>
                            <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {trans('suitable_prices')}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <Link 
                                href={getDashboardUrl()} 
                                className="inline-flex items-center gap-2 btn bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg shadow-lg transition-all duration-200 font-semibold"
                            >
                                <TrendingUp className="w-5 h-5" />
                                {trans('start_now')}
                            </Link>
                            {!auth.user && (
                                <Link 
                                    href="/login" 
                                    className="inline-flex items-center gap-2 btn text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg transition-all duration-200 font-semibold"
                                >
                                    <LogIn className="w-5 h-5" />
                                    {trans('login')}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        {trans('why_choose_us')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {trans('best_transport_services')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Feature 1 */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-lg mb-4">
                            <Car className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{trans('passenger_transport_service')}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {trans('book_easily')}
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-lg mb-4">
                            <Package className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{trans('package_delivery_service')}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {trans('send_safely')}
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-50 rounded-lg mb-4">
                            <DollarSign className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{trans('best_prices')}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {trans('fair_pricing')}
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-lg mb-4">
                            <Zap className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{trans('fast_service')}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {trans('reach_destination')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Drivers Section */}
            {drivers && drivers.length > 0 && (
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                                <Award className="w-8 h-8 text-blue-600" />
                                {trans('our_distinguished_drivers')}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {trans('professional_team')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {drivers.slice(0, 3).map((driver) => (
                                <Link 
                                    key={driver.id} 
                                    href={`/driver/${driver.id}`}
                                    className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all text-center block overflow-hidden p-0"
                                >
                                    {/* Vehicle Image */}
                                    {driver.vehicle_image ? (
                                        <div className="h-40 bg-gray-100 overflow-hidden">
                                            <img 
                                                src={`/storage/${driver.vehicle_image}`} 
                                                alt={driver.vehicle_model}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"><div class="text-white text-5xl"><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/></svg></div></div>`;
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                            <Car className="w-16 h-16 text-white" />
                                        </div>
                                    )}
                                    
                                    {/* Driver Info */}
                                    <div className="p-5">
                                        {/* Avatar (smaller now) */}
                                        <div className="mb-3 -mt-12">
                                            {driver.user?.avatar ? (
                                                <img 
                                                    src={driver.user.avatar} 
                                                    alt={driver.user?.name}
                                                    className="w-16 h-16 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full mx-auto bg-white border-4 border-white shadow-lg flex items-center justify-center text-blue-600 text-xl font-bold">
                                                    {driver.user?.name?.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            {driver.user?.name}
                                        </h3>
                                        <p className="text-xs text-gray-600 mb-2 flex items-center justify-center gap-1">
                                            <Car className="w-3 h-3" />
                                            {driver.vehicle_type === 'car' && trans('vehicle_car')}
                                            {driver.vehicle_type === 'van' && trans('vehicle_van')}
                                            {driver.vehicle_type === 'motorcycle' && trans('vehicle_motorcycle')}
                                            {driver.vehicle_type === 'truck' && trans('vehicle_truck')}
                                            {' • '}
                                            {driver.vehicle_model}
                                        </p>
                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-semibold text-gray-900 text-sm">
                                                {driver.rating ? Number(driver.rating).toFixed(1) : '5.0'}
                                            </span>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                            driver.status === 'available' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            <CheckCircle className="w-3 h-3" />
                                            {driver.status === 'available' ? trans('available') : trans('not_available')}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* View All Drivers Button */}
                        {drivers.length > 3 && (
                            <div className="text-center mt-8">
                                <Link
                                    href="/drivers"
                                    className="inline-flex items-center gap-2 btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 font-semibold"
                                >
                                    <Users className="w-5 h-5" />
                                    {trans('view_all_drivers')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Testimonials Section */}
            {reviews && reviews.length > 0 && (
                <div className="bg-white py-16 border-t border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                                <MessageSquare className="w-8 h-8 text-blue-600" />
                            </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {trans('customer_reviews')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {trans('discover_experiences')}
                        </p>
                        </div>

                        <div className="relative">
                            <TestimonialsSlider reviews={reviews} />
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm mb-6">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {trans('are_you_driver')}
                    </h2>
                    <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                        {trans('join_our_team')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link 
                            href="/register" 
                            className="inline-flex items-center gap-2 btn bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg shadow-lg transition-all duration-200 font-semibold"
                        >
                            <UserPlus className="w-5 h-5" />
                            {trans('register_as_driver')}
                        </Link>
                        <Link 
                            href="/login" 
                            className="inline-flex items-center gap-2 btn text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg transition-all duration-200 font-semibold"
                        >
                            <LogIn className="w-5 h-5" />
                            {trans('have_account_login')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Company Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Car className="w-6 h-6 text-blue-400" />
                                <h3 className="text-xl font-bold">{trans('app_name')}</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {trans('smart_delivery_desc')}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-base font-bold mb-4">{trans('quick_links')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1">
                                        <Home className="w-3 h-3" />
                                        {trans('home')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1">
                                        <UserPlus className="w-3 h-3" />
                                        {trans('register')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1">
                                        <LogIn className="w-3 h-3" />
                                        {trans('login')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-base font-bold mb-4">{trans('our_services')}</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <Car className="w-3 h-3" />
                                    {trans('passenger_transport_service')}
                                </li>
                                <li className="flex items-center gap-2">
                                    <Package className="w-3 h-3" />
                                    {trans('package_delivery_service')}
                                </li>
                                <li className="flex items-center gap-2">
                                    <Users className="w-3 h-3" />
                                    {trans('job_opportunities_drivers')}
                                </li>
                                <li className="flex items-center gap-2">
                                    <DollarSign className="w-3 h-3" />
                                    {trans('suitable_prices')}
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-base font-bold mb-4">{trans('contact_us')}</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <Mail className="w-3 h-3" />
                                    info@wasalni.sy
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="w-3 h-3" />
                                    +963 XXX XXX XXX
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    {trans('syria_damascus')}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2024 {trans('app_name')}. {trans('rights_reserved')}.
                        </p>
                    </div>
                </div>
            </footer>
        </Layout>
    );
}

