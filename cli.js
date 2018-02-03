#!/usr/bin/env node
const meow = require('meow');
const updateNotifier = require('update-notifier');
const LifeCli = require('./src/lifeCli.js');
const pkg = require('./package.json');
const utils = require('./src/utils.js');

updateNotifier({ pkg }).notify();

const cli = meow(
  `
  Usage
    $ life
  Options
    --init, -i                 Initialize your life
    --commit, -c               Commit on your life
    --log, -l                  Log the commits on your life 
    --edit , -e <commitId>     Edit the existing commits 
    --dir, -d                  Create a directory that visualizing the commits on webpage      
  Examples
    $ life --commit
`,
  {
    flags: {
      init: { type: 'boolean', alias: 'i' },
      commit: { type: 'boolean', alias: 'c' },
      log: { type: 'boolean', alias: 'l' },
      edit: { type: 'boolean', alias: 'e' },
      dir: { type: 'boolean', alias: 'd' },
    },
  }
);

const lifeCli = new LifeCli(utils.lifeApiClient);
const options = {
  init: () => lifeCli.init(),
  commit: () => lifeCli.commit(),
  log: () => lifeCli.log(),
  edit: () => lifeCli.edit(),
  dir: () => lifeCli.dir(),
};

utils.findLifeCommand(cli, options);
