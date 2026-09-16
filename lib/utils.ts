export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatNumber(n: number, decimals: number = 0) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCoordinate(lat: number, lng: number) {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(lng).toFixed(2)}°${lngDir}`;
}

export function formatTimestamp(iso: string) {
  const date = new Date(iso);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  };
  return date.toLocaleString('en-GB', options).replace(/GMT|UTC/, 'UTC');
}

export function formatDuration(hours: number) {
  const d = Math.floor(hours / 24);
  const h = Math.round(hours % 24);
  
  if (d > 0) {
    return h > 0 ? `${d}d ${h}h` : `${d}d`;
  }
  return `${h}h`;
}

export function formatArea(km2: number) {
  return `${formatNumber(km2, 1)} km²`;
}

export function formatDistance(km: number) {
  return `${formatNumber(km, 1)} km`;
}

export function formatConfidence(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
