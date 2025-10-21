<?php

namespace App\Filament\Resources\DriverResource\Pages;

use App\Filament\Resources\DriverResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Components\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListDrivers extends ListRecords
{
    protected static string $resource = DriverResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('إضافة سائق'),
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => Tab::make('الكل')
                ->badge(fn () => \App\Models\Driver::count()),
            
            'pending' => Tab::make('في انتظار الموافقة')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('is_verified', false))
                ->badge(fn () => \App\Models\Driver::where('is_verified', false)->count())
                ->badgeColor('warning'),
            
            'approved' => Tab::make('موافق عليهم')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('is_verified', true))
                ->badge(fn () => \App\Models\Driver::where('is_verified', true)->count())
                ->badgeColor('success'),
            
            'available' => Tab::make('المتاحون')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', 'available')->where('is_verified', true))
                ->badge(fn () => \App\Models\Driver::where('status', 'available')->where('is_verified', true)->count())
                ->badgeColor('info'),
        ];
    }
}
