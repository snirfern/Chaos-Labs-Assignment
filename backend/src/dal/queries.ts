export const DeFiQueries = {
  GetDeFiMetrics: `
    SELECT 
      timestamp,
      protocol,
      chain,
      total_value_locked_usd,
      daily_volume_usd,
      active_users,
      token
    FROM default.defi_metrics
    ORDER BY timestamp DESC
    LIMIT 1000
  `,

  TVLOverTime: `
    SELECT 
      toDate(timestamp) AS day,
      SUM(total_value_locked_usd) AS total_tvl
    FROM defi_metrics
    GROUP BY day
    ORDER BY day;
  `,

  DailyVolumeByProtocol: `
    SELECT 
      toDate(timestamp) AS day,
      protocol,
      SUM(daily_volume_usd) AS total_volume
    FROM defi_metrics
    GROUP BY day, protocol
    ORDER BY day, protocol;
  `,

  ActiveUsersByChain: `
    SELECT 
      toDate(timestamp) AS day,
      chain,
      SUM(active_users) AS total_active_users
    FROM defi_metrics
    GROUP BY day, chain
    ORDER BY day, chain;
  `,
}
