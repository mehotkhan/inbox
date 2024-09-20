import { drizzle } from "drizzle-orm/d1";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { DB } = event.context.cloudflare.env;

    const newUser: InsertMember = {
      firstName: body.firstName,
      lastName: body.lastName,
      displayName: body.displayName,
      about: body.about,
      avatar: body.avatar,
      pub: body.pub,
    };

    const drizzleDb = drizzle(DB);
    drizzleDb.insert(member).values(newUser).run();
    return newUser;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
