import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaMapLocationDot, FaPlus, FaTrash, FaCircleCheck, FaBuilding, FaMapPin, FaArrowRight } from "react-icons/fa6";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Index({ auth, governorates }) {
    const [selectedGov, setSelectedGov] = useState(null);
    const [isGovModalOpen, setIsGovModalOpen] = useState(false);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);

    const govForm = useForm({ name: '' });
    const regForm = useForm({ name: '', governorate_id: '' });

    const handleAddGov = (e) => {
        e.preventDefault();
        govForm.post(route('admin.governorates.store'), {
            onSuccess: () => {
                toast.success('تمت إضافة المحافظة بنجاح');
                govForm.reset();
                setIsGovModalOpen(false);
            }
        });
    };

    const handleAddReg = (e) => {
        e.preventDefault();
        regForm.post(route('admin.regions.store'), {
            onSuccess: () => {
                toast.success('تمت إضافة المنطقة بنجاح');
                regForm.reset();
                setIsRegModalOpen(false);
            }
        });
    };

    const handleDeleteGov = (id) => {
        if (confirm('هل أنت متأكد من حذف هذه المحافظة؟ سيتم حذف جميع المناطق التابعة لها.')) {
            useForm().delete(route('admin.governorates.delete', id), {
                onSuccess: () => toast.success('تم حذف المحافظة')
            });
        }
    };

    const handleDeleteReg = (id) => {
        if (confirm('هل أنت متأكد من حذف هذه المنطقة؟')) {
            useForm().delete(route('admin.regions.delete', id), {
                onSuccess: () => toast.success('تم حذف المنطقة')
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="إدارة المواقع"
        >
            <Head title="إدارة المواقع" />

            <div className="max-w-7xl mx-auto pb-12 space-y-8">
                {/* Header Section */}
                <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-black mb-3 flex items-center gap-4">
                                <FaMapLocationDot className="text-primary" />
                                إدارة المحافظات والمناطق
                            </h2>
                            <p className="text-gray-400 font-medium">تحكم في المواقع المتاحة لخدمة النقل الداخلي.</p>
                        </div>
                        <button
                            onClick={() => setIsGovModalOpen(true)}
                            className="px-8 py-4 bg-primary text-gray-900 rounded-2xl font-black flex items-center gap-3 hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 active:scale-95"
                        >
                            <FaPlus />
                            إضافة محافظة جديدة
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Governorates List */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-lg font-black text-gray-900 px-4 flex items-center gap-2">
                            <FaBuilding className="text-primary" />
                            المحافظات ({governorates.length})
                        </h3>
                        <div className="space-y-3">
                            {governorates.map((gov) => (
                                <button
                                    key={gov.id}
                                    onClick={() => setSelectedGov(gov)}
                                    className={`w-full p-6 rounded-[2rem] border-2 text-right transition-all group relative overflow-hidden ${selectedGov?.id === gov.id
                                            ? 'border-primary bg-yellow-50 shadow-xl shadow-yellow-100'
                                            : 'border-white bg-white hover:border-gray-200 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <p className={`font-black ${selectedGov?.id === gov.id ? 'text-gray-900' : 'text-gray-600'}`}>{gov.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">{gov.regions.length} منطقة داخلية</p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDeleteGov(gov.id); }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Regions List */}
                    <div className="lg:col-span-2 space-y-6">
                        {selectedGov ? (
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 min-h-[400px]">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                        <span className="w-2 h-8 bg-primary rounded-full"></span>
                                        مناطق محافظة {selectedGov.name}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            regForm.setData('governorate_id', selectedGov.id);
                                            setIsRegModalOpen(true);
                                        }}
                                        className="h-12 px-6 bg-gray-900 text-white rounded-xl font-black text-xs flex items-center gap-2 hover:bg-primary hover:text-gray-900 transition-all"
                                    >
                                        <FaPlus />
                                        إضافة منطقة
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {selectedGov.regions.map((reg) => (
                                        <div key={reg.id} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                                                    <FaMapPin />
                                                </div>
                                                <span className="font-black text-gray-700">{reg.name}</span>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteReg(reg.id)}
                                                className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {selectedGov.regions.length === 0 && (
                                        <div className="col-span-full py-20 text-center space-y-4">
                                            <FaMapPin className="text-gray-200 text-5xl mx-auto" />
                                            <p className="text-gray-400 font-bold">لا توجد مناطق مضافة في هذه المحافظة بعد.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-[3rem] p-20 shadow-sm border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
                                    <FaMapLocationDot size={40} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">اختر محافظة للبدء</h3>
                                <p className="text-gray-400 font-medium max-w-xs">يرجى اختيار محافظة من القائمة الجانبية لعرض وإدارة المناطق التابعة لها.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Governorate Modal */}
                {isGovModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl relative">
                            <h3 className="text-2xl font-black text-gray-900 mb-8">إضافة محافظة جديدة</h3>
                            <form onSubmit={handleAddGov} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">اسم المحافظة</label>
                                    <input
                                        type="text"
                                        value={govForm.data.name}
                                        onChange={e => govForm.setData('name', e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold"
                                        placeholder="مثلاً: دمشق، حلب، ريف دمشق..."
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={govForm.processing}
                                        className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-primary hover:text-gray-900 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                                    >
                                        حفظ المحافظة
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsGovModalOpen(false)}
                                        className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Region Modal */}
                {isRegModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl relative">
                            <h3 className="text-2xl font-black text-gray-900 mb-8">إضافة منطقة جديدة</h3>
                            <form onSubmit={handleAddReg} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">اسم المنطقة</label>
                                    <input
                                        type="text"
                                        value={regForm.data.name}
                                        onChange={e => regForm.setData('name', e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-0 transition-all text-sm font-bold"
                                        placeholder="مثلاً: المزة، مشروع دمر، البرامكة..."
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={regForm.processing}
                                        className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-primary hover:text-gray-900 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                                    >
                                        حفظ المنطقة
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsRegModalOpen(false)}
                                        className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
