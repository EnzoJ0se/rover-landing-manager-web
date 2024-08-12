<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { PlateauDTO } from '../resources/plateau/plateau.dto';
import { PlateauService } from '../resources/plateau/plateau.service';

const plateau = ref<PlateauDTO>(null);

onBeforeMount(async () => {
    const plateauService: PlateauService = new PlateauService();
    const response: PlateauDTO[] = await plateauService.get();

    if (response?.length) {
        plateau.value = response[0];
    }
})
</script>

<template>
    <div class="w-full h-full p-6 flex justify-center items-center content-center">
        <div class="w-1/2 rounded-lg shadow-ld border">
            <div class="w-full py-2 text-center border-b">
                <span class="text-2xl text-gray-700 font-bold">Hover Center Control</span>
            </div>

            <div class="w-full p-2 flex gap-3">
                <div>
                    <span class="text-xl font-bold text-gray-600">Plateau:</span>
                    <span v-if="plateau" class="ml-3"> {{ plateau.x_size }} x {{ plateau.y_size }} </span>

                    <router-link v-else to="/criar-plateau">
                        <button type="button" class="ml-2 border rounded-lg text-white bg-green-500 px-4">
                            Criar Plateau
                        </button>
                    </router-link>
                </div>
            </div>

            <div class="w-full my-2">
            </div>
        </div>
    </div>
</template>
