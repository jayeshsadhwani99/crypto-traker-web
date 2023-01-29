export interface Statistic {
  title: string;
  value: string;
  percentageChange?: number;
}

export class ConvertStat {
  public static toStat(json: string): Statistic {
    return JSON.parse(json);
  }

  public static StatToJson(value: Statistic): string {
    return JSON.stringify(value);
  }
}
