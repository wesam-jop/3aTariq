import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../../Components/DashboardLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    Car,
    Package,
    Clock,
    CheckCircle,
    Wallet,
    TrendingUp,
    MapPin,
    Calendar,
    User,
    ArrowRight
} from 'lucide-react';

export default function CustomerDashboard({ stats, activeRides, activePackages }) {
    const { trans } = useTranslation();
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ar-SY', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <DashboardLayout>
            <Head title={trans('dashboard')} />

            <div className="space-y-6">
                {/* Welcome Card */}
                <div className="card bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">
                                {trans('welcome_back')}
                            </h1>
                            <p className="text-blue-100">{trans('what_to_do_today')}</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Wallet className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link 
                        href="/customer/rides" 
                        className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <Car className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{trans('book_ride')}</h3>
                                <p className="text-sm text-gray-600">{trans('travel_between_cities')}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </Link>

                    <Link 
                        href="/customer/packages" 
                        className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                                <Package className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{trans('send_package')}</h3>
                                <p className="text-sm text-gray-600">{trans('send_packages_safely')}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                        </div>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('active_rides')}</p>
                                <p className="text-3xl font-bold text-gray-900">{stats?.active_rides || 0}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('completed_rides')}</p>
                                <p className="text-3xl font-bold text-gray-900">{stats?.completed_rides || 0}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('active_packages')}</p>
                                <p className="text-3xl font-bold text-gray-900">{stats?.active_packages || 0}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Package className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Active Rides */}
                {activeRides && activeRides.length > 0 && (
                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Car className="w-6 h-6 text-blue-600" />
                                {trans('my_active_rides')} ({activeRides.length})
                            </h2>
                            <Link 
                                href="/customer/rides" 
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                            >
                                {trans('view_all')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {activeRides.map((ride) => (
                                <div 
                                    key={ride.id}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className={`p-2 rounded-lg ${
                                                ride.status === 'pending' ? 'bg-yellow-100' :
                                                ride.status === 'accepted' ? 'bg-blue-100' :
                                                'bg-green-100'
                                            }`}>
                                                <Car className={`w-5 h-5 ${
                                                    ride.status === 'pending' ? 'text-yellow-600' :
                                                    ride.status === 'accepted' ? 'text-blue-600' :
                                                    'text-green-600'
                                                }`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                                                        ride.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        ride.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                        {ride.status === 'pending' && 'قيد الانتظار'}
                                                        {ride.status === 'accepted' && 'مقبولة'}
                                                        {ride.status === 'in_progress' && 'قيد التنفيذ'}
                                                    </span>
                                                    {ride.driver && (
                                                        <span className="text-xs text-gray-600 flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            {ride.driver.user?.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-700">
                                                        {ride.route?.from_city?.name_ar} ← {ride.route?.to_city?.name_ar}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-lg font-bold text-gray-900">{formatCurrency(ride.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Active Packages */}
                {activePackages && activePackages.length > 0 && (
                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Package className="w-6 h-6 text-green-600" />
                                {trans('my_active_packages')} ({activePackages.length})
                            </h2>
                            <Link 
                                href="/customer/packages" 
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                            >
                                {trans('view_all')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {activePackages.map((pkg) => (
                                <div 
                                    key={pkg.id}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-all"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className={`p-2 rounded-lg ${
                                                pkg.status === 'pending' ? 'bg-yellow-100' :
                                                pkg.status === 'accepted' ? 'bg-blue-100' :
                                                pkg.status === 'picked' ? 'bg-purple-100' :
                                                'bg-green-100'
                                            }`}>
                                                <Package className={`w-5 h-5 ${
                                                    pkg.status === 'pending' ? 'text-yellow-600' :
                                                    pkg.status === 'accepted' ? 'text-blue-600' :
                                                    pkg.status === 'picked' ? 'text-purple-600' :
                                                    'text-green-600'
                                                }`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                                                        pkg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        pkg.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                                        pkg.status === 'picked' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                        {pkg.status === 'pending' && 'قيد الانتظار'}
                                                        {pkg.status === 'accepted' && 'مقبول'}
                                                        {pkg.status === 'picked' && 'تم الاستلام'}
                                                        {pkg.status === 'in_transit' && 'في الطريق'}
                                                    </span>
                                                    {pkg.driver && (
                                                        <span className="text-xs text-gray-600 flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            {pkg.driver.user?.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-700">
                                                        {pkg.from_city?.name_ar} ← {pkg.to_city?.name_ar}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-lg font-bold text-gray-900">{formatCurrency(pkg.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {(!activeRides || activeRides.length === 0) && (!activePackages || activePackages.length === 0) && (
                    <div className="card bg-white border border-gray-200 shadow text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <TrendingUp className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {trans('no_active_orders')}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {trans('start_journey')}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Link
                                href="/customer/rides"
                                className="inline-flex items-center gap-2 btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg"
                            >
                                <Car className="w-4 h-4" />
                                {trans('book_ride')}
                            </Link>
                            <Link
                                href="/customer/packages"
                                className="inline-flex items-center gap-2 btn bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg"
                            >
                                <Package className="w-4 h-4" />
                                {trans('send_package')}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
