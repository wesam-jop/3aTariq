<?php

namespace Database\Seeders;

use App\Models\DriverReview;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        // جلب السائقين الموافق عليهم فقط
        $verifiedDrivers = Driver::where('is_verified', true)->get();
        
        // جلب العملاء
        $customers = User::where('user_type', 'customer')->get();
        
        if ($verifiedDrivers->isEmpty() || $customers->isEmpty()) {
            return;
        }
        
        $comments = [
            'خدمة ممتازة وسائق محترم جداً. وصلت إلى وجهتي بأمان وراحة تامة. أنصح الجميع باستخدام التطبيق!',
            'تجربة رائعة! السائق كان ودوداً والرحلة كانت مريحة وآمنة. سأستخدم الخدمة مرة أخرى بالتأكيد.',
            'سائق محترف وملتزم بالمواعيد. السيارة نظيفة ومريحة. تجربة ممتازة من البداية للنهاية.',
            'خدمة سريعة وموثوقة. السائق كان لطيفاً ومساعداً. وصلت في الوقت المحدد تماماً.',
            'أفضل خدمة توصيل استخدمتها! السائق محترف والتطبيق سهل الاستخدام. شكراً وصلني!',
            'رحلة مريحة وآمنة. السائق يعرف الطرق جيداً ويقود بحذر. أشعر بالأمان معه.',
            'خدمة ممتازة وأسعار معقولة. السائق كان ودوداً وساعدني مع الأمتعة. تجربة رائعة!',
            'سريع ومحترف! وصلت في الوقت المحدد والسيارة كانت نظيفة. سأستخدم الخدمة مجدداً.',
        ];

        foreach ($verifiedDrivers as $driver) {
            // إضافة 3-7 تقييمات لكل سائق
            $reviewCount = rand(3, 7);
            
            for ($i = 0; $i < $reviewCount; $i++) {
                $customer = $customers->random();
                
                DriverReview::create([
                    'driver_id' => $driver->id,
                    'customer_id' => $customer->id,
                    'ride_id' => null,
                    'rating' => rand(4, 5), // تقييمات إيجابية
                    'comment' => $comments[array_rand($comments)],
                    'created_at' => now()->subDays(rand(1, 30)),
                ]);
            }
            
            // تحديث متوسط تقييم السائق
            $avgRating = DriverReview::where('driver_id', $driver->id)->avg('rating');
            $driver->update(['rating' => $avgRating ? round($avgRating, 2) : 0]);
        }
    }
}

