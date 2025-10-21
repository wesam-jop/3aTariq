import { Head } from '@inertiajs/react';
import DashboardLayout from '../../Components/DashboardLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { Package, Plus } from 'lucide-react';

export default function CustomerPackages() {
    const { trans } = useTranslation();
    
    return (
        <DashboardLayout>
            <Head title={trans('packages')} />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{trans('my_packages')}</h1>
                    <button className="btn btn-primary inline-flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        {trans('new_package')}
                    </button>
                </div>

                <div className="card">
                    <div className="text-center py-12 text-gray-500">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900 mb-2">{trans('no_data')}</p>
                        <p className="text-sm">{trans('send_packages_safely')}</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
