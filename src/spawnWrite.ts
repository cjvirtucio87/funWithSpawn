import { FOLDER_NAME, RESULTS_NAME, RESULTS_FILETYPE } from './constants';
import { SPAWN_WRITE } from './config';
import { spawn } from 'child_process';
import { createWriteStream } from 'fs';
import { sep } from 'path';

const ls = (...args: any[]) => spawn('ls', args);
const rmdir = (...args: any[]) => spawn('rmdir', args);
const mkdir = (...args: any[]) => spawn('mkdir', args);

function onWrite() {
  console.log('Finished.');
  console.timeEnd('write');
  console.timeEnd('Total spawnWrite');  
}

function onMkdir() {
  console.log('Done.');
  console.timeEnd('mkdir');

  console.log('Writing to file..');
  console.time('write');
  const cp = ls('-a');
  const os = createWriteStream(`${FOLDER_NAME}${sep}${RESULTS_NAME}${RESULTS_FILETYPE}`, SPAWN_WRITE.wsConfig);
  cp.stdout.pipe(os);
  os.on('finish', onWrite);
}

function onRmdir() {
  console.log('Done.');
  console.timeEnd('rmdir');

  console.log('Creating folder..');
  console.time('mkdir');
  mkdir(FOLDER_NAME).on('close', onMkdir);
}

function cleanUp() {
  console.log(`Removing file ${RESULTS_NAME}${RESULTS_FILETYPE}..`);
  console.time('rmdir');
  rmdir(FOLDER_NAME).on('close', onRmdir);
}

export default function spawnWrite() {
  console.log('BEGIN: spawnWrite');
  console.time('Total spawnWrite');
  cleanUp();
}