<?php

namespace App\Http\Controllers;

use App\Models\SavedAddress;
use Illuminate\Http\Request;

class SavedAddressController extends Controller
{
    /**
     * Get all saved addresses for the authenticated user
     */
    public function index(Request $request)
    {
        $addresses = $request->user()->savedAddresses()->latest()->get();
        return response()->json($addresses);
    }

    /**
     * Store a new saved address
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'is_default' => 'boolean',
        ]);

        // If this is set as default, unset other defaults
        if ($validated['is_default'] ?? false) {
            $request->user()->savedAddresses()->update(['is_default' => false]);
        }

        $address = $request->user()->savedAddresses()->create($validated);

        return response()->json($address, 201);
    }

    /**
     * Update a saved address
     */
    public function update(Request $request, SavedAddress $savedAddress)
    {
        // Ensure the address belongs to the authenticated user
        if ($savedAddress->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'is_default' => 'boolean',
        ]);

        // If this is set as default, unset other defaults
        if (($validated['is_default'] ?? false) && !$savedAddress->is_default) {
            $request->user()->savedAddresses()->update(['is_default' => false]);
        }

        $savedAddress->update($validated);

        return response()->json($savedAddress);
    }

    /**
     * Delete a saved address
     */
    public function destroy(Request $request, SavedAddress $savedAddress)
    {
        // Ensure the address belongs to the authenticated user
        if ($savedAddress->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $savedAddress->delete();

        return response()->json(['message' => 'Address deleted successfully']);
    }

    /**
     * Set an address as default
     */
    public function setDefault(Request $request, SavedAddress $savedAddress)
    {
        // Ensure the address belongs to the authenticated user
        if ($savedAddress->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Unset all other defaults
        $request->user()->savedAddresses()->update(['is_default' => false]);

        // Set this one as default
        $savedAddress->update(['is_default' => true]);

        return response()->json($savedAddress);
    }
}
