import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { MapView } from './MapView';
import { DetailsPanel } from './DetailsPanel';
import { WaterBody } from '@/data/waterbodies';

export function Dashboard() {
  const [selectedWaterBody, setSelectedWaterBody] = useState<WaterBody | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [mapMode, setMapMode] = useState<'dark' | 'light' | 'satellite'>('dark');
  const [showTraffic, setShowTraffic] = useState<boolean>(false);
  const [contaminationFilter, setContaminationFilter] = useState<'all' | 'safe' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const handleWaterBodySelect = (waterBody: WaterBody) => {
    setSelectedWaterBody(waterBody);
  };

  const handleCloseDetails = () => {
    setSelectedWaterBody(null);
  };

  return (
    <div className="h-screen bg-background text-foreground">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <DashboardSidebar
            onWaterBodySelect={handleWaterBodySelect}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterType={filterType}
            onFilterChange={setFilterType}
            selectedWaterBody={selectedWaterBody}
            mapMode={mapMode}
            setMapMode={setMapMode}
            trafficEnabled={showTraffic}
            setTrafficEnabled={setShowTraffic}
            contaminationFilter={contaminationFilter}
            setContaminationFilter={setContaminationFilter}
          />
          
          <main className="flex-1 relative h-full">
            <MapView
              onWaterBodySelect={handleWaterBodySelect}
              selectedWaterBody={selectedWaterBody}
              searchQuery={searchQuery}
              filterType={filterType}
              mapMode={mapMode}
              trafficEnabled={showTraffic}
              contaminationFilter={contaminationFilter}
            />
            
            <AnimatePresence>
              {selectedWaterBody && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute top-0 right-0 w-96 h-full bg-card/95 backdrop-blur-sm border-l border-border shadow-2xl z-[1000]"
                >
                  <DetailsPanel
                    waterBody={selectedWaterBody}
                    onClose={handleCloseDetails}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
