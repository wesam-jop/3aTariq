<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index(Request $request)
    {
        $query = Route::with(['fromCity', 'toCity'])->where('is_active', true);

        if ($request->has('from_city_id')) {
            $query->where('from_city_id', $request->from_city_id);
        }

        if ($request->has('to_city_id')) {
            $query->where('to_city_id', $request->to_city_id);
        }

        $routes = $query->get();

        return response()->json([
            'routes' => $routes
        ]);
    }

    public function show(Route $route)
    {
        return response()->json([
            'route' => $route->load(['fromCity', 'toCity'])
        ]);
    }
}

