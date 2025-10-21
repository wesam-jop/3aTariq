import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    Car, 
    DollarSign, 
    TrendingUp, 
    Award, 
    Power,
    RefreshCw,
    MapPin,
    Users,
    Calendar,
    ArrowRight,
    CheckCircle,
    XCircle,
    BarChart3,
    Wallet
} from 'lucide-react';

export default function DriverDashboard({ driver, stats, available_rides }) {
    const { trans } = useTranslation();
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(driver?.status || 'offline');

    // Update status when driver prop changes
    useEffect(() => {
        if (driver?.status) {
            setCurrentStatus(driver.status);
        }
    }, [driver?.status]);

    const toggleStatus = () => {
        setIsUpdatingStatus(true);
        
        router.post('/driver/update-status', {}, {
            preserveScroll: false,
            onSuccess: (page) => {
                // Update status from server response
                setCurrentStatus(page.props.driver.status);
                setIsUpdatingStatus(false);
            },
            onError: () => {
                setIsUpdatingStatus(false);
            }
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    const statusConfig = {
        available: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            textColor: 'text-green-800',
            subTextColor: 'text-green-600',
            icon: CheckCircle,
            iconColor: 'text-green-600',
            title: 'متاح',
            subtitle: 'جاهز لاستقبال الطلبات',
            btnBg: 'bg-gray-600 hover:bg-gray-700',
            btnText: 'غير متصل'
        },
        offline: {
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            textColor: 'text-gray-800',
            subTextColor: 'text-gray-600',
            icon: XCircle,
            iconColor: 'text-gray-600',
            title: 'غير متصل',
            subtitle: 'لن تستقبل طلبات جديدة',
            btnBg: 'bg-green-600 hover:bg-green-700',
            btnText: 'متاح'
        }
    };

    const config = statusConfig[currentStatus] || statusConfig.offline;
    const StatusIcon = config.icon;

    return (
        <DashboardLayout>
            <Head title={trans('dashboard') + ' - ' + trans('driver')} />

            <div className="space-y-6">
                {/* Welcome Card */}
                <div className="card bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">
                                {trans('welcome')}، {driver?.user?.name}
                            </h1>
                            <p className="text-blue-100">{trans('what_to_do_today')}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-center border-r border-blue-500 pr-6 hidden md:block">
                                <div className="flex items-center justify-center mb-1">
                                    <Award className="w-5 h-5 text-yellow-300" />
                                </div>
                                <div className="text-2xl font-bold">{Number(stats?.rating || 5).toFixed(1)}</div>
                                <div className="text-xs text-blue-200">التقييم</div>
                            </div>
                            <div className="text-center hidden md:block">
                                <div className="flex items-center justify-center mb-1">
                                    <TrendingUp className="w-5 h-5 text-green-300" />
                                </div>
                                <div className="text-2xl font-bold">{stats?.total_trips || 0}</div>
                                <div className="text-xs text-blue-200">{trans('total_trips')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Card */}
                <div className={`card ${config.bg} border-2 ${config.border} shadow`}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                                <StatusIcon className={`w-8 h-8 ${config.iconColor}`} />
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${config.textColor}`}>
                                    حالتك: {config.title}
                                </h3>
                                <p className={`text-sm ${config.subTextColor} mt-1`}>{config.subtitle}</p>
                            </div>
                        </div>
                        <button 
                            onClick={toggleStatus}
                            disabled={isUpdatingStatus}
                            className={`btn ${config.btnBg} text-white px-6 py-2.5 rounded-lg shadow transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                        >
                            {isUpdatingStatus ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    جاري التحديث...
                                </>
                            ) : (
                                <>
                                    <Power className="w-4 h-4" />
                                    تغيير إلى {config.btnText}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Today Rides */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('todays_rides')}</p>
                                <p className="text-3xl font-bold text-gray-900">{stats?.today_rides || 0}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Car className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Today Earnings */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('todays_earnings')}</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats?.today_earnings)}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <DollarSign className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Total Trips */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('total_trips')}</p>
                                <p className="text-3xl font-bold text-gray-900">{stats?.total_trips || 0}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <BarChart3 className="w-8 h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    {/* Total Earnings */}
                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{trans('total_earnings')}</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats?.total_earnings)}</p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <Wallet className="w-8 h-8 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Rides */}
                <div className="card bg-white border border-gray-200 shadow">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Car className="w-6 h-6 text-blue-600" />
                            {trans('available_rides')}
                        </h2>
                        <Link 
                            href="/driver/rides" 
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                            عرض الكل
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {currentStatus === 'offline' ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <XCircle className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-semibold text-gray-900 mb-2">{trans('offline')}</p>
                            <p className="text-sm text-gray-600 mb-6">{trans('start_receiving')}</p>
                            <button
                                onClick={toggleStatus}
                                disabled={isUpdatingStatus}
                                className="btn bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-lg shadow transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                            >
                                {isUpdatingStatus ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        جاري التحديث...
                                    </>
                                ) : (
                                    <>
                                        <Power className="w-4 h-4" />
                                        تفعيل الحالة الآن
                                    </>
                                )}
                            </button>
                        </div>
                    ) : available_rides && available_rides.length > 0 ? (
                        <div className="space-y-3">
                            {available_rides.map((ride) => (
                                <div 
                                    key={ride.id} 
                                    className="p-5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <Users className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <span className="font-semibold text-gray-900">
                                                    {ride.customer?.name || 'عميل'}
                                                </span>
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
                                                        {ride.passengers_count} راكب
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(ride.created_at).toLocaleDateString('ar-SY')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-2xl font-bold text-gray-900">
                                                {formatCurrency(ride.price)}
                                            </div>
                                            <Link
                                                href={`/driver/rides`}
                                                className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-all inline-flex items-center gap-2"
                                            >
                                                قبول الرحلة
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Car className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-semibold text-gray-900 mb-2">{trans('no_data')}</p>
                            <p className="text-sm text-gray-600">{trans('email_notification')}</p>
                            <div className="mt-4 inline-flex items-center gap-2 text-sm text-green-600 font-medium">
                                <CheckCircle className="w-4 h-4" />
                                {trans('available')}
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/driver/rides"
                        className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <Car className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{trans('my_rides')}</h3>
                                <p className="text-sm text-gray-600">{trans('view_all')}</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/driver/earnings"
                        className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                                <Wallet className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{trans('earnings')}</h3>
                                <p className="text-sm text-gray-600">{trans('earnings_breakdown')}</p>
                            </div>
                        </div>
                    </Link>

                    <div className="card bg-white border border-gray-200 shadow hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                                <BarChart3 className="w-8 h-8 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">الإحصائيات</h3>
                                <p className="text-sm text-gray-600">تقارير الأداء</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

