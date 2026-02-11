<?php

namespace Database\Seeders;

use App\Models\Governorate;
use App\Models\Region;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Governorates
        $governorates = [
            ['name' => 'دمشق'],
            ['name' => 'ريف دمشق'],
            ['name' => 'حلب'],
            ['name' => 'حمص'],
            ['name' => 'حماه'],
            ['name' => 'اللاذقية'],
            ['name' => 'طرطوس'],
            ['name' => 'دير الزور'],
            ['name' => 'الرقة'],
            ['name' => 'إدلب'],
            ['name' => 'حلوان'],
            ['name' => 'السويداء'],
            ['name' => 'درعا'],
            ['name' => 'القنيطرة'],
        ];

        foreach ($governorates as $govData) {
            $governorate = Governorate::create($govData);
            
            // Create Regions for each Governorate
            $regions = [];
            switch ($governorate->name) {
                case 'دمشق':
                    $regions = ['مركز المدينة', 'مزة', 'برزة', 'القصبة', 'الدمر', 'الميدان'];
                    break;
                case 'ريف دمشق':
                    $regions = ['الزبداني', 'داريا', 'القدم', 'المليحة', 'حرستا', 'يشفين'];
                    break;
                case 'حلب':
                    $regions = ['市中心', 'البياضة', 'الأنصار', 'الشيخ', 'ال Carlton', 'الراشدين'];
                    break;
                case 'حمص':
                    $regions = ['الخربة', 'التل', 'الرستن', 'القصير', 'ت defer', 'الحسكة'];
                    break;
                case 'حماه':
                    $regions = ['الميادين', 'السقيلبية', 'مرتبتا', 'الزيات', 'الكرنزة', 'النصيرية'];
                    break;
                case 'اللاذقية':
                    $regions = ['市中心', 'جبلة', 'الحيرة', 'الصافية', 'العنصر', 'الحمرا'];
                    break;
                case 'طرطوس':
                    $regions = ['市中心', 'بانياس', 'الدريكيش', 'العامرية', 'الشيخ', 'الصويفية'];
                    break;
                case 'دير الزور':
                    $regions = ['市中心', 'الميادين', 'البوكمال', 'القورية', 'التيم', 'الصباح'];
                    break;
                case 'الرقة':
                    $regions = ['市中心', 'التبينة', 'الثويرية', 'الصباح', 'التل', 'ال Carlton'];
                    break;
                case 'إدلب':
                    $regions = ['市中心', 'سرمدا', 'جسر الشغور', 'عين العرب', 'ال Carlton', 'الشيخ'];
                    break;
                case 'حلوان':
                    $regions = ['市中心', 'ال Carlton', 'الصباح', 'التل', 'الثويرية', 'التبينة'];
                    break;
                case 'السويداء':
                    $regions = ['市中心', 'ال Carlton', 'الصباح', 'التل', 'الثويرية', 'التبينة'];
                    break;
                case 'درعا':
                    $regions = ['市中心', 'ال Carlton', 'الصباح', 'التل', 'الثويرية', 'التبينة'];
                    break;
                case 'القنيطرة':
                    $regions = ['市中心', 'ال Carlton', 'الصباح', 'التل', 'الثويرية', 'التبينة'];
                    break;
            }

            foreach ($regions as $regionName) {
                Region::create([
                    'name' => $regionName,
                    'governorate_id' => $governorate->id
                ]);
            }
        }
    }
}