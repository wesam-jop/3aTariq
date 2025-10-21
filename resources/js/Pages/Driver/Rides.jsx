import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    Car, 
    Package, 
    MapPin, 
    Users, 
    Calendar,
    DollarSign,
    CheckCircle,
    Clock,
    Navigation,
    Filter
} from 'lucide-react';

export default function DriverRides({ availableRides, availablePackages, activeRides, activePackages }) {
    const { trans } = useTranslation();
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

    const filteredAvailableRides = activeTab === 'packages' ? [] : availableRides;
    const filteredAvailablePackages = activeTab === 'rides' ? [] : availablePackages;
    const filteredActiveRides = activeTab === 'packages' ? [] : activeRides;
    const filteredActivePackages = activeTab === 'rides' ? [] : activePackages;

    const totalAvailable = filteredAvailableRides.length + filteredAvailablePackages.length;
    const totalActive = filteredActiveRides.length + filteredActivePackages.length;

    return (
        <DashboardLayout>
            <Head title={trans('available_rides')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{trans('available_orders')}</h1>
                        <p className="text-sm text-gray-600 mt-1">{trans('view_accept_orders')}</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActiveTab('all')}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                activeTab === 'all' 
                                    ? 'bg-blue-600 text-white shadow' 
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <Filter className="w-4 h-4" />
                            {trans('all')}
                        </button>
                        <button 
                            onClick={() => setActiveTab('rides')}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                activeTab === 'rides' 
                                    ? 'bg-blue-600 text-white shadow' 
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <Car className="w-4 h-4" />
                            {trans('rides')}
                        </button>
                        <button 
                            onClick={() => setActiveTab('packages')}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                activeTab === 'packages' 
                                    ? 'bg-blue-600 text-white shadow' 
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <Package className="w-4 h-4" />
                            {trans('packages')}
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('available_requests')}</p>
                                <p className="text-3xl font-bold text-gray-900">{totalAvailable}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Navigation className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-white border border-gray-200 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('active_requests')}</p>
                                <p className="text-3xl font-bold text-gray-900">{totalActive}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <Clock className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Rides/Packages */}
                <div className="card bg-white border border-gray-200 shadow">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Navigation className="w-6 h-6 text-blue-600" />
                            {trans('available_orders')} ({totalAvailable})
                        </h2>
                    </div>

                    {totalAvailable > 0 ? (
                        <div className="space-y-4">
                            {/* Available Rides */}
                            {filteredAvailableRides.map((ride) => (
                                <div 
                                    key={`ride-${ride.id}`}
                                    className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <Car className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-600">{trans('passenger_ride')}</span>
                                                    <p className="font-semibold text-gray-900">
                                                        {ride.customer?.name || trans('customer')}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-600">من:</span>
                                                    <span className="font-medium text-gray-900">{ride.route?.from_city?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-red-600" />
                                                    <span className="text-gray-600">إلى:</span>
                                                    <span className="font-medium text-gray-900">{ride.route?.to_city?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {ride.passenger_count || 1} {trans('passenger')}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(ride.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end justify-between gap-2">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-600 mb-1">السعر</p>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {formatCurrency(ride.price)}
                                                </p>
                                            </div>
                                            <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-all inline-flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                {trans('accept_ride')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Available Packages */}
                            {filteredAvailablePackages.map((pkg) => (
                                <div 
                                    key={`package-${pkg.id}`}
                                    className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <Package className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-600">{trans('package')}</span>
                                                    <p className="font-semibold text-gray-900">
                                                        {pkg.customer?.name || trans('customer')}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-600">من:</span>
                                                    <span className="font-medium text-gray-900">{pkg.from_city?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-red-600" />
                                                    <span className="text-gray-600">إلى:</span>
                                                    <span className="font-medium text-gray-900">{pkg.to_city?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Package className="w-4 h-4" />
                                                        {pkg.weight} كغ
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(pkg.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end justify-between gap-2">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-600 mb-1">السعر</p>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {formatCurrency(pkg.price)}
                                                </p>
                                            </div>
                                            <button className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition-all inline-flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                {trans('accept_package')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Navigation className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-semibold text-gray-900 mb-2">{trans('no_available_orders')}</p>
                            <p className="text-sm text-gray-600">{trans('notify_new_orders')}</p>
                        </div>
                    )}
                </div>

                {/* Active Rides/Packages */}
                <div className="card bg-white border border-gray-200 shadow">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-6 h-6 text-green-600" />
                            {trans('my_active_orders')} ({totalActive})
                        </h2>
                    </div>

                    {totalActive > 0 ? (
                        <div className="space-y-4">
                            {/* Active Rides */}
                            {filteredActiveRides.map((ride) => (
                                <div 
                                    key={`active-ride-${ride.id}`}
                                    className="p-5 bg-green-50 rounded-lg border border-green-200"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-2 bg-green-600 rounded-lg">
                                                    <Car className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <span className="text-xs text-green-700 font-medium">{trans('active_ride')}</span>
                                                    <p className="font-semibold text-gray-900">
                                                        {ride.customer?.name || trans('customer')}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-700">من:</span>
                                                    <span className="font-medium text-gray-900">{ride.route?.from_city?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-red-600" />
                                                    <span className="text-gray-700">إلى:</span>
                                                    <span className="font-medium text-gray-900">{ride.route?.to_city?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                        ride.status === 'accepted' 
                                                            ? 'bg-yellow-100 text-yellow-800' 
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {ride.status === 'accepted' ? trans('accepted_status') : trans('in_progress_status')}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-gray-600">
                                                        <Users className="w-4 h-4" />
                                                        {ride.passenger_count || 1} {trans('passenger')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end justify-between gap-2">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-600 mb-1">الأرباح</p>
                                                <p className="text-2xl font-bold text-green-600">
                                                    {formatCurrency(ride.driver_earning)}
                                                </p>
                                            </div>
                                            <button className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition-all inline-flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                {trans('complete_ride')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Active Packages */}
                            {filteredActivePackages.map((pkg) => (
                                <div 
                                    key={`active-package-${pkg.id}`}
                                    className="p-5 bg-green-50 rounded-lg border border-green-200"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-2 bg-green-600 rounded-lg">
                                                    <Package className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <span className="text-xs text-green-700 font-medium">{trans('active_package')}</span>
                                                    <p className="font-semibold text-gray-900">
                                                        {pkg.customer?.name || trans('customer')}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-700">من:</span>
                                                    <span className="font-medium text-gray-900">{pkg.from_city?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-red-600" />
                                                    <span className="text-gray-700">إلى:</span>
                                                    <span className="font-medium text-gray-900">{pkg.to_city?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                        pkg.status === 'accepted' ? 'bg-yellow-100 text-yellow-800' :
                                                        pkg.status === 'picked' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-purple-100 text-purple-800'
                                                    }`}>
                                                        {pkg.status === 'accepted' && trans('accepted_status')}
                                                        {pkg.status === 'picked' && trans('picked_status')}
                                                        {pkg.status === 'in_transit' && trans('in_transit_status')}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-gray-600">
                                                        <Package className="w-4 h-4" />
                                                        {pkg.weight} كغ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end justify-between gap-2">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-600 mb-1">الأرباح</p>
                                                <p className="text-2xl font-bold text-green-600">
                                                    {formatCurrency(pkg.driver_earning)}
                                                </p>
                                            </div>
                                            <button className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition-all inline-flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                {trans('complete_delivery')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Clock className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-semibold text-gray-900 mb-2">{trans('no_active_orders')}</p>
                            <p className="text-sm text-gray-600">{trans('look_for_orders')}</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
