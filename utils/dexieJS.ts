import Dexie, { Table } from "dexie";

interface Message {
  id?: string;
  owner: string;
  other: string;
  created_at?: number;
  updated_at?: number;
  message: string;
  status: "new" | "send" | "receive" | "seen";
}

class DexieDatabase extends Dexie {
  messages!: Table<Message & { id: string }>;

  constructor() {
    super("totoro");
    this.version(2).stores({
      messages: "id, created_at, updated_at ,owner ,status",
    });
  }
}

export const DexieDB = new DexieDatabase();
