import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Login() {
    const { trans } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        phone: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <Layout>
            <Head title={trans('login')} />

            <div className="max-w-md mx-auto px-4 py-16">
                <div className="card">
                    <h1 className="text-2xl font-bold text-center mb-6">{trans('login')}</h1>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                {trans('phone')}
                            </label>
                            <input
                                id="phone"
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="input"
                                autoFocus
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                {trans('password')}
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="input"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600"
                            />
                            <label htmlFor="remember" className="mr-2 text-sm text-gray-600">
                                {trans('remember_me')}
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary w-full"
                        >
                            {processing ? trans('processing') : trans('login')}
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        {trans('no_account')}{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            {trans('create_new_account')}
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
