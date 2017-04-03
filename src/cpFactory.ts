export const cpFactory = (msg: string, spawnFn: Function, cpHandler?: Function) => (onClose: Function) => {
  console.log(msg);
  const cp = spawnFn();
  if (cpHandler) cpHandler(cp);
  cp.on('close', onClose);
}