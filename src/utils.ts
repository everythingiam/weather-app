let KEY: string = '';

async function setKeyFromTxt(filePath: string): Promise<void> {
  try {
    const response = await fetch(filePath);
    KEY = await response.text();
  } catch (error) {
    console.error('Ошибка при чтении файла с ключом:', error);
    throw error;
  }
}

function getKey(): string {
  return KEY;
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

function formatAddress(address: string): string {
  const parts = address.split(',');
  if (parts.length >= 2) {
    const city = parts[0].trim();
    const country = parts[parts.length - 1].trim();
    return `${city}, <br>${country}`;
  }
  return address;
}

function formatRound(percent: number | string): string {
  return Math.round(Number(percent)).toString();
}

function fahrenheitToCelsius(fahrenheit: number): string {
  const result = ((fahrenheit - 32) * 5) / 9;
  return Math.round(result).toString();
}

function metersPerSecondToMilesPerHour(metersPerSecond: number): string {
  const mph = metersPerSecond * 2.23694;
  const result = Math.round(mph * 10) / 10;
  return Math.round(result).toString();
}

function kmToMiles(km: number): string {
  const result = km / 1.609;
  return Math.round(result).toString();
}

function getCurrentTimeFormatted(): string {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  // 'Today, Sep 24, 16:12'
  const formattedTime = now.toLocaleDateString('en-US', options);

  return `Today, ${formattedTime.replace(',', '')}`;
}

export default {
  setKeyFromTxt,
  getKey,
  formatTime,
  formatAddress,
  fahrenheitToCelsius,
  formatRound,
  metersPerSecondToMilesPerHour,
  getCurrentTimeFormatted,
  kmToMiles,
};
