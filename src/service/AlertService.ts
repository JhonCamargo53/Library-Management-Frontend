import Swal from "sweetalert2"

export const genericErrorAlertService= (title: string, message: string) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
    })
}

export const genericSuccessAlertService = (title: string, message: string) => {
    Swal.fire({
        icon: 'success',
        title: title,
        text: message,
    })
}