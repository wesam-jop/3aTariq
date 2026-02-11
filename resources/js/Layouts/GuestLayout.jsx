import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { url } = usePage();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll listener for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased" dir="rtl">
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                <ApplicationLogo className="block h-10 w-auto text-primary transition-transform group-hover:scale-110" />
                                <span className={`text-2xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                                    عَ الطريق
                                </span>
                            </Link>

                            <div className="hidden md:flex md:items-center md:mr-10 gap-5">
                                {['/', '/services', '/about', '/contact'].map((path) => (
                                    <Link
                                        key={path}
                                        href={path}
                                        className={`text-base font-medium transition-colors hover:text-primary ${url === path
                                            ? 'text-primary font-bold'
                                            : 'text-gray-600'
                                            }`}
                                    >
                                        {path === '/' ? 'الرئيسية' : path === '/services' ? 'خدماتنا' : path === '/about' ? 'من نحن' : 'تواصل معنا'}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            {usePage().props.auth.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                        className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-2 pr-4 rounded-full transition-all border border-gray-100 group"
                                    >
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900 leading-tight">{usePage().props.auth.user.name}</p>
                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{usePage().props.auth.user.role === 'customer' ? 'عميل' : usePage().props.auth.user.role === 'driver' ? 'سائق' : 'مسؤول'}</p>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-primary text-gray-900 flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                                            {usePage().props.auth.user.avatar_url ? (
                                                <img src={usePage().props.auth.user.avatar_url} className="w-full h-full object-cover" />
                                            ) : (
                                                usePage().props.auth.user.name.charAt(0)
                                            )}
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showingNavigationDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowingNavigationDropdown(false)}></div>
                                            <div className="absolute left-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-50 py-2 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-primary hover:text-gray-900 transition-colors gap-3 font-bold"
                                                >
                                                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-primary group-hover:bg-white/20">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                    </div>
                                                    لوحة التحكم
                                                </Link>
                                                <div className="border-t border-gray-50 my-1"></div>
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors gap-3 font-bold text-right"
                                                >
                                                    <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                    </div>
                                                    تسجيل الخروج
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
                                    >
                                        تسجيل دخول
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-primary text-gray-900 hover:bg-yellow-400 px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                    >
                                        انضم إلينا
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="-mr-2 flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out origin-top ${showingNavigationDropdown ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        {['/', '/services', '/about', '/contact'].map((path) => (
                            <Link
                                key={path}
                                href={path}
                                className="block w-full text-right px-4 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {path === '/' ? 'الرئيسية' : path === '/services' ? 'خدماتنا' : path === '/about' ? 'من نحن' : 'تواصل معنا'}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-6 border-t border-gray-100 px-4 space-y-3">
                        {usePage().props.auth.user ? (
                            <>
                                <div className="flex items-center p-4 bg-gray-50 rounded-2xl mb-4">
                                    <div className="h-12 w-12 rounded-full bg-primary text-gray-900 flex items-center justify-center font-black text-xl ml-4 shadow-sm">
                                        {usePage().props.auth.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{usePage().props.auth.user.name}</p>
                                        <p className="text-xs text-gray-500">{usePage().props.auth.user.phone}</p>
                                    </div>
                                </div>
                                <Link
                                    href="/dashboard"
                                    className="block w-full text-center px-4 py-3 text-base font-bold text-gray-900 bg-primary hover:bg-yellow-400 rounded-lg shadow-md mb-2"
                                >
                                    لوحة التحكم
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="block w-full text-center px-4 py-3 text-base font-bold text-red-600 border border-red-100 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                    تسجيل الخروج
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg"
                                >
                                    تسجيل دخول
                                </Link>
                                <Link
                                    href="/register"
                                    className="block w-full text-center px-4 py-3 text-base font-bold text-gray-900 bg-primary hover:bg-yellow-400 rounded-lg shadow-md"
                                >
                                    انضم إلينا
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                    <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                        <div className="px-5 py-2">
                            <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                                من نحن
                            </Link>
                        </div>
                        <div className="px-5 py-2">
                            <Link href="/services" className="text-base text-gray-500 hover:text-gray-900">
                                الخدمات
                            </Link>
                        </div>
                        <div className="px-5 py-2">
                            <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                                تواصل معنا
                            </Link>
                        </div>
                        <div className="px-5 py-2">
                            <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                                سياسة الخصوصية
                            </Link>
                        </div>
                    </nav>
                    <p className="mt-8 text-center text-base text-gray-400">
                        &copy; 2026 عَ الطريق. جميع الحقوق محفوظة.
                    </p>
                </div>
            </footer>
        </div>
    );
}
