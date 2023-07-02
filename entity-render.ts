import * as ejs from 'ejs';
import * as fs from 'fs';

// Load the template
const template = fs.readFileSync('./create-command.ejs', 'utf-8');

// Data for the template
const data = {
    entityName: 'Product',
};

// Render the template
const output = ejs.render(template, data);

console.log(output);