// constants
import { FOLDER_NAME, RESULTS_NAME, RESULTS_FILETYPE } from './constants';
import { SPAWN_WRITE } from './config';

// child process utils
import { ls, mkdir, rmdir, touch } from './spawnFactory';
import { cpFactory } from './cpFactory';

// IO utils
import { createWriteStream } from 'fs';
import { sep, join } from 'path';

const TARGET_FILE = join(FOLDER_NAME, RESULTS_NAME + RESULTS_FILETYPE);

// child processes
const cleanUp = cpFactory('Cleaning up.', rmdir);
const makeFolder = cpFactory('Making folder.', mkdir.bind(this, FOLDER_NAME));
const touchFile = cpFactory('Creating file.', touch.bind(this, TARGET_FILE))
const writeFile = cpFactory('Writing file.', ls.bind(this, '-a'), (cp: any) => {
  const os = createWriteStream(`${FOLDER_NAME}${sep}${RESULTS_NAME}${RESULTS_FILETYPE}`, SPAWN_WRITE.wsConfig);
  cp.stdout.pipe(os);
});

export default function spawnTouch() {
  console.log('BEGIN: spawnTouch');
  console.time('Total spawnTouch');
  cleanUp(
    makeFolder.bind(this,
    touchFile.bind(this, 
    writeFile.bind(this, 
    () => console.timeEnd('Total spawnTouch')
    )))
  );
}