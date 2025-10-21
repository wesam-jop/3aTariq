import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '../Components/Layout';
import { useTranslation } from '../hooks/useTranslation';
import { 
    Car, 
    Star,
    MapPin,
    Award,
    TrendingUp,
    Calendar,
    CheckCircle,
    User,
    MessageSquare,
    Send,
    XCircle,
    Palette,
    Hash,
    Package as PackageIcon
} from 'lucide-react';

export default function DriverProfile({ driver, stats, reviews, canReview }) {
    const { trans } = useTranslation();
    const [showReviewForm, setShowReviewForm] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        comment: '',
        ride_id: null,
    });

    const submitReview = (e) => {
        e.preventDefault();
        post(`/driver/${driver.id}/review`, {
            onSuccess: () => {
                reset();
                setShowReviewForm(false);
            }
        });
    };

    return (
        <Layout>
            <Head title={`${trans('driver')} - ${driver.user?.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Vehicle Image Header (if exists) */}
                {driver.vehicle_image && (
                    <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                        <img 
                            src={`/storage/${driver.vehicle_image}`} 
                            alt={driver.vehicle_model}
                            className="w-full h-64 md:h-80 object-cover"
                            onError={(e) => {
                                e.target.parentElement.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                {/* Driver Header Card */}
                <div className="card bg-white border border-gray-200 shadow mb-6">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            {driver.user?.avatar ? (
                                <img 
                                    src={driver.user.avatar} 
                                    alt={driver.user?.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                                    {driver.user?.name?.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Driver Info */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {driver.user?.name}
                                    </h1>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Car className="w-4 h-4 text-gray-600" />
                                            <span className="text-sm text-gray-600">
                                                {driver.vehicle_type} • {driver.vehicle_model}
                                            </span>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                            driver.status === 'available' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {driver.status === 'available' ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3" />
                                                    {trans('available')}
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-3 h-3" />
                                                    {trans('not_available')}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* Rating Badge */}
                                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {stats.average_rating.toFixed(1)}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {stats.total_reviews} {trans('total_reviews')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cities */}
                            {driver.cities && driver.cities.length > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-600">{trans('works_in')}:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {driver.cities.map((city, index) => (
                                            <span key={city.id} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                                {city.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats */}
                        <div className="card bg-white border border-gray-200 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{trans('total_completed_trips')}</p>
                                    <p className="text-4xl font-bold text-gray-900">{stats.total_trips}</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <TrendingUp className="w-10 h-10 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Rating Distribution */}
                        <div className="card bg-white border border-gray-200 shadow">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-500" />
                                {trans('rating_distribution')}
                            </h3>
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((rating) => {
                                    const count = stats.rating_distribution[rating];
                                    const percentage = stats.total_reviews > 0 
                                        ? (count / stats.total_reviews) * 100 
                                        : 0;
                                    
                                    return (
                                        <div key={rating} className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 w-16">
                                                <span className="text-sm font-medium text-gray-900">{rating}</span>
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            </div>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600 w-12 text-left">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="card bg-white border border-gray-200 shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-blue-600" />
                                    {trans('customer_reviews')} ({stats.total_reviews})
                                </h3>
                                {canReview && (
                                    <button
                                        onClick={() => setShowReviewForm(!showReviewForm)}
                                        className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        {trans('add_review')}
                                    </button>
                                )}
                            </div>

                            {/* Review Form */}
                            {showReviewForm && canReview && (
                                <form onSubmit={submitReview} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {trans('rating')}
                                            </label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    key={rating}
                                                    type="button"
                                                    onClick={() => setData('rating', rating)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star 
                                                        className={`w-8 h-8 ${
                                                            rating <= data.rating 
                                                                ? 'text-yellow-500 fill-yellow-500' 
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {trans('comment_optional')}
                                            </label>
                                        <textarea
                                            value={data.comment}
                                            onChange={(e) => setData('comment', e.target.value)}
                                            rows="3"
                                            className="input"
                                            placeholder={trans('share_experience')}
                                        ></textarea>
                                        {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2"
                                        >
                                            <Send className="w-4 h-4" />
                                            {processing ? trans('sending') : trans('submit_review')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowReviewForm(false)}
                                            className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
                                        >
                                            {trans('cancel')}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Reviews List */}
                            <div className="space-y-4">
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <div key={review.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {review.customer?.name || trans('customer')}
                                                        </p>
                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Calendar className="w-3 h-3" />
                                                            {new Date(review.created_at).toLocaleDateString('ar-SY', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star 
                                                            key={i}
                                                            className={`w-4 h-4 ${
                                                                i < review.rating 
                                                                    ? 'text-yellow-500 fill-yellow-500' 
                                                                    : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                        <p className="text-gray-600">{trans('no_reviews_yet')}</p>
                                        <p className="text-sm text-gray-500 mt-1">{trans('be_first_reviewer')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Vehicle Info Card */}
                        <div className="card bg-white border border-gray-200 shadow">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Car className="w-5 h-5 text-blue-600" />
                                {trans('vehicle_info')}
                            </h3>
                            
                            {/* Vehicle Image */}
                            {driver.vehicle_image && (
                                <div className="mb-4">
                                    <img 
                                        src={`/storage/${driver.vehicle_image}`} 
                                        alt={driver.vehicle_model}
                                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Car className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">{trans('type')}</p>
                                        <p className="font-semibold text-gray-900">
                                            {driver.vehicle_type === 'car' && trans('vehicle_car')}
                                            {driver.vehicle_type === 'van' && trans('vehicle_van')}
                                            {driver.vehicle_type === 'motorcycle' && trans('vehicle_motorcycle')}
                                            {driver.vehicle_type === 'truck' && trans('vehicle_truck')}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <PackageIcon className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">{trans('model')}</p>
                                        <p className="font-semibold text-gray-900">{driver.vehicle_model}</p>
                                    </div>
                                </div>

                                {driver.vehicle_color && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Palette className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600">{trans('color')}</p>
                                            <p className="font-semibold text-gray-900">{driver.vehicle_color}</p>
                                        </div>
                                    </div>
                                )}

                                {driver.vehicle_year && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-yellow-100 rounded-lg">
                                            <Calendar className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600">{trans('year')}</p>
                                            <p className="font-semibold text-gray-900">{driver.vehicle_year}</p>
                                        </div>
                                    </div>
                                )}

                                {driver.vehicle_plate_number && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <Hash className="w-4 h-4 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600">{trans('plate_number')}</p>
                                            <p className="font-semibold text-gray-900 font-mono">{driver.vehicle_plate_number}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Button */}
                        {driver.status === 'available' && (
                            <Link
                                href="/customer/rides"
                                className="block w-full btn bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-center font-semibold shadow-lg transition-all hover:shadow-xl"
                            >
                                {trans('book_ride_now')}
                            </Link>
                        )}

                        {/* Back Button */}
                        <Link
                            href="/"
                            className="block w-full btn bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg text-center font-medium transition-all"
                        >
                            {trans('back_to_home')}
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
