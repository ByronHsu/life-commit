#!/usr/bin/env node
const fs = require('fs');
var arr = [
  {
    emoji: '❤️',
    description: 'Fall in love',
  },
  {
    emoji: '💔',
    description: 'Heart broken',
  },
  {
    emoji: '🎉',
    description: 'Celebrate',
  },
  {
    emoji: '💪',
    description: 'Take a challenge',
  },
  {
    emoji: '🚀',
    description: 'Achievement',
  },
  {
    emoji: '🐣',
    description: 'Birth',
  },
  {
    emoji: '🌊',
    description: 'Frustation',
  },
  {
    emoji: '✅',
    description: 'Pass a test',
  },
  {
    emoji: '🎓',
    description: 'Graduation',
  },
  {
    emoji: '🍀',
    description: 'Lucky things',
  },
  {
    emoji: '💵',
    description: 'Make big money',
  },
  {
    emoji: '⚠️',
    description: 'Encounter an accident',
  },
  {
    emoji: '💥',
    description: 'Breaking change',
  },
  {
    emoji: '🏥',
    description: 'Somebody passed away',
  },
  {
    emoji: '📝',
    description: 'Learn new things',
  },
  {
    emoji: '👔',
    description: 'Get a job',
  },
];

fs.writeFileSync('./lifemoji.json', JSON.stringify(arr, null, ' '));
