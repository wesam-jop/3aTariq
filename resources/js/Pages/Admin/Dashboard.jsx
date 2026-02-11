import { Head, Link, router } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaUsers, FaTruckFast, FaBoxOpen, FaMoneyBillWave, FaClock, FaCircleCheck, FaUserShield, FaArrowRight, FaArrowTrendUp, FaBolt } from "react-icons/fa6";

export default function Dashboard({ auth, stats }) {
    const user = auth.user;

    const statCards = [
        { label: 'إجمالي المستخدمين', value: stats.totalUsers, icon: FaUsers, color: 'blue' },
        { label: 'السائقين', value: stats.totalDrivers, icon: FaTruckFast, color: 'indigo' },
        { label: 'الطلبات', value: stats.totalOrders, icon: FaBoxOpen, color: 'amber' },
        { label: 'الرحلات', value: stats.totalTrips, icon: FaArrowTrendUp, color: 'emerald' },
    ];


    return (
        <AuthenticatedLayout
            user={user}
            header="لوحة تحكم المدير"
        >
            <Head title="لوحة التحكم" />

            <div className="max-w-7xl mx-auto pb-12 space-y-8">
                {/* Hero / Welcome Section */}
                <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">منطقة الإدارة العليا</span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none">نظام عَ الطريق V2.0</span>
                            </div>
                            <h2 className="text-4xl font-black mb-3">مرحباً بك، {user.name} 👋</h2>
                            <p className="text-gray-400 font-medium text-lg">لديك نظرة شاملة على جميع العمليات والنشاطات في النظام اليوم.</p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                href="/admin/users"
                                className="px-8 py-5 bg-white/10 text-white rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-white hover:text-gray-900 transition-all border border-white/10 active:scale-95"
                            >
                                <FaUserShield className="text-lg" />
                                إدارة المستخدمين
                            </Link>
                            <Link
                                href="/admin/orders"
                                className="px-8 py-5 bg-primary text-gray-900 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 active:scale-95"
                            >
                                <FaBoxOpen className="text-lg" />
                                طلبات بانتظار المراجعة
                            </Link>

                        </div>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                            <div className={`w-16 h-16 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon size={28} />
                            </div>
                            <h3 className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</h3>
                            <p className="text-3xl font-black text-gray-900 tabular-nums">{stat.value.toLocaleString()}</p>

                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Status Overview */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-primary rounded-full"></span>
                                    حالة الطلبات الحالية
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="p-8 rounded-[2rem] bg-orange-50/50 border border-orange-100 group hover:bg-orange-100 transition-colors cursor-pointer" onClick={() => router.get('/admin/orders?status=pending_review')}>
                                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block mb-2">بانتظار المراجعة</span>
                                    <p className="text-4xl font-black text-orange-700">{stats.pendingReviewOrders}</p>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-amber-50/50 border border-amber-100">
                                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-2">بانتظار سائق</span>
                                    <p className="text-4xl font-black text-amber-700">{stats.pendingOrders}</p>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-blue-50/50 border border-blue-100">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">في الطريق</span>
                                    <p className="text-4xl font-black text-blue-700">{stats.activeOrders}</p>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-emerald-50/50 border border-emerald-100">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-2">تم التسليم</span>
                                    <p className="text-4xl font-black text-emerald-700">{stats.completedOrders}</p>
                                </div>
                            </div>

                            <div className="mt-12 p-10 bg-gray-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                                <div className="relative z-10 text-center md:text-right">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2">إجمالي الإيرادات المكتملة</p>
                                    <h4 className="text-5xl font-black text-primary tabular-nums">
                                        {stats.totalRevenue.toLocaleString()}
                                        <span className="text-lg mr-2 font-bold text-white/50">ل.س</span>
                                    </h4>
                                </div>
                                <div className="relative z-10 w-full md:w-auto">
                                    <Link href="/admin/users" className="w-full md:w-auto h-16 px-10 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all">
                                        سجل المعاملات
                                        <FaArrowRight />
                                    </Link>
                                </div>
                                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-all duration-700"></div>
                            </div>
                        </div>

                        {/* Recent Users Table */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gray-200 rounded-full group-hover:bg-primary transition-colors"></span>
                                    آخر المستخدمين المنضمين
                                </h3>
                                <Link href="/admin/users" className="text-sm font-black text-primary hover:text-gray-900 transition-colors flex items-center gap-2">
                                    عرض الكل
                                    <FaArrowRight size={14} />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-right">
                                    <thead>
                                        <tr className="border-b border-gray-50">
                                            <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">المستخدم</th>
                                            <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">الدور</th>
                                            <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">الحالة</th>
                                            <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">التاريخ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {stats.recentUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="py-5 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-black uppercase">
                                                            {u.name.substring(0, 2)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-gray-900">{u.name}</p>
                                                            <p className="text-[11px] text-gray-500 font-medium">{u.phone}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-5 px-4 text-center">
                                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                        u.role === 'driver' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {u.role === 'admin' ? 'مدير' : u.role === 'driver' ? 'سائق' : 'عميل'}
                                                    </span>
                                                </td>
                                                <td className="py-5 px-4 text-center">
                                                    <div className={`w-2 h-2 rounded-full mx-auto ${u.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                </td>
                                                <td className="py-5 px-4 text-sm font-bold text-gray-400 tabular-nums">
                                                    {new Date(u.created_at).toLocaleDateString('ar-SA')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - System Performance & Alerts */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-3">
                                <FaClock className="text-primary" />
                                نشاط المنصة
                            </h3>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                                        <FaBolt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-gray-900 mb-1">الرحلات النشطة الآن</p>
                                        <p className="text-2xl font-black text-indigo-700">{stats.activeTrips}</p>
                                        <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                                        <FaClock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-gray-900 mb-1">طلبات قيد المعالجة</p>
                                        <p className="text-2xl font-black text-amber-700">{stats.pendingOrders}</p>
                                        <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Guide Card */}
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-6">إدارة المشرفين</h3>
                                <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-10">
                                    يمكنك إضافة مدراء جدد للنظام فقط من خلال لوحة الإدارة. تأكد من منح الصلاحيات للمستخدمين الموثوقين فقط.
                                </p>
                                <Link
                                    href="/admin/users"
                                    className="w-full h-14 bg-white text-indigo-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-gray-900 transition-all shadow-xl shadow-black/20"
                                >
                                    إضافة مشرف جديد
                                </Link>
                            </div>
                            <FaUserShield className="absolute -bottom-10 -left-10 text-white/5 text-[180px] group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
