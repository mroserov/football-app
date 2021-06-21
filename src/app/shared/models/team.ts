/**
 * Interface for Team
 */
import {Area} from "./area";

export interface Team {
  id?: number,
  area: Area,
  name?: string,
  shortName?: string | null,
  tla?: string | null,
  crestUrl?: string | null
  address: string,
  phone: string,
  website: string,
  email: string,
  founded: number,
  clubColors: string,
  venue: string,
  lastUpdated: string
}
