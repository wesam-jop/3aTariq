import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [userType, setUserType] = useState('customer');

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Login" />
            
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        تسجيل الدخول
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        أو{' '}
                        <Link
                            href="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            إنشاء حساب جديد
                        </Link>
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={submit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        {/* User Type Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                نوع المستخدم
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="customer"
                                        checked={userType === 'customer'}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="mr-2"
                                    />
                                    عميل
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="driver"
                                        checked={userType === 'driver'}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="mr-2"
                                    />
                                    سائق
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="admin"
                                        checked={userType === 'admin'}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="mr-2"
                                    />
                                    إدارة
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">
                                البريد الإلكتروني
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="البريد الإلكتروني"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="sr-only">
                                كلمة المرور
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="كلمة المرور"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                تذكرني
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                href="/password/reset"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                نسيت كلمة المرور؟
                            </Link>
                        </div>
                    </div>

                    {status && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {status}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {processing ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
