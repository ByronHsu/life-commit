#!/usr/bin/env node
const meow = require('meow')
const updateNotifier = require('update-notifier')
const LifeCommitCli = require('./src/lifecommit.js')
const pkg = require('./package.json')
const utils = require('./src/utils.js')

updateNotifier({ pkg }).notify()

const cli = meow(`
  Usage
    $ life
  Options
    --commit, -c    Interactively commit using the prompts
    --init, -i      Initialize your life
    --log, -l      Log your commit on life
  Examples
    $ life -i
`, {
  flags: {
    commit: { type: 'boolean', alias: 'c' },
    init: { type: 'boolean', alias: 'i' },
    log: { type: 'boolean', alias: 'l' },
  }
})

const gitmojiCli = new LifeCommitCli(utils.gitmojiApiClient)
const options = {
  commit: () => gitmojiCli.ask('client'),
  init: () => gitmojiCli.init(),
  log: () => gitmojiCli.log(),
}

utils.findGitmojiCommand(cli, options)
