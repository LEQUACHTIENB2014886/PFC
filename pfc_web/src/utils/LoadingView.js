import { ref } from 'vue';
import { ElLoading } from 'element-plus';


const loading = ref(null);

const showLoading = (text = 'Loading...') => {
    loading.value = ElLoading.service({
        lock: true,
        text,
        background: 'rgba(0, 0, 0, 0.7)',
    });
};

const hideLoading = () => {
    if (loading.value) {
        loading.value.close();
        loading.value = null;
    }
};


export {
    loading,
    showLoading,
    hideLoading
}