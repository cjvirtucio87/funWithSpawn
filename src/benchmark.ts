import { spawn, exec } from 'child_process';
import { sep } from 'path';

const bench = (spType: string) => (runFn: Function) => runFn(spType);
const run = (spType: string) => {
  const cp = spawn('node', [`.${sep}build${sep}main`, spType]);
  cp.stdout.on('data', (data: any[]) => console.log(data.toString()));
  return (onClose: Function) => cp.on('close', onClose);
}

const benchWrite = bench('-w');
const benchTouch = bench('-t');

benchWrite(run)(benchTouch.bind(this, run));

// const cp = spawn('node', ['./build/main', '-w']);
// cp.stdout.on('data', (data: any) => console.log(data.toString()));
// cp.on('close', () => console.log('Finished running benchmark.'));