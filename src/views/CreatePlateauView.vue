<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { PlateauDTO } from "../resources/plateau/plateau.dto";
import { PlateauService } from "../resources/plateau/plateau.service";

const plateauService: PlateauService = new PlateauService();
const plateauDTO: PlateauDTO = reactive<PlateauDTO>(new PlateauDTO());
const router = useRouter()

function validatePlateauInput(input: string): boolean {
    const regex: RegExp = /^[0-9]+ [0-9]+$/;

    return regex.test(input);
}

function savePlateau() {
    if  (plateauDTO.x_size < 1 || plateauDTO.y_size < 1) {
        alert("Invalid plateau size. X and Y must be higher than 0.");

        return;
    }


    plateauService.post(plateauDTO).then(() => router.push('/'));
}
</script>

<template>
    <div class="w-full h-full p-6 flex justify-center items-center content-center">
        <div class="w-1/2 rounded-lg shadow-lg border">
            <div class="w-full py-2 text-center border-b">
                <span class="text-2xl text-gray-700 font-bold">Inform the Plateau Data</span>
            </div>

            <form class="py-4">
                <div class="w-full flex">
                    <div class="w-1/2 my-2 gap-3 items-center px-4">
                        <p>Inform the X value:</p>
                        <input v-model="plateauDTO.x_size" placeholder="X" type="number" min="1" required
                            name="plateau_x_value" class="w-full border px-2 py-1 rounded-lg" />
                    </div>

                    <div class="w-1/2 my-2 gap-3 items-center px-4">
                        <p>Inform the Y value:</p>
                        <input v-model="plateauDTO.y_size" placeholder="Y" type="number" min="1" required
                            name="plateau_y_value" class="w-full border px-2 py-1 rounded-lg" />
                    </div>
                </div>

                <div class="w-full px-4">
                    <button type="button" class="w-full mt-3 px-2 border rounded-md h-8 text-white bg-green-500 px-4"
                        @click="savePlateau()">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
