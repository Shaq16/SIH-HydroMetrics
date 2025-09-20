export interface WaterBody 
{ _id: string; 
  location: string; 
  district: string; 
  type: 'Lake' | 'River' | 'Groundwater' | 'Stream'; 
  year: number; 
  latitude: number; 
  longitude: number; 
  metrics: { [key: string]: number; };
 }
export const waterbodiesData: WaterBody[] = [  {
    _id: "1",
    location: "Ulsoor Lake",
    district: "Bengaluru Urban",
    type: "Lake",
    year: 2024,
    latitude: 12.9851,
    longitude: 77.6101,
    metrics: {
      "Uranium": 18.0,   // urban lake, moderate U (µg/L)
      "Lead": 12.0,      // urban runoff, slightly above guideline
      "Cadmium": 1.5,
      "Mercury": 0.8,
      "Arsenic": 6.0
    }
  },
  {
    _id: "2",
    location: "Cauvery River (Mysuru stretch)",
    district: "Mysuru",
    type: "River",
    year: 2024,
    latitude: 12.2958,
    longitude: 76.6394,
    metrics: {
      "Uranium": 25.0,
      "Lead": 18.0,
      "Cadmium": 2.8,
      "Mercury": 1.2,
      "Arsenic": 9.5
    }
  },
  {
    _id: "3",
    location: "Industrial Well Site (Kolar)",
    district: "Kolar",
    type: "Groundwater",
    year: 2024,
    latitude: 13.1370,
    longitude: 78.1294,
    metrics: {
      // Mining/industrial groundwater — can be very high for U and As in some local reports
      "Uranium": 320.0,  // high groundwater uranium (µg/L) — based on Indian groundwater studies
      "Lead": 95.0,
      "Cadmium": 28.0,
      "Mercury": 7.5,
      "Arsenic": 210.0
    }
  },
  {
    _id: "4",
    location: "Kukkarahalli Lake",
    district: "Mysuru",
    type: "Lake",
    year: 2024,
    latitude: 12.3116,
    longitude: 76.6442,
    metrics: {
      "Uranium": 10.0,
      "Lead": 6.0,
      "Cadmium": 0.9,
      "Mercury": 0.5,
      "Arsenic": 4.5
    }
  },
  {
    _id: "5",
    location: "Krishna River (Bagalkot)",
    district: "Bagalkot",
    type: "River",
    year: 2024,
    latitude: 16.1781,
    longitude: 75.6947,
    metrics: {
      "Uranium": 48.0,
      "Lead": 30.0,
      "Cadmium": 7.5,
      "Mercury": 2.4,
      "Arsenic": 38.0
    }
  },
  {
    _id: "6",
    location: "Netravathi River",
    district: "Dakshina Kannada",
    type: "River",
    year: 2024,
    latitude: 12.8697,
    longitude: 74.8420,
    metrics: {
      "Uranium": 14.0,
      "Lead": 9.0,
      "Cadmium": 2.1,
      "Mercury": 0.9,
      "Arsenic": 5.6
    }
  },
  {
    _id: "7",
    location: "Bellandur Lake",
    district: "Bengaluru Urban",
    type: "Lake",
    year: 2024,
    latitude: 12.9249,
    longitude: 77.6733,
    metrics: {
      // Bellandur is heavily polluted; sediment heavy metals reported high — water column values can be elevated
      "Uranium": 95.0,
      "Lead": 120.0,
      "Cadmium": 45.0,
      "Mercury": 12.0,
      "Arsenic": 130.0
    }
  },
  {
    _id: "8",
    location: "Mining Area Well (Ballari)",
    district: "Ballari",
    type: "Groundwater",
    year: 2024,
    latitude: 15.1394,
    longitude: 76.9214,
    metrics: {
      // mining groundwater — high U, Pb, Cd consistent with mining-impacted sites
      "Uranium": 410.0,
      "Lead": 250.0,
      "Cadmium": 140.0,
      "Mercury": 32.0,
      "Arsenic": 320.0
    }
  },
  {
    _id: "9",
    location: "Pampa Sarovar (Hampi)",
    district: "Hampi",
    type: "Lake",
    year: 2024,
    latitude: 15.3350,
    longitude: 76.4600,
    metrics: {
      "Uranium": 9.5,
      "Lead": 5.0,
      "Cadmium": 0.7,
      "Mercury": 0.6,
      "Arsenic": 3.2
    }
  },
  {
    _id: "10",
    location: "Tungabhadra River (Koppal)",
    district: "Koppal",
    type: "River",
    year: 2024,
    latitude: 15.3500,
    longitude: 76.1542,
    metrics: {
      "Uranium": 85.0,
      "Lead": 52.0,
      "Cadmium": 20.0,
      "Mercury": 6.8,
      "Arsenic": 48.0
    }
  },
  {
    _id: "11",
    location: "Hebbal Lake",
    district: "Bengaluru Urban",
    type: "Lake",
    year: 2024,
    latitude: 13.0358,
    longitude: 77.5970,
    metrics: {
      "Uranium": 40.0,
      "Lead": 28.0,
      "Cadmium": 11.0,
      "Mercury": 3.2,
      "Arsenic": 26.0
    }
  },
  {
    _id: "12",
    location: "Sharavathi River",
    district: "Shivamogga",
    type: "River",
    year: 2024,
    latitude: 14.2693,
    longitude: 74.9473,
    metrics: {
      "Uranium": 22.0,
      "Lead": 13.0,
      "Cadmium": 4.6,
      "Mercury": 1.8,
      "Arsenic": 10.2
    }
  },
  {
    _id: "13",
    location: "Aghanashini River",
    district: "Uttara Kannada",
    type: "River",
    year: 2024,
    latitude: 14.5126,
    longitude: 74.4479,
    metrics: {
      "Uranium": 13.0,
      "Lead": 7.8,
      "Cadmium": 1.9,
      "Mercury": 0.9,
      "Arsenic": 7.2
    }
  },
  {
    _id: "14",
    location: "Kempegowda Lake",
    district: "Bengaluru Rural",
    type: "Lake",
    year: 2024,
    latitude: 13.2846,
    longitude: 77.3821,
    metrics: {
      "Uranium": 35.0,
      "Lead": 20.0,
      "Cadmium": 8.0,
      "Mercury": 2.0,
      "Arsenic": 17.5
    }
  },
  {
    _id: "15",
    location: "Bhadra River (Chikkamagaluru)",
    district: "Chikkamagaluru",
    type: "River",
    year: 2024,
    latitude: 13.4305,
    longitude: 75.7004,
    metrics: {
      "Uranium": 16.0,
      "Lead": 9.5,
      "Cadmium": 2.7,
      "Mercury": 1.1,
      "Arsenic": 6.9
    }
  }
];

export const getContaminationLevel = (metrics: { [key: string]: number }): 'safe' | 'low' | 'medium' | 'high' | 'critical' => { const maxValue = Math.max(...Object.values(metrics)); if (maxValue <= 20) return 'safe'; if (maxValue <= 50) return 'low'; if (maxValue <= 100) return 'medium'; if (maxValue <= 150) return 'high'; return 'critical'; }; export const getContaminationColor = (level: string): string => { const colors = { safe: '#22c55e', low: '#eab308', medium: '#f97316', high: '#ef4444', critical: '#a855f7' }; return colors[level as keyof typeof colors] || colors.safe; };