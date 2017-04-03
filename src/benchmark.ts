import { spawn, exec } from 'child_process';
import { sep } from 'path';

const bench = (spType: string) => (onClose: Function) => {
  const cp = spawn('node', [`.${sep}build${sep}main`, spType]);
  cp.stdout.on('data', (data: any[]) => console.log(data.toString()));
  cp.on('close', onClose);
}

const benchWrite = bench('-w');
const benchTouch = bench('-t');

benchWrite(
  benchTouch.bind(this, 
  () => console.log('Finished benchmark.')
  )
);