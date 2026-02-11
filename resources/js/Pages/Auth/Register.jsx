import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import OtpInput from 'react-otp-input';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaTruck, FaMobileScreenButton, FaBuilding, FaCity } from "react-icons/fa6";

export default function Register() {
    const [step, setStep] = useState('info'); // 'info', 'otp'
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [governorates, setGovernorates] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedGovernorateId, setSelectedGovernorateId] = useState('');
    const [identityImagePreview, setIdentityImagePreview] = useState(null);

    useEffect(() => {
        // Fetch governorates when component mounts
        const fetchGovernorates = async () => {
            try {
                const response = await axios.get('/governorates');
                // Ensure response.data is an array
                setGovernorates(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching governorates:', error);
                setGovernorates([]); // Ensure it's always an array
            }
        };

        fetchGovernorates();
    }, []);

    // Effect to fetch regions when a governorate is selected
    useEffect(() => {
        if (selectedGovernorateId) {
            const fetchRegions = async () => {
                try {
                    const response = await axios.get(`/governorates/${selectedGovernorateId}/regions`);
                    // Ensure response.data is an array
                    setRegions(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error('Error fetching regions:', error);
                    setRegions([]); // Ensure it's always an array
                }
            };
            fetchRegions();
        } else {
            setRegions([]);
        }
    }, [selectedGovernorateId]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        user_type: 'customer',
        governorate_id: '',
        region_id: '',
        transport_type: '',
        national_id: '',
        identity_image: null,
    });

    const sendOtp = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!data.name.trim() || !phone.trim()) {
            toast.error('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        // Validation for all user types
        if (data.user_type === 'driver') {
            if (data.transport_type === 'internal') {
                if (!data.governorate_id || !data.region_id) {
                    toast.error('يرجى تحديد المحافظة والمنطقة');
                    return;
                }
                if (!data.national_id.trim()) {
                    toast.error('يرجى إدخال الرقم الوطني');
                    return;
                }
            }
        } else if (data.user_type === 'customer') {
            // For customers, governorate and region are required
            if (!data.governorate_id || !data.region_id) {
                toast.error('يرجى تحديد المحافظة والمنطقة');
                return;
            }
        }

        setLoading(true);
        try {
            const response = await axios.post('/send-otp', { phone });

            if (response.data.success) {
                toast.success('تم إرسال رمز التحقق');
                setStep('otp');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ في الاتصال');
        }
        setLoading(false);
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length < 6) {
            toast.error('يرجى إدخال رمز التحقق كاملاً');
            return;
        }

        setLoading(true);
        try {
            const requestData = {
                phone,
                otp,
                name: data.name,
                user_type: data.user_type,
            };
            
            // Add driver-specific fields if user is a driver
            if (data.user_type === 'driver') {
                requestData.governorate_id = data.governorate_id;
                requestData.region_id = data.region_id;
                requestData.transport_type = data.transport_type;
                requestData.national_id = data.national_id;
                // Only send identity_image if it's actually a File object
                if (data.identity_image instanceof File) {
                    requestData.identity_image = data.identity_image;
                } else {
                    requestData.identity_image = null;
                }
            }
            
            const response = await axios.post('/verify-otp', requestData);
            
            // Debug logging
            console.log('Response:', response);
            console.log('Response data:', response.data);

            if (response.data.success) {
                toast.success('تم إنشاء الحساب بنجاح');
                window.location.href = '/dashboard';
            } else {
                const errorMessage = response.data.message || 'حدث خطأ غير معروف';
                console.log('Error message:', errorMessage);
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'حدث خطأ في الاتصال');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-white" dir="rtl">
            <Head title="إنشاء حساب جديد" />
            <Toaster position="top-center" reverseOrder={false} />

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-[600px] z-10 bg-white shadow-2xl">
                <div className="mx-auto w-full max-w-sm lg:w-[30rem]">
                    <div className="text-center">
                        <Link href="/" className="inline-block mb-8">
                            <ApplicationLogo className="h-14 w-auto text-primary mx-auto" />
                        </Link>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                            إنشاء حساب جديد
                        </h2>
                        <p className="text-sm text-gray-600 mb-8">
                            انضم إلينا وابدأ رحلتك مع "عَ الطريق"
                        </p>
                    </div>

                    {step === 'info' ? (
                        <form className="space-y-6" onSubmit={sendOtp}>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    نوع الحساب
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setData('user_type', 'customer')}
                                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center transition-all duration-200 ${data.user_type === 'customer' ? 'border-primary bg-yellow-50 shadow-md transform scale-105' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <div className="text-4xl mb-3 text-gray-700"><FaUser /></div>
                                        <div className="font-bold text-gray-900">عميل</div>
                                        <div className="text-xs text-center text-gray-500 mt-1">أريد نقل بضائعي</div>
                                    </div>
                                    <div
                                        onClick={() => setData('user_type', 'driver')}
                                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center transition-all duration-200 ${data.user_type === 'driver' ? 'border-primary bg-yellow-50 shadow-md transform scale-105' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <div className="text-4xl mb-3 text-gray-700"><FaTruck /></div>
                                        <div className="font-bold text-gray-900">سائق</div>
                                        <div className="text-xs text-center text-gray-500 mt-1">أملك مركبة نقل</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        الاسم الكامل
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        className="block w-full h-12 rounded-xl focus:border-primary focus:ring-primary"
                                        placeholder="الاسم الكامل"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        رقم الهاتف
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-400 sm:text-sm"><FaMobileScreenButton /></span>
                                        </div>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            required
                                            className="block w-full pl-10 text-right h-12 rounded-xl focus:border-primary focus:ring-primary"
                                            placeholder="05xxxxxxxx"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                {/* Conditional Fields for Driver */}
                                {data.user_type === 'driver' && (
                                    <div className="space-y-4 mt-4">
                                        <div className="text-center mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">اختر نوع النقل</h3>
                                            <p className="text-sm text-gray-600">حدد نوع الخدمة التي تقدمها</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div
                                                onClick={() => setData('transport_type', 'internal')}
                                                className={`cursor-pointer border-3 rounded-2xl p-5 flex flex-col items-center transition-all duration-300 ${data.transport_type === 'internal' ? 'border-primary bg-yellow-50 shadow-lg ring-2 ring-primary ring-opacity-20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                                            >
                                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    </svg>
                                                </div>
                                                <div className="font-bold text-gray-900 text-lg mb-1">نقل داخلي</div>
                                                <div className="text-sm text-center text-gray-600 mb-3">داخل المحافظات</div>
                                                <div className="text-xs text-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                                                    يتطلب: المحافظة، المنطقة، الهوية
                                                </div>
                                            </div>
                                            
                                            <div
                                                onClick={() => setData('transport_type', 'external')}
                                                className={`cursor-pointer border-3 rounded-2xl p-5 flex flex-col items-center transition-all duration-300 ${data.transport_type === 'external' ? 'border-primary bg-yellow-50 shadow-lg ring-2 ring-primary ring-opacity-20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                                            >
                                                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </div>
                                                <div className="font-bold text-gray-900 text-lg mb-1">نقل خارجي</div>
                                                <div className="text-sm text-center text-gray-600 mb-3">بين المحافظات</div>
                                                <div className="text-xs text-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
                                                    يتطلب: الاسم والرقم فقط
                                                </div>
                                            </div>
                                        </div>

                                        {/* Required Fields Notice */}
                                        {data.transport_type && (
                                            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                <div className="flex items-start gap-3">
                                                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <div>
                                                        <h4 className="font-bold text-blue-900 mb-1">
                                                            {data.transport_type === 'internal' ? 'حقول مطلوبة للنقل الداخلي:' : 'حقول مطلوبة للنقل الخارجي:'}
                                                        </h4>
                                                        <ul className="text-sm text-blue-800 space-y-1">
                                                            <li className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                                                الاسم الكامل والرقم الهاتف
                                                            </li>
                                                            {data.transport_type === 'internal' && (
                                                                <>
                                                                    <li className="flex items-center gap-2">
                                                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                                                        اختيار المحافظة والمنطقة
                                                                    </li>
                                                                    <li className="flex items-center gap-2">
                                                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                                                        الرقم الوطني وصورة الهوية
                                                                    </li>
                                                                </>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Transport Type Specific Fields */}
                                {data.user_type === 'driver' && data.transport_type === 'internal' && (
                                    <>
                                        <div>
                                            <label htmlFor="governorate_id" className="block text-sm font-medium text-gray-700 mb-2">
                                                المحافظة
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-400 sm:text-sm"><FaBuilding /></span>
                                                </div>
                                                <select
                                                    id="governorate_id"
                                                    required
                                                    className="block w-full pl-10 text-right h-12 rounded-xl focus:border-primary focus:ring-primary bg-white border border-gray-300"
                                                    value={data.governorate_id}
                                                    onChange={(e) => {
                                                        setData('governorate_id', e.target.value);
                                                        setSelectedGovernorateId(e.target.value);
                                                        setData('region_id', ''); // Reset region when governorate changes
                                                    }}
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
                                        </div>

                                        <div>
                                            <label htmlFor="region_id" className="block text-sm font-medium text-gray-700 mb-2">
                                                المنطقة
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-400 sm:text-sm"><FaCity /></span>
                                                </div>
                                                <select
                                                    id="region_id"
                                                    required
                                                    className="block w-full pl-10 text-right h-12 rounded-xl focus:border-primary focus:ring-primary bg-white border border-gray-300"
                                                    value={data.region_id}
                                                    onChange={(e) => setData('region_id', e.target.value)}
                                                    disabled={!data.governorate_id}
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
                                        </div>

                                        <div>
                                            <label htmlFor="national_id" className="block text-sm font-medium text-gray-700 mb-2">
                                                الرقم الوطني
                                            </label>
                                            <Input
                                                id="national_id"
                                                type="text"
                                                required
                                                className="block w-full h-12 rounded-xl focus:border-primary focus:ring-primary"
                                                placeholder="الرقم الوطني"
                                                value={data.national_id}
                                                onChange={(e) => setData('national_id', e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="identity_image" className="block text-sm font-medium text-gray-700 mb-2">
                                                صورة الهوية
                                            </label>
                                            <Input
                                                id="identity_image"
                                                type="file"
                                                accept="image/*"
                                                className="block w-full h-12 rounded-xl focus:border-primary focus:ring-primary"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setData('identity_image', file || null);
                                                    
                                                    // Set preview
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setIdentityImagePreview(reader.result);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    } else {
                                                        setIdentityImagePreview(null);
                                                    }
                                                }}
                                            />
                                             
                                            {/* Image Preview */}
                                            {identityImagePreview && (
                                                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                    <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        تم رفع الصورة بنجاح
                                                    </p>
                                                    <div className="flex justify-center">
                                                        <img 
                                                            src={identityImagePreview} 
                                                            alt="معاينة الهوية" 
                                                            className="max-h-48 rounded-lg shadow-md border border-gray-300"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Governorate and Region fields for Customers */}
                                {data.user_type === 'customer' && (
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <label htmlFor="governorate_id" className="block text-sm font-medium text-gray-700 mb-2">
                                                المحافظة
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-400 sm:text-sm"><FaBuilding /></span>
                                                </div>
                                                <select
                                                    id="governorate_id"
                                                    required
                                                    className="block w-full pl-10 text-right h-12 rounded-xl focus:border-primary focus:ring-primary bg-white border border-gray-300"
                                                    value={data.governorate_id}
                                                    onChange={(e) => {
                                                        setData('governorate_id', e.target.value);
                                                        setSelectedGovernorateId(e.target.value);
                                                        setData('region_id', ''); // Reset region when governorate changes
                                                    }}
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
                                        </div>

                                        <div>
                                            <label htmlFor="region_id" className="block text-sm font-medium text-gray-700 mb-2">
                                                المنطقة
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-400 sm:text-sm"><FaCity /></span>
                                                </div>
                                                <select
                                                    id="region_id"
                                                    required
                                                    className="block w-full pl-10 text-right h-12 rounded-xl focus:border-primary focus:ring-primary bg-white border border-gray-300"
                                                    value={data.region_id}
                                                    onChange={(e) => setData('region_id', e.target.value)}
                                                    disabled={!data.governorate_id}
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
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 mt-8"
                            >
                                {loading ? 'جاري الإرسال...' : 'متابعة'}
                            </Button>
                        </form>
                    ) : (
                        <form className="space-y-8" onSubmit={verifyOtp}>
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-4">
                                    أدخل رمز التحقق الذي أرسلناه إلى <span dir="ltr" className="font-bold text-gray-900">{phone}</span>
                                </p>

                                <div className="flex justify-center" dir="ltr">
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span className="mx-1 sm:mx-2"></span>}
                                        renderInput={(props) => <input {...props} />}
                                        inputType="tel"
                                        shouldAutoFocus
                                        inputStyle={{
                                            width: '3rem',
                                            height: '3.5rem',
                                            margin: '0',
                                            fontSize: '1.5rem',
                                            borderRadius: '0.75rem',
                                            border: '2px solid #e5e7eb',
                                            outline: 'none',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: '#1f2937',
                                            backgroundColor: '#f9fafb',
                                            transition: 'all 0.2s',
                                        }}
                                        focusStyle={{
                                            borderColor: '#FFC107',
                                            boxShadow: '0 0 0 4px rgba(255, 193, 7, 0.1)',
                                            backgroundColor: '#ffffff',
                                        }}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || otp.length < 6}
                                className="w-full flex justify-center py-3 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {loading ? 'جاري التحقق...' : 'تأكيد إنشاء الحساب'}
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setStep('info')}
                                    className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                                >
                                    تغيير البيانات
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-10 relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                لديك حساب بالفعل؟
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="font-bold text-primary hover:text-yellow-500 transition-colors"
                        >
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </div>

            {/* Left Side - Image/Background */}
            <div className="hidden lg:block relative w-0 flex-1 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/30 to-gray-900/80 z-10 mix-blend-multiply"></div>
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                    alt="Register background"
                />
                <div className="absolute z-20 bottom-20 left-20 text-white max-w-lg text-left" dir="ltr">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight text-right">
                        ابدأ رحلتك <br />
                        <span className="text-primary">اليوم</span>
                    </h2>
                    <p className="text-xl text-gray-300 text-right">
                        سجل الآن واستفد من خدماتنا اللوجستية المتكاملة، سواء كنت عميلاً أو سائقاً.
                    </p>
                </div>
            </div>

        </div>
    );
}
