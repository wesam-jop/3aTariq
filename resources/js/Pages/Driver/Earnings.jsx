import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    Wallet,
    TrendingUp,
    Calendar,
    Car,
    Package,
    MapPin,
    DollarSign,
    BarChart3,
    Clock,
    CheckCircle,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

export default function DriverEarnings({ stats, completedRides, deliveredPackages }) {
    const [activeTab, setActiveTab] = useState('all'); // all, rides, packages

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ar-SY', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const allTransactions = [
        ...completedRides.map(ride => ({
            id: ride.id,
            type: 'ride',
            customer: ride.customer?.name,
            from: ride.route?.from_city?.name,
            to: ride.route?.to_city?.name,
            amount: ride.driver_earning,
            date: ride.completed_at,
        })),
        ...deliveredPackages.map(pkg => ({
            id: pkg.id,
            type: 'package',
            customer: pkg.customer?.name,
            from: pkg.from_city?.name,
            to: pkg.to_city?.name,
            amount: pkg.driver_earning,
            date: pkg.delivered_at,
        }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const filteredTransactions = activeTab === 'all' 
        ? allTransactions 
        : allTransactions.filter(t => t.type === (activeTab === 'rides' ? 'ride' : 'package'));

    return (
        <DashboardLayout>
            <Head title={trans('earnings')} />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{trans('my_earnings')}</h1>
                    <p className="text-sm text-gray-600 mt-1">{trans('track_earnings')}</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Earnings */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('total_earnings')}</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total_earnings)}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <Wallet className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Month Earnings */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('this_month_earnings')}</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.month_earnings)}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Calendar className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Today Earnings */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('today_earnings')}</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.today_earnings)}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <TrendingUp className="w-8 h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    {/* Total Trips */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('trips_count')}</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_trips}</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <BarChart3 className="w-8 h-8 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Rides Breakdown */}
                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Car className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{trans('rides_earnings')}</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">{trans('completed_rides')}</span>
                                <span className="font-bold text-gray-900">{stats.total_rides}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-sm text-gray-600">إجمالي الأرباح</span>
                                <span className="font-bold text-green-600">{formatCurrency(stats.rides_earning)}</span>
                            </div>
                            {stats.total_rides > 0 && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <span className="text-sm text-gray-600">{trans('avg_per_ride')}</span>
                                    <span className="font-bold text-blue-600">
                                        {formatCurrency(stats.rides_earning / stats.total_rides)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Packages Breakdown */}
                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <Package className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{trans('packages_earnings')}</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">{trans('delivered_packages')}</span>
                                <span className="font-bold text-gray-900">{stats.total_packages}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-sm text-gray-600">إجمالي الأرباح</span>
                                <span className="font-bold text-green-600">{formatCurrency(stats.packages_earning)}</span>
                            </div>
                            {stats.total_packages > 0 && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <span className="text-sm text-gray-600">{trans('avg_per_package')}</span>
                                    <span className="font-bold text-blue-600">
                                        {formatCurrency(stats.packages_earning / stats.total_packages)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Earnings History */}
                <div className="card bg-white border border-gray-200 shadow">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-6 h-6 text-blue-600" />
                            {trans('earnings_log')}
                        </h2>

                        {/* Filter Tabs */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setActiveTab('all')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    activeTab === 'all' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {trans('all')}
                            </button>
                            <button 
                                onClick={() => setActiveTab('rides')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    activeTab === 'rides' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {trans('rides')}
                            </button>
                            <button 
                                onClick={() => setActiveTab('packages')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    activeTab === 'packages' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {trans('packages')}
                            </button>
                        </div>
                    </div>

                    {filteredTransactions.length > 0 ? (
                        <div className="space-y-3">
                            {filteredTransactions.map((transaction) => (
                                <div 
                                    key={`${transaction.type}-${transaction.id}`}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            {/* Icon */}
                                            <div className={`p-2 rounded-lg ${
                                                transaction.type === 'ride' 
                                                    ? 'bg-blue-100' 
                                                    : 'bg-green-100'
                                            }`}>
                                                {transaction.type === 'ride' ? (
                                                    <Car className="w-5 h-5 text-blue-600" />
                                                ) : (
                                                    <Package className="w-5 h-5 text-green-600" />
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 truncate">
                                                    {transaction.customer || trans('customer')}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                                    <MapPin className="w-3 h-3" />
                                                    <span className="truncate">
                                                        {transaction.from} ← {transaction.to}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDate(transaction.date)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Amount */}
                                        <div className="text-left flex-shrink-0">
                                            <div className="flex items-center gap-1">
                                                <ArrowUpRight className="w-4 h-4 text-green-600" />
                                                <span className="text-xl font-bold text-green-600">
                                                    {formatCurrency(transaction.amount)}
                                                </span>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded ${
                                                transaction.type === 'ride' 
                                                    ? 'bg-blue-100 text-blue-700' 
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {transaction.type === 'ride' ? trans('ride') : trans('package')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Wallet className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-semibold text-gray-900 mb-2">{trans('no_earnings_yet')}</p>
                            <p className="text-sm text-gray-600">{trans('start_accepting')}</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
