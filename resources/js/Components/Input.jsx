import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Input(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef();
    const inputRef = ref ? ref : localRef;

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-primary focus:ring-primary rounded-xl shadow-sm !px-4 !py-2' +
                className
            }
            ref={inputRef}
        />
    );
});
