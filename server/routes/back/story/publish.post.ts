import { story, InsertStory } from "~/server/db/schema";
import { DB } from "~/server/utils/db";
export default defineEventHandler(async (event) => {
  const newPost: InsertStory = {
    title: "test",
    author: " test",
  };
  const db = DB();
  const result = await db.insert(story).values(newPost).run();

  return result;
});
