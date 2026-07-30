const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content');
const outputFile = path.join(__dirname, '../public/search-index.json');

function generateIndex() {
  const files = fs.readdirSync(contentDir);
  const index = [];

  for (const file of files) {
    if (file.endsWith('.md') || file.endsWith('.MD')) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Basic markdown stripping (optional, we'll keep it simple and just include the text)
      // Removing excessive newlines and formatting to make JSON smaller
      const cleanContent = content
        .replace(/#+\s/g, '') // Remove headings
        .replace(/\*\*|__/g, '') // Remove bold
        .replace(/\*|_/g, '') // Remove italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Extract link text
        .replace(/`{1,3}[^`\n]*`{1,3}/g, '') // Remove code blocks
        .replace(/\n+/g, ' ') // Replace newlines with space
        .trim();

      index.push({
        filename: file,
        content: cleanContent
      });
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(index));
  console.log(`Generated search index with ${index.length} files.`);
}

generateIndex();
