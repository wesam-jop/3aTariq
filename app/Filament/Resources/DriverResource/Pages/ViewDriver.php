<?php

namespace App\Filament\Resources\DriverResource\Pages;

use App\Filament\Resources\DriverResource;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components;
use Filament\Actions;
use Filament\Notifications\Notification;

class ViewDriver extends ViewRecord
{
    protected static string $resource = DriverResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('approve')
                ->label('موافقة')
                ->icon('heroicon-o-check-circle')
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('موافقة على السائق')
                ->modalDescription('هل أنت متأكد من الموافقة على هذا السائق؟ سيتمكن من الدخول إلى النظام والبدء بالعمل.')
                ->action(function () {
                    $this->record->update([
                        'is_verified' => true,
                        'verified_at' => now(),
                        'status' => 'available',
                    ]);
                    
                    Notification::make()
                        ->title('تم قبول السائق بنجاح')
                        ->success()
                        ->body('السائق ' . $this->record->user->name . ' يمكنه الآن الدخول إلى النظام')
                        ->send();
                        
                    return redirect()->route('filament.admin.resources.drivers.index');
                })
                ->visible(!$this->record->is_verified),
            
            Actions\Action::make('reject')
                ->label('رفض')
                ->icon('heroicon-o-x-circle')
                ->color('danger')
                ->requiresConfirmation()
                ->action(function () {
                    $this->record->update([
                        'is_verified' => false,
                        'verified_at' => null,
                        'status' => 'offline',
                    ]);
                    
                    Notification::make()
                        ->title('تم رفض السائق')
                        ->warning()
                        ->send();
                        
                    return redirect()->route('filament.admin.resources.drivers.index');
                })
                ->visible($this->record->is_verified),
            
            Actions\EditAction::make()
                ->label('تعديل'),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Components\Section::make('معلومات السائق')
                    ->schema([
                        Components\TextEntry::make('user.name')
                            ->label('الاسم'),
                        Components\TextEntry::make('user.email')
                            ->label('البريد الإلكتروني'),
                        Components\TextEntry::make('user.phone')
                            ->label('رقم الهاتف'),
                        Components\TextEntry::make('license_number')
                            ->label('رقم رخصة القيادة')
                            ->copyable(),
                        Components\TextEntry::make('license_expiry')
                            ->label('تاريخ انتهاء الرخصة')
                            ->date(),
                    ])->columns(3),

                Components\Section::make('صور المستندات')
                    ->schema([
                        Components\ImageEntry::make('license_image')
                            ->label('صورة رخصة القيادة')
                            ->defaultImageUrl(url('/images/placeholder.png')),
                        Components\ImageEntry::make('id_card_front')
                            ->label('صورة الهوية - الوجه الأمامي')
                            ->defaultImageUrl(url('/images/placeholder.png')),
                        Components\ImageEntry::make('id_card_back')
                            ->label('صورة الهوية - الوجه الخلفي')
                            ->defaultImageUrl(url('/images/placeholder.png')),
                    ])->columns(3),

                Components\Section::make('معلومات السيارة')
                    ->schema([
                        Components\TextEntry::make('vehicle_type')
                            ->label('نوع السيارة')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'car' => 'info',
                                'van' => 'success',
                                'motorcycle' => 'warning',
                                'truck' => 'danger',
                            })
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'car' => 'سيارة',
                                'van' => 'فان',
                                'motorcycle' => 'دراجة نارية',
                                'truck' => 'شاحنة',
                                default => $state,
                            }),
                        Components\TextEntry::make('vehicle_model')
                            ->label('الموديل'),
                        Components\TextEntry::make('vehicle_plate_number')
                            ->label('رقم اللوحة')
                            ->copyable()
                            ->badge(),
                        Components\TextEntry::make('vehicle_color')
                            ->label('اللون'),
                        Components\TextEntry::make('vehicle_year')
                            ->label('سنة الصنع'),
                        Components\ImageEntry::make('vehicle_image')
                            ->label('صورة السيارة')
                            ->defaultImageUrl(url('/images/placeholder.png')),
                    ])->columns(3),

                Components\Section::make('مدن العمل')
                    ->schema([
                        Components\TextEntry::make('cities.name')
                            ->label('المدن')
                            ->badge()
                            ->separator(','),
                    ]),

                Components\Section::make('الحالة والإحصائيات')
                    ->schema([
                        Components\TextEntry::make('status')
                            ->label('الحالة')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'available' => 'success',
                                'busy' => 'warning',
                                'offline' => 'gray',
                            })
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'available' => 'متاح',
                                'busy' => 'مشغول',
                                'offline' => 'غير متصل',
                                default => $state,
                            }),
                        Components\IconEntry::make('is_verified')
                            ->label('موافق عليه')
                            ->boolean(),
                        Components\TextEntry::make('verified_at')
                            ->label('تاريخ الموافقة')
                            ->dateTime()
                            ->placeholder('لم تتم الموافقة بعد'),
                        Components\TextEntry::make('rating')
                            ->label('التقييم')
                            ->numeric(2)
                            ->icon('heroicon-m-star')
                            ->iconColor('warning'),
                        Components\TextEntry::make('total_trips')
                            ->label('إجمالي الرحلات')
                            ->numeric(),
                        Components\TextEntry::make('total_earnings')
                            ->label('إجمالي الأرباح')
                            ->money('USD'),
                    ])->columns(3),

                Components\Section::make('معلومات إضافية')
                    ->schema([
                        Components\TextEntry::make('created_at')
                            ->label('تاريخ التسجيل')
                            ->dateTime(),
                        Components\TextEntry::make('updated_at')
                            ->label('آخر تحديث')
                            ->dateTime(),
                    ])->columns(2),
            ]);
    }
}

