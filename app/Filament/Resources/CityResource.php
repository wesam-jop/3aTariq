<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CityResource\Pages;
use App\Models\City;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CityResource extends Resource
{
    protected static ?string $model = City::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';
    
    protected static ?string $navigationLabel = 'المدن';
    
    protected static ?string $modelLabel = 'مدينة';
    
    protected static ?string $pluralModelLabel = 'المدن';
    
    protected static ?string $navigationGroup = 'الإعدادات';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('معلومات المدينة')
                    ->schema([
                        Forms\Components\TextInput::make('name_ar')
                            ->label('الاسم بالعربية')
                            ->required()
                            ->maxLength(255)
                            ->columnSpan(1),
                        Forms\Components\TextInput::make('name_en')
                            ->label('الاسم بالإنجليزية')
                            ->required()
                            ->maxLength(255)
                            ->columnSpan(1),
                        Forms\Components\Toggle::make('is_active')
                            ->label('نشط')
                            ->default(true)
                            ->columnSpan(2),
                    ])
                    ->columns(2),
                
                Forms\Components\Section::make('الموقع على الخريطة')
                    ->description('انقر على الخريطة لتحديد موقع المدينة')
                    ->schema([
                        Forms\Components\View::make('filament.forms.components.map-picker')
                            ->viewData([
                                'latitudeField' => 'latitude',
                                'longitudeField' => 'longitude',
                            ]),
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('latitude')
                                    ->label('خط العرض')
                                    ->numeric()
                                    ->step(0.000001)
                                    ->disabled()
                                    ->dehydrated()
                                    ->placeholder('سيتم ملؤه من الخريطة'),
                                Forms\Components\TextInput::make('longitude')
                                    ->label('خط الطول')
                                    ->numeric()
                                    ->step(0.000001)
                                    ->disabled()
                                    ->dehydrated()
                                    ->placeholder('سيتم ملؤه من الخريطة'),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name_ar')
                    ->label('الاسم بالعربية')
                    ->searchable(),
                Tables\Columns\TextColumn::make('name_en')
                    ->label('الاسم بالإنجليزية')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('نشط')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ الإضافة')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCities::route('/'),
            'create' => Pages\CreateCity::route('/create'),
            'edit' => Pages\EditCity::route('/{record}/edit'),
        ];
    }
}

