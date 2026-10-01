import { BusArrivalInfo, BusServiceItem, CrowdLevel, BusType } from '../types/transit';

export interface LtaRawBus {
  OriginCode?: string;
  DestinationCode?: string;
  EstimatedArrival?: string;
  Monitored?: number;
  Latitude?: string;
  Longitude?: string;
  VisitNumber?: string;
  Load?: 'SEA' | 'SDA' | 'LSD' | string;
  Feature?: 'WAB' | string;
  Type?: 'SD' | 'DD' | 'BD' | string;
}

export interface LtaRawService {
  ServiceNo: string;
  Operator: string;
  NextBus?: LtaRawBus;
  NextBus2?: LtaRawBus;
  NextBus3?: LtaRawBus;
}

export interface LtaResponse {
  BusStopCode: string;
  Services: LtaRawService[];
  _meta?: {
    source: string;
    message?: string;
    timestamp?: string;
  };
}

function parseLoad(load?: string): CrowdLevel {
  if (load === 'LSD') return 'limited';
  if (load === 'SDA') return 'standing';
  return 'seats';
}

function parseType(type?: string): BusType {
  if (type === 'DD') return 'DD';
  if (type === 'BD') return 'BD';
  return 'SD';
}

function formatTimeSgt(isoString?: string): string {
  if (!isoString) return '--:-- SGT';
  try {
    const d = new Date(isoString);
    const hrs = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${hrs}:${mins} SGT`;
  } catch {
    return '--:-- SGT';
  }
}

function parseArrival(bus?: LtaRawBus, fallbackMinutes = 5): BusArrivalInfo {
  if (!bus || !bus.EstimatedArrival) {
    const est = new Date(Date.now() + fallbackMinutes * 60000);
    return {
      etaMinutes: fallbackMinutes,
      formattedEta: `${fallbackMinutes} MINS`,
      estimatedTimeStr: formatTimeSgt(est.toISOString()),
      busType: parseType(bus?.Type),
      wab: bus?.Feature === 'WAB',
      crowd: parseLoad(bus?.Load),
      seatsLeftNote: bus?.Load === 'SEA' ? 'Available' : bus?.Load === 'SDA' ? 'Moderate' : 'Packed',
      status: 'Scheduled'
    };
  }

  const arrivalDate = new Date(bus.EstimatedArrival);
  const diffMs = arrivalDate.getTime() - Date.now();
  const rawMinutes = Math.round(diffMs / 60000);
  const minutes = Math.max(0, rawMinutes);

  const crowd = parseLoad(bus.Load);
  let seatsLeftNote = '~35 seats left';
  if (crowd === 'standing') seatsLeftNote = 'Standing only';
  if (crowd === 'limited') seatsLeftNote = 'Crowded';

  return {
    etaMinutes: minutes,
    formattedEta: minutes <= 1 ? 'Arr' : `${minutes} MINS`,
    estimatedTimeStr: formatTimeSgt(bus.EstimatedArrival),
    busType: parseType(bus.Type),
    wab: bus.Feature === 'WAB',
    crowd,
    seatsLeftNote,
    status: minutes <= 3 ? 'In Transit' : 'Scheduled'
  };
}

export function parseLtaService(
  raw: LtaRawService,
  existingService?: BusServiceItem
): BusServiceItem {
  const arrival1 = parseArrival(raw.NextBus, 5);
  const arrival2 = parseArrival(raw.NextBus2, Math.max(arrival1.etaMinutes + 8, 14));
  const arrival3 = parseArrival(raw.NextBus3, Math.max(arrival2.etaMinutes + 12, 28));

  const operatorMap: Record<string, string> = {
    GAS: 'Go-Ahead Singapore (GAS)',
    SBST: 'SBS Transit',
    SMRT: 'SMRT Buses',
    TTS: 'Tower Transit'
  };

  const operator = operatorMap[raw.Operator] || existingService?.operator || raw.Operator || 'SBS Transit';

  return {
    serviceNo: raw.ServiceNo,
    operator,
    serviceType: existingService?.serviceType || (raw.ServiceNo.startsWith('5') ? 'Express' : 'Trunk'),
    origin: existingService?.origin || 'Tampines Int',
    destination: existingService?.destination || `Dest (${raw.NextBus?.DestinationCode || 'Loop'})`,
    isLoop: existingService?.isLoop ?? true,
    loopPoint: existingService?.loopPoint,
    via: existingService?.via || 'Direct Corridor Route',
    color: existingService?.color || '#67106A',
    direction: existingService?.direction || 1,
    arrivals: [arrival1, arrival2, arrival3],
    routeStops: existingService?.routeStops || [
      { stopCode: '76071', stopName: 'Blk 141', subText: 'Departed', status: 'departed' },
      { stopCode: 'BUS_LOC', stopName: 'Bus Location', subText: 'In Transit', status: 'current_bus' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: `${arrival1.formattedEta}`, status: 'active_target' },
      { stopCode: '76091', stopName: 'Blk 206', subText: 'Upcoming', status: 'upcoming' }
    ],
    fleetCapacity: existingService?.fleetCapacity || {
      seatsPercent: arrival1.crowd === 'seats' ? 65 : 40,
      standingPercent: arrival1.crowd === 'standing' ? 40 : 25,
      limitedPercent: arrival1.crowd === 'limited' ? 35 : 10,
      onTimeRate: 82
    },
    timetable: existingService?.timetable || {
      weekday: { firstBus: '05:30', lastBus: '23:45', peakFreq: '6 - 9 mins', offPeakFreq: '10 - 14 mins' },
      saturday: { firstBus: '05:45', lastBus: '23:45', peakFreq: '8 - 12 mins', offPeakFreq: '12 - 15 mins' },
      sunday: { firstBus: '06:00', lastBus: '23:45', peakFreq: '9 - 13 mins', offPeakFreq: '12 - 16 mins' }
    }
  };
}
