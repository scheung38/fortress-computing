// Common utility functions for Fortress Computing

/**
 * Calculate number of years in business from March 2019 to today.
 */
export function getYearsInBusiness(): number {
  const start = new Date(2019, 2); // March 2019 (month is 0-indexed)
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < start.getDate())) {
    years--;
  }
  return years;
}
