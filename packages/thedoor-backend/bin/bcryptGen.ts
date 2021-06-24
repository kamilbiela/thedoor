import bcrypt from 'bcrypt';

const hash = bcrypt.hashSync(process.argv[2], 12);
console.log('Hashed: ' + hash);
