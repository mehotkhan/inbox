import Dexie, { Table } from "dexie";

interface Story {
  id?: string;
  title?: string;
  story?: any;
  prompts?: any[];
  author?: string;
  poster?: string;
  status?: "new" | "draft" | "publish";
  created_at?: number;
  updated_at?: number;
}

class DexieDatabase extends Dexie {
  story!: Table<Story & { id: string }>;

  constructor() {
    super("Hekayat");
    this.version(1).stores({
      story:
        "id, title, story, prompts, created_at, updated_at ,author ,status",
    });
  }
}

export const DexieDB = new DexieDatabase();
