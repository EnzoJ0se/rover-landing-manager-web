import { BaseDTO } from "@/base/base-dto";

export class PlateauDTO extends BaseDTO {
    public _id: string = '';
    public x_size: number = 0;
    public y_size: number = 0;

    public constructor(data?: any) {
        super(data);

        if (data) {
            this._id = data._id;
            this.x_size = data.x_size;
            this.y_size = data.y_size;
        }
    }
}
