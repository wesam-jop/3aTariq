<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DriverResource\Pages;
use App\Models\Driver;
use App\Models\City;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Builder;

class DriverResource extends Resource
{
    protected static ?string $model = Driver::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    
    protected static ?string $navigationLabel = 'السائقون';
    
    protected static ?string $modelLabel = 'سائق';
    
    protected static ?string $pluralModelLabel = 'السائقون';
    
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('معلومات السائق')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('المستخدم')
                            ->relationship('user', 'name')
                            ->required()
                            ->searchable()
                            ->preload(),
                        
                        Forms\Components\TextInput::make('license_number')
                            ->label('رقم رخصة القيادة')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(191),
                        
                        Forms\Components\DatePicker::make('license_expiry')
                            ->label('تاريخ انتهاء الرخصة')
                            ->required()
                            ->native(false),
                    ])->columns(3),

                Forms\Components\Section::make('صور المستندات')
                    ->schema([
                        Forms\Components\FileUpload::make('license_image')
                            ->label('صورة رخصة القيادة')
                            ->image()
                            ->imageEditor()
                            ->directory('licenses')
                            ->visibility('public'),
                        
                        Forms\Components\FileUpload::make('id_card_front')
                            ->label('صورة الهوية - الوجه الأمامي')
                            ->image()
                            ->imageEditor()
                            ->directory('id_cards')
                            ->visibility('public'),
                        
                        Forms\Components\FileUpload::make('id_card_back')
                            ->label('صورة الهوية - الوجه الخلفي')
                            ->image()
                            ->imageEditor()
                            ->directory('id_cards')
                            ->visibility('public'),
                    ])->columns(3),

                Forms\Components\Section::make('معلومات السيارة')
                    ->schema([
                        Forms\Components\Select::make('vehicle_type')
                            ->label('نوع السيارة')
                            ->options([
                                'car' => 'سيارة',
                                'van' => 'فان',
                                'motorcycle' => 'دراجة نارية',
                                'truck' => 'شاحنة',
                            ])
                            ->required(),
                        
                        Forms\Components\TextInput::make('vehicle_model')
                            ->label('موديل السيارة')
                            ->maxLength(191),
                        
                        Forms\Components\TextInput::make('vehicle_plate_number')
                            ->label('رقم اللوحة')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(191),
                        
                        Forms\Components\TextInput::make('vehicle_color')
                            ->label('لون السيارة')
                            ->maxLength(191),
                        
                        Forms\Components\TextInput::make('vehicle_year')
                            ->label('سنة الصنع')
                            ->numeric()
                            ->minValue(1900)
                            ->maxValue(date('Y') + 1),
                        
                        Forms\Components\FileUpload::make('vehicle_image')
                            ->label('صورة السيارة')
                            ->image()
                            ->imageEditor()
                            ->directory('vehicles')
                            ->visibility('public'),
                    ])->columns(3),

                Forms\Components\Section::make('مدن العمل')
                    ->schema([
                        Forms\Components\Select::make('cities')
                            ->label('المدن التي يعمل بها السائق')
                            ->multiple()
                            ->relationship('cities', 'name')
                            ->preload()
                            ->required(),
                    ]),

                Forms\Components\Section::make('الحالة والإحصائيات')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->label('الحالة')
                            ->options([
                                'available' => 'متاح',
                                'busy' => 'مشغول',
                                'offline' => 'غير متصل',
                            ])
                            ->required()
                            ->default('offline'),
                        
                        Forms\Components\TextInput::make('rating')
                            ->label('التقييم')
                            ->numeric()
                            ->default(0)
                            ->disabled()
                            ->dehydrated(false),
                        
                        Forms\Components\TextInput::make('total_trips')
                            ->label('إجمالي الرحلات')
                            ->numeric()
                            ->default(0)
                            ->disabled()
                            ->dehydrated(false),
                        
                        Forms\Components\TextInput::make('total_earnings')
                            ->label('إجمالي الأرباح ($)')
                            ->numeric()
                            ->default(0)
                            ->disabled()
                            ->dehydrated(false),
                        
                        Forms\Components\Toggle::make('is_verified')
                            ->label('موافق عليه')
                            ->default(false)
                            ->helperText('تفعيل هذا الخيار يسمح للسائق بالدخول إلى النظام'),
                        
                        Forms\Components\DateTimePicker::make('verified_at')
                            ->label('تاريخ الموافقة')
                            ->disabled()
                            ->dehydrated(false),
                    ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('user.name')
                    ->label('اسم السائق')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                
                Tables\Columns\TextColumn::make('user.phone')
                    ->label('رقم الهاتف')
                    ->searchable(),
                
                Tables\Columns\TextColumn::make('vehicle_type')
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
                
                Tables\Columns\TextColumn::make('vehicle_model')
                    ->label('الموديل')
                    ->searchable()
                    ->toggleable(),
                
                Tables\Columns\TextColumn::make('vehicle_plate_number')
                    ->label('رقم اللوحة')
                    ->searchable()
                    ->copyable()
                    ->toggleable(),
                
                Tables\Columns\TextColumn::make('status')
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
                
                Tables\Columns\TextColumn::make('rating')
                    ->label('التقييم')
                    ->numeric(2)
                    ->sortable()
                    ->icon('heroicon-m-star')
                    ->iconColor('warning'),
                
                Tables\Columns\IconColumn::make('is_verified')
                    ->label('موافق عليه')
                    ->boolean()
                    ->sortable()
                    ->action(
                        Tables\Actions\Action::make('toggleVerification')
                            ->label('تغيير حالة الموافقة')
                            ->icon('heroicon-m-check-circle')
                            ->requiresConfirmation()
                            ->action(function (Driver $record) {
                                $newStatus = !$record->is_verified;
                                $record->update([
                                    'is_verified' => $newStatus,
                                    'verified_at' => $newStatus ? now() : null,
                                ]);
                                
                                Notification::make()
                                    ->title($newStatus ? 'تم قبول السائق' : 'تم إلغاء قبول السائق')
                                    ->success()
                                    ->send();
                            })
                    ),
                
                Tables\Columns\TextColumn::make('verified_at')
                    ->label('تاريخ الموافقة')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ التسجيل')
                    ->dateTime()
                    ->sortable()
                    ->since()
                    ->toggleable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('is_verified')
                    ->label('حالة الموافقة')
                    ->options([
                        1 => 'موافق عليه',
                        0 => 'في انتظار الموافقة',
                    ]),
                
                Tables\Filters\SelectFilter::make('status')
                    ->label('الحالة')
                    ->options([
                        'available' => 'متاح',
                        'busy' => 'مشغول',
                        'offline' => 'غير متصل',
                    ]),
                
                Tables\Filters\SelectFilter::make('vehicle_type')
                    ->label('نوع السيارة')
                    ->options([
                        'car' => 'سيارة',
                        'van' => 'فان',
                        'motorcycle' => 'دراجة نارية',
                        'truck' => 'شاحنة',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->label('عرض'),
                
                Tables\Actions\Action::make('approve')
                    ->label('موافقة')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('موافقة على السائق')
                    ->modalDescription('هل أنت متأكد من الموافقة على هذا السائق؟ سيتمكن من الدخول إلى النظام والبدء بالعمل.')
                    ->action(function (Driver $record) {
                        $record->update([
                            'is_verified' => true,
                            'verified_at' => now(),
                            'status' => 'available',
                        ]);
                        
                        Notification::make()
                            ->title('تم قبول السائق بنجاح')
                            ->success()
                            ->body('السائق ' . $record->user->name . ' يمكنه الآن الدخول إلى النظام')
                            ->send();
                    })
                    ->visible(fn (Driver $record) => !$record->is_verified),
                
                Tables\Actions\Action::make('reject')
                    ->label('رفض')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->modalHeading('رفض السائق')
                    ->modalDescription('هل أنت متأكد من رفض هذا السائق؟')
                    ->action(function (Driver $record) {
                        $record->update([
                            'is_verified' => false,
                            'verified_at' => null,
                            'status' => 'offline',
                        ]);
                        
                        Notification::make()
                            ->title('تم رفض السائق')
                            ->warning()
                            ->send();
                    })
                    ->visible(fn (Driver $record) => $record->is_verified),
                
                Tables\Actions\EditAction::make()
                    ->label('تعديل'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('approve_all')
                        ->label('موافقة على المحدد')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                $record->update([
                                    'is_verified' => true,
                                    'verified_at' => now(),
                                    'status' => 'available',
                                ]);
                            }
                            
                            Notification::make()
                                ->title('تم قبول السائقين المحددين')
                                ->success()
                                ->send();
                        }),
                    
                    Tables\Actions\DeleteBulkAction::make()
                        ->label('حذف'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDrivers::route('/'),
            'create' => Pages\CreateDriver::route('/create'),
            'edit' => Pages\EditDriver::route('/{record}/edit'),
            'view' => Pages\ViewDriver::route('/{record}'),
        ];
    }
    
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('is_verified', false)->count();
    }
    
    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}
