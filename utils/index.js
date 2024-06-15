
export const getErrorMessage = (error) => {
    let message = error.message
    if(error?.response?.data){
        message = error.response.data
    }
        return message
}