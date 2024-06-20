
export default async () => {
    const { profile } = useUser()
    const { $dexie } = useNuxtApp()

    const sendComment = async (message: string) => {
        await $dexie.comments.add({
            owner: profile.value.pub,
            message: message,
            create_at: 'sdss',
            hash: 'sdss'
        })
        return
    }

    // const allComments = useLiveQuery(
    //     async () =>
    //         await $dexie.comments
    //             .orderBy("created_at")
    //             .toArray(),
    //     [],
    // );
    const allComments: any[] = []
    return {
        sendComment,
        allComments
    }

}