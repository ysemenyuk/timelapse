export default (agenda) => {
  console.log(111, 'agenda.define consoleLog job');

  agenda.define('consoleLog', { lockLifetime: 1000 }, (job) => {
    console.log('consoleLog job.attrs:', job.attrs.data);
  });
};
