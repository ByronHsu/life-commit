const chalk = require('chalk')
const execa = require('execa')
const fs = require('fs')
const inquirer = require('inquirer')
const parentDirs = require('parent-dirs')
const path = require('path')
const pathExists = require('path-exists')
const uuid = require('uuid/v4')
const ora = require('ora');
const CFonts = require('cfonts');

const config = require('./config')
const prompts = require('./prompts')
const constants = require('./constants')

inquirer.registerPrompt(
  'autocomplete', require('inquirer-autocomplete-prompt')
)
inquirer.registerPrompt(
  'datetime', require('inquirer-datepicker-prompt'))

class GitmojiCli {
  constructor (gitmojiApiClient, gitmojis) {
    this._gitmojiApiClient = gitmojiApiClient
    this._gitmojis = gitmojis
    if (config.getAutoAdd() === undefined) config.setAutoAdd(true)
    if (!config.getIssueFormat()) config.setIssueFormat(constants.GITHUB)
    if (!config.getEmojiFormat()) config.setEmojiFormat(constants.CODE)
    if (config.getSignedCommit() === undefined) config.setSignedCommit(true)
  }

  init () {
    fs.writeFile(constants.DATA_PATH, JSON.stringify([], null, ' '), (error)=>{
      if(error) {
        return this._errorMessage(error)
      }
    })
  }

  ask (mode) {
    return this._fetchEmojis()
      .then((gitmojis) => prompts.gitmoji(gitmojis))
      .then((questions) => {
        inquirer.prompt(questions).then((answers) => {
          if (mode === constants.HOOK_MODE) this._hook(answers)
          return this._commit(answers)
        })
      })
      .catch(err => this._errorMessage(err.code))
  }
  
  log () {
    // CFonts.say('Life', {
    //   font: 'block',        //define the font face
    //   align: 'center',        //define text alignment
    //   colors: ['cyan', 'yellow'],    //define all colors
    //   background: 'Black',  //define the background color
    //   letterSpacing: 1,     //define letter spacing
    //   lineHeight: 1,        //define the line height
    //   space: true,          //define if the output text should have empty lines on top and on the bottom
    //   maxLength: '0'        //define how many character can be on one line
    // });
    this._fetchCachedData(constants.DATA_PATH)
      .then((data)=>{
        data.sort((c1, c2) => Date.parse(new Date(c1.date)) < Date.parse(new Date(c2.date)))
        data.forEach((commit)=>{
          const date = new Date(commit.date).toString('yyyy/M/d')
          console.log(`* ${chalk.red(commit.id.slice(0,6))} - ${commit.emoji}  ${chalk.blue(commit.title)} ${chalk.green(date)}`)
        })
      })
      .catch((error)=>{
        return this._errorMessage(error);
      })
  }

  updateCache () {
    this._fetchRemoteEmojis()
      .then(emojis => this._createCache(this._getCachePath(), emojis))
  }

  _errorMessage (message) {
    console.error(chalk.red(`ERROR: ${message}`))
  }

  _commit (answers) {
    const emoji = `${answers.gitmoji}`
    const title = `${answers.title}`
    const body = `${answers.message}`
    const date = answers.date
    const id = uuid();
    const commit = {emoji, title, body, date, id};
    this._fetchCachedData(constants.DATA_PATH)
      .then((data)=>{
        data.push(commit)
        return new Promise((resolve, reject) => {
          fs.writeFile(constants.DATA_PATH, JSON.stringify(data, null, ' '), (error)=>{
            if(error) {
              reject(error);
            }else{
              resolve(commit);
            }
          })
        })
      })
      .then((commit)=>{
        console.log(`${chalk.green('1 commit added(+)')}`);
      })
      .catch((error)=>{
        return this._errorMessage(error)
      })
  }
  _fetchCachedData (cachePath) {
    return Promise.resolve(JSON.parse(fs.readFileSync(cachePath)))
  }
  _parseGitmojis (gitmojis) {
    return gitmojis.map(gitmoji => {
      const emoji = gitmoji.emoji
      const code = gitmoji.code
      const description = gitmoji.description
      return console.log(`${emoji} - ${chalk.blue(code)} - ${description}`)
    })
  }

  _getCachePath () {
    const home = process.env.HOME || process.env.USERPROFILE
    return path.join(home, '.gitmoji', 'gitmojis.json')
  }

  _cacheAvailable (cachePath) {
    return pathExists.sync(cachePath)
  }

  _createCache (cachePath, emojis) {
    const cacheDir = path.dirname(cachePath)

    if (emojis !== undefined) {
      if (!pathExists.sync(cacheDir)) {
        fs.mkdirSync(cacheDir)
      }
      fs.writeFileSync(cachePath, JSON.stringify(emojis))
    }
  }

  _fetchRemoteEmojis () {
    return this._gitmojiApiClient.request({
      method: 'GET',
      url: '/src/data/gitmojis.json'
    }).then((res) => {
      console.log(`${chalk.yellow('Gitmojis')} updated successfully!`)
      return res.data.gitmojis
    })
    .catch((error) =>
      this._errorMessage(`Network connection not found - ${error.code}`)
    )
  }

  _fetchCachedEmojis (cachePath) {
    return Promise.resolve(JSON.parse(fs.readFileSync(cachePath)))
  }

  _fetchEmojis () {
    const cachePath = this._getCachePath()
    if (this._cacheAvailable(cachePath)) {
      return this._fetchCachedEmojis(cachePath)
    }
    return this._fetchRemoteEmojis().then((emojis) => {
      this._createCache(cachePath, emojis)
      return emojis
    })
  }
}

module.exports = GitmojiCli
