import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Cairo', 'El Messiri', ...defaultTheme.fontFamily.sans],
                arabic: ['Cairo', 'El Messiri', 'sans-serif'],
                english: ['Roboto', 'sans-serif'],
                cairo: ['Cairo', 'sans-serif'],
                messiri: ['El Messiri', 'serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
};

