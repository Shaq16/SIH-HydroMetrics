import { useState, useRef } from 'react';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
import ThemeToggle from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { waterbodiesData, WaterBody, getContaminationLevel } from '@/data/waterbodies';
import { useNavigate } from 'react-router-dom';

interface DashboardSidebarProps {
  onWaterBodySelect: (waterBody: WaterBody) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: string;
  onFilterChange: (type: string) => void;
  selectedWaterBody: WaterBody | null;
  // map controls
  mapMode: 'dark' | 'light' | 'satellite';
  setMapMode: (mode: 'dark' | 'light' | 'satellite') => void;
  trafficEnabled: boolean;
  setTrafficEnabled: (v: boolean) => void;
  contaminationFilter: 'all' | 'safe' | 'low' | 'medium' | 'high' | 'critical';
  setContaminationFilter: (v: 'all' | 'safe' | 'low' | 'medium' | 'high' | 'critical') => void;
}

export function DashboardSidebar({
  onWaterBodySelect,
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  selectedWaterBody,
  mapMode,
  setMapMode,
  trafficEnabled,
  setTrafficEnabled,
  contaminationFilter,
  setContaminationFilter,
}: DashboardSidebarProps) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const filteredWaterBodies = waterbodiesData.filter((wb) => {
    const matchesSearch = wb.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wb.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || wb.type === filterType;
    return matchesSearch && matchesType;
  });

  const getContaminationBadge = (waterBody: WaterBody) => {
    const level = getContaminationLevel(waterBody.metrics);
    const variants = {
      safe: 'bg-contamination-safe/20 text-contamination-safe border-contamination-safe/30',
      low: 'bg-contamination-low/20 text-contamination-low border-contamination-low/30',
      medium: 'bg-contamination-medium/20 text-contamination-medium border-contamination-medium/30',
      high: 'bg-contamination-high/20 text-contamination-high border-contamination-high/30',
      critical: 'bg-contamination-critical/20 text-contamination-critical border-contamination-critical/30',
    };
    
    return (
      <Badge className={`${variants[level]} border text-xs font-medium`}>
        {level.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Sidebar className="w-80 border-r border-border bg-sidebar">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Hydrometrics India</h1>
            <p className="text-sm text-sidebar-foreground/60">Monitoring Water Quality Across India</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label className="text-sm">Map Mode</label>
              <select
                value={mapMode}
                onChange={(e) => setMapMode(e.target.value as any)}
                className="bg-card text-sidebar-foreground border border-border rounded px-2 text-sm"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="satellite">Satellite</option>
              </select>
              <label className="inline-flex items-center gap-2 text-sm ml-2 text-sidebar-foreground">
                <input type="checkbox" checked={trafficEnabled} onChange={(e) => setTrafficEnabled(e.target.checked)} />
                <span>Traffic</span>
              </label>
            </div>
            <ThemeToggle />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search locations, districts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
            />
          </div>
          
          <Select value={filterType} onValueChange={onFilterChange}>
            <SelectTrigger className="bg-sidebar-accent border-sidebar-border">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Lake">Lakes</SelectItem>
              <SelectItem value="River">Rivers</SelectItem>
              <SelectItem value="Groundwater">Groundwater</SelectItem>
              <SelectItem value="Stream">Streams</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <label className="text-xs text-sidebar-foreground/60 mb-1 block">Contamination Level</label>
            <select
              value={contaminationFilter}
              onChange={(e) => setContaminationFilter(e.target.value as any)}
              className="w-full bg-card text-sidebar-foreground border border-border rounded px-2 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="safe">Safe</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          {/* Contamination level filter moved to Map controls area */}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="space-y-2">
          {filteredWaterBodies.map((waterBody) => (
            <motion.div
              key={waterBody._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className={`w-full p-4 h-auto text-left justify-start hover:bg-sidebar-accent ${
                  selectedWaterBody?._id === waterBody._id ? 'bg-sidebar-accent border border-sidebar-border' : ''
                }`}
                onClick={() => onWaterBodySelect(waterBody)}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sidebar-foreground truncate">
                      {waterBody.location}
                    </h3>
                    {getContaminationBadge(waterBody)}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{waterBody.district}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{waterBody.year}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-sidebar-foreground/40">
                    {waterBody.type} • {Object.keys(waterBody.metrics).length} metals tested
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
        
        {filteredWaterBodies.length === 0 && (
          <div className="text-center py-8 text-sidebar-foreground/60">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No water bodies found</p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}