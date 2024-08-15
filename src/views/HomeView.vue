<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { PlateauDTO } from '../resources/plateau/plateau.dto';
import { PlateauService } from '../resources/plateau/plateau.service';
import RoverTableComponent from '../components/RoverTableComponent.vue';
import { useRouter } from 'vue-router';

const plateau = ref<PlateauDTO>(new PlateauDTO());
const plateauService: PlateauService = new PlateauService();
const router = useRouter();

onBeforeMount(async () => {
    const response: PlateauDTO[] = await plateauService.get();

    if (response?.length) {
        plateau.value = response[0];
    }

    if (!plateau.value?._id) {
        router.push('/create-plateau');
    }
})

async function destroyPlateau(): Promise<void> {
    if (confirm('Are you sure you want to delete the plateau?')) {
        await plateauService.delete(plateau.value._id);
        router.push('/create-plateau');
    }
}
</script>

<template>
    <div v-if="plateau?._id" class="w-full h-full p-6 flex justify-center items-center content-center">
        <div class="w-5/12 rounded-lg shadow-lg border mt-4">
            <div class="w-full py-2 text-center border-b">
                <span class="text-2xl text-gray-700 font-bold">Hover Center Control</span>
            </div>

            <div class="w-full p-2 flex gap-3">
                <div>
                    <span class="text-xl font-bold text-gray-600">Plateau:</span>
                    <span class="ml-3"> {{ plateau.x_size }} x {{ plateau.y_size }} </span>
                    <button type="button"
                        class="text-white bg-red-500 hover:bg-red-400 ml-2 text-xs rounded-lg px-2 py-1"
                        @click="destroyPlateau()">
                        excluir
                    </button>
                </div>
            </div>

            <div class="w-full my-2">
                <RoverTableComponent :plateau="plateau" />
            </div>
        </div>
    </div>
</template>
