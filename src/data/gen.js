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
    description: 'Got a job',
  },
  {
    emoji: '🚚',
    description: 'Made a move',
  },
  {
    emoji: '👰',
    description: 'Got married',
  },
  {
    emoji: '👨‍👩‍👧',
    description: 'Had a child',
  },
  {
    emoji: '🐾',
    description: 'Got a pet',
  },
  {
   "emoji": "🏖",
   "description": "Vacation"
  },
  {
   "emoji": "🎁",
    "descripting": "Receiving something"
   },
   {
   "emoji": "💸",
    "description": "Buying something"
   },
   {
    "emoji": "🏈",
    "description": "Sports"
   },
   {
   "emoji": "⛑",
    "description": "Helped someone"
   },
   {
   "emoji": "👜",
    "description": "Leaving something"
   },
   {
   "emoji": "🌎",
    "description": "Travelling"
   },
   {
   "emoji": "🏥",
    "description": "Someone got sick"
   },
   {
    "emoji": "💀",
    "description": "Somebody passed away"
   }
];

fs.writeFileSync('./lifemojis.json', JSON.stringify(arr, null, ' '));
