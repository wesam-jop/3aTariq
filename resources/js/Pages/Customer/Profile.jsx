import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    User,
    Mail,
    Phone,
    Lock,
    Save,
    Upload,
    Shield,
    Eye,
    EyeOff
} from 'lucide-react';

export default function CustomerProfile({ user }) {
    const { trans } = useTranslation();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    
    const [avatar, setAvatar] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email || '');
        data.append('phone', formData.phone);
        
        if (avatar) {
            data.append('avatar', avatar);
        }
        
        if (formData.current_password) {
            data.append('current_password', formData.current_password);
            data.append('new_password', formData.new_password);
            data.append('new_password_confirmation', formData.new_password_confirmation);
        }
        
        router.post('/customer/profile', data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
                setPreviewImage(null);
                setAvatar(null);
                setFormData(prev => ({
                    ...prev,
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: '',
                }));
            },
            onError: (errors) => {
                setProcessing(false);
                setErrors(errors);
            }
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <DashboardLayout>
            <Head title={trans('profile')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="card bg-white border border-gray-200 shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{trans('my_profile')}</h1>
                            <p className="text-sm text-gray-600">{trans('update_your_info')}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture */}
                    <div className="card bg-white border border-gray-200 shadow">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">{trans('profile_picture')}</h2>
                        
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Current/Preview Avatar */}
                            <div className="flex-shrink-0">
                                {(previewImage || user?.avatar) ? (
                                    <div className="relative">
                                        <img 
                                            src={previewImage || `/storage/${user.avatar}`} 
                                            alt={user.name}
                                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                                        />
                                        {previewImage && (
                                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">
                                                {trans('new')}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold">
                                        {user?.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            
                            {/* Upload Button */}
                            <div className="flex-1">
                                <label className="cursor-pointer block">
                                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                                        <Upload className="w-5 h-5 text-gray-600" />
                                        <span className="text-sm text-gray-600">
                                            {avatar ? `${trans('selected')}: ${avatar.name}` : trans('choose_photo')}
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        {trans('max_size_2mb')}
                                    </p>
                                </label>
                                {errors.avatar && (
                                    <p className="text-red-500 text-sm mt-2">{errors.avatar}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="card bg-white border border-gray-200 shadow">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600" />
                            {trans('personal_info')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {trans('full_name')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateFormData('name', e.target.value)}
                                    className="input"
                                    placeholder={trans('full_name')}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {trans('phone')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData('phone', e.target.value)}
                                    className="input"
                                    placeholder="09xxxxxxxx"
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    {trans('email')} ({trans('optional')})
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    className="input"
                                    placeholder="example@email.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="card bg-white border border-gray-200 shadow">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            {trans('change_password')}
                        </h2>

                        <p className="text-sm text-gray-600 mb-4">
                            {trans('leave_empty_no_change')}
                        </p>

                        <div className="grid grid-cols-1 gap-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Lock className="w-4 h-4" />
                                    {trans('current_password')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.current_password}
                                        onChange={(e) => updateFormData('current_password', e.target.value)}
                                        className="input pr-10"
                                        placeholder={trans('enter_current_password')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.current_password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>
                                )}
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Lock className="w-4 h-4" />
                                    {trans('new_password')}
                                </label>
                                <input
                                    type="password"
                                    value={formData.new_password}
                                    onChange={(e) => updateFormData('new_password', e.target.value)}
                                    className="input"
                                    placeholder={trans('min_8_chars')}
                                />
                                {errors.new_password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Lock className="w-4 h-4" />
                                    {trans('confirm_password')}
                                </label>
                                <input
                                    type="password"
                                    value={formData.new_password_confirmation}
                                    onChange={(e) => updateFormData('new_password_confirmation', e.target.value)}
                                    className="input"
                                    placeholder={trans('re_enter_password')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.visit('/customer/dashboard')}
                            className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg transition-all"
                        >
                            {trans('cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow transition-all disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? trans('processing') : trans('save_changes')}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

