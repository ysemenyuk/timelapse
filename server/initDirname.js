import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

console.log('initDirname __dirname - ', __dirname);
console.log('initDirname path.resolve() - ', path.resolve());
