export default defineEventHandler(async () => {
  const newUser: InsertMember = {
    firstName: "test",
  };
  drizzleDb.insert(member).values(newUser).run();

  const res = drizzleDb.select().from(member).all();
  console.log("register");
  return {
    res,
  };
});
