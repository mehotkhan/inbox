import { hexToBytes } from '@noble/hashes/utils';
import Dexie, { DBCore, DBCoreMutateRequest, DBCoreMutateResponse, Table } from 'dexie';
import { Event as NostrEvent, Relay, finalizeEvent } from 'nostr-tools';

const relayURL = 'ws://localhost:3000/nostr-relay';

interface Comment {
  id: number;
  hash: string;
  owner: string;
  message: string;
  created_at: number;
  status: 'draft' | 'sending' | 'send' | 'published' | 'spam';
}

export default defineNuxtPlugin(() => {
  const { profile } = useUser();

  class BlogDatabase extends Dexie {
    comments!: Table<Comment, number>;
    private relay!: Relay;
    private userPriv!: string;
    private userPub!: string;

    constructor() {
      super('blog');
      this.userPriv = profile.value.priv;
      this.userPub = profile.value.pub;
      this.relay = new Relay(relayURL);
      this.version(2).stores({
        comments: '++id, owner, created_at, message, hash, status',
      });

      this.use(this.createSyncMiddleware());
      this.startNostr();

    }
    private createSyncMiddleware() {
      return {
        stack: 'dbcore',
        name: 'syncMiddleware',
        create: (downlevelDatabase: DBCore) => {
          return {
            ...downlevelDatabase,
            table: (tableName: string) => {
              const downlevelTable = downlevelDatabase.table(tableName);
              return {
                ...downlevelTable,
                mutate: async (req: DBCoreMutateRequest) => {
                  const result: DBCoreMutateResponse = await downlevelTable.mutate(req);

                  if (req.type === 'put' || req.type === 'add') {
                    const changes = req.values as Comment[];
                    for (const change of changes) {
                      try {
                        await this.syncNostr(change);
                        change.status = 'send';
                      } catch (error) {
                        change.status = 'sending';
                        console.error('Error syncing with backend:', error);
                      } finally {
                        await downlevelTable.mutate({
                          type: req.type,
                          values: [change],
                          keys: req.keys,
                          trans: req.trans,
                          wantResults: false,
                        });
                      }
                    }
                  }

                  return result;
                },
              };
            },
          };
        },
      };
    }

    private startNostr = async () => {
      await this.relay.connect();

      // console.log(`Connected to ${this.relay.url}`);
      // this.relay.subscribe(
      //   [
      //     {
      //       kinds: [1],
      //       // authors: [this.userPub],
      //     },
      //   ],
      //   {
      //     onevent: async (event: NostrEvent) => {
      //       console.log('Received event:', event);
      //       // await this.handleIncomingEvent(event);
      //     },
      //     onclose(reason) {

      //       console.log('No more events');
      //     },
      //   }
      // );

    };

    // private handleIncomingEvent = async (event: NostrEvent) => {
    //   const newComment: Comment = {
    //     id: parseInt(event.id, 16), // Assuming `event.id` is a hex string
    //     hash: '', // Populate accordingly
    //     owner: event.pubkey,
    //     message: event.content,
    //     created_at: event.created_at * 1000,
    //     status: 'published',
    //   };

    //   try {
    //     await this.comments.add(newComment);
    //     console.log('Comment added from WebSocket:', newComment);
    //   } catch (error) {
    //     console.error('Failed to add comment from WebSocket:', error);
    //   }
    // };

    private syncNostr = async (data: any) => {
      console.log('Sending data to Nostr relay:', data);
      const event: NostrEvent = finalizeEvent(
        {
          kind: 1,
          created_at: Math.floor(Date.now() / 1000),
          tags: [],
          content: data.message,
        },
        hexToBytes(this.userPriv)
      );

      await this.relay.publish(event);
    };
  }

  const dexie = new BlogDatabase();

  return {
    provide: {
      dexie,
    },
  };
});
