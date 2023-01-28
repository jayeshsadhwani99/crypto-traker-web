declare global {
  interface Number {
    toCurrency(): string;
    toPercent(): string;
    formatWithAbbreviations(): string;
    abs(): number;
  }
}

Number.prototype.toCurrency = function (): string {
  return `$${this.toPrecision(2)}`;
};

Number.prototype.toPercent = function (): string {
  return `${this.toPrecision(2)}%`;
};

Number.prototype.abs = function (): number {
  return Math.abs(this.valueOf());
};

Number.prototype.formatWithAbbreviations = function (): string {
  const num: number = this.abs();
  const sign: string = this < 0 ? "-" : "";

  let formatted: number;
  let stringFormatted: string;

  switch (true) {
    case num >= 1e12:
      formatted = num / 1e12;
      stringFormatted = formatted.toString();
      return `${sign}${stringFormatted}Tr`;
    case num >= 1e9:
      formatted = num / 1e9;
      stringFormatted = formatted.toString();
      return `${sign}${stringFormatted}Bn`;
    case num >= 1e6:
      formatted = num / 1e6;
      stringFormatted = formatted.toString();
      return `${sign}${stringFormatted}M`;
    case num >= 1e3:
      formatted = num / 1e3;
      stringFormatted = formatted.toString();
      return `${sign}${stringFormatted}K`;
    case num >= 0:
      return this.toString();

    default:
      return `${sign}${this}`;
  }
};

export {};