// Return population statistics for the given array of areas
export default function popStats(areas) {
  const populations = areas.map((area) => area.population);
  const total = populations.reduce((sum, pop) => sum + pop, 0);
  return {
    // Add average to stats
    average: Math.round(total / populations.length),
    min: Math.min(...populations),
    max: Math.max(...populations),
    total,
  };
}
