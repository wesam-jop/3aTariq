import { router, usePage } from '@inertiajs/react';
import { Languages } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSwitcher({ className = '' }) {
    const { locale, locales } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const switchLanguage = (newLocale) => {
        if (newLocale !== locale) {
            router.post(`/language/${newLocale}`, {}, {
                preserveScroll: false,
                onSuccess: () => {
                    window.location.href = window.location.href;
                }
            });
        }
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all"
                aria-label="Switch Language"
            >
                <Languages className="w-5 h-5" />
                <span className="hidden md:inline">{locales[locale]}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                        {Object.entries(locales).map(([code, name]) => (
                            <button
                                key={code}
                                onClick={() => switchLanguage(code)}
                                className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                                    code === locale
                                        ? 'bg-blue-50 text-blue-600 font-semibold'
                                        : 'text-gray-700'
                                }`}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

