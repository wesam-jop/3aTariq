<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtpCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone',
        'code',
        'is_verified',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'expires_at' => 'datetime',
        ];
    }

    // Helper Methods
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isVerified(): bool
    {
        return $this->is_verified;
    }

    public static function generate(string $phone): self
    {
        // إنشاء كود OTP عشوائي
        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        return static::create([
            'phone' => $phone,
            'code' => $code,
            'expires_at' => now()->addMinutes(5),
        ]);
    }

    public function verify(string $code): bool
    {
        if ($this->isExpired() || $this->isVerified()) {
            return false;
        }

        if ($this->code === $code) {
            $this->update(['is_verified' => true]);
            return true;
        }

        return false;
    }
}

