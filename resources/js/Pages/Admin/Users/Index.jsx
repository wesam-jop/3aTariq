import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaUserPlus, FaUserShield, FaUsers, FaArrowRight, FaRotate, FaTrash, FaCircleCheck, FaCircleXmark, FaMagnifyingGlass, FaFilter, FaPhone, FaEnvelope, FaIdCard, FaCar, FaBuilding, FaCity, FaShield, FaShieldHalved, FaEye, FaUser } from "react-icons/fa6";
import Pagination from '@/Components/Pagination';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Index({ auth, users }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: 'customer',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => {
                toast.success('تم إنشاء المستخدم بنجاح');
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleToggleStatus = (userId) => {
        post(route('admin.users.toggle', userId), {
            onSuccess: () => toast.success('تم تحديث حالة المستخدم'),
            preserveScroll: true
        });
    };

    const handleVerifyDriver = (userId) => {
        if (confirm('هل أنت متأكد من توثيق هذا السائق؟')) {
            post(route('admin.users.verify', userId), {
                onSuccess: () => toast.success('تم توثيق الحساب بنجاح'),
                preserveScroll: true
            });
        }
    };

    const handleViewDetails = async (user) => {
        try {
            const response = await axios.get(route('admin.users.details', user.id));
            console.log('User details response:', response.data);
            console.log('Identity image:', response.data.identity_image);
            console.log('Has identity image:', !!response.data.identity_image);
            setUserDetails(response.data);
            setSelectedUser(user);
            setIsDetailsModalOpen(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error('حدث خطأ أثناء تحميل تفاصيل المستخدم');
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="إدارة المستخدمين"
        >
            <Head title="المستخدمين" />

            <div className="max-w-7xl mx-auto pb-12 space-y-8">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                            <FaUsers className="text-primary" />
                            إدارة أعضاء المنصة
                        </h2>
                        <p className="text-gray-400 font-bold text-sm mt-1">يمكنك إدارة صلاحيات المستخدمين، السائقين، والمدراء هنا.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-primary hover:text-gray-900 transition-all shadow-xl shadow-gray-200 active:scale-95"
                    >
                        <FaUserPlus />
                        إضافة مستخدم جديد
                    </button>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-50">
                                    <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">الاسم والمعلومات</th>
                                    <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">نوع الحساب</th>
                                    <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">الحالة</th>
                                    <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">تاريخ الانضمام</th>
                                    <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/5 transition-colors group">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-black uppercase group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                                    {user.name.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="text-base font-black text-gray-900 group-hover:text-primary transition-colors">{user.name}</p>
                                                    <div className="flex items-center gap-3 text-gray-400 text-[11px] font-bold mt-1">
                                                        <span className="flex items-center gap-1"><FaPhone size={10} /> {user.phone}</span>
                                                        {user.email && <span className="flex items-center gap-1"><FaEnvelope size={10} /> {user.email}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                                    user.role === 'driver' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                                        'bg-amber-100 text-amber-700 border border-amber-200'
                                                    }`}>
                                                    {user.role === 'admin' ? 'مدير نظام' : user.role === 'driver' ? 'سائق' : 'عميل'}
                                                </span>
                                                {user.role === 'driver' && (
                                                    <div className="flex items-center gap-1">
                                                        {user.is_approved ? (
                                                            <span className="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                                                <FaShield size={10} />
                                                                موثق
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                                                <FaShieldHalved size={10} />
                                                                غير موثق
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                <span className={`text-xs font-black ${user.is_active ? 'text-emerald-700' : 'text-red-700'}`}>
                                                    {user.is_active ? 'نشط' : 'معطل'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 text-sm font-bold text-gray-400 tabular-nums">
                                            {new Date(user.created_at).toLocaleDateString('ar-SA')}
                                        </td>
                                        <td className="py-6 px-8 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(user)}
                                                    className="w-10 h-10 bg-primary text-gray-900 rounded-xl flex items-center justify-center hover:bg-yellow-400 transition-all"
                                                    title="عرض التفاصيل"
                                                >
                                                    <FaEye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(user.id)}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${user.is_active ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                                                        }`}
                                                    title={user.is_active ? 'تعطيل الحساب' : 'تنشيط الحساب'}
                                                >
                                                    <FaRotate size={16} />
                                                </button>
                                                {user.role === 'driver' && !user.is_approved && (
                                                    <button
                                                        onClick={() => handleVerifyDriver(user.id)}
                                                        className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all"
                                                        title="توثيق الحساب"
                                                    >
                                                        <FaShield size={16} />
                                                    </button>
                                                )}
                                                {auth.user.id !== user.id && (
                                                    <button
                                                        className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all"
                                                        title="حذف المستخدم"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 border-t border-gray-50">
                        <Pagination links={users.links} />
                    </div>
                </div>
            </div>

            {/* User Details Modal */}
            {isDetailsModalOpen && userDetails && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-xl font-black overflow-hidden">
                                    {userDetails.avatar_url ? (
                                        <img 
                                            src={userDetails.avatar_url} 
                                            alt="الصورة الشخصية" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FaUser />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900">{userDetails.name}</h3>
                                    <p className="text-gray-400 font-bold text-sm">{userDetails.phone}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsDetailsModalOpen(false)} 
                                className="text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <FaCircleXmark size={28} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                                    <FaUser className="text-primary" />
                                    المعلومات الأساسية
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-400 font-bold">البريد الإلكتروني:</span>
                                        <p className="font-bold">{userDetails.email || 'غير متوفر'}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold">نوع الحساب:</span>
                                        <p className="font-bold">
                                            {userDetails.role === 'admin' ? 'مدير نظام' : 
                                             userDetails.role === 'driver' ? 'سائق' : 'عميل'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold">الحالة:</span>
                                        <p className={`font-bold ${userDetails.is_active ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {userDetails.is_active ? 'نشط' : 'معطل'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold">تاريخ التسجيل:</span>
                                        <p className="font-bold">{new Date(userDetails.created_at).toLocaleDateString('ar-SA')}</p>
                                    </div>
                                </div>
                                
                                {/* Avatar Preview for non-drivers */}
                                {userDetails.role !== 'driver' && userDetails.avatar_url && (
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <span className="text-gray-400 font-bold text-sm">الصورة الشخصية:</span>
                                        <div className="mt-3">
                                            <img 
                                                src={userDetails.avatar_url} 
                                                alt="الصورة الشخصية" 
                                                className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Driver Specific Info */}
                            {userDetails.role === 'driver' && (
                                <div className="bg-blue-50 rounded-2xl p-6">
                                    <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                                        <FaCar className="text-blue-500" />
                                        معلومات السائق
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-400 font-bold">نوع النقل:</span>
                                            <p className="font-bold">{userDetails.transport_type === 'internal' ? 'داخلي' : 'خارجي'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 font-bold">التحقق:</span>
                                            <p className={`font-bold flex items-center gap-2 ${userDetails.is_approved ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                {userDetails.is_approved ? (
                                                    <>
                                                        <FaShield size={16} />
                                                        موثق
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaShieldHalved size={16} />
                                                        غير موثق
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 font-bold">الرقم الوطني:</span>
                                            <p className="font-bold">{userDetails.national_id || 'غير متوفر'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 font-bold">لوحة المركبة:</span>
                                            <p className="font-bold">{userDetails.license_plate || 'غير متوفر'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 font-bold">نوع المركبة:</span>
                                            <p className="font-bold">{userDetails.car_type || 'غير متوفر'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 font-bold">موديل المركبة:</span>
                                            <p className="font-bold">{userDetails.car_model || 'غير متوفر'}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Images Section */}
                                    <div className="mt-6 pt-6 border-t border-blue-100">
                                        <h5 className="text-md font-black text-gray-900 mb-4">الصور المرفقة</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Avatar Preview */}
                                            <div className="bg-white rounded-xl p-4 border border-blue-100">
                                                <span className="text-gray-400 font-bold text-sm">الصورة الشخصية:</span>
                                                <div className="mt-3 flex justify-center">
                                                    {userDetails.avatar_url ? (
                                                        <img 
                                                            src={userDetails.avatar_url} 
                                                            alt="الصورة الشخصية" 
                                                            className="w-24 h-24 rounded-xl object-cover border-2 border-blue-200 shadow-sm"
                                                        />
                                                    ) : (
                                                        <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200">
                                                            <FaUser size={32} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Identity Image Preview */}
                                            <div className="bg-white rounded-xl p-4 border border-blue-100">
                                                <span className="text-gray-400 font-bold text-sm">صورة الهوية:</span>
                                                <div className="mt-3 flex justify-center">
                                                    {console.log('Rendering identity image, value:', userDetails.identity_image, 'exists:', !!userDetails.identity_image) ||
                                                     userDetails.identity_image ? (
                                                        <img 
                                                            src={`/storage/${userDetails.identity_image}`} 
                                                            alt="صورة الهوية" 
                                                            className="w-24 h-24 object-cover rounded-xl border-2 border-blue-200 shadow-sm"
                                                            onError={(e) => {
                                                                console.error('Image load error:', e);
                                                                console.log('Image src:', e.target.src);
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200">
                                                            <FaIdCard size={32} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Location Info */}
                            {(userDetails.governorate || userDetails.region) && (
                                <div className="bg-amber-50 rounded-2xl p-6">
                                    <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                                        <FaBuilding className="text-amber-500" />
                                        الموقع
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-400 font-bold">المحافظة:</span>
                                            <p className="font-bold">{userDetails.governorate?.name || userDetails.governorate || 'غير محدد'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 font-bold">المنطقة:</span>
                                            <p className="font-bold">{userDetails.region?.name || userDetails.region || 'غير محددة'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 flex gap-4">
                            <button
                                onClick={() => setIsDetailsModalOpen(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-600 font-black rounded-xl hover:bg-gray-200 transition-all"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] w-full max-w-xl p-10 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-gray-900">إضافة مستخدم جديد</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                <FaCircleXmark size={28} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">الاسم الكامل</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary transition-all font-bold text-sm"
                                        placeholder="أدخل الاسم"
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] font-bold px-2">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">رقم الهاتف</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary transition-all font-bold text-sm text-center tabular-nums"
                                        placeholder="09xxxxxxxx"
                                    />
                                    {errors.phone && <p className="text-red-500 text-[10px] font-bold px-2">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">البريد الإلكتروني (اختياري)</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-gray-50 border-0 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary transition-all font-bold text-sm"
                                    placeholder="example@3atariq.com"
                                />
                                {errors.email && <p className="text-red-500 text-[10px] font-bold px-2">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">كلمة المرور</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary transition-all font-bold text-sm"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && <p className="text-red-500 text-[10px] font-bold px-2">{errors.password}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">دور المستخدم</label>
                                    <select
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary transition-all font-bold text-sm appearance-none"
                                    >
                                        <option value="customer">عميل</option>
                                        <option value="driver">سائق</option>
                                        <option value="admin">مدير نظام</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-4 bg-primary text-gray-900 font-black rounded-2xl hover:bg-yellow-400 shadow-xl shadow-yellow-500/20 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    حفظ المستخدم
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}