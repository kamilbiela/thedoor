import path from 'path';
import { loadFixtures } from '../test/loadFixtures'

const fixturesPath = path.join(__dirname, '..', 'fixtures');
loadFixtures(fixturesPath).then(() => {
  console.log('Fixtures loaded');
}, (e) => {
  console.error(e);
});
