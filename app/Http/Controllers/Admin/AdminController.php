<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\Governorate;
use App\Models\Region;


class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'totalUsers' => User::count(),
            'totalDrivers' => User::where('role', 'driver')->count(),
            'totalCustomers' => User::where('role', 'customer')->count(),
            'totalAdmins' => User::where('role', 'admin')->count(),
            'totalOrders' => Order::count(),
            'pendingReviewOrders' => Order::where('status', 'pending_review')->count(),
            'pendingOrders' => Order::where('status', 'pending')->count(),
            'activeOrders' => Order::where('status', 'active')->count(),

            'completedOrders' => Order::where('status', 'delivered')->orWhere('status', 'completed')->count(),
            'totalTrips' => Trip::count(),
            'activeTrips' => Trip::where('status', 'active')->count(),
            'totalRevenue' => Order::whereIn('status', ['delivered', 'completed'])->sum('price') ?? 0,
            'recentUsers' => User::latest()->take(5)->get(),
            'recentOrders' => Order::with(['customer', 'driver'])->latest()->take(5)->get(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }

    public function usersIndex()
    {
        $users = User::with(['governorate', 'region'])->latest()->paginate(10);
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:users,phone',
            'email' => 'nullable|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,customer,driver',
        ]);

        User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_verified' => true,
            'is_active' => true,
        ]);

        return redirect()->back()->with('success', 'تم إنشاء المستخدم بنجاح');
    }

    public function toggleUserStatus(User $user)
    {
        $user->is_active = !$user->is_active;
        $user->save();

        return redirect()->back()->with('success', 'تم تحديث حالة المستخدم');
    }

    public function verifyDriver(User $user)
    {
        if ($user->role !== 'driver') {
            return redirect()->back()->with('error', 'هذا المستخدم ليس سائقاً');
        }
        
        $user->is_approved = true;
        $user->save();

        return redirect()->back()->with('success', 'تم توثيق الحساب بنجاح');
    }

    public function getUserDetails(User $user)
    {
        $user->load(['governorate', 'region']);
        \Log::info('User details requested', [
            'user_id' => $user->id,
            'phone' => $user->phone,
            'identity_image' => $user->identity_image,
            'avatar' => $user->avatar,
            'has_identity' => !empty($user->identity_image),
            'has_avatar' => !empty($user->avatar)
        ]);
        return response()->json($user);
    }

    public function ordersIndex(Request $request)
    {
        $status = $request->get('status', 'pending_review');
        $orders = Order::where('status', $status)
            ->with(['customer', 'driver', 'governorate', 'region'])
            ->latest()
            ->paginate(10);


        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'currentStatus' => $status
        ]);
    }

    public function approveOrder(Order $order)
    {
        if ($order->status !== 'pending_review') {
            return redirect()->back()->with('error', 'الطلب ليس في حالة مراجعة');
        }

        $order->update([
            'status' => 'pending'
        ]);

        return redirect()->back()->with('success', 'تمت الموافقة على الطلب بنجاح، وهو الآن متاح للسائقين');
    }

    // Location Management
    public function locationsIndex()
    {
        $governorates = Governorate::with('regions')->latest()->get();
        return Inertia::render('Admin/Locations/Index', [
            'governorates' => $governorates,
        ]);
    }

    public function storeGovernorate(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        Governorate::create($request->all());
        return redirect()->back()->with('success', 'تم إضافة المحافظة بنجاح');
    }

    public function deleteGovernorate(Governorate $governorate)
    {
        $governorate->delete();
        return redirect()->back()->with('success', 'تم حذف المحافظة بنجاح');
    }

    public function storeRegion(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'governorate_id' => 'required|exists:governorates,id',
        ]);
        Region::create($request->all());
        return redirect()->back()->with('success', 'تم إضافة المنطقة بنجاح');
    }

    public function deleteRegion(Region $region)
    {
        $region->delete();
        return redirect()->back()->with('success', 'تم حذف المنطقة بنجاح');
    }
}

