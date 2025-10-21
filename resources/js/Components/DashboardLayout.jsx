import { Link, usePage } from '@inertiajs/react';
import { Car, LogOut, Package, DollarSign, LayoutDashboard, User } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

export default function DashboardLayout({ children }) {
    const { auth, url } = usePage().props;
    const { trans } = useTranslation();
    const isDriver = auth.user?.user_type === 'driver';
    const currentUrl = url || '';

    const customerMenu = [
        { name: trans('dashboard'), href: '/customer/dashboard', icon: LayoutDashboard },
        { name: trans('my_rides'), href: '/customer/rides', icon: Car },
        { name: trans('packages'), href: '/customer/packages', icon: Package },
        { name: trans('profile'), href: '/customer/profile', icon: User },
    ];

    const driverMenu = [
        { name: trans('dashboard'), href: '/driver/dashboard', icon: LayoutDashboard },
        { name: trans('available_rides'), href: '/driver/rides', icon: Car },
        { name: trans('earnings'), href: '/driver/earnings', icon: DollarSign },
        { name: trans('profile'), href: '/driver/profile', icon: User },
    ];

    const menu = isDriver ? driverMenu : customerMenu;

    const isActive = (href) => {
        return currentUrl === href || currentUrl.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                <Car className="w-6 h-6" />
                                وصلني
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />
                            <div className="border-r border-gray-300 h-6"></div>
                            <span className="text-sm text-gray-700">
                                {auth.user?.name} ({isDriver ? trans('driver') : trans('customer')})
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="inline-flex items-center gap-2 btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                {trans('logout')}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar & Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <aside className="col-span-12 md:col-span-3">
                        <div className="card bg-white border border-gray-200 shadow sticky top-6">
                            <nav className="space-y-1">
                                {menu.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                                active
                                                    ? 'bg-blue-600 text-white shadow'
                                                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="col-span-12 md:col-span-9">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
