export default function Card({ children, className = '' }) {
    return (
        <div className={`overflow-hidden bg-white shadow-sm sm:rounded-2xl ${className}`}>
            <div className="p-6 text-gray-900">
                {children}
            </div>
        </div>
    );
}
