/**
 * Health check endpoint for monitoring API status and environment setup.
 * Compatible with Vercel Serverless Functions and Express server.
 */
export default function handler(req, res) {
  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY && process.env.LTA_ACCOUNT_KEY.trim() !== '');

  const payload = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SBS Transit Pulse - LTA DataMall Gateway',
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      ltaAccountKeyConfigured: hasLtaKey
    },
    endpoints: {
      busArrival: '/api/bus-arrival?BusStopCode=76081&ServiceNo=20',
      health: '/api/health'
    }
  };

  if (res.status && typeof res.status === 'function') {
    return res.status(200).json(payload);
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
  }
}
