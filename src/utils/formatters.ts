
/**
 * Formats a number as Indonesian Rupiah
 */
export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a date string to Indonesian locale date
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

/**
 * Formats a number to compact form with suffix (K, M, B)
 */
export const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

/**
 * Formats a percentage (0-100) to string with % sign
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Formats a time from Date object to HH:MM format
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
