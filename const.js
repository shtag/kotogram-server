const dataStart = `import { compare, genSalt, hash } from 'bcrypt';
import Post from './post.js';
import User from './user.js';

let data = `;

const dataEnd = `;

export default data;`;

export { dataStart, dataEnd };
