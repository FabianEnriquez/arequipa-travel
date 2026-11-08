export const axisOptions = (color: string, grid: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' as const, labels: { color } } },
  scales: { x: { ticks: { color }, grid: { display: false } }, y: { ticks: { color }, grid: { color: grid } } },
});
export const pieOptions = (color: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: { legend: { position: 'bottom' as const, labels: { color } } },
});
