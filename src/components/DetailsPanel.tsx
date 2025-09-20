import { useEffect, useRef } from 'react';
import { X, MapPin, Calendar, Droplets, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WaterBody, getContaminationLevel } from '@/data/waterbodies';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DetailsPanelProps {
  waterBody: WaterBody;
  onClose: () => void;
}

export function DetailsPanel({ waterBody, onClose }: DetailsPanelProps) {
  const chartRef = useRef(null);
  const level = getContaminationLevel(waterBody.metrics);

  const getLevelInfo = (level: string) => {
    const info = {
      safe: { 
        color: 'hsl(var(--contamination-safe))', 
        bgColor: 'hsl(var(--contamination-safe) / 0.1)',
        description: 'Within acceptable limits',
        icon: '✓'
      },
      low: { 
        color: 'hsl(var(--contamination-low))', 
        bgColor: 'hsl(var(--contamination-low) / 0.1)',
        description: 'Slightly elevated levels',
        icon: '⚠'
      },
      medium: { 
        color: 'hsl(var(--contamination-medium))', 
        bgColor: 'hsl(var(--contamination-medium) / 0.1)',
        description: 'Concerning contamination',
        icon: '⚠'
      },
      high: { 
        color: 'hsl(var(--contamination-high))', 
        bgColor: 'hsl(var(--contamination-high) / 0.1)',
        description: 'High contamination risk',
        icon: '⚠'
      },
      critical: { 
        color: 'hsl(var(--contamination-critical))', 
        bgColor: 'hsl(var(--contamination-critical) / 0.1)',
        description: 'Critical contamination levels',
        icon: '⚠'
      },
    };
    return info[level as keyof typeof info] || info.safe;
  };

  const levelInfo = getLevelInfo(level);

  const chartData = {
    labels: Object.keys(waterBody.metrics),
    datasets: [
      {
        label: 'Concentration (mg/L)',
        data: Object.values(waterBody.metrics),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',     // Red for high contamination
          'rgba(168, 85, 247, 0.8)',    // Purple for critical
          'rgba(249, 115, 22, 0.8)',    // Orange for medium
          'rgba(234, 179, 8, 0.8)',     // Yellow for low
          'rgba(34, 197, 94, 0.8)',     // Green for safe
        ],
        borderColor: [
          'rgb(239, 68, 68)',           // Red border
          'rgb(168, 85, 247)',          // Purple border
          'rgb(249, 115, 22)',          // Orange border
          'rgb(234, 179, 8)',           // Yellow border
          'rgb(34, 197, 94)',           // Green border
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Heavy Metal Concentrations',
        color: '#e2e8f0',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#475569',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toFixed(1)} mg/L`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(71, 85, 105, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value + ' mg/L';
          }
        },
        title: {
          display: true,
          text: 'Concentration (mg/L)',
          color: '#e2e8f0',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          maxRotation: 45,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const,
    },
  } as const;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border sticky top-0 bg-card/95 z-20">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">{waterBody.location}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{waterBody.district}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{waterBody.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4" />
                <span>{waterBody.type}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-secondary"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Contamination Level Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3 p-4 rounded-lg"
          style={{ backgroundColor: levelInfo.bgColor }}
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: levelInfo.color, color: 'white' }}
          >
            {levelInfo.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge 
                className="text-xs font-medium border"
                style={{ 
                  backgroundColor: `${levelInfo.color}20`, 
                  color: levelInfo.color,
                  borderColor: `${levelInfo.color}30`
                }}
              >
                {level.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-foreground/80 mt-1">{levelInfo.description}</p>
          </div>
        </motion.div>
      </div>

  {/* Chart Section */}
  <div className="flex-1 p-6 overflow-auto">
        <div className="h-80 mb-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </div>

        {/* Metrics Table */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground mb-3">Detailed Measurements</h3>
          {Object.entries(waterBody.metrics).map(([metal, concentration], index) => {
            const colors = [
              '#ef4444', // Red
              '#a855f7', // Purple  
              '#f97316', // Orange
              '#eab308', // Yellow
              '#22c55e', // Green
            ];
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={metal}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="font-medium text-foreground text-base">{metal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">{concentration}</span>
                  <span className="text-sm text-muted-foreground font-medium">mg/L</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coordinates */}
        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location Coordinates
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Latitude:</span>
              <div className="font-mono text-foreground font-medium">{waterBody.latitude}°</div>
            </div>
            <div>
              <span className="text-muted-foreground">Longitude:</span>
              <div className="font-mono text-foreground font-medium">{waterBody.longitude}°</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}