import { BusStopItem, BusServiceItem, ServiceAdvisory } from '../types/transit';

export const BUS_STOPS: Record<string, BusStopItem> = {
  '76081': {
    code: '76081',
    name: 'Opp The Holy Trinity Ch',
    roadName: 'Tampines Ave 2',
    subArea: 'Tampines East',
    sheltered: true,
    connectingMrt: 'Tampines East MRT (DT33)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFRpvmN_DVCbOnLVus5T3imDqGeo2JbC7h7o2VWk4TamNTsddiVX-V9tjtr5otyJ0B4sd2ZqaYWF17S3R1oxbWDSr0aq3Kztcy7jlXXq781N6tmmUuYkNbCdj8uPIaYZ4wjqN6JfvW2YwpQCRoO7ihVMCuVII-5uvf_cdcb_13MqaQCphHHY3liS3NvEj2ObRLiTLU6ul2c1VWKknSCAKl360UrSYE_EReUwpQSQSUMXClbMobtWU',
    passingServices: ['8', '17', '18', '20', '28', '34', '39', '59', '292', '518']
  },
  '76071': {
    code: '76071',
    name: 'Blk 141',
    roadName: 'Tampines Ave 2',
    subArea: 'Tampines East',
    sheltered: true,
    connectingMrt: 'Tampines East MRT (DT33)',
    passingServices: ['8', '17', '18', '20', '28', '34', '59', '518']
  },
  '76091': {
    code: '76091',
    name: 'Blk 206',
    roadName: 'Tampines Ave 2',
    subArea: 'Tampines East',
    sheltered: true,
    connectingMrt: 'Tampines East MRT (DT33)',
    passingServices: ['8', '18', '20', '28', '34', '292', '518']
  },
  '75009': {
    code: '75009',
    name: 'Tampines Int',
    roadName: 'Tampines Central 1',
    subArea: 'Tampines Central',
    sheltered: true,
    connectingMrt: 'Tampines MRT (EW2/DT32)',
    passingServices: ['8', '18', '20', '28', '39', '292']
  },
  '76059': {
    code: '76059',
    name: 'Opp Our Tampines Hub',
    roadName: 'Tampines Ave 5',
    subArea: 'Tampines West',
    sheltered: true,
    connectingMrt: 'Tampines MRT (EW2/DT32)',
    passingServices: ['34', '39', '59', '518']
  },
  '96129': {
    code: '96129',
    name: 'Melville Pk',
    roadName: 'Simei Rd',
    subArea: 'Simei',
    sheltered: true,
    passingServices: ['20', '292']
  },
  '96149': {
    code: '96149',
    name: 'Simei Stn / Blk 247',
    roadName: 'Simei St 1',
    subArea: 'Simei',
    sheltered: true,
    connectingMrt: 'Simei MRT (EW3)',
    passingServices: ['20', '9']
  },
  '96381': {
    code: '96381',
    name: 'Changi City Pt',
    roadName: 'Changi Sth Ave 2',
    subArea: 'Changi Business Park',
    sheltered: true,
    connectingMrt: 'Expo MRT (CG1/DT35)',
    passingServices: ['20', '47', '118']
  },
  '97009': {
    code: '97009',
    name: 'Changi Business Pk Ter',
    roadName: 'Changi Sth Ave 1',
    subArea: 'Changi Business Park',
    sheltered: true,
    connectingMrt: 'Expo MRT (CG1/DT35)',
    passingServices: ['20', '47']
  }
};

export const BUS_SERVICES: Record<string, BusServiceItem> = {
  '20': {
    serviceNo: '20',
    operator: 'Go-Ahead Singapore (GAS)',
    serviceType: 'Trunk',
    origin: 'Tampines Int',
    destination: 'Changi Business Pk Ave 3',
    isLoop: true,
    loopPoint: 'Loop at Changi Business Pk',
    via: 'Simei, Upper Changi Rd East, Expo MRT',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 5,
        formattedEta: '5 MINS',
        estimatedTimeStr: '17:42 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: '~42 seats left',
        status: 'In Transit'
      },
      {
        etaMinutes: 18,
        formattedEta: '18 MINS',
        estimatedTimeStr: '17:55 SGT',
        busType: 'SD',
        wab: true,
        crowd: 'standing',
        seatsLeftNote: 'Moderate',
        status: 'Scheduled'
      },
      {
        etaMinutes: 31,
        formattedEta: '31 MINS',
        estimatedTimeStr: '18:08 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '76071', stopName: 'Blk 141', subText: 'Departed', status: 'departed' },
      { stopCode: 'BUS_LOC', stopName: 'Bus Location', subText: 'In Transit', status: 'current_bus' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 5 mins', status: 'active_target' },
      { stopCode: '76091', stopName: 'Blk 206', subText: '~8 mins', status: 'upcoming' },
      { stopCode: '96149', stopName: 'Simei Stn', subText: 'MRT Link', status: 'mrt_interchange', icon: 'train' },
      { stopCode: '96309', stopName: 'Expo Stn', subText: 'DTL / EWL', status: 'mrt_interchange', icon: 'train' },
      { stopCode: '96381', stopName: 'Changi Biz Pk', subText: 'Loop Turn', status: 'terminal' }
    ],
    fleetCapacity: {
      seatsPercent: 58,
      standingPercent: 24,
      limitedPercent: 18,
      onTimeRate: 76
    },
    timetable: {
      weekday: { firstBus: '05:30', lastBus: '23:45', peakFreq: '6 - 9 mins', offPeakFreq: '10 - 14 mins' },
      saturday: { firstBus: '05:45', lastBus: '23:45', peakFreq: '8 - 12 mins', offPeakFreq: '12 - 15 mins' },
      sunday: { firstBus: '06:00', lastBus: '23:45', peakFreq: '9 - 13 mins', offPeakFreq: '12 - 16 mins' }
    }
  },
  '8': {
    serviceNo: '8',
    operator: 'SBS Transit',
    serviceType: 'Trunk',
    origin: 'Tampines Int',
    destination: 'Toa Payoh Int',
    isLoop: false,
    via: 'Tampines Ave 1, Bedok North, MacPherson',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 2,
        formattedEta: '2 mins',
        estimatedTimeStr: '17:39 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: '~36 seats left',
        status: 'In Transit'
      },
      {
        etaMinutes: 14,
        formattedEta: '14 mins',
        estimatedTimeStr: '17:51 SGT',
        busType: 'DD',
        wab: false,
        crowd: 'standing',
        seatsLeftNote: 'Few seats',
        status: 'Scheduled'
      },
      {
        etaMinutes: 26,
        formattedEta: '26 mins',
        estimatedTimeStr: '18:03 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Available',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '75009', stopName: 'Tampines Int', subText: 'Origin', status: 'departed' },
      { stopCode: '76071', stopName: 'Blk 141', subText: 'Departed', status: 'departed' },
      { stopCode: 'BUS_LOC', stopName: 'Bus Location', subText: 'Approaching', status: 'current_bus' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 2 mins', status: 'active_target' },
      { stopCode: '84019', stopName: 'Bedok Reservoir', subText: '~10 mins', status: 'upcoming' },
      { stopCode: '70251', stopName: 'MacPherson Stn', subText: 'CCL Link', status: 'mrt_interchange', icon: 'train' },
      { stopCode: '52009', stopName: 'Toa Payoh Int', subText: 'Terminal', status: 'terminal' }
    ],
    fleetCapacity: {
      seatsPercent: 62,
      standingPercent: 26,
      limitedPercent: 12,
      onTimeRate: 84
    },
    timetable: {
      weekday: { firstBus: '05:25', lastBus: '23:50', peakFreq: '5 - 8 mins', offPeakFreq: '8 - 12 mins' },
      saturday: { firstBus: '05:30', lastBus: '23:50', peakFreq: '7 - 10 mins', offPeakFreq: '10 - 13 mins' },
      sunday: { firstBus: '05:45', lastBus: '23:50', peakFreq: '8 - 12 mins', offPeakFreq: '10 - 14 mins' }
    }
  },
  '18': {
    serviceNo: '18',
    operator: 'SBS Transit',
    serviceType: 'Trunk',
    origin: 'Tampines Int',
    destination: 'Bedok North Depot',
    isLoop: false,
    via: 'Tampines Ave 7, Bedok Reservoir Rd',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 7,
        formattedEta: '7 mins',
        estimatedTimeStr: '17:44 SGT',
        busType: 'SD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: '~18 seats left',
        status: 'In Transit'
      },
      {
        etaMinutes: 21,
        formattedEta: '21 mins',
        estimatedTimeStr: '17:58 SGT',
        busType: 'SD',
        wab: false,
        crowd: 'seats',
        seatsLeftNote: 'Seats available',
        status: 'Scheduled'
      },
      {
        etaMinutes: 35,
        formattedEta: '35 mins',
        estimatedTimeStr: '18:12 SGT',
        busType: 'SD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '75009', stopName: 'Tampines Int', subText: 'Departed', status: 'departed' },
      { stopCode: 'BUS_LOC', stopName: 'Bus Location', subText: 'Cruising Ave 2', status: 'current_bus' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 7 mins', status: 'active_target' },
      { stopCode: '76091', stopName: 'Blk 206', subText: '~10 mins', status: 'upcoming' },
      { stopCode: '84011', stopName: 'Bedok Resvr Stn', subText: 'DTL Link', status: 'mrt_interchange', icon: 'train' },
      { stopCode: '84009', stopName: 'Bedok Nth Depot', subText: 'Terminal', status: 'terminal' }
    ],
    fleetCapacity: {
      seatsPercent: 70,
      standingPercent: 20,
      limitedPercent: 10,
      onTimeRate: 88
    },
    timetable: {
      weekday: { firstBus: '05:40', lastBus: '23:35', peakFreq: '8 - 12 mins', offPeakFreq: '12 - 16 mins' },
      saturday: { firstBus: '05:45', lastBus: '23:35', peakFreq: '10 - 14 mins', offPeakFreq: '14 - 18 mins' },
      sunday: { firstBus: '06:00', lastBus: '23:35', peakFreq: '12 - 15 mins', offPeakFreq: '15 - 20 mins' }
    }
  },
  '28': {
    serviceNo: '28',
    operator: 'SBS Transit',
    serviceType: 'Trunk',
    origin: 'Tampines Int',
    destination: 'Toa Payoh Int',
    isLoop: false,
    via: 'Tampines Ave 5, Bartley Rd East, Serangoon',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 11,
        formattedEta: '11 mins',
        estimatedTimeStr: '17:48 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: '~30 seats left',
        status: 'In Transit'
      },
      {
        etaMinutes: 25,
        formattedEta: '25 mins',
        estimatedTimeStr: '18:02 SGT',
        busType: 'DD',
        wab: false,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      },
      {
        etaMinutes: 39,
        formattedEta: '39 mins',
        estimatedTimeStr: '18:16 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '75009', stopName: 'Tampines Int', subText: 'Departed', status: 'departed' },
      { stopCode: '76071', stopName: 'Blk 141', subText: 'Departed', status: 'departed' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 11 mins', status: 'active_target' },
      { stopCode: 'BUS_LOC', stopName: 'Bus Location', subText: 'Tampines Ave 5', status: 'current_bus' },
      { stopCode: '62019', stopName: 'Bartley Stn', subText: 'CCL Link', status: 'mrt_interchange', icon: 'train' },
      { stopCode: '52009', stopName: 'Toa Payoh Int', subText: 'Terminal', status: 'terminal' }
    ],
    fleetCapacity: {
      seatsPercent: 55,
      standingPercent: 30,
      limitedPercent: 15,
      onTimeRate: 80
    },
    timetable: {
      weekday: { firstBus: '05:30', lastBus: '23:30', peakFreq: '6 - 9 mins', offPeakFreq: '10 - 13 mins' },
      saturday: { firstBus: '05:30', lastBus: '23:30', peakFreq: '8 - 11 mins', offPeakFreq: '11 - 15 mins' },
      sunday: { firstBus: '05:45', lastBus: '23:30', peakFreq: '9 - 12 mins', offPeakFreq: '12 - 16 mins' }
    }
  },
  '34': {
    serviceNo: '34',
    operator: 'Go-Ahead Singapore (GAS)',
    serviceType: 'Trunk',
    origin: 'Punggol Temp Int',
    destination: 'Changi Airport PTB 1, 2, 3',
    isLoop: true,
    loopPoint: 'Loop at Changi Airport Terminals',
    via: 'Tampines Ave 5, Punggol, TPE Highway',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 3,
        formattedEta: '3 mins',
        estimatedTimeStr: '17:40 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'limited',
        seatsLeftNote: 'Boarding packed',
        status: 'In Transit'
      },
      {
        etaMinutes: 16,
        formattedEta: '16 mins',
        estimatedTimeStr: '17:53 SGT',
        busType: 'DD',
        wab: false,
        crowd: 'standing',
        seatsLeftNote: 'Standing space',
        status: 'Scheduled'
      },
      {
        etaMinutes: 32,
        formattedEta: '32 mins',
        estimatedTimeStr: '18:09 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Seats available',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '65009', stopName: 'Punggol Int', subText: 'Departed', status: 'departed' },
      { stopCode: '76071', stopName: 'Blk 141', subText: 'Departed', status: 'departed' },
      { stopCode: 'BUS_LOC', stopName: 'Bus Location', subText: 'Near Stn', status: 'current_bus' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 3 mins', status: 'active_target' },
      { stopCode: '95029', stopName: 'Changi PTB 3', subText: 'Airport Link', status: 'mrt_interchange', icon: 'train' },
      { stopCode: '95019', stopName: 'Changi PTB 1', subText: 'Terminal', status: 'terminal' }
    ],
    fleetCapacity: {
      seatsPercent: 40,
      standingPercent: 35,
      limitedPercent: 25,
      onTimeRate: 72
    },
    timetable: {
      weekday: { firstBus: '05:30', lastBus: '23:30', peakFreq: '6 - 9 mins', offPeakFreq: '9 - 12 mins' },
      saturday: { firstBus: '05:40', lastBus: '23:30', peakFreq: '7 - 10 mins', offPeakFreq: '10 - 14 mins' },
      sunday: { firstBus: '05:50', lastBus: '23:30', peakFreq: '8 - 12 mins', offPeakFreq: '11 - 15 mins' }
    }
  },
  '518': {
    serviceNo: '518',
    operator: 'Go-Ahead Singapore (GAS)',
    serviceType: 'Express',
    origin: 'Pasir Ris Int',
    destination: 'Bayfront Ave / Suntec (Loop)',
    isLoop: true,
    loopPoint: 'Loop at Marina Centre & Bayfront',
    via: 'Fast Transit via PIE Highway Express',
    color: '#a83900',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 15,
        formattedEta: '15 mins',
        estimatedTimeStr: '17:52 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: '~50 seats left',
        status: 'In Transit'
      },
      {
        etaMinutes: 33,
        formattedEta: '33 mins',
        estimatedTimeStr: '18:10 SGT',
        busType: 'SD',
        wab: false,
        crowd: 'seats',
        seatsLeftNote: 'Seats available',
        status: 'Scheduled'
      },
      {
        etaMinutes: 50,
        formattedEta: '50 mins',
        estimatedTimeStr: '18:27 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '77009', stopName: 'Pasir Ris Int', subText: 'Departed', status: 'departed' },
      { stopCode: '76071', stopName: 'Blk 141', subText: 'Departed', status: 'departed' },
      { stopCode: 'BUS_LOC', stopName: 'Bus Location', subText: 'Tampines Ave 2', status: 'current_bus' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 15 mins', status: 'active_target' },
      { stopCode: '02151', stopName: 'Promenade Stn', subText: 'DTL / CCL', status: 'mrt_interchange', icon: 'train' },
      { stopCode: '03509', stopName: 'Bayfront Stn', subText: 'Marina Bay Sands', status: 'terminal' }
    ],
    fleetCapacity: {
      seatsPercent: 82,
      standingPercent: 12,
      limitedPercent: 6,
      onTimeRate: 91
    },
    timetable: {
      weekday: { firstBus: '06:00', lastBus: '23:30', peakFreq: '10 - 15 mins', offPeakFreq: '15 - 20 mins' },
      saturday: { firstBus: '06:00', lastBus: '23:30', peakFreq: '12 - 18 mins', offPeakFreq: '16 - 22 mins' },
      sunday: { firstBus: '06:15', lastBus: '23:30', peakFreq: '14 - 20 mins', offPeakFreq: '18 - 24 mins' }
    }
  },
  '17': {
    serviceNo: '17',
    operator: 'SBS Transit',
    serviceType: 'Trunk',
    origin: 'Pasir Ris Int',
    destination: 'Bedok Int',
    isLoop: false,
    via: 'Tampines Ave 2, Bedok North Ave 4',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 8,
        formattedEta: '8 mins',
        estimatedTimeStr: '17:45 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: '~32 seats left',
        status: 'In Transit'
      },
      {
        etaMinutes: 20,
        formattedEta: '20 mins',
        estimatedTimeStr: '17:57 SGT',
        busType: 'DD',
        wab: false,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      },
      {
        etaMinutes: 34,
        formattedEta: '34 mins',
        estimatedTimeStr: '18:11 SGT',
        busType: 'SD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '77009', stopName: 'Pasir Ris Int', subText: 'Departed', status: 'departed' },
      { stopCode: '76071', stopName: 'Blk 141', subText: 'Departed', status: 'departed' },
      { stopCode: 'BUS_LOC', stopName: 'Bus Location', subText: 'Approaching', status: 'current_bus' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 8 mins', status: 'active_target' },
      { stopCode: '84009', stopName: 'Bedok Int', subText: 'Terminal', status: 'terminal' }
    ],
    fleetCapacity: { seatsPercent: 65, standingPercent: 25, limitedPercent: 10, onTimeRate: 85 },
    timetable: {
      weekday: { firstBus: '05:30', lastBus: '23:45', peakFreq: '6 - 9 mins', offPeakFreq: '10 - 13 mins' },
      saturday: { firstBus: '05:40', lastBus: '23:45', peakFreq: '8 - 11 mins', offPeakFreq: '11 - 14 mins' },
      sunday: { firstBus: '05:50', lastBus: '23:45', peakFreq: '9 - 12 mins', offPeakFreq: '12 - 15 mins' }
    }
  },
  '39': {
    serviceNo: '39',
    operator: 'SBS Transit',
    serviceType: 'Trunk',
    origin: 'Tampines Int',
    destination: 'Yishun Int',
    isLoop: false,
    via: 'Pasir Ris Dr 1, TPE, SLE, Khatib MRT',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 12,
        formattedEta: '12 mins',
        estimatedTimeStr: '17:49 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'standing',
        seatsLeftNote: 'Standing only',
        status: 'In Transit'
      },
      {
        etaMinutes: 28,
        formattedEta: '28 mins',
        estimatedTimeStr: '18:05 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      },
      {
        etaMinutes: 44,
        formattedEta: '44 mins',
        estimatedTimeStr: '18:21 SGT',
        busType: 'SD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '75009', stopName: 'Tampines Int', subText: 'Departed', status: 'departed' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 12 mins', status: 'active_target' },
      { stopCode: '59049', stopName: 'Khatib Stn', subText: 'NSL Link', status: 'mrt_interchange', icon: 'train' },
      { stopCode: '59009', stopName: 'Yishun Int', subText: 'Terminal', status: 'terminal' }
    ],
    fleetCapacity: { seatsPercent: 50, standingPercent: 35, limitedPercent: 15, onTimeRate: 78 },
    timetable: {
      weekday: { firstBus: '05:30', lastBus: '23:30', peakFreq: '7 - 10 mins', offPeakFreq: '11 - 15 mins' },
      saturday: { firstBus: '05:30', lastBus: '23:30', peakFreq: '9 - 12 mins', offPeakFreq: '12 - 16 mins' },
      sunday: { firstBus: '05:45', lastBus: '23:30', peakFreq: '10 - 13 mins', offPeakFreq: '13 - 17 mins' }
    }
  },
  '59': {
    serviceNo: '59',
    operator: 'SBS Transit',
    serviceType: 'Trunk',
    origin: 'Changi Village Ter',
    destination: 'Bishan Int',
    isLoop: false,
    via: 'Loyang Ave, Tampines Ave 2, Kaki Bukit, Toa Payoh East',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 9,
        formattedEta: '9 mins',
        estimatedTimeStr: '17:46 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: '~25 seats left',
        status: 'In Transit'
      },
      {
        etaMinutes: 22,
        formattedEta: '22 mins',
        estimatedTimeStr: '17:59 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'standing',
        seatsLeftNote: 'Moderate',
        status: 'Scheduled'
      },
      {
        etaMinutes: 38,
        formattedEta: '38 mins',
        estimatedTimeStr: '18:15 SGT',
        busType: 'SD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Available',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '99009', stopName: 'Changi Village', subText: 'Departed', status: 'departed' },
      { stopCode: '76071', stopName: 'Blk 141', subText: 'Departed', status: 'departed' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 9 mins', status: 'active_target' },
      { stopCode: '53009', stopName: 'Bishan Int', subText: 'Terminal', status: 'terminal' }
    ],
    fleetCapacity: { seatsPercent: 60, standingPercent: 28, limitedPercent: 12, onTimeRate: 82 },
    timetable: {
      weekday: { firstBus: '05:40', lastBus: '23:30', peakFreq: '7 - 11 mins', offPeakFreq: '11 - 15 mins' },
      saturday: { firstBus: '05:45', lastBus: '23:30', peakFreq: '9 - 12 mins', offPeakFreq: '12 - 16 mins' },
      sunday: { firstBus: '06:00', lastBus: '23:30', peakFreq: '10 - 14 mins', offPeakFreq: '13 - 17 mins' }
    }
  },
  '292': {
    serviceNo: '292',
    operator: 'SBS Transit',
    serviceType: 'Feeder',
    origin: 'Tampines Int',
    destination: 'Tampines St 22 (Loop)',
    isLoop: true,
    loopPoint: 'Loop at Tampines St 22',
    via: 'Tampines Ave 2, Tampines St 11, St 22',
    color: '#67106A',
    direction: 1,
    arrivals: [
      {
        etaMinutes: 4,
        formattedEta: '4 mins',
        estimatedTimeStr: '17:41 SGT',
        busType: 'SD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: '~15 seats left',
        status: 'In Transit'
      },
      {
        etaMinutes: 13,
        formattedEta: '13 mins',
        estimatedTimeStr: '17:50 SGT',
        busType: 'DD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      },
      {
        etaMinutes: 24,
        formattedEta: '24 mins',
        estimatedTimeStr: '18:01 SGT',
        busType: 'SD',
        wab: true,
        crowd: 'seats',
        seatsLeftNote: 'Plentiful',
        status: 'Scheduled'
      }
    ],
    routeStops: [
      { stopCode: '75009', stopName: 'Tampines Int', subText: 'Departed', status: 'departed' },
      { stopCode: '76081', stopName: 'Opp Holy Trinity', subText: 'In 4 mins', status: 'active_target' },
      { stopCode: '76339', stopName: 'Tampines St 22', subText: 'Loop Turn', status: 'terminal' }
    ],
    fleetCapacity: { seatsPercent: 75, standingPercent: 20, limitedPercent: 5, onTimeRate: 94 },
    timetable: {
      weekday: { firstBus: '05:30', lastBus: '00:30', peakFreq: '4 - 7 mins', offPeakFreq: '8 - 11 mins' },
      saturday: { firstBus: '05:30', lastBus: '00:30', peakFreq: '6 - 9 mins', offPeakFreq: '9 - 12 mins' },
      sunday: { firstBus: '05:45', lastBus: '00:30', peakFreq: '7 - 10 mins', offPeakFreq: '10 - 13 mins' }
    }
  }
};

export const SERVICE_ADVISORIES: ServiceAdvisory[] = [
  {
    id: 'adv-1',
    serviceNo: '20',
    title: 'Service 20 Evening Peak Enhancement',
    message: 'Service 20 operating normally with enhanced frequencies during evening peak.',
    type: 'info',
    time: 'Updated 5 mins ago'
  },
  {
    id: 'adv-2',
    serviceNo: 'Downtown Line',
    title: 'DTL Full Operational Readiness',
    message: 'Downtown Line (DTL) train service running with normal 2.5-min headways between Expo and Bukit Panjang.',
    type: 'info',
    time: 'Updated 12 mins ago'
  },
  {
    id: 'adv-3',
    serviceNo: '518',
    title: 'Express 518 Route Advisory',
    message: 'Express 518 normal boarding along Tampines Ave 2 towards Bayfront & Suntec.',
    type: 'info',
    time: 'Updated 20 mins ago'
  }
];

export const RAIL_LINES = [
  {
    name: 'Downtown Line (DTL)',
    code: 'DTL',
    color: '#0055B8',
    status: 'Normal Service',
    headway: '2 - 3 mins',
    stations: ['Bukit Panjang (DT1)', 'Newton (DT11)', 'Bugis (DT14)', 'MacPherson (DT26)', 'Tampines East (DT33)', 'Upper Changi (DT34)', 'Expo (DT35)']
  },
  {
    name: 'North East Line (NEL)',
    code: 'NEL',
    color: '#800080',
    status: 'Normal Service',
    headway: '2.5 - 3.5 mins',
    stations: ['HarbourFront (NE1)', 'Chinatown (NE4)', 'Dhoby Ghaut (NE6)', 'Serangoon (NE12)', 'Punggol Coast (NE18)']
  },
  {
    name: 'Sengkang & Punggol LRT',
    code: 'SPLRT',
    color: '#708090',
    status: 'Normal Service',
    headway: '3 - 5 mins',
    stations: ['Sengkang (STC)', 'Compassvale (SE1)', 'Punggol (PTC)', 'Sam Kee (PW1)']
  }
];
