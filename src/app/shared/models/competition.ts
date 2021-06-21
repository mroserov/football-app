/**
 * Interface for competitions
 */
import {Area} from "./area";
import {Season} from "./season";

export interface Competition {
  id: number;
  area?: Area;
  name: string;
  code?: string | null;
  emblemUrl?: string | null;
  plan: string;
  currentSeason?: Season | null;
  seasons: Season[];
  numberOfAvailableSeasons?: number;
  lastUpdated?: string;
}
