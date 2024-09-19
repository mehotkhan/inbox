import fs from 'fs';
import path from 'path';

/**
 * Recursively retrieves all files with the specified extensions from the given directory, excluding specified directories.
 * @param {string} dir - The directory to scan.
 * @param {string[]} extensions - Array of file extensions to include.
 * @param {string[]} excludeDirs - Array of directory names to exclude.
 * @param {string[]} files - Accumulator for the file paths.
 * @returns {string[]} An array of file paths.
 */
function getAllFiles(dir, extensions, excludeDirs = ['node_modules', '.git'], files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!excludeDirs.includes(entry.name)) {
        getAllFiles(fullPath, extensions, excludeDirs, files);
      }
    } else if (extensions.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Extracts I18n keys from file content using regex.
 * @param {string} fileContent - The content of the file.
 * @returns {string[]} An array of extracted keys.
 */
function extractI18Keys(fileContent) {
  // Match $t('key') or t('key') where 'key' is a string literal without any expressions
  const regex = /(?:\$t|t)\(\s*(['"`])(.*?)\1\s*\)/g;
  const keys = [];
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

/**
 * Reads a JSON file and parses its content.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Object} An object representing the JSON content.
 */
function readJson(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error parsing JSON file at ${filePath}:`, error);
      return {};
    }
  } else {
    return {};
  }
}

/**
 * Merges new keys into the existing JSON object, avoiding duplicates.
 * @param {Object} existing - The existing JSON object.
 * @param {Set<string>} keys - A set of new keys to add.
 * @returns {Object} The updated JSON object.
 */
function mergeKeys(existing, keys) {
  const result = { ...existing };
  for (const key of keys) {
    if (!(key in result)) {
      result[key] = key; // Use the key as both key and value for default translation
    }
  }
  return result;
}

/**
 * Sorts the keys of an object alphabetically.
 * @param {Object} obj - The object whose keys are to be sorted.
 * @returns {Object} A new object with sorted keys.
 */
function sortKeys(obj) {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj = {};
  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }
  return sortedObj;
}

/**
 * Main function to execute the script.
 */
function main() {
  const projectDir = process.cwd();
  const localeDir = path.join(projectDir, 'locales'); // Adjust if your locales directory is different
  const faJsonPath = path.join(localeDir, 'fa.json');
  const enJsonPath = path.join(localeDir, 'en.json');

  // Define file extensions to scan
  const extensions = ['.ts', '.vue'];
  const excludeDirs = ['node_modules', '.git'];
  const files = getAllFiles(projectDir, extensions, excludeDirs);

  // Collect all unique translation keys
  const allKeys = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const keys = extractI18Keys(content);
    keys.forEach((key) => allKeys.add(key));
  }

  // Read existing locale files
  const faJson = readJson(faJsonPath);
  const enJson = readJson(enJsonPath);

  // Merge new keys into the locale files
  const updatedFaJson = mergeKeys(faJson, allKeys);
  const updatedEnJson = mergeKeys(enJson, allKeys);

  // Sort the keys alphabetically
  const sortedFaJson = sortKeys(updatedFaJson);
  const sortedEnJson = sortKeys(updatedEnJson);

  // Write the updated locale files
  fs.writeFileSync(faJsonPath, JSON.stringify(sortedFaJson, null, 2), 'utf8');
  fs.writeFileSync(enJsonPath, JSON.stringify(sortedEnJson, null, 2), 'utf8');

  console.log(`Updated fa.json and en.json with ${allKeys.size} keys.`);
}

// Execute the main function
main();
