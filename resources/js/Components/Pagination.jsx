import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex justify-center mt-12 gap-3 pb-8">
            {links.map((link, i) => (
                link.url ? (
                    <Link
                        key={i}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all ${link.active
                            ? 'bg-gray-900 text-white shadow-xl shadow-gray-200 scale-110'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-gray-200'
                            }`}
                    />
                ) : (
                    <span
                        key={i}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className="px-5 py-3 rounded-2xl text-sm font-bold bg-white text-gray-300 border border-gray-100 opacity-50 cursor-not-allowed"
                    />
                )
            ))}

        </div>
    );
}
