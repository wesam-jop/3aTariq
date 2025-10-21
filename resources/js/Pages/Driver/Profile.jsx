import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    User,
    Car,
    MapPin,
    Save,
    Calendar,
    Hash,
    Palette,
    Image as ImageIcon,
    FileText,
    CheckCircle,
    Upload
} from 'lucide-react';

export default function DriverProfile({ driver, cities, selectedCities }) {
    const { trans } = useTranslation();
    const [formData, setFormData] = useState({
        vehicle_type: driver?.vehicle_type || 'car',
        vehicle_model: driver?.vehicle_model || '',
        vehicle_plate_number: driver?.vehicle_plate_number || '',
        vehicle_color: driver?.vehicle_color || '',
        vehicle_year: driver?.vehicle_year || '',
        cities: selectedCities || [],
    });
    
    const [vehicleImage, setVehicleImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        
        const data = new FormData();
        data.append('vehicle_type', formData.vehicle_type);
        data.append('vehicle_model', formData.vehicle_model);
        data.append('vehicle_plate_number', formData.vehicle_plate_number);
        data.append('vehicle_color', formData.vehicle_color || '');
        data.append('vehicle_year', formData.vehicle_year || '');
        
        if (vehicleImage) {
            data.append('vehicle_image', vehicleImage);
        }
        
        formData.cities.forEach((cityId) => {
            data.append('cities[]', cityId);
        });
        
        router.post('/driver/profile', data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
                setPreviewImage(null);
                setVehicleImage(null);
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
            setVehicleImage(file);
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
                            <h1 className="text-2xl font-bold text-gray-900">{trans('profile')}</h1>
                            <p className="text-sm text-gray-600">{trans('update_vehicle_cities')}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Vehicle Information */}
                    <div className="card bg-white border border-gray-200 shadow">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Car className="w-5 h-5 text-blue-600" />
                            {trans('vehicle_information')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Vehicle Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {trans('vehicle_type')}
                                </label>
                                <select
                                    value={formData.vehicle_type}
                                    onChange={(e) => updateFormData('vehicle_type', e.target.value)}
                                    className="input"
                                    required
                                >
                                    <option value="car">{trans('vehicle_car')}</option>
                                    <option value="van">{trans('vehicle_van')}</option>
                                    <option value="motorcycle">{trans('vehicle_motorcycle')}</option>
                                    <option value="truck">{trans('vehicle_truck')}</option>
                                </select>
                                {errors.vehicle_type && (
                                    <p className="text-red-500 text-sm mt-1">{errors.vehicle_type}</p>
                                )}
                            </div>

                            {/* Vehicle Model */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Car className="w-4 h-4" />
                                    {trans('vehicle_model')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.vehicle_model}
                                    onChange={(e) => updateFormData('vehicle_model', e.target.value)}
                                    className="input"
                                    placeholder={trans('example_toyota')}
                                    required
                                />
                                {errors.vehicle_model && (
                                    <p className="text-red-500 text-sm mt-1">{errors.vehicle_model}</p>
                                )}
                            </div>

                            {/* Vehicle Plate Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Hash className="w-4 h-4" />
                                    {trans('plate_number_field')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.vehicle_plate_number}
                                    onChange={(e) => updateFormData('vehicle_plate_number', e.target.value)}
                                    className="input"
                                    placeholder={trans('example_plate')}
                                    required
                                />
                                {errors.vehicle_plate_number && (
                                    <p className="text-red-500 text-sm mt-1">{errors.vehicle_plate_number}</p>
                                )}
                            </div>

                            {/* Vehicle Color */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Palette className="w-4 h-4" />
                                    {trans('vehicle_color')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.vehicle_color}
                                    onChange={(e) => updateFormData('vehicle_color', e.target.value)}
                                    className="input"
                                    placeholder={trans('example_white')}
                                />
                                {errors.vehicle_color && (
                                    <p className="text-red-500 text-sm mt-1">{errors.vehicle_color}</p>
                                )}
                            </div>

                            {/* Vehicle Year */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {trans('year_of_manufacture')}
                                </label>
                                <input
                                    type="number"
                                    value={formData.vehicle_year}
                                    onChange={(e) => updateFormData('vehicle_year', e.target.value)}
                                    className="input"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    placeholder={trans('example_2020')}
                                />
                                {errors.vehicle_year && (
                                    <p className="text-red-500 text-sm mt-1">{errors.vehicle_year}</p>
                                )}
                            </div>

                            {/* Vehicle Image */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <ImageIcon className="w-4 h-4" />
                                    {trans('vehicle_image')}
                                </label>
                                <div className="flex flex-col md:flex-row items-start gap-4">
                                    {/* Current/Preview Image */}
                                    <div className="flex-shrink-0">
                                        {(previewImage || driver?.vehicle_image) ? (
                                            <div className="relative">
                                                <img 
                                                    src={previewImage || `/storage/${driver.vehicle_image}`} 
                                                    alt="Vehicle"
                                                    className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500 shadow-md"
                                                />
                                                {previewImage && (
                                                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">
                                                        {trans('new')}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                                <Car className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Upload Button */}
                                    <label className="flex-1 cursor-pointer">
                                        <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                                            <Upload className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm text-gray-600">
                                                {vehicleImage ? trans('file_selected').replace('{name}', vehicleImage.name) : trans('choose_vehicle_image')}
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            {trans('image_quality_note')}
                                        </p>
                                    </label>
                                </div>
                                {errors.vehicle_image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.vehicle_image}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Cities */}
                    <div className="card bg-white border border-gray-200 shadow">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            {trans('working_cities')}
                        </h2>

                        <p className="text-sm text-gray-600 mb-4">
                            {trans('select_cities_desc')}
                        </p>

                        {cities && cities.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                    {cities.map((city) => {
                                        const isSelected = formData.cities.includes(city.id);
                                        return (
                                            <label
                                                key={city.id}
                                                className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                                    isSelected
                                                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                                                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            updateFormData('cities', [...formData.cities, city.id]);
                                                        } else {
                                                            updateFormData('cities', formData.cities.filter(id => id !== city.id));
                                                        }
                                                    }}
                                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                />
                                                <MapPin className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                                                <span className="text-sm font-medium">{city.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-semibold">{trans('cities_selected').replace('{count}', formData.cities.length)}</span>
                                        {formData.cities.length === 0 && ` - ${trans('must_select_city')}`}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                <p className="text-gray-600">{trans('no_cities_available')}</p>
                                <p className="text-sm text-gray-500">{trans('add_cities_from_admin')}</p>
                            </div>
                        )}
                        {errors.cities && (
                            <p className="text-red-500 text-sm mt-2">{errors.cities}</p>
                        )}
                    </div>

                    {/* Driver Info (Read Only) */}
                    <div className="card bg-gray-50 border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-600" />
                            {trans('account_info')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-600 mb-1">{trans('name')}</p>
                                <p className="font-semibold text-gray-900">{driver?.user?.name}</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-600 mb-1">{trans('phone')}</p>
                                <p className="font-semibold text-gray-900">{driver?.user?.phone}</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-600 mb-1">{trans('license_number')}</p>
                                <p className="font-semibold text-gray-900">{driver?.license_number}</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-600 mb-1">{trans('account_status')}</p>
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="font-semibold text-green-600">{trans('approved_status')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.visit('/driver/dashboard')}
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
                            {processing ? trans('saving') : trans('save_changes')}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

