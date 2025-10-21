<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\DriverReview;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriverProfileController extends Controller
{
    public function show(Driver $driver)
    {
        // تحميل بيانات السائق مع العلاقات
        $driver->load(['user', 'cities']);
        
        // حساب التقييم من التقييمات الفعلية
        $reviews = DriverReview::where('driver_id', $driver->id)
            ->with(['customer', 'ride'])
            ->latest()
            ->get();
        
        $averageRating = $reviews->avg('rating');
        $totalReviews = $reviews->count();
        
        // توزيع التقييمات (1-5 نجوم)
        $ratingDistribution = [
            5 => $reviews->where('rating', 5)->count(),
            4 => $reviews->where('rating', 4)->count(),
            3 => $reviews->where('rating', 3)->count(),
            2 => $reviews->where('rating', 2)->count(),
            1 => $reviews->where('rating', 1)->count(),
        ];
        
        // إحصائيات السائق
        $stats = [
            'total_trips' => $driver->total_trips,
            'total_earnings' => $driver->total_earnings,
            'average_rating' => $averageRating ? round($averageRating, 2) : 5.0,
            'total_reviews' => $totalReviews,
            'rating_distribution' => $ratingDistribution,
        ];
        
        return Inertia::render('DriverProfile', [
            'driver' => $driver,
            'stats' => $stats,
            'reviews' => $reviews->take(10), // آخر 10 تقييمات
            'canReview' => auth()->check(), // أي مستخدم مسجل
        ]);
    }

    public function storeReview(Request $request, Driver $driver)
    {
        // السماح لأي مستخدم مسجل بالتقييم

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
            'ride_id' => 'nullable|exists:rides,id',
        ]);

        // التحقق من عدم وجود تقييم سابق لنفس الرحلة
        if ($request->ride_id) {
            $existingReview = DriverReview::where('ride_id', $request->ride_id)
                ->where('customer_id', auth()->id())
                ->first();
            
            if ($existingReview) {
                return back()->with('error', 'لقد قمت بتقييم هذه الرحلة مسبقاً');
            }
        }

        // إنشاء التقييم
        DriverReview::create([
            'driver_id' => $driver->id,
            'customer_id' => auth()->id(),
            'ride_id' => $request->ride_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        // تحديث متوسط تقييم السائق
        $this->updateDriverRating($driver);

        return back()->with('success', 'تم إضافة التقييم بنجاح');
    }

    private function updateDriverRating(Driver $driver)
    {
        $averageRating = DriverReview::where('driver_id', $driver->id)
            ->avg('rating');
        
        $driver->update([
            'rating' => $averageRating ? round($averageRating, 2) : 0,
        ]);
    }
}

