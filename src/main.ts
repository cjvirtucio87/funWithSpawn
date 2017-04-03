import spawnTouch from './spawnTouch';
import spawnWrite from './spawnWrite';

function main() {
  switch (process.argv[2]) {
    case '-t':
      return spawnTouch();
    case '-w':
      return spawnWrite();
    default:
      return spawnWrite();
  }
}

main();