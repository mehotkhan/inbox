export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig(event);

  const baseAPI = `https://api.github.com/repos/${config.app.githubRepo}/contents/content/${body.name}?ref=Nosterize`;
  const fileData = $fetch(baseAPI, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.app.githubToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return fileData;
});
