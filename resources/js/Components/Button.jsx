export default function Button({
    className = '',
    disabled,
    children,
    variant = 'primary', // primary, secondary, outline, danger
    size = 'md', // sm, md, lg
    ...props
}) {
    const baseStyles =
        'inline-flex items-center justify-center border font-medium rounded-2xl transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary:
            'border-transparent bg-primary text-primary-foreground hover:bg-yellow-500 focus:bg-yellow-500 active:bg-yellow-600 focus:ring-yellow-500',
        secondary:
            'border-transparent bg-secondary text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:ring-gray-500',
        outline:
            'border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
        danger:
            'border-transparent bg-red-600 text-white hover:bg-red-500 focus:border-red-700 focus:ring-red-200 active:bg-red-600',
        ghost:
            'border-transparent bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            {...props}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className} cursor-pointer`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
