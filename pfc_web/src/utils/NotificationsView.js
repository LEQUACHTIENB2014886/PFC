const success = (message) => {
    ElNotification({
        title: 'Success',
        message: message,
        type: 'success',
    })
}

const error = (err) => {
    ElNotification({
        title: 'Error',
        message: err,
        type: 'error',
    })
}

const info = (message) => {
    ElNotification({
        title: 'Info',
        message: message,
        type: 'info',
    })
}

export {
    success,
    error,
    info
}