import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function CustomerDashboard({ user, orders, trips }) {
    return (
        <AppLayout user={user}>
            <Head title="Customer Dashboard" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم العميل</h1>
                    <p className="text-gray-600">مرحباً بك {user?.name}</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        href="/customer/orders/create"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">طلب جديد</h3>
                                <p className="text-gray-600">إنشاء طلب توصيل جديد</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/customer/trips"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">الرحلات المتاحة</h3>
                                <p className="text-gray-600">تصفح الرحلات المتاحة</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/customer/orders"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">طلباتي</h3>
                                <p className="text-gray-600">عرض جميع طلباتي</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Recent Orders */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">طلباتي الأخيرة</h3>
                        {orders && orders.length > 0 ? (
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                رقم الطلب
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                العنوان
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الحالة
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                التاريخ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    #{order.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.delivery_address}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {order.status === 'completed' ? 'مكتمل' :
                                                         order.status === 'pending' ? 'قيد الانتظار' : 'ملغي'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString('ar-SA')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد طلبات</h3>
                                <p className="mt-1 text-sm text-gray-500">ابدأ بإنشاء طلب جديد</p>
                                <div className="mt-6">
                                    <Link
                                        href="/customer/orders/create"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        إنشاء طلب جديد
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Available Trips */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">الرحلات المتاحة</h3>
                        {trips && trips.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {trips.map((trip) => (
                                    <div key={trip.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-medium text-gray-900">{trip.from_location} - {trip.to_location}</h4>
                                            <span className="text-sm text-gray-500">{trip.departure_time}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">السائق: {trip.driver?.name}</p>
                                        <p className="text-sm text-gray-600">السعر: {trip.price} ريال</p>
                                        <div className="mt-4">
                                            <Link
                                                href={`/customer/trips/${trip.id}/book`}
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                حجز الرحلة
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد رحلات متاحة</h3>
                                <p className="mt-1 text-sm text-gray-500">تحقق لاحقاً من الرحلات الجديدة</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
