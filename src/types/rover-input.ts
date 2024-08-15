import type { CardinalDirectionEnum } from "@/enum/cardinal-direction.enum";
import type { Coordinate } from "./coordinate";

export interface RoverInput {
	coordinates: Coordinate;
	direction: CardinalDirectionEnum;
	instructions: string;
}
