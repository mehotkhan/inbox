import fs from "fs";
import { generatePath } from "@nuxt/content/transformers/path-meta";

export const generateRoutes = (languages = ["en", "fa"]) => {
  const contents = languages.flatMap((lang) => {
    return generateRoutesForLanguage(lang);
  });
  return contents;
};

const generateRoutesForLanguage = (lang: string) => {
  const path = `content/${lang}`;
  return scanDirectory(path);
};

const scanDirectory = (directory: string, files = []) => {
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const fullPath = `${directory}/${item}`;
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath, files);
    } else if (fullPath.endsWith(".md")) {
      files.push(
        generatePath(fullPath.replace("content", "").replace(".md", ""))
      );
    }
  });

  return files;
};
