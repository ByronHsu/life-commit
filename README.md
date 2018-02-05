<p align="center">
<img src="assets/LOGO.png" width=300 >
</p>

<p align=center>
<a target="_blank" href="https://npmjs.org/package/nba-go" title="NPM version"><img src="https://img.shields.io/npm/v/life-commit.svg"></a>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
<a target="_blank" href="http://makeapullrequest.com" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
</p>  


> 🏃📆 Life as a git. Commit on your life.

## Demo

<p align="center">
<img src="assets/demo.gif" width=800>
</p>

### My Website

https://byronhsu.github.io/life-commit/

## Install
In order to use life-commit, make sure that you have Node version 6.0.0 or higher.

```
$ npm install -g life-commit
```

## Usage

### overview
```
  Usage
    $ life
  Options
    --init, -i                 
    --commit, -c               
    --log, -l                  
    --edit , -e <commitId>      
    --dir, -d [folder name]    
  Examples
    $ life --commit
    $ life --log
```
### options

#### ``--init`` or ``-i``
```
$ life --init
```
Initialize your life

<img src="assets/life-i.png" width=500>

#### ``--commit`` or ``-c``
```
$ life --commit
```
Commit on your life

<img src="assets/life-c.png" width=500>

#### ``--log`` or ``-l``
```
$ life --log
```
Log the commits on your life 

<img src="assets/life-l.png" width=500>

#### ``--edit`` or ``-e``
```
$ life --edit 06f302
```
Edit the existing commits

<img src="assets/life-e.png" width=500>

#### ``--dir`` or ``-d``
```
$ life --dir myfolder
```
Create a directory that visualizing the commits on webpage      

<img src="assets/life-d.png" width=500>

## Contribute
- Define lifemojis

  All the lifemojis are stored at ``/src/data/lifemojis.json``. Open an issue that contains an **emoji** and **description**. Let's brainstorm and define more and more creative lifemojis together!
  
  Example:
  ```js
    {
    "emoji": "🚚",
    "description": "Made a move"
    },
    {
    "emoji": "👰",
    "description": "Got married"
    },
    {
    "emoji": "👨‍👩‍👧",
    "description": "Had a child"
    },
  ```

## Credits

[Elegant UI design by Bruno Rodrigues](https://codepen.io/itbruno/pen/KwarLp)

Creative project [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) and [gitmoji](https://github.com/carloscuesta/gitmoji) by [Carlos Cuesta](https://github.com/carloscuesta)

LOGO desinged by [Gary Chiang](https://www.facebook.com/gary8621)