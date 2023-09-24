<template>
    <div class="root-wrapper">
        <div v-if="step === 'upload'">
            <input type="file" ref="fileInput" @change="handleFileChange" />
            <button @click="uploadFile">上传文件</button>
        </div>

        <div v-else-if="step == 'crop'" style="height: 400px;">
            <VueCropper
                ref="cropper"
                outputType="png"
                :autoCrop="true"
                :img="uploadedImage"
                @ready="onCropperReady" 
            ></vueCropper>
            <button @click="cropImage">Crop Image</button>
        </div>
        <template v-else-if="step == 'cropped'">
            <img class="cropped-image"  :src="croppedImage" alt="Cropped Image" />
            <button @click="backToCrop">Back To Crop</button>
        </template>
        
    </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper' 
export default {
    components: {
        VueCropper,
    },
    data() {
        return {
            /** 步骤： upload:上传图片；crop:裁剪； cropped:裁剪完；*/
            step: 'upload',

            file: null,

            uploadedImage: '', // 'http://model.orb.local:5005/static/1.png',

            croppedImage: null,
        }
    },
    methods: {
        handleFileChange() {
            const fileInput = this.$refs.fileInput
            if (fileInput.value) {
                this.file = fileInput.files ? fileInput.files[0] : null;
            }
        },

        async uploadFile() {

            const basePath = process.env.VUE_APP_API_BASE_PATH
            if (!this.file) {
                alert('请选择文件');
                return;
            }
            try {
                const formData = new FormData();
                formData.append('file', this.file);

                // 发送文件上传请求
                const response = await fetch(basePath + '/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    // 处理上传成功的响应
                    const data = await response.json();

                    console.log('update response data:', data);

                    if (!data.success) {
                        alert('上传失败~');
                        return
                    }
                    this.uploadedImage = data.data.url;
                    this.step = 'crop';
                } else {
                    // 处理上传失败的响应
                    alert('上传失败');
                }
            } catch (error) {
                console.error('上传出错', error);
            }
        },
        cropImage() {
            // 裁剪图片
            this.$refs.cropper.getCropBlob((blob) => {
                if (blob) {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        this.croppedImage = reader.result
                    };

                    this.step = 'cropped';
                }
            })
        },
        onCropperReady () {
            // 当裁剪工具准备好时，您可以在这里添加一些初始化逻辑
        },

        backToCrop() {
            this.step = 'crop'
        },
    },
}
</script>

<style lang="scss">
.root-wrapper {
    .cropped-image {
        max-height: 400px;

    }
}
</style>
