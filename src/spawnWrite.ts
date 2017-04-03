// constants
import { FOLDER_NAME, RESULTS_NAME, RESULTS_FILETYPE } from './constants';
import { SPAWN_WRITE } from './config';

// child process utils
import { ls, mkdir, rmdir } from './spawnFactory';
import { cpFactory } from './cpFactory';

// IO utils
import { createWriteStream } from 'fs';
import { join } from 'path';

const TARGET_FILE = join(FOLDER_NAME, RESULTS_NAME + RESULTS_FILETYPE);

// child processes
const cleanUp = cpFactory('Cleaning up.', rmdir);
const makeFolder = cpFactory('Making folder.', mkdir.bind(this, FOLDER_NAME));
const writeFile = cpFactory('Writing file.', ls.bind(this, '-a'), (cp: any) => {
  const os = createWriteStream(TARGET_FILE, SPAWN_WRITE.wsConfig);
  cp.stdout.pipe(os);
});

export default function spawnWrite() {
  console.log('BEGIN: spawnWrite');
  console.time('Total spawnWrite');
  cleanUp(
    makeFolder.bind(this, 
    writeFile.bind(this, 
    () => console.timeEnd('Total spawnWrite')
    ))
  );
}