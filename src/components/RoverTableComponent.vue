<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PlateauDTO } from '../resources/plateau/plateau.dto';
import { RoverDTO } from '../resources/rover/rover.dto';
import { RoverService } from '../resources/rover/rover.service';

const rovers = ref<RoverDTO[]>([]);
const roverService = ref<RoverService>(new RoverService());

const props = defineProps({
    plateau: {
        type: PlateauDTO,
        required: true
    }
});

onMounted(() => rovers.value = props.plateau.rovers);

async function refresh() {
    rovers.value = await roverService.value.get();
}

async function deleteRover(rover: RoverDTO) {
    if (!confirm('Are you sure you want to delete this rover?')) {
        return;
    }

    await roverService.value.delete(rover._id);
    await refresh();
}
</script>

<template>
    <div class="px-2">
        <div class="w-full text-xl mb-1 rounded-lg bg-gray-600 text-white text-center ">Rovers</div>
        <table class="table w-full">
            <thead class="bg-gray-500 text-white">
                <tr class="table-row">
                    <th class="table-cell text-center px-1">X</th>
                    <th class="table-cell text-center px-1">Y</th>
                    <th class="table-cell text-center px-1">D</th>
                    <th class="table-cell text-center px-1 w-1/12"></th>
                </tr>
            </thead>
            <tbody class="py-2">
                <tr v-if="!rovers?.length" class="table-row">
                    <td colspan="6" class="border-b">
                        <p class="w-full text-center">
                            Empty
                        </p>
                    </td>
                </tr>

                <tr v-for="rover in rovers" :key="rover._id" class="table-row">
                    <td class="table-cell text-center">
                        {{ rover.x }}
                    </td>

                    <td class="table-cell text-center">
                        {{ rover.y }}
                    </td>

                    <td class="table-cell text-center">
                        {{ rover.direction }}
                    </td>

                    <td class="table-cell text-center">
                        <a class="text-xl text-red-500 hover:text-red-400 cursor-pointer" @click="deleteRover(rover)">
                            x
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <router-link to="/create-rover">
            <button type="button" class="w-full border rounded-lg text-white bg-green-500 px-4">
                Land Rovers
            </button>
        </router-link>
    </div>
</template>
