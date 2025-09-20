import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { waterbodiesData, WaterBody, getContaminationLevel, getContaminationColor } from '@/data/waterbodies';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  onWaterBodySelect: (waterBody: WaterBody) => void;
  selectedWaterBody: WaterBody | null;
  searchQuery: string;
  filterType: string;
  // moved map controls from inside MapView
  mapMode: 'dark' | 'light' | 'satellite';
  trafficEnabled: boolean;
  contaminationFilter: 'all' | 'safe' | 'low' | 'medium' | 'high' | 'critical';
}

export function MapView({ onWaterBodySelect, selectedWaterBody, searchQuery, filterType, mapMode, trafficEnabled, contaminationFilter }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const tileLayersRef = useRef<Record<string, L.TileLayer>>({} as Record<string, L.TileLayer>);
  const trafficLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      mapRef.current = L.map('map', {
        center: [15.3173, 75.7139], // Center of Karnataka, India
        zoom: 7,
        zoomControl: true,
        attributionControl: true,
        preferCanvas: true,
      });

      // Prepare multiple tile layers
      tileLayersRef.current.dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        maxZoom: 19,
        subdomains: 'abcd'
      });

      tileLayersRef.current.light = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      });

      tileLayersRef.current.satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri',
        maxZoom: 19
      });

  // Add default (dark)
  tileLayersRef.current.dark.addTo(mapRef.current);

      // Traffic/stylistic overlay (not live traffic, but a lines overlay)
      trafficLayerRef.current = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.png', {
        attribution: 'Map overlay © Stamen',
        maxZoom: 20,
        opacity: 0.8
      });

      // Create markers layer group
      markersRef.current = L.layerGroup().addTo(mapRef.current);
    }

    // Clear existing markers
    if (markersRef.current) {
      markersRef.current.clearLayers();
    }

    // Filter water bodies
    const filteredWaterBodies = waterbodiesData.filter((wb) => {
      const matchesSearch = wb.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           wb.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || wb.type === filterType;
      const level = getContaminationLevel(wb.metrics);
      const matchesContamination = contaminationFilter === 'all' || level === contaminationFilter;
      return matchesSearch && matchesType && matchesContamination;
    });

    // Add markers for filtered water bodies
    filteredWaterBodies.forEach((waterBody) => {
      const level = getContaminationLevel(waterBody.metrics);
      const color = getContaminationColor(level);
      
      // Create custom icon based on contamination level
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse" 
                 style="background-color: ${color}; box-shadow: 0 0 10px ${color}50;">
            </div>
            ${selectedWaterBody?._id === waterBody._id ? 
              '<div class="absolute -top-1 -left-1 w-8 h-8 rounded-full border-2 border-white animate-ping" style="background-color: ' + color + '40;"></div>' : ''
            }
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([waterBody.latitude, waterBody.longitude], { 
        icon: customIcon 
      });

      // Create popup content
      const maxMetric = Math.max(...Object.values(waterBody.metrics));
      const maxMetricName = Object.keys(waterBody.metrics).find(
        key => waterBody.metrics[key] === maxMetric
      );

      const popupContent = `
        <div class="p-3 min-w-[200px]">
          <h3 class="font-bold text-lg mb-2">${waterBody.location}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>District:</strong> ${waterBody.district}</p>
            <p><strong>Type:</strong> ${waterBody.type}</p>
            <p><strong>Year:</strong> ${waterBody.year}</p>
            <p><strong>Status:</strong> <span class="px-2 py-1 rounded text-xs font-medium" style="background-color: ${color}20; color: ${color};">${level.toUpperCase()}</span></p>
            <p><strong>Highest:</strong> ${maxMetricName} (${maxMetric} mg/L)</p>
          </div>
          <div class="mt-3 pt-2 border-t border-gray-200">
            <button 
              onclick="window.selectWaterBody('${waterBody._id}')"
              class="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup'
      });

      marker.on('click', () => {
        onWaterBodySelect(waterBody);
      });

      if (markersRef.current) {
        markersRef.current.addLayer(marker);
      }
    });

    // Focus on selected water body
    if (selectedWaterBody && mapRef.current) {
      mapRef.current.setView([selectedWaterBody.latitude, selectedWaterBody.longitude], 8, {
        animate: true,
        duration: 1,
      });
    }

  }, [searchQuery, filterType, selectedWaterBody, onWaterBodySelect, contaminationFilter]);

  // Handle map mode and traffic overlay toggles (props-driven)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const layers = tileLayersRef.current;
    // remove any existing base layers
    Object.values(layers).forEach(layer => {
      if (map.hasLayer(layer)) map.removeLayer(layer);
    });
    const chosen = layers[mapMode];
    if (chosen) chosen.addTo(map);

    if (trafficEnabled && trafficLayerRef.current && !map.hasLayer(trafficLayerRef.current)) {
      trafficLayerRef.current.addTo(map);
    } else if (!trafficEnabled && trafficLayerRef.current && map.hasLayer(trafficLayerRef.current)) {
      map.removeLayer(trafficLayerRef.current);
    }
  }, [mapMode, trafficEnabled]);

  // Global function for popup buttons
  useEffect(() => {
    (window as any).selectWaterBody = (id: string) => {
      const waterBody = waterbodiesData.find(wb => wb._id === id);
      if (waterBody) {
        onWaterBodySelect(waterBody);
      }
    };

    return () => {
      delete (window as any).selectWaterBody;
    };
  }, [onWaterBodySelect]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex-1">
      <div 
        id="map" 
        className="absolute inset-0 z-0 h-full w-full"
        style={{ background: '#1e293b' }}
      />
      
      {/* Map overlay placeholder (controls moved to sidebar) */}
    </div>
  );
}