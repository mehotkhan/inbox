export { MyInterface };

declare global {
    interface Comment {
        id: number
        hash: string
        owner: string
        message: string
        created_at: number
        status: 'draft' | 'sending' | 'send' | 'published' | 'spam'

    }
}