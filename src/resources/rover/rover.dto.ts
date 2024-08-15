import { BaseDTO } from "@/base/base-dto";
import type { CardinalDirectionEnum } from "@/enum/cardinal-direction.enum";

export class RoverDTO extends BaseDTO {
    public _id: string | null = null;
    public x: number = 0;
    public y: number = 0;
    public direction: CardinalDirectionEnum | null = null;

    public constructor(data?: any) {
        super(data);

        if (data) {
            this._id = data._id;
            this.x = data.x;
            this.y = data.y;
            this.direction = data.direction;
        }
    }
}
