/**
 * Model fot competitions
 */
import {Area} from "./area";
import {Season} from "./season";

export class Competitions {
  id: number;
  area?:Area;
  name: string;
  code?: string | null;
  emblemUrl?: string |null;
  plan:string;
  currentSeason?:Season|null;
  seasons?:Season[]=[];
  numberOfAvailableSeasons?: number;
  lastUpdated?: string;

  constructor(id: number,
              name: string,
              plan: string) {
    this.id = id;
    this.name = name;
    this.plan = plan;
  }

  /**
   * Creates an instance of competitions model
   * @param dto model received from service
   */
  /*public static toEntity(dto:any): Competitions{
    if(!dto){
      return <Competitions><unknown>[];
    }
    return new Competitions(dto.id,dto.name);
  }*/
}
