import { spawn } from 'child_process';

export const spawnFactory = (proc: string) => (...args: any[]) => spawn(proc, args);

export const ls = spawnFactory('ls');
export const mkdir = spawnFactory('mkdir');
export const rmdir = spawnFactory('rmdir');
export const touch = spawnFactory('touch');