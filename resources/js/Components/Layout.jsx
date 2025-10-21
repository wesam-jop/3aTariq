import { Link, usePage } from '@inertiajs/react';
import { Car, Home, LogIn, LogOut, UserPlus } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const { trans } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
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
                            {auth.user ? (
                                <>
                                    <span className="text-sm text-gray-700">{trans('welcome')}، {auth.user.name}</span>
                                    <Link
                                        href={
                                            auth.user.user_type === 'admin' ? '/admin' :
                                            auth.user.user_type === 'driver' ? '/driver/dashboard' :
                                            '/customer/dashboard'
                                        }
                                        className="inline-flex items-center gap-2 btn btn-primary px-4 py-2 rounded-lg text-sm"
                                    >
                                        <Home className="w-4 h-4" />
                                        {trans('dashboard')}
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="inline-flex items-center gap-2 btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        {trans('logout')}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="inline-flex items-center gap-2 btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
                                        <LogIn className="w-4 h-4" />
                                        {trans('login')}
                                    </Link>
                                    <Link href="/register" className="inline-flex items-center gap-2 btn btn-primary px-4 py-2 rounded-lg text-sm">
                                        <UserPlus className="w-4 h-4" />
                                        {trans('register')}
                                    </Link>
                                </>
                            )}
                            <div className="border-r border-gray-300 h-6"></div>
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}

