import { Event as NostrEvent, Relay, finalizeEvent } from "nostr-tools";
import { useWebSocket } from "@vueuse/core";

const relayURL = "ws://localhost:3000/nostr-relay";

let relay: any = null;
export default () => {
    const { profile } = useUser();
    const { $dexie } = useNuxtApp();
    const sending = ref(false);
    const { status, data, send, open, close } = useWebSocket(relayURL, {
        autoReconnect: {
            retries: 3,
            delay: 1000,
            onFailed() {
                console.log("Failed to connect WebSocket after 3 retries");
            },
        },
    });

    watch(data, () => {
        console.log('incming websocket', data.value);
    });
    watch(status, () => {
        console.log(status.value);
    });

    onMounted(async () => {
        open();
        relay = new Relay(relayURL);
        await relay.connect();
        console.log(`Connected to ${relay.url}`);
        startStream();
    });

    // Correctly typed function for adding a comment
    const sendComment = async (message: string) => {
        sending.value = true;
        if (!profile.value?.pub) {
            sending.value = false;
            throw new Error("User profile is not loaded");
        }
        const newComment = {
            owner: String(profile.value.pub),
            message,
            created_at: Date.now(), // Now saving as timestamp
            hash: "some_hash_generation_logic_here", // You should replace this with actual hash generation logic
            status: "draft",
        };

        sending.value = false;
        $dexie.comments.add(newComment);
    };

    // Use `useLiveQuery` to reactively fetch all comments ordered by 'created_at'
    const allComments = useLiveQuery(async () => {
        return await $dexie.comments.orderBy("created_at").reverse().toArray();
    }, []);

    const startStream = async () => {
        if (relay !== null && relay.connected) {
            console.log("listen");
            relay.subscribe(
                [
                    {
                        // authors: mockRelay.authors,
                        kinds: [1],
                    },
                ],
                {
                    onevent(event: any) {
                        console.log("incoming", event);
                    },
                }
            );
        }
    };

    return {
        sending,
        sendComment,
        allComments,
    };
};
