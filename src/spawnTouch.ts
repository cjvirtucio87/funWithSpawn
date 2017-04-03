import { FOLDER_NAME, RESULTS_NAME, RESULTS_FILETYPE } from './constants';
import { SPAWN_TOUCH } from './config';
import { spawn } from 'child_process';
import { createWriteStream } from 'fs';
import { sep } from 'path';

const ls = (...args: any[]) => spawn('ls', args);
const rmdir = (...args: any[]) => spawn('rmdir', args);
const mkdir = (...args: any[]) => spawn('mkdir', args);
const touch = (...args: any[]) => spawn('touch', args);

function onWrite() {
  console.log('Done.');
  console.timeEnd('write');
  console.timeEnd('Total spawnTouch');
}

function onTouch(data: String[]) {
  console.log('Done.');
  console.timeEnd('touch');

  console.log('Writing to file..');
  console.time('write');
  const cp = ls('-a');
  const os = createWriteStream(`${FOLDER_NAME}${sep}${RESULTS_NAME}${RESULTS_FILETYPE}`, SPAWN_TOUCH.wsConfig);
  cp.stdout.pipe(os);
  os.on('finish', onWrite);
}

function onMkdir() {
  const fileName = `${FOLDER_NAME}/${RESULTS_NAME}${RESULTS_FILETYPE}`;
  console.log('Done.');
  console.timeEnd('mkdir');
  console.log(`Creating file "${fileName}"..`);
  console.time('touch');
  const touched = touch(fileName);
  touched.on('close', onTouch);
}

function onRmdir() {
  console.log('Done.')
  console.timeEnd('rmdir');

  console.log(`Making folder, "./${FOLDER_NAME}"..`)
  console.time('mkdir');
  mkdir(FOLDER_NAME).on('close', onMkdir);
}

function cleanUp() {
  console.log(`Removing file ${RESULTS_NAME}${RESULTS_FILETYPE}..`);
  console.time('rmdir');
  rmdir(FOLDER_NAME).on('close', onRmdir);
}

export default function spawnTouch() {
  console.log('BEGIN: spawnTouch');
  console.time('Total spawnTouch');
  cleanUp();
}