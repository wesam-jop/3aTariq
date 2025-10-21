import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { useTranslation } from '../../hooks/useTranslation';
import { Users, Car } from 'lucide-react';

export default function Register() {
    const { trans } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        password: '',
        password_confirmation: '',
        user_type: 'customer',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <Layout>
            <Head title={trans('register')} />

            <div className="max-w-md mx-auto px-4 py-16">
                <div className="card">
                    <h1 className="text-2xl font-bold text-center mb-6">{trans('create_new_account')}</h1>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                {trans('full_name')}
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="input"
                                autoFocus
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

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
                                placeholder="05xxxxxxxx"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* User Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {trans('i_am')}
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`border-2 rounded-lg p-4 cursor-pointer text-center transition-all ${
                                    data.user_type === 'customer'
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}>
                                    <input
                                        type="radio"
                                        value="customer"
                                        checked={data.user_type === 'customer'}
                                        onChange={(e) => setData('user_type', e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className="flex justify-center mb-2">
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="font-medium">{trans('customer')}</div>
                                </label>

                                <label className={`border-2 rounded-lg p-4 cursor-pointer text-center transition-all ${
                                    data.user_type === 'driver'
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}>
                                    <input
                                        type="radio"
                                        value="driver"
                                        checked={data.user_type === 'driver'}
                                        onChange={(e) => setData('user_type', e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className="flex justify-center mb-2">
                                        <Car className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="font-medium">{trans('driver')}</div>
                                </label>
                            </div>
                            {errors.user_type && (
                                <p className="text-red-500 text-sm mt-1">{errors.user_type}</p>
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

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                {trans('confirm_password')}
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="input"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary w-full"
                        >
                            {processing ? trans('processing') : trans('register')}
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        {trans('already_have_account')}{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            {trans('login')}
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
