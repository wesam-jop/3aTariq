<div x-data="mapPicker(@js($getRecord()))" x-init="initMap()" class="space-y-4">
    <div 
        id="map" 
        style="height: 400px; border-radius: 0.5rem; border: 2px solid #e5e7eb;"
        class="shadow-sm"
    ></div>
    
    <div class="flex items-center gap-2 text-sm text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>انقر على الخريطة لتحديد موقع المدينة</span>
    </div>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
    function mapPicker(record) {
        return {
            map: null,
            marker: null,
            
            initMap() {
                // الموقع الافتراضي: دمشق، سوريا
                const defaultLat = record?.latitude || 33.5138;
                const defaultLng = record?.longitude || 36.2765;
                const defaultZoom = 7;
                
                // إنشاء الخريطة
                this.map = L.map('map').setView([defaultLat, defaultLng], defaultZoom);
                
                // إضافة طبقة OpenStreetMap
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19,
                }).addTo(this.map);
                
                // إضافة Marker إذا كان هناك موقع محفوظ
                if (record?.latitude && record?.longitude) {
                    this.addMarker(record.latitude, record.longitude);
                }
                
                // عند النقر على الخريطة
                this.map.on('click', (e) => {
                    this.updateLocation(e.latlng.lat, e.latlng.lng);
                });
                
                // إصلاح عرض الخريطة
                setTimeout(() => {
                    this.map.invalidateSize();
                }, 100);
            },
            
            addMarker(lat, lng) {
                // حذف Marker القديم إن وجد
                if (this.marker) {
                    this.map.removeLayer(this.marker);
                }
                
                // إضافة Marker جديد
                this.marker = L.marker([lat, lng], {
                    draggable: true
                }).addTo(this.map);
                
                // عند سحب Marker
                this.marker.on('dragend', (e) => {
                    const position = e.target.getLatLng();
                    this.updateLocation(position.lat, position.lng);
                });
                
                // تحريك الخريطة للموقع
                this.map.setView([lat, lng], 13);
            },
            
            updateLocation(lat, lng) {
                // تحديث الحقول
                const latInput = document.querySelector('input[wire\\:model="data.latitude"]') || 
                                 document.querySelector('input[name="latitude"]');
                const lngInput = document.querySelector('input[wire\\:model="data.longitude"]') || 
                                 document.querySelector('input[name="longitude"]');
                
                if (latInput) {
                    latInput.value = lat.toFixed(6);
                    latInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                
                if (lngInput) {
                    lngInput.value = lng.toFixed(6);
                    lngInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                
                // إضافة/تحديث Marker
                this.addMarker(lat, lng);
                
                // إظهار إشعار
                this.showNotification(lat, lng);
            },
            
            showNotification(lat, lng) {
                // يمكن استخدام Filament Notifications هنا
                console.log(`تم تحديد الموقع: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            }
        }
    }
</script>

<style>
    /* تخصيص أيقونة Marker */
    .leaflet-marker-icon {
        filter: hue-rotate(120deg);
    }
    
    /* تحسين شكل الخريطة */
    .leaflet-container {
        font-family: inherit;
    }
    
    .leaflet-popup-content {
        direction: rtl;
        text-align: right;
    }
</style>

