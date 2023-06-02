const testIPC = async () => {
  // eslint-disable-next-line no-console
  console.log('Received test IPC message');
  return 'hello';
};

export default testIPC;
