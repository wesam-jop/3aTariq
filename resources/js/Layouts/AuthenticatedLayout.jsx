import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaBars, FaXmark, FaUser, FaRightFromBracket, FaHouse, FaBox, FaTruckFast, FaGear, FaWallet, FaMapLocationDot } from "react-icons/fa6";

import ApplicationLogo from '@/Components/ApplicationLogo';
import toast, { Toaster } from 'react-hot-toast';

export default function AuthenticatedLayout({ user: propUser, header, children }) {
    const { props } = usePage();
    const user = propUser || props.auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        if (props.flash.message) {
            toast.success(props.flash.message);
        }
        if (props.flash.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);

    if (!user) return null; // Defensive check

    const getNavigation = (role) => {
        switch (role) {
            case 'admin':
                return [
                    { name: 'لوحة التحكم', href: '/admin/dashboard', icon: FaHouse, current: url.startsWith('/admin/dashboard') },
                    { name: 'إدارة المستخدمين', href: '/admin/users', icon: FaUser, current: url.startsWith('/admin/users') },
                    { name: 'إدارة الطلبات', href: '/admin/orders', icon: FaBox, current: url.startsWith('/admin/orders') },
                    { name: 'إدارة المواقع', href: '/admin/locations', icon: FaMapLocationDot, current: url.startsWith('/admin/locations') },

                ];
            case 'driver':
                return [
                    { name: 'لوحة التحكم', href: '/driver/dashboard', icon: FaHouse, current: url.startsWith('/driver/dashboard') },
                    { name: 'رحلاتي', href: '/driver/trips', icon: FaTruckFast, current: url.startsWith('/driver/trips') },
                    { name: 'الطلبات المتاحة', href: '/driver/orders/available', icon: FaBox, current: url.startsWith('/driver/orders/available') },
                    { name: 'الإعدادات', href: '/driver/settings', icon: FaGear, current: url.startsWith('/driver/settings') },
                ];
            default: // customer
                return [
                    { name: 'لوحة التحكم', href: '/customer/dashboard', icon: FaHouse, current: url.startsWith('/customer/dashboard') },
                    { name: 'طلباتي', href: '/customer/orders', icon: FaBox, current: url.startsWith('/customer/orders') },
                    { name: 'الرحلات المتاحة', href: '/customer/trips', icon: FaTruckFast, current: url.startsWith('/customer/trips') },
                    { name: 'الإعدادات', href: '/customer/settings', icon: FaGear, current: url.startsWith('/customer/settings') },
                ];
        }
    };

    const navigation = getNavigation(user.role);


    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <Toaster position="top-center" />

            {/* Sidebar for Desktop */}
            <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
                    <Link href="/customer/dashboard">
                        <ApplicationLogo className="h-8 w-auto text-primary" />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-primary">
                        <FaXmark size={24} />
                    </button>
                </div>

                <div className="flex flex-col h-full justify-between pb-4">
                    <nav className="mt-6 px-4 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.current
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-600 hover:bg-yellow-50 hover:text-primary'
                                    }`}
                            >
                                <item.icon className={`ml-3 h-5 w-5 ${item.current ? 'text-white' : 'text-gray-400 grouping-hover:text-primary'}`} />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="px-4 mt-auto">
                        <div className="bg-gray-50 rounded-xl p-4 flex items-center mb-4">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden">
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} className="w-full h-full object-cover" />
                                ) : (
                                    <FaUser />
                                )}
                            </div>
                            <div className="mr-3 overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.phone}</p>
                            </div>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                        >
                            <FaRightFromBracket className="ml-3 h-5 w-5" />
                            تسجيل الخروج
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:hidden sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-primary p-2">
                        <FaBars size={24} />
                    </button>
                    <ApplicationLogo className="h-8 w-auto text-primary" />
                    <div className="w-8"></div> {/* Spacer for center alignment */}
                </header>

                <main className="flex-1 lg:pr-64 w-full">
                    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        {header && (
                            <header className="mb-8">
                                <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                            </header>
                        )}
                        {children}
                    </div>
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
