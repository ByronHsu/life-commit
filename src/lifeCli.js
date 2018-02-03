const chalk = require('chalk');
const execa = require('execa');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const pathExists = require('path-exists');
const uuid = require('uuid/v4');
const prompts = require('./prompts');

inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
);
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

class lifeCli {
  constructor(lifeApiClient) {
    this._lifeApiClient = lifeApiClient;
  }

  init() {
    if (this._getCommitsPath().exist === false) {
      this._createFile(this._getCommitsPath().path, []);
      console.log(
        `${chalk.cyan('Your life has been initialized successfully!')}`
      );
      return;
    } else {
      console.log(
        `${chalk.cyan('Your life had been initialized. Start commit now!')}`
      );
    }
  }

  commit() {
    let patch = {};
    if (this._getCommitsPath().exist === false) {
      return this._errorMessage('Please initialize your life first.');
    }
    return this._commitPrompt()
      .then(answers => {
        patch = {
          lifemoji: `${answers.lifemoji}`,
          title: `${answers.title}`,
          message: `${answers.message}`,
          date: answers.date,
          id: uuid(),
        };
        return this._fetchCommits();
      })
      .then(commits => {
        commits.push(patch);
        this._createFile(this._getCommitsPath().path, commits);
      })
      .then(() => {
        console.log(`${chalk.green('1 commit added(+)')}`);
      })
      .catch(error => {
        return this._errorMessage(error);
      });
  }
  log() {
    return this._fetchCommits()
      .then(commits => {
        commits.sort(
          (c1, c2) =>
            Date.parse(new Date(c1.date)) < Date.parse(new Date(c2.date))
        );
        commits.forEach(commit => {
          const date = new Date(commit.date).toString('yyyy/M/d');
          console.log(
            `* ${chalk.red(commit.id.slice(0, 6))} - ${
              commit.lifemoji
            }  ${chalk.blue(commit.title)} ${chalk.green(date)}`
          );
        });
      })
      .catch(error => {
        return this._errorMessage(error);
      });
  }
  edit() {
    if (process.argv.length < 4)
      return this._errorMessage('Please specify the commit id.');
    let id = process.argv[3];
    let commits = [],
      index;
    return this._fetchCommits()
      .then(data => {
        commits = data;
        index = commits.findIndex(patch => patch.id.indexOf(id) !== -1);
        if (index === -1) {
          return this._errorMessage('Commid id dose not exist.');
        } else {
          const date = new Date(commits[index].date).toString('yyyy/M/d');
          console.log(
            `* ${chalk.red(commits[index].id.slice(0, 6))} - ${
              commits[index].lifemoji
            }  ${chalk.blue(commits[index].title)} ${chalk.green(date)}`
          );
          return inquirer.prompt(prompts.edit.choose()).then(answers => {
            if (answers.choose === 'Remove') {
              commits.splice(index, 1);
              console.log(`${chalk.red('1 commit removed')}`);
              return;
            } else {
              return this._commitPrompt().then(answers => {
                let patch = {
                  lifemoji: `${answers.lifemoji}`,
                  title: `${answers.title}`,
                  message: `${answers.message}`,
                  date: answers.date,
                };
                Object.assign(commits[index], patch);
                console.log(`${chalk.blue('1 commit edited')}`);
              });
            }
          });
        }
      })
      .then(() => {
        this._createFile(this._getCommitsPath().path, commits);
      })
      .catch(error => {
        return this._errorMessage(error);
      });
  }
  dir() {
    const folder = 'web';
    const cmd = `cp -r ${__dirname}/website ${folder}`;
    execa
      .shell(cmd)
      .catch(err => this._errorMessage(err.stderr ? err.stderr : err.stdout));
    console.log(
      `${chalk.yellow('Successfully create folder')} ${chalk.cyan(folder)}!`
    );
  }
  _commitPrompt() {
    return this._fetchLifemojis()
      .then(Lifemojis => prompts.commit(Lifemojis))
      .then(questions => {
        return inquirer.prompt(questions);
      })
      .catch(err => this._errorMessage(err.code));
  }

  _errorMessage(message) {
    console.error(chalk.red(`ERROR: ${message}`));
  }

  _parseLifemojis(lifemojis) {
    return lifemojis.map(lifemoji => {
      return console.log(
        `${lifemoji.emoji} - ${chalk.blue(lifemoji.code)} - ${
          lifemoji.description
        }`
      );
    });
  }

  _fetchCommits() {
    return Promise.resolve(
      JSON.parse(fs.readFileSync(this._getCommitsPath().path))
    );
  }

  _getCommitsPath() {
    const home = process.env.HOME || process.env.USERPROFILE;
    const commitPath = path.join(home, '.life-cli', 'commits.json');
    return { path: commitPath, exist: pathExists.sync(commitPath) };
  }

  _getCachePath() {
    const home = process.env.HOME || process.env.USERPROFILE;
    const cachePath = path.join(home, '.life-cli', 'lifemojis.json');
    return { path: cachePath, exist: pathExists.sync(cachePath) };
  }

  _createFile(filePath, data) {
    const fileDir = path.dirname(filePath);

    if (data !== undefined) {
      if (!pathExists.sync(fileDir)) {
        fs.mkdirSync(fileDir);
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, ' '));
    }
  }

  _fetchRemoteLifemojis() {
    return this._lifeApiClient
      .request({
        method: 'GET',
        url: '/src/data/gitmojis.json',
      })
      .then(res => {
        console.log(`${chalk.yellow('Lifemojis')} updated successfully!`);
        return res.data.gitmojis;
      })
      .catch(error =>
        this._errorMessage(`Network connection not found - ${error.code}`)
      );
  }

  _fetchCachedLifemojis(cachePath) {
    return Promise.resolve(JSON.parse(fs.readFileSync(cachePath)));
  }

  _fetchLifemojis() {
    const res = this._getCachePath();
    if (res.exist === true) {
      return this._fetchCachedLifemojis(res.path);
    }
    return this._fetchRemoteLifemojis().then(Lifemojis => {
      this._createFile(res.path, Lifemojis);
      return Lifemojis;
    });
  }
}

module.exports = lifeCli;
