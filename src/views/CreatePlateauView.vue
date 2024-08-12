<script setup lang="ts">
import { reactive, ref } from "vue";
import { PlateauDTO } from "../resources/plateau/plateau.dto";
import { PlateauService } from "../resources/plateau/plateau.service";

const plateauService: PlateauService = new PlateauService();
const coordinates = ref<string>(null);


function validatePlateauInput(input: string): boolean {
    const regex: RegExp = /^[0-9]+ [0-9]+$/;

    return regex.test(input);
}

function savePlateau() {
    if (!validatePlateauInput(coordinates?.value?.trim())) {
        alert("Invalid plateau size. Please inform the size in the format 'X Y', where X and Y are integers.");

        return;
    }

    const [x, y] = coordinates.value.trim().split(' ');

    if (parseInt(x) < 1 || parseInt(y) < 1) {
        alert("Invalid plateau size. X and Y must be higher than 0.");

        return;
    }

    const plateau: PlateauDTO = new PlateauDTO();

    plateau.x_size = parseInt(x);
    plateau.y_size = parseInt(y);
    plateauService.post(plateau).then(() => window.location.href = '/');
}
</script>

<template>
    <div class="w-full h-full p-6 flex justify-center items-center content-center">
        <div class="w-1/2 rounded-lg shadow-ld border">
            <div class="w-full py-2 text-center border-b">
                <span class="text-2xl text-gray-700 font-bold">Criar Plateau</span>
            </div>

            <form class="py-4">
                <div class="w-full flex">
                    <div class="w-full my-2 flex gap-3 items-center px-4">
                        <p>Inform the plateau size:</p>
                        <input v-model="coordinates" placeholder="x y" type="text" required
                            class="w-8/12 border px-2 py-1 rounded-lg" />
                    </div>
                </div>

                <div class="w-full px-4">
                    <button type="button" class="w-full mt-3 px-2 border rounded-md h-8 text-white bg-green-500 px-4"
                        @click="savePlateau()">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
