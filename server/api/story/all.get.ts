import { story } from "~/server/db/schema";
import { DB } from "~/server/utils/db";
export default defineEventHandler(async (event) => {
  const db = DB();
  const result = await db.select().from(story);

  return result;
});
