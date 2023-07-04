import  commander from 'commander';
import {crudGenerator} from './crud-generator'
// const generateCrud = require('./generateCrud');

const program = new commander.Command();

program
  .arguments('<entityName>')
  .action((entityName) => {
    crudGenerator(entityName);
  });

program.parse(process.argv);