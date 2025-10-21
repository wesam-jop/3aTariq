<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::where('is_active', true)->get();

        return response()->json([
            'cities' => $cities
        ]);
    }

    public function show(City $city)
    {
        return response()->json([
            'city' => $city->load(['routesFrom', 'routesTo'])
        ]);
    }
}

