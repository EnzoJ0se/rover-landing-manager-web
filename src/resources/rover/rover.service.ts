import { BaseService } from "@/base/base-service";
import { RoverDTO } from "./rover.dto";

export class RoverService extends BaseService {
    protected override jsonApi: string = 'rover';
    public override bindData = (data: any): RoverDTO => new RoverDTO(data);
}
