import { Head, Link } from '@inertiajs/react';
import Layout from '../Components/Layout';
import { useTranslation } from '../hooks/useTranslation';
import { Car, Star, CheckCircle, MapPin, Award } from 'lucide-react';

export default function AllDrivers({ drivers }) {
    const { trans } = useTranslation();

    return (
        <Layout>
            <Head title={trans('all_drivers')} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                        <Award className="w-8 h-8 text-blue-600" />
                        {trans('all_drivers')}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {trans('professional_team')}
                    </p>
                </div>

                {/* Drivers Grid */}
                {drivers && drivers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {drivers.map((driver) => (
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
                                    {/* Avatar */}
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

                                    {/* Cities */}
                                    {driver.cities && driver.cities.length > 0 && (
                                        <div className="mb-2">
                                            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                                <MapPin className="w-3 h-3" />
                                                <span>{driver.cities.map(c => c.name).join(', ')}</span>
                                            </div>
                                        </div>
                                    )}

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

                                    {/* Trip Count Badge */}
                                    {(driver.completed_rides_count > 0 || driver.delivered_packages_count > 0) && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">
                                                {trans('total_trips')}: <span className="font-semibold text-blue-600">
                                                    {driver.completed_rides_count + driver.delivered_packages_count}
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600">{trans('no_drivers_available')}</p>
                    </div>
                )}

                {/* Back to Home Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg transition-all duration-200 font-semibold"
                    >
                        {trans('back_to_home')}
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

