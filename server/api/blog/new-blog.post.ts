import { WebUUID } from "web-uuid";
import { z } from "zod";
import { blog, InsertBlog } from "~/server/db/schema";
import { DB } from "~/server/utils/db";

const userSchema = z.object({
  title: z.string(),
  summery: z.string(),
  body: z.string(),
});
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    userSchema.safeParse(body),
  );

  if (!body.success) throw body.error.issues;

  const newBlog: InsertBlog = {
    title: body.data.title,
    summery: body.data.summery,
    body: body.data.body,
    poster: null,
    uuid: WebUUID.v4().toString(),
    publish: true,
  };
  const db = DB();
  const result = await db.insert(blog).values(newBlog).run();

  return result;
});
