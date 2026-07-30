import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getMarkdownContent(filename: string) {
  const fullPath = path.join(contentDirectory, filename);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch (error) {
    console.error(`Error reading markdown file: ${filename}`, error);
    return { data: {}, content: `# Error\n\nCould not load content for **${filename}**.` };
  }
}
