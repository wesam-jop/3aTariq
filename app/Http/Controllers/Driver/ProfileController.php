<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function edit()
    {
        $driver = auth()->user()->driver;
        $cities = City::where('is_active', true)
            ->orderBy('name_ar')
            ->get()
            ->map(function ($city) {
                return [
                    'id' => $city->id,
                    'name' => $city->name_ar,
                    'name_ar' => $city->name_ar,
                    'name_en' => $city->name_en,
                ];
            });
        
        return Inertia::render('Driver/Profile', [
            'driver' => $driver->load(['user', 'cities']),
            'cities' => $cities,
            'selectedCities' => $driver->cities->pluck('id')->toArray(),
        ]);
    }

    public function update(Request $request)
    {
        $driver = auth()->user()->driver;
        
        $request->validate([
            'vehicle_type' => 'required|in:car,motorcycle,van,truck',
            'vehicle_model' => 'required|string|max:255',
            'vehicle_plate_number' => 'required|string|max:255|unique:drivers,vehicle_plate_number,' . $driver->id,
            'vehicle_color' => 'nullable|string|max:255',
            'vehicle_year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'vehicle_image' => 'nullable|image|max:2048',
            'cities' => 'required|array|min:1',
            'cities.*' => 'exists:cities,id',
        ]);

        // تحديث معلومات السيارة
        $data = $request->only([
            'vehicle_type',
            'vehicle_model',
            'vehicle_plate_number',
            'vehicle_color',
            'vehicle_year',
        ]);

        // رفع صورة السيارة
        if ($request->hasFile('vehicle_image')) {
            // حذف الصورة القديمة
            if ($driver->vehicle_image) {
                Storage::disk('public')->delete($driver->vehicle_image);
            }
            $data['vehicle_image'] = $request->file('vehicle_image')->store('vehicles', 'public');
        }

        $driver->update($data);

        // تحديث المدن
        $driver->cities()->sync($request->cities);

        return back()->with('success', 'تم تحديث الملف الشخصي بنجاح');
    }
}

