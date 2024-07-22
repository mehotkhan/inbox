import type { Table } from "dexie";
import Dexie from "dexie";

export default defineNuxtPlugin(() => {
  class BlogDatabase extends Dexie {
    comments!: Table<Comment, number>;
    members!: Table<MemberProfile, number>;

    constructor() {
      super("blog");
      this.version(3).stores({
        comments: "++id, owner, created_at, message, hash, status",
        members: "++id, pub",
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
