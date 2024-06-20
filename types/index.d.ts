export { MyInterface };

declare global {
    interface Comment {
        id?: number
        hash: string
        owner: string
        message: string
        create_at: string

    }
}