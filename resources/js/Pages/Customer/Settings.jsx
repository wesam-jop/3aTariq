import { Head, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaUser, FaPhone, FaLock, FaBell, FaGlobe, FaShieldHalved, FaCamera, FaChevronLeft, FaCircleCheck, FaTriangleExclamation, FaKey, FaBuilding, FaCity } from "react-icons/fa6";
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Settings({ user: propUser }) {
    const { props } = usePage();
    const user = propUser || props.auth.user;
    const [activeTab, setActiveTab] = useState('profile');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Avatar State
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url);
    const fileInputRef = useRef();

    // Location States
    const [governorates, setGovernorates] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedGovernorateId, setSelectedGovernorateId] = useState(user?.governorate_id || '');

    // OTP States
    const [phoneStep, setPhoneStep] = useState('input'); // input, otp
    const [deleteStep, setDeleteStep] = useState('confirm'); // confirm, otp
    const [isSendingOtp, setIsSendingOtp] = useState(false);

    // Fetch governorates when component mounts
    useEffect(() => {
        const fetchGovernorates = async () => {
            try {
                const response = await axios.get('/governorates');
                setGovernorates(Array.isArray(response.data) ? response.data : []);
                
                // If user has a governorate, fetch its regions
                if (user?.governorate_id) {
                    const regionsResponse = await axios.get(`/governorates/${user.governorate_id}/regions`);
                    setRegions(Array.isArray(regionsResponse.data) ? regionsResponse.data : []);
                }
            } catch (error) {
                console.error('Error fetching governorates:', error);
                setGovernorates([]);
                setRegions([]);
            }
        };

        fetchGovernorates();
    }, [user?.governorate_id]);

    // Effect to fetch regions when a governorate is selected
    useEffect(() => {
        if (selectedGovernorateId) {
            const fetchRegions = async () => {
                try {
                    const response = await axios.get(`/governorates/${selectedGovernorateId}/regions`);
                    setRegions(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error('Error fetching regions:', error);
                    setRegions([]);
                }
            };
            fetchRegions();
        } else {
            setRegions([]);
        }
    }, [selectedGovernorateId]);

    if (!user) return null;

    // Profile Form
    const profileForm = useForm({
        name: user.name || '',
        avatar: null,
        governorate_id: user.governorate_id || '',
        region_id: user.region_id || '',
    });

    // Phone Change Form
    const phoneForm = useForm({
        phone: '',
        otp: '',
    });

    // Delete Account Form
    const deleteForm = useForm({
        otp: '',
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        profileForm.post('/customer/settings/profile', {
            onSuccess: () => {
                toast.success('تم تحديث الملف الشخصي');
                // Force a page reload or refresh metadata if needed, 
                // but onSuccess usually handles shared props update.
            },
            onError: (err) => {
                console.error(err);
                toast.error('لم يتم الحفظ، تحقق من البيانات');
            },
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const requestPhoneOtp = async () => {
        if (!phoneForm.data.phone) return toast.error('أدخل رقم الهاتف الجديد');
        setIsSendingOtp(true);
        try {
            await axios.post('/customer/settings/send-otp', {
                phone: phoneForm.data.phone,
                type: 'change_phone'
            });
            toast.success('تم إرسال الرمز لرقمك الجديد (123456)');
            setPhoneStep('otp');
        } catch (error) {
            toast.error(error.response?.data?.message || 'حدث خطأ أثناء إرسال الرمز');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const verifyPhoneChange = (e) => {
        e.preventDefault();
        phoneForm.post('/customer/settings/verify-phone', {
            onSuccess: () => {
                toast.success('تم تغيير الرقم بنجاح');
                setPhoneStep('input');
                phoneForm.reset();
            },
            onError: () => toast.error('رمز التحقق غير صحيح'),
        });
    };

    const requestDeleteOtp = async () => {
        setIsSendingOtp(true);
        try {
            await axios.post('/customer/settings/send-otp', {
                phone: user.phone,
                type: 'delete_account'
            });
            toast.success('تم إرسال رمز التحقق لهاتفك الحالي (123456)');
            setDeleteStep('otp');
        } catch (error) {
            toast.error('حدث خطأ أثناء طلب الحذف');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleDeleteAccount = (e) => {
        e.preventDefault();
        deleteForm.delete('/customer/settings', {
            onSuccess: () => toast.success('تم حذف الحساب بنجاح'),
            onError: () => toast.error('رمز التحقق غير صحيح'),
        });
    };

    const sections = [
        { id: 'profile', name: 'الملف الشخصي', icon: FaUser, description: 'الاسم، الصورة، المعلومات الشخصية' },
        { id: 'security', name: 'رقم الهاتف والأمان', icon: FaShieldHalved, description: 'تغيير الرقم، حماية الحساب' },
    ];

    return (
        <AuthenticatedLayout
            user={user}
            header="الإعدادات"
        >
            <Head title="الإعدادات" />

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 text-center">
                        <div className="relative inline-block mb-4">
                            <div className="h-24 w-24 rounded-[2rem] bg-gray-50 flex items-center justify-center text-primary text-4xl border-2 border-primary/10 overflow-hidden shadow-inner">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <FaUser />
                                )}
                            </div>
                            <button
                                onClick={(e) => { e.preventDefault(); fileInputRef.current.click(); }}
                                className="absolute bottom-0 -right-2 bg-gray-900 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform z-10"
                            >
                                <FaCamera size={14} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{user.phone}</p>
                    </div>

                    <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100">
                        <div className="space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveTab(section.id)}
                                    className={`w-full p-4 rounded-2xl transition-all flex items-center gap-4 ${activeTab === section.id
                                        ? 'bg-primary text-gray-900 font-bold'
                                        : 'hover:bg-gray-50 text-gray-500'}`}
                                >
                                    <section.icon size={18} />
                                    <div className="text-right">
                                        <p className="text-sm leading-tight">{section.name}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-red-50 rounded-[2rem] p-6 border border-red-100">
                        <button
                            onClick={() => { setShowDeleteConfirm(true); setDeleteStep('confirm'); }}
                            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all text-sm flex items-center justify-center gap-2"
                        >
                            <FaTriangleExclamation />
                            حذف الحساب نهائياً
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                                <FaUser className="ml-3 text-primary" />
                                تعديل المعلومات الأساسية
                            </h3>

                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">الاسم الكامل</label>
                                    <div className="relative">
                                        <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={e => profileForm.setData('name', e.target.value)}
                                            className="w-full pr-12 pl-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all font-medium"
                                            placeholder="أدخل اسمك"
                                        />
                                    </div>
                                    {profileForm.errors.name && <p className="text-red-500 text-xs mt-2 mr-1">{profileForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">المحافظة</label>
                                    <div className="relative">
                                        <FaBuilding className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <select
                                            value={profileForm.data.governorate_id}
                                            onChange={e => {
                                                profileForm.setData('governorate_id', e.target.value);
                                                setSelectedGovernorateId(e.target.value);
                                                profileForm.setData('region_id', ''); // Reset region when governorate changes
                                            }}
                                            className="w-full pr-12 pl-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all font-medium appearance-none"
                                            dir="rtl"
                                        >
                                            <option value="">اختر المحافظة</option>
                                            {Array.isArray(governorates) && governorates.map((gov) => (
                                                <option key={gov.id} value={gov.id}>
                                                    {gov.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {profileForm.errors.governorate_id && <p className="text-red-500 text-xs mt-2 mr-1">{profileForm.errors.governorate_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">المنطقة</label>
                                    <div className="relative">
                                        <FaCity className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <select
                                            value={profileForm.data.region_id}
                                            onChange={e => profileForm.setData('region_id', e.target.value)}
                                            disabled={!profileForm.data.governorate_id}
                                            className="w-full pr-12 pl-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all font-medium appearance-none disabled:opacity-50"
                                            dir="rtl"
                                        >
                                            <option value="">اختر المنطقة</option>
                                            {Array.isArray(regions) && regions.map((region) => (
                                                <option key={region.id} value={region.id}>
                                                    {region.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {profileForm.errors.region_id && <p className="text-red-500 text-xs mt-2 mr-1">{profileForm.errors.region_id}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {profileForm.processing ? 'جاري الحفظ...' : (
                                        <>
                                            <FaCircleCheck />
                                            حفظ التغييرات
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Security Tab (Phone Change) */}
                    {activeTab === 'security' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                                <FaPhone className="ml-3 text-primary" />
                                تغيير رقم الهاتف
                            </h3>

                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-2xl mb-8 flex gap-3 text-sm text-yellow-800">
                                <FaTriangleExclamation className="flex-shrink-0 mt-0.5" />
                                <p>سيتم إرسال رمز تحقق للرقم الجديد للتأكد من ملكيتك له.</p>
                            </div>

                            {phoneStep === 'input' ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">رقم الهاتف الجديد</label>
                                        <div className="relative">
                                            <FaPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={phoneForm.data.phone}
                                                onChange={e => phoneForm.setData('phone', e.target.value)}
                                                className="w-full pr-12 pl-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all font-medium"
                                                placeholder="09xxxxxxxx"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); requestPhoneOtp(); }}
                                        disabled={isSendingOtp}
                                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                                    >
                                        {isSendingOtp ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={verifyPhoneChange} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">أدخل الرمز المرسل للرقم {phoneForm.data.phone}</label>
                                        <div className="relative">
                                            <FaKey className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                maxLength="6"
                                                value={phoneForm.data.otp}
                                                onChange={e => phoneForm.setData('otp', e.target.value)}
                                                className="w-full pr-12 pl-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all font-medium text-center tracking-[0.5em] text-xl"
                                                placeholder="000000"
                                            />
                                        </div>
                                        {phoneForm.errors.otp && <p className="text-red-500 text-xs mt-2 mr-1">{phoneForm.errors.otp}</p>}
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setPhoneStep('input')}
                                            className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200"
                                        >
                                            تغيير الرقم
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={phoneForm.processing}
                                            className="flex-1 py-4 bg-primary text-gray-900 font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-yellow-400"
                                        >
                                            {phoneForm.processing ? 'جاري التحقق...' : 'تأكيد التغيير'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Account Deletion Modal (OTP Flow) */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        {deleteStep === 'confirm' ? (
                            <>
                                <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-4xl mx-auto mb-6">
                                    <FaTriangleExclamation />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 text-center mb-2">هل أنت متأكد؟</h3>
                                <p className="text-gray-500 text-center mb-8 font-medium">سيتم مسح كافة البيانات. سنقوم بإرسال رمز تحقق لهاتفك للتأكد.</p>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200"
                                    >
                                        تراجع
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); requestDeleteOtp(); }}
                                        disabled={isSendingOtp}
                                        className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg"
                                    >
                                        {isSendingOtp ? 'جاري الإرسال...' : 'إرسال الرمز'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleDeleteAccount} className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">أدخل رمز التحقق</h3>
                                    <p className="text-sm text-gray-500">تم إرسال الرمز لهاتفك {user.phone}</p>
                                </div>
                                <input
                                    type="text"
                                    maxLength="6"
                                    value={deleteForm.data.otp}
                                    onChange={e => deleteForm.setData('otp', e.target.value)}
                                    className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all font-medium text-center tracking-[0.5em] text-2xl"
                                    placeholder="000000"
                                    required
                                />
                                {deleteForm.errors.otp && <p className="text-red-500 text-xs mt-2 text-center">{deleteForm.errors.otp}</p>}
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setDeleteStep('confirm')}
                                        className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200"
                                    >
                                        رجوع
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={deleteForm.processing}
                                        className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-200"
                                    >
                                        {deleteForm.processing ? 'جاري المسح...' : 'حذف نهائي'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
