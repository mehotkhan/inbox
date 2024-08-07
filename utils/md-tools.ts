import { remark } from "remark";
import frontmatter from "remark-frontmatter";
import { parse as parseYaml } from "yaml";

interface ExtractedData {
  frontmatter: Record<string, any>;
  body: string;
}

export const extractMarkdownData = async (
  markdown: string
): Promise<ExtractedData> => {
  let frontmatterContent = "";
  let bodyContent = "";

  const processor = remark().use(frontmatter, ["yaml"]);

  const file = processor.processSync(markdown);
  const content = file.toString();

  // Separate frontmatter and body content
  const match: any = content.match(/(^---[\s\S]+?---)([\s\S]*)/);
  if (match) {
    frontmatterContent = match[1];
    bodyContent = match[2].trim();
  }

  const frontmatterJson = parseYaml(
    frontmatterContent.replace(/^---|---$/g, "").trim()
  );

  return {
    frontmatter: frontmatterJson,
    body: bodyContent,
  };
};
