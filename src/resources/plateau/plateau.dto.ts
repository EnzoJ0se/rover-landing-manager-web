import { BaseDTO } from "@/base/base-dto";
import { RoverDTO } from "../rover/rover.dto";

export class PlateauDTO extends BaseDTO {
    public _id: string = '';
    public x_size: number = 0;
    public y_size: number = 0;
    public rovers: RoverDTO[] = [];

    public constructor(data?: any) {
        super(data);

        if (data) {
            this._id = data._id;
            this.x_size = data.x_size;
            this.y_size = data.y_size;
            this.rovers = data.rovers?.map((rover: any) => new RoverDTO(rover)) || [];
        }
    }
}
