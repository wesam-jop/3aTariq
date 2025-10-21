import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Car, Phone, Mail, Home, RefreshCw } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function Pending({ driver }) {
    const { trans } = useTranslation();
    const [isChecking, setIsChecking] = useState(false);

    // التحقق كل 10 ثوانٍ إذا تم الموافقة
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['driver'], preserveScroll: true });
        }, 10000); // كل 10 ثوانٍ

        return () => clearInterval(interval);
    }, []);

    const checkStatus = () => {
        setIsChecking(true);
        router.reload({ 
            only: ['driver'],
            preserveScroll: true,
            onFinish: () => setIsChecking(false)
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Head title={trans('pending_review')} />

            <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="card bg-white border border-gray-200 shadow-lg text-center">
                    {/* Icon */}
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-50 rounded-full mb-4">
                            <Clock className="w-12 h-12 text-yellow-600 animate-pulse" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {trans('pending_review')}
                    </h1>
                    
                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                        {trans('pending_thanks')}
                    </p>

                    {/* Status Steps */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <div className="space-y-4">
                            {/* Step 1 - Completed */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="text-right flex-1">
                                    <h3 className="font-semibold text-gray-900">{trans('account_created')}</h3>
                                    <p className="text-sm text-gray-600">{trans('data_received')}</p>
                                </div>
                            </div>

                            {/* Step 2 - Current */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="text-right flex-1">
                                    <h3 className="font-semibold text-gray-900">{trans('document_review')}</h3>
                                    <p className="text-sm text-gray-600">{trans('verifying_documents')}</p>
                                </div>
                            </div>

                            {/* Step 3 - Pending */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <Car className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="text-right flex-1">
                                    <h3 className="font-semibold text-gray-500">{trans('account_activation')}</h3>
                                    <p className="text-sm text-gray-500">{trans('will_activate')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-right flex-1">
                                <h3 className="font-semibold text-blue-900 mb-2">{trans('what_after_approval')}</h3>
                                <ul className="text-sm text-blue-800 space-y-2 text-right">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{trans('can_access_dashboard')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{trans('profile_visible')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{trans('start_receiving')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{trans('start_earning')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Expected Time */}
                    <div className="text-center mb-8">
                        <p className="text-sm text-gray-600 mb-2">
                            {trans('expected_time')}
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                            {trans('hours_24_48')}
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-sm text-gray-600 mb-4">
                            {trans('have_question')}
                        </p>
                        <div className="flex justify-center gap-6 text-sm">
                            <a href="mailto:support@wasalni.sy" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                <Mail className="w-4 h-4" />
                                support@wasalni.sy
                            </a>
                            <a href="tel:+963XXXXXXXXX" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                <Phone className="w-4 h-4" />
                                +963 XXX XXX XXX
                            </a>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={checkStatus}
                            disabled={isChecking}
                            className="inline-flex items-center justify-center gap-2 btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={`w-5 h-5 ${isChecking ? 'animate-spin' : ''}`} />
                            {isChecking ? trans('checking') : trans('check_status')}
                        </button>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-all"
                        >
                            <Home className="w-5 h-5" />
                            {trans('return_home')}
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="inline-flex items-center justify-center gap-2 btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-all"
                        >
                            {trans('logout')}
                        </Link>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        {trans('email_notification')}
                    </p>
                </div>
            </div>
        </div>
    );
}
