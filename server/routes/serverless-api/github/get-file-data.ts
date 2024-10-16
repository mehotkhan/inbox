export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { githubRepo, githubToken } = event.context.inboxConfig;

  const baseAPI = `https://api.github.com/repos/${githubRepo}/contents/content/${body.name}?ref=Nosterize`;
  const fileData = $fetch(baseAPI, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return fileData;
});
