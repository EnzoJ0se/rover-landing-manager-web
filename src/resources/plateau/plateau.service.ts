import { BaseService } from "@/base/base-service";
import { PlateauDTO } from "./plateau.dto";

export class PlateauService extends BaseService {
    protected override jsonApi: string = 'plateau';
    public override bindData = (data: any): PlateauDTO => new PlateauDTO(data)
}
