import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaWallet, FaArrowTrendUp, FaArrowTrendDown, FaCirclePlus, FaClockRotateLeft, FaCreditCard } from "react-icons/fa6";

export default function Wallet({ user: propUser }) {
    const { props } = usePage();
    const user = propUser || props.auth.user;

    if (!user) return null;
    const transactions = [
        { id: 1, type: 'withdraw', amount: 50000, description: 'دفع حجز رحلة #12', date: '2024-02-10' },
        { id: 2, type: 'deposit', amount: 150000, description: 'شحن رصيد - كاش', date: '2024-02-08' },
        { id: 3, type: 'withdraw', amount: 35000, description: 'توصيل طلب #88', date: '2024-02-05' },
    ];

    return (
        <AuthenticatedLayout
            user={user}
            header="محفظتي"
        >
            <Head title="المحفظة" />

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Balance Card */}
                <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <p className="text-gray-400 font-bold mb-2 uppercase tracking-widest text-sm text-center md:text-right">الرصيد الكلي</p>
                            <h2 className="text-5xl font-black flex items-center justify-center md:justify-start">
                                425,000
                                <span className="text-primary text-xl font-bold mr-3 mt-2">ل.س</span>
                            </h2>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button className="bg-primary text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-yellow-400 transition-all flex items-center shadow-lg shadow-primary/20">
                                <FaCirclePlus className="ml-3 text-xl" />
                                شحن المحفظة
                            </button>
                            <button className="bg-white/10 text-white font-bold px-6 py-4 rounded-2xl hover:bg-white/20 transition-all backdrop-blur-md">
                                <FaCreditCard className="ml-3" />
                                البطاقات
                            </button>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-24 -mb-24 blur-[60px]"></div>
                    <FaWallet className="absolute -bottom-10 -right-10 text-white/[0.03] text-[15rem] rotate-12" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 text-2xl">
                            <FaArrowTrendUp />
                        </div>
                        <div className="text-left w-full mr-4">
                            <p className="text-gray-400 text-xs font-bold mb-1">إجمالي الوارد</p>
                            <h4 className="text-xl font-bold text-gray-900 text-left">1,250,000 <span className="text-sm">ل.س</span></h4>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="h-14 w-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 text-2xl">
                            <FaArrowTrendDown />
                        </div>
                        <div className="text-left w-full mr-4">
                            <p className="text-gray-400 text-xs font-bold mb-1">إجمالي المصروفات</p>
                            <h4 className="text-xl font-bold text-gray-900 text-left">825,000 <span className="text-sm">ل.س</span></h4>
                        </div>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                            <FaClockRotateLeft className="ml-3 text-primary" />
                            سجل الحركات المالية
                        </h3>
                        <button className="text-primary font-bold text-sm hover:underline">عرض الكل</button>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ml-4 ${tx.type === 'deposit' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                                        {tx.type === 'deposit' ? <FaArrowTrendUp size={14} /> : <FaArrowTrendDown size={14} />}
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-sm">{tx.description}</p>
                                        <p className="text-gray-400 text-xs mt-1 font-medium">{tx.date}</p>
                                    </div>
                                </div>
                                <p className={`font-black text-lg ${tx.type === 'deposit' ? 'text-green-600' : 'text-gray-900'}`}>
                                    {tx.type === 'deposit' ? '+' : '-'}{tx.amount.toLocaleString()}
                                    <span className="text-xs font-bold mr-1 italic">ل.س</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
