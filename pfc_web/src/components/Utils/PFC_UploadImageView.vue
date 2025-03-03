<template>
    <div class="resizable-image-container">
        <div :style="{ width: viewWidth + 'px' }" style="text-align: center; padding-bottom: 10px;">
            <label style="font-weight: bold;">{{ title }}</label>
        </div>
        <div class="view-area" :style="{ width: viewWidth + 'px', height: viewHeight + 'px' }">
            <div class="grid-lines">
                <div class="vertical-line"></div>
                <div class="horizontal-line"></div>
            </div>
            <img v-if="imageUrl" :src="imageUrl" :style="imageStyle" class="draggable-image" @mousedown="startDrag" />
            <div v-if="imageUrl" v-for="handle in handles" :key="handle.type" :style="getHandleStyle(handle.type)"
                class="resizer" @mousedown.stop="startResize($event, handle.type)"></div>
        </div>
        <div :style="{ width: viewWidth + 'px' }" style="text-align: center; margin-top: 10px;">
            <input ref="fileInput" type="file" accept="image/*" @change="handleFileUpload" style="display: none;" />
            <el-button type="primary" icon="Edit" circle @click="triggerFileInput" />
            <el-button type="danger" icon="Delete" circle v-if="imageUrl" @click="handleFileDelete" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount, watch } from 'vue'
import type { CSSProperties } from 'vue'

export interface PFCUploadImage {
    x: number;
    y: number;
    w: number;
    h: number;
    url?: string;
    name?: string;
    xEnd?: number;
    yEnd?: number;
}

export default defineComponent({
    name: "ResizableImageView",
    props: {
        title: { type: String, default: 'Medial Side View' },
        model: { type: Object as any, required: false },
        widthCm: { type: Number, default: 4.83 },
        heightCm: { type: Number, default: 10.5 }
    },
    emits: ["update:model"],
    setup(props, { emit }) {
        const cmToPx = (cm: number) => cm * 37.8;
        const viewWidth = cmToPx(props.widthCm);
        const viewHeight = cmToPx(props.heightCm);
        const imageUrl = ref<string | null>(null);
        const imageName = ref<string>("");
        const imageWidth = ref<number>(viewWidth);
        const imageHeight = ref<number>(viewHeight);
        const imageX = ref<number>(0);
        const imageY = ref<number>(0);

        const handles = [
            { type: 'top-left' },
            { type: 'top' },
            { type: 'top-right' },
            { type: 'right' },
            { type: 'bottom-right' },
            { type: 'bottom' },
            { type: 'bottom-left' },
            { type: 'left' }
        ];

        const resizing = ref<boolean>(false);
        const resizeHandle = ref<string | null>(null);
        const startResizeX = ref<number>(0);
        const startResizeY = ref<number>(0);
        const startWidth = ref<number>(viewWidth);
        const startHeight = ref<number>(viewHeight);
        const startX = ref<number>(0);
        const startY = ref<number>(0);

        const dragging = ref<boolean>(false);
        const startDragX = ref<number>(0);
        const startDragY = ref<number>(0);
        const startImageX = ref<number>(0);
        const startImageY = ref<number>(0);

        const fileInput = ref<HTMLInputElement | null>(null);
        const triggerFileInput = () => {
            fileInput.value?.click();
        };

        const handleFileUpload = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                imageUrl.value = URL.createObjectURL(file);
                imageName.value = file.name;
                imageWidth.value = viewWidth;
                imageHeight.value = viewHeight;
                imageX.value = 0;
                imageY.value = 0;
                updateModel();
            }
        };

        const handleFileDelete = () => {
            imageUrl.value = null;
            imageName.value = "";
            imageWidth.value = viewWidth;
            imageHeight.value = viewHeight;
            imageX.value = 0;
            imageY.value = 0;
            updateModel();
        };

        const imageStyle = computed<CSSProperties>(() => ({
            width: imageWidth.value + 'px',
            height: imageHeight.value + 'px',
            transform: `translate(${imageX.value}px, ${imageY.value}px)`,
            position: 'absolute',
            top: '0',
            left: '0',
            userSelect: 'none',
            cursor: dragging.value ? 'grabbing' : 'grab',
            zIndex: 10
        }));

        const getHandleStyle = (type: string): CSSProperties => {
            const baseStyle: CSSProperties = {
                width: '10px',
                height: '10px',
                backgroundColor: '#000',
                position: 'absolute'
            };
            switch (type) {
                case 'top-left':
                    return { ...baseStyle, left: '-5px', top: '-5px', cursor: 'nw-resize', zIndex: 50 };
                case 'top':
                    return { ...baseStyle, left: 'calc(50% - 5px)', top: '-5px', cursor: 'n-resize', zIndex: 50 };
                case 'top-right':
                    return { ...baseStyle, right: '-5px', top: '-5px', cursor: 'ne-resize', zIndex: 50 };
                case 'right':
                    return { ...baseStyle, right: '-5px', top: 'calc(50% - 5px)', cursor: 'e-resize', zIndex: 50 };
                case 'bottom-right':
                    return { ...baseStyle, right: '-5px', bottom: '-5px', cursor: 'se-resize', zIndex: 50 };
                case 'bottom':
                    return { ...baseStyle, left: 'calc(50% - 5px)', bottom: '-5px', cursor: 's-resize', zIndex: 50 };
                case 'bottom-left':
                    return { ...baseStyle, left: '-5px', bottom: '-5px', cursor: 'sw-resize', zIndex: 50 };
                case 'left':
                    return { ...baseStyle, left: '-5px', top: 'calc(50% - 5px)', cursor: 'w-resize', zIndex: 50 };
                default:
                    return baseStyle;
            }
        };

        const startResize = (event: MouseEvent, type: string) => {
            resizing.value = true;
            resizeHandle.value = type;
            startResizeX.value = event.clientX;
            startResizeY.value = event.clientY;
            startWidth.value = imageWidth.value;
            startHeight.value = imageHeight.value;
            startX.value = imageX.value;
            startY.value = imageY.value;
            document.addEventListener('mousemove', onResize);
            document.addEventListener('mouseup', stopResize);
        };

        const onResize = (event: MouseEvent) => {
            if (!resizing.value || !resizeHandle.value) return;
            const dx = event.clientX - startResizeX.value;
            const dy = event.clientY - startResizeY.value;
            switch (resizeHandle.value) {
                case 'top-left':
                    imageWidth.value = Math.max(20, startWidth.value - dx);
                    imageHeight.value = Math.max(20, startHeight.value - dy);
                    imageX.value = startX.value + dx;
                    imageY.value = startY.value + dy;
                    break;
                case 'top':
                    imageHeight.value = Math.max(20, startHeight.value - dy);
                    imageY.value = startY.value + dy;
                    break;
                case 'top-right':
                    imageWidth.value = Math.max(20, startWidth.value + dx);
                    imageHeight.value = Math.max(20, startHeight.value - dy);
                    imageY.value = startY.value + dy;
                    break;
                case 'right':
                    imageWidth.value = Math.max(20, startWidth.value + dx);
                    break;
                case 'bottom-right':
                    imageWidth.value = Math.max(20, startWidth.value + dx);
                    imageHeight.value = Math.max(20, startHeight.value + dy);
                    break;
                case 'bottom':
                    imageHeight.value = Math.max(20, startHeight.value + dy);
                    break;
                case 'bottom-left':
                    imageWidth.value = Math.max(20, startWidth.value - dx);
                    imageHeight.value = Math.max(20, startHeight.value + dy);
                    imageX.value = startX.value + dx;
                    break;
                case 'left':
                    imageWidth.value = Math.max(20, startWidth.value - dx);
                    imageX.value = startX.value + dx;
                    break;
            }
            updateModel();
        };

        const stopResize = () => {
            resizing.value = false;
            resizeHandle.value = null;
            document.removeEventListener('mousemove', onResize);
            document.removeEventListener('mouseup', stopResize);
            updateModel();
        };

        const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));
        const onDrag = (event: MouseEvent) => {
            if (!dragging.value) return;
            const dx = event.clientX - startDragX.value;
            const dy = event.clientY - startDragY.value;
            let newX = startImageX.value + dx;
            let newY = startImageY.value + dy;
            if (imageWidth.value >= viewWidth) {
                newX = clamp(newX, viewWidth - imageWidth.value, 0);
            } else {
                newX = clamp(newX, 0, viewWidth - imageWidth.value);
            }
            if (imageHeight.value >= viewHeight) {
                newY = clamp(newY, viewHeight - imageHeight.value, 0);
            } else {
                newY = clamp(newY, 0, viewHeight - imageHeight.value);
            }
            imageX.value = newX;
            imageY.value = newY;
            updateModel();
        };

        const startDrag = (event: MouseEvent) => {
            if (resizing.value) return;
            dragging.value = true;
            startDragX.value = event.clientX;
            startDragY.value = event.clientY;
            startImageX.value = imageX.value;
            startImageY.value = imageY.value;
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
        };

        const stopDrag = () => {
            dragging.value = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            updateModel();
        };

        const updateModel = () => {
            emit("update:model", {
                x: imageX.value,
                y: imageY.value,
                w: imageWidth.value,
                h: imageHeight.value,
                xEnd: imageX.value + imageWidth.value,
                yEnd: imageY.value + imageHeight.value,
                url: imageUrl.value,
                name: imageName.value
            });
        };

        const exportData = computed<PFCUploadImage>(() => ({
            x: imageX.value,
            y: imageY.value,
            w: imageWidth.value,
            h: imageHeight.value,
            xEnd: imageX.value + imageWidth.value,
            yEnd: imageY.value + imageHeight.value,
            url: imageUrl.value,
            name: imageName.value
        }));

        const getExportedImageBlob = (): Promise<Blob> => {
            return new Promise((resolve, reject) => {
                if (!imageUrl.value) {
                    return reject("No image available");
                }
                const canvas = document.createElement('canvas');
                canvas.width = viewWidth;
                canvas.height = viewHeight;
                const ctx = canvas.getContext('2d');
                if (!ctx) return reject("Cannot get canvas context");

                const image = new Image();
                image.crossOrigin = 'anonymous';
                image.src = imageUrl.value;
                image.onload = () => {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(
                        image,
                        0,
                        0,
                        image.naturalWidth,
                        image.naturalHeight,
                        imageX.value,
                        imageY.value,
                        imageWidth.value,
                        imageHeight.value
                    );
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject("Export blob failed");
                        }
                    }, 'image/png');
                };
                image.onerror = (err) => {
                    reject(err);
                };
            });
        };

        watch(
            () => props.model,
            (newModel) => {
                if (newModel) {
                    imageUrl.value = newModel.url || null;
                    imageName.value = newModel.name || "";
                    imageWidth.value = newModel.w || viewWidth;
                    imageHeight.value = newModel.h || viewHeight;
                    imageX.value = newModel.x || 0;
                    imageY.value = newModel.y || 0;
                }
            },
            { immediate: true, deep: true }
        );

        onBeforeUnmount(() => {
            document.removeEventListener('mousemove', onResize);
            document.removeEventListener('mouseup', stopResize);
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
        });

        return {
            fileInput,
            imageUrl,
            imageStyle,
            handles,
            getHandleStyle,
            handleFileUpload,
            handleFileDelete,
            startResize,
            startDrag,
            viewWidth,
            viewHeight,
            exportData,
            triggerFileInput,
            getExportedImageBlob
        };
    }
});
</script>

<style scoped>
.resizable-image-container {
    max-width: 600px;
    margin: 20px;
}

.view-area {
    border: 1px solid #ccc;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
}

.draggable-image {}

.resizer {
    position: absolute;
    background-color: #000;
    width: 10px;
    height: 10px;
}

.export-data {
    margin-top: 10px;
    background: #f9f9f9;
    padding: 10px;
    border: 1px solid #ddd;
}

.grid-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 20;
}

.vertical-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    border-left: 1px dashed #999;
}

.horizontal-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-top: 1px dashed #999;
}
</style>