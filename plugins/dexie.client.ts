import Dexie, { Table } from "dexie";

export default defineNuxtPlugin(() => {
  class BlogDatabase extends Dexie {
    comments!: Table<Comment, number>;

    constructor() {
      super("blog");
      this.version(2).stores({
        comments: "++id, owner, created_at, message, hash, status",
      });
    }
  }

  const dexie = new BlogDatabase();

  return {
    provide: {
      dexie,
    },
  };
});
