<template>
    <div>
        <ResizableImageView v-model:model="uploadImageData" :widthCm="10" :heightCm="4" />
        <div>
            <p>Tọa độ: {{ uploadImageData.x }}, {{ uploadImageData.y }}</p>
            <p>Kích thước: {{ uploadImageData.w }} x {{ uploadImageData.h }}</p>
            <p v-if="uploadImageData.url">URL: {{ uploadImageData.url }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import ResizableImageView, { PFCUploadImage } from '@/components/Utils/PFC_UploadImageView.vue'

export default {
    components: { ResizableImageView },
    setup() {
        const uploadImageData = ref<PFCUploadImage>({
            x: 0,
            y: 0,
            w: 0,
            h: 0
        });
        return { uploadImageData }
    }
}
</script>