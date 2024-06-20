

export default () => {
    const sendComment = (message: string) => {
        console.log(message)
    }

    const allComments = ref<any[]>([])

    return {
        sendComment,
        allComments
    }

}