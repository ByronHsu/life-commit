const guard = require('./guard');
const edit = {
  choose: () => [
    {
      name: 'choose',
      message: 'Edit or Remove:',
      type: 'list',
      choices: ['Edit', 'Remove'],
    },
  ],
};
const commit = lifemojis => {
  return [
    {
      name: 'lifemoji',
      message: 'Choose a lifemoji:',
      type: 'list',
      choices: lifemojis.map(lifemoji => ({
        name: `${lifemoji.emoji}  - ${lifemoji.description}`,
        value: lifemoji.emoji,
      })),
    },
    {
      name: 'title',
      message: 'Enter the commit title:',
      validate: guard.title,
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate: guard.message,
    },
    {
      name: 'date',
      type: 'datetime',
      message: 'Choose Date:',
      format: ['yyyy', '/', 'm', '/', 'd'],
    },
  ];
};

module.exports = {
  commit,
  edit,
};
