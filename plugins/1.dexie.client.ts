import type {
  DBCore,
  DBCoreMutateRequest,
  DBCoreMutateResponse,
  Table,
} from "dexie";
import Dexie from "dexie";
import type { Event as NostrEvent } from "nostr-tools";

interface ExtendedEvent extends NostrEvent {
  seen?: boolean;
}

interface MemberProfile {
  id?: number;
  pub: string;
}

export default defineNuxtPlugin(() => {
  class Database extends Dexie {
    events!: Table<ExtendedEvent, number>;
    members!: Table<MemberProfile, number>;

    constructor() {
      super("blog");
      this.version(4).stores({
        events:
          "++id, kind, tags, message, content, created_at, pubkey, sig, seen",
        members: "++id, pub",
      });

      this.use({
        stack: "dbcore",
        name: "syncMiddleware",
        create: (downlevelDatabase: DBCore) => {
          return {
            ...downlevelDatabase,
            table: (tableName: string) => {
              const downlevelTable = downlevelDatabase.table(tableName);
              return {
                ...downlevelTable,
                mutate: async (req: DBCoreMutateRequest) => {
                  const result: DBCoreMutateResponse =
                    await downlevelTable.mutate(req);

                  if (req.type === "add" && tableName === "events") {
                    const events = req.values as ExtendedEvent[];
                    for (const event of events) {
                      if (!event.seen) {
                        try {
                          const body = await $fetch("/nostr/create", {
                            method: "post",
                            body: event,
                          });
                          console.log(body);
                          // Update the event to mark it as seen
                          // event.seen = true;
                          console.log("send");
                          // await downlevelTable.mutate({
                          //   type: "put",
                          //   values: [event],
                          //   keys: [event.id],
                          //   trans: req.trans,
                          //   wantResults: false,
                          // });
                        } catch (error) {
                          console.error("Error syncing event:", error);
                        }
                      }
                    }
                  }

                  return result;
                },
              };
            },
          };
        },
      });
    }
  }

  const dexie = new Database();

  return {
    provide: {
      dexie,
    },
  };
});
