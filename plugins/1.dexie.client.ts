import type {
  DBCore,
  DBCoreMutateRequest,
  DBCoreMutateResponse,
  Table,
} from "dexie";
import Dexie from "dexie";

export default defineNuxtPlugin(() => {
  class Database extends Dexie {
    events!: Table<NostrEvent, string>;

    constructor() {
      super("inbox");
      this.version(1).stores({
        events: "++id, kind,content, created_at, tags ,pubkey,status",
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
                    const events = req.values as NostrEvent[];
                    for (const event of events) {
                      if (event.status === "Sending") {
                        try {
                          const { $sendEVENTMessage } = useNuxtApp();
                          await $sendEVENTMessage(event);
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
