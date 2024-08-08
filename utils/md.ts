interface ExtractedData {
  frontmatter: Record<string, any>;
  body: string;
}

export const extractMarkdownData = (markdown: string): ExtractedData => {
  const yamlRegex = /^---\n([\s\S]+?)\n---/;
  const match = markdown.match(yamlRegex);

  let frontmatterContent: any = "";
  let bodyContent = markdown;

  if (match) {
    frontmatterContent = match[1];
    bodyContent = markdown.slice(match[0].length).trim();
  }

  const parseYamlToJson = (yaml: string): Record<string, any> => {
    const lines = yaml.split("\n");
    const result: Record<string, any> = {};

    lines.forEach((line) => {
      const [key, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      if (key && value !== undefined) {
        result[key.trim()] = value;
      }
    });

    return result;
  };

  const frontmatterJson = parseYamlToJson(frontmatterContent);

  return {
    frontmatter: frontmatterJson,
    body: bodyContent,
  };
};
