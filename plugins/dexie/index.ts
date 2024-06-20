import Dexie, { type EntityTable } from 'dexie';
export default defineNuxtPlugin(() => {

  const dexie = new Dexie('inbox') as Dexie & {
    comments: EntityTable<
      Comment,
      'id' // primary key "id" (for the typings only)
    >;
  };

  // Schema declaration:
  dexie.version(1).stores({
    comments: '++id, owner, created_at, message, hash' // primary key "id" (for the runtime!)
  });

  return {
    provide: {
      dexie,
    },
  };
});
