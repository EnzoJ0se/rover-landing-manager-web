<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { RoverDTO } from "../resources/rover/rover.dto";
import { type Coordinate } from "../types/coordinate";
import { type RoverInput } from "../types/rover-input";
import { CardinalDirectionEnum } from "../enum/cardinal-direction.enum";
import { RoverService } from "../resources/rover/rover.service";
import { PlateauDTO } from "../resources/plateau/plateau.dto";
import { PlateauService } from "../resources/plateau/plateau.service";
import { useRouter } from "vue-router";

const plateauService: PlateauService = new PlateauService();
const roverService: RoverService = new RoverService();
const router = useRouter();

const roverInputs: RoverInput[] = reactive<RoverInput[]>([]);
const plateau = ref<PlateauDTO>(new PlateauDTO());
const position = ref<string>('');
const instructions = ref<string>('');

onBeforeMount(async () => {
    const response: PlateauDTO[] = await plateauService.get();

    if (response?.length) {
        plateau.value = response[0];
    }
})

function validatePositionInput(position: string): boolean {
    const regex = /^[0-9]+ [0-9]+ [NESW]$/;

    return regex.test(position);
}

function validateInstructionsInput(instructions: string): boolean {
    const regex = /^[LRM]+$/;

    return regex.test(instructions);
}

function removeRover(index: number): void {
    roverInputs.splice(index, 1);
}

function addRover(): void {
    position.value = position.value?.trim()?.toUpperCase();
    instructions.value = instructions.value?.trim()?.toUpperCase();

    if (!validatePositionInput(position.value)) {
        alert("Invalid position. Please inform the position in the format 'X Y D', where X and Y are integers and D is a cardinal direction (N, E, S or W).");

        return;
    }

    if (!validateInstructionsInput(instructions.value)) {
        alert("Invalid instructions. Please inform the instructions using the letters 'L', 'R' and 'M'.");

        return;
    }

    const parsedPosition = position.value.split(' ');
    const coordinates: Coordinate = { x: parseInt(parsedPosition[0]), y: parseInt(parsedPosition[1]) };

    if (coordinates.x > plateau.value.x_size || coordinates.y > plateau.value.y_size) {
        alert(`Invalid coordinates. The rover cannot be placed outside the plateau (${plateau.value.x_size}, ${plateau.value.y_size}).`);

        return;
    }

    roverInputs.push({
        coordinates: coordinates,
        direction: <CardinalDirectionEnum>position.value[4],
        instructions: instructions.value,
    });

    position.value = '';
    instructions.value = '';
}

function save(): void {
    if (!roverInputs.length) {
        alert("You must inform at least one rover.");

        return;
    }

    roverService.post({ data: roverInputs }, 'create-many').then(() => router.push('/'));
}
</script>

<template>
    <div class="w-full h-full p-6 flex justify-center items-center content-center">
        <div class="w-1/2 sm:8/12 rounded-lg shadow-lg border">
            <div class="w-full py-2 text-center border-b">
                <span class="text-2xl text-gray-700 font-bold">Inform the Rover Data</span>
            </div>

            <form class="py-4">
                <div class="w-full flex items-center">
                    <div class="w-5/12 my-2 gap-3 items-center px-4">
                        <p>Inform the Rover Landing Position:</p>
                        <input v-model="position" placeholder="3 5 N" type="text" required name="position_input"
                            class="w-full border px-2 py-1 rounded-lg" />
                    </div>

                    <div class="w-5/12 my-2 gap-3 items-center px-4">
                        <p>Inform the movement:</p>
                        <input v-model="instructions" placeholder="RRLLM" type="text" min="1" required
                            name="instructions_input" class="w-full border px-2 py-1 rounded-lg" />
                    </div>
                    <div class="w-2/12 px-4 mt-3">
                        <button type="button"
                            class="w-full mt-3 px-2 border rounded-md h-10 text-white bg-blue-500 px-4"
                            @click="addRover()">
                            <span class="text-xl">+</span>
                            Add
                        </button>
                    </div>
                </div>


                <div class="px-4 mt-3">
                    <table class="table w-full">
                        <thead class="bg-gray-500 text-white">
                            <tr class="table-row">
                                <th class="table-cell text-center px-1">X</th>
                                <th class="table-cell text-center px-1">Y</th>
                                <th class="table-cell text-center px-1">Direction</th>
                                <th class="table-cell text-center px-1">Instructions</th>
                                <th class="table-cell text-center px-1 w-1/12"></th>
                            </tr>
                        </thead>
                        <tbody class="py-2">
                            <tr v-if="!roverInputs?.length" class="table-row">
                                <td colspan="6" class="border-b">
                                    <p class="w-full text-center">
                                        Empty
                                    </p>
                                </td>
                            </tr>

                            <tr v-for="(rover, index) in roverInputs"
                                :key="rover.coordinates.x + rover.coordinates.y + rover.direction" class="table-row">
                                <td class="table-cell text-center">
                                    {{ rover.coordinates.x }}
                                </td>

                                <td class="table-cell text-center">
                                    {{ rover.coordinates.y }}
                                </td>

                                <td class="table-cell text-center">
                                    {{ rover.direction }}
                                </td>

                                <td class="table-cell text-center">
                                    {{ rover.instructions }}
                                </td>

                                <td class="table-cell text-center">
                                    <a class="text-xl text-red-500 hover:text-red-400 cursor-pointer"
                                        @click="removeRover(index)">
                                        x
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="w-full px-4">
                    <button type="button" class="w-full mt-3 px-2 border rounded-md h-8 text-white bg-green-500 px-4"
                        @click="save()">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
