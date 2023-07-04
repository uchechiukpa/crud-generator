import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

// sourceDir, destinationDir,
 async function renderDirectory(sourceDir, destinationDir, data) {
  // Ensure the destination directory exists
  fs.mkdirSync(destinationDir, { recursive: true });

  // Read all items in the source directory
  const items = fs.readdirSync(sourceDir, { withFileTypes: true });


  for (const item of items) {
    const sourcePath = path.join(sourceDir, item.name);
    const destinationPath = path.join(destinationDir, item.name).replace('user', data.entityName.toLowerCase());

    if (item.isDirectory()) {
      // If the item is a directory, recursively render it
      await renderDirectory(sourcePath, destinationPath, data);
    } else if (item.isFile() && path.extname(item.name) === '.ejs') {
      // If the item is an EJS file, render it to the destination directory
      const template = fs.readFileSync(sourcePath, 'utf8');
      const output =  ejs.render(template, data);
      fs.writeFileSync(destinationPath.replace('.ejs', '.ts'), output);
    }
  }
}

  export async function crudGenerator(data){
    const element = { entityName: data };
    const sourceDir = '/Users/Uchechi.Ukpa/Desktop/crud-generator/users';
    const destinationDir = `/Users/Uchechi.Ukpa/Desktop/crud-generator/src/${element.entityName.toLowerCase()}`;

  renderDirectory(sourceDir, destinationDir, element);

  }