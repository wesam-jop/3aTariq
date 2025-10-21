<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Filament\Resources\SettingResource\RelationManagers;
use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SettingResource extends Resource
{
    protected static ?string $model = Setting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    
    protected static ?string $navigationLabel = 'الإعدادات';
    
    protected static ?string $modelLabel = 'إعداد';
    
    protected static ?string $pluralModelLabel = 'الإعدادات';
    
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('key')
                    ->label('المفتاح')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255)
                    ->disabled(fn($record) => $record !== null), // لا يمكن تعديل المفتاح بعد الإنشاء
                    
                Forms\Components\Textarea::make('value')
                    ->label('القيمة')
                    ->required()
                    ->rows(3)
                    ->helperText(fn($record) => match($record?->key) {
                        'price_per_km' => 'السعر القديم (لا يستخدم)',
                        'private_price_per_km' => 'السعر بالدولار للكيلومتر الواحد - نقل خاص (مثال: 1.00)',
                        'public_price_per_km' => 'السعر بالدولار للكيلومتر الواحد - نقل عام (مثال: 0.50)',
                        default => 'أدخل قيمة الإعداد'
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->label('المفتاح')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('primary'),
                    
                Tables\Columns\TextColumn::make('value')
                    ->label('القيمة')
                    ->searchable()
                    ->formatStateUsing(fn($record) => match($record->key) {
                        'price_per_km' => number_format($record->value, 0) . ' ل.س / كم (قديم)',
                        'private_price_per_km' => '$' . number_format($record->value, 2) . ' / كم (نقل خاص)',
                        'public_price_per_km' => '$' . number_format($record->value, 2) . ' / كم (نقل عام)',
                        default => $record->value
                    })
                    ->badge()
                    ->color(fn($record) => match($record->key) {
                        'private_price_per_km' => 'warning',
                        'public_price_per_km' => 'success',
                        default => 'gray'
                    }),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ الإنشاء')
                    ->dateTime('Y-m-d H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('آخر تحديث')
                    ->dateTime('Y-m-d H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListSettings::route('/'),
            'create' => Pages\CreateSetting::route('/create'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
        ];
    }
}
