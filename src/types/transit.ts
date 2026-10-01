export type CrowdLevel = 'seats' | 'standing' | 'limited';
export type BusType = 'SD' | 'DD' | 'BD'; // Single Deck, Double Deck, Bendy
export type ServiceType = 'Trunk' | 'Feeder' | 'Express' | 'Industrial';

export interface BusArrivalInfo {
  etaMinutes: number; // 0 for Arr
  formattedEta: string; // "5 mins", "Arr", "18 mins"
  estimatedTimeStr: string; // "17:42 SGT"
  busType: BusType;
  wab: boolean; // Wheelchair accessible
  crowd: CrowdLevel;
  seatsLeftNote?: string;
  status: 'In Transit' | 'Scheduled' | 'Arriving';
}

export interface BusServiceItem {
  serviceNo: string;
  operator: string;
  serviceType: ServiceType;
  origin: string;
  destination: string;
  isLoop: boolean;
  loopPoint?: string;
  via: string;
  color?: string;
  direction: number;
  arrivals: [BusArrivalInfo, BusArrivalInfo, BusArrivalInfo];
  routeStops: RouteNode[];
  fleetCapacity: {
    seatsPercent: number;
    standingPercent: number;
    limitedPercent: number;
    onTimeRate: number;
  };
  timetable: {
    weekday: { firstBus: string; lastBus: string; peakFreq: string; offPeakFreq: string };
    saturday: { firstBus: string; lastBus: string; peakFreq: string; offPeakFreq: string };
    sunday: { firstBus: string; lastBus: string; peakFreq: string; offPeakFreq: string };
  };
}

export interface RouteNode {
  stopCode: string;
  stopName: string;
  subText: string;
  status: 'departed' | 'current_bus' | 'active_target' | 'upcoming' | 'mrt_interchange' | 'terminal';
  etaNote?: string;
  icon?: string;
}

export interface BusStopItem {
  code: string;
  name: string;
  roadName: string;
  subArea: string;
  sheltered: boolean;
  connectingMrt?: string;
  imageUrl?: string;
  passingServices: string[];
}

export interface ServiceAdvisory {
  id: string;
  serviceNo?: string;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'maintenance';
  time: string;
}
