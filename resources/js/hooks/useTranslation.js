import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { locale, translations } = usePage().props;

    const trans = (key, replacements = {}) => {
        let translation = translations[key] || key;
        
        // Replace placeholders like :name with actual values
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`:${placeholder}`, replacements[placeholder]);
        });
        
        return translation;
    };

    const isRTL = locale === 'ar';
    const isLTR = locale === 'en';

    return { trans, locale, isRTL, isLTR };
}

