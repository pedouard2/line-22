// source https://github.com/Callidon/bloom-filters#installation
import { Buffer } from 'buffer';
const {BloomFilter} = require('bloom-filters')
const wordList = require('./cmuWordList');

const errorRate = 0.04 // 4 % error rate
export const filter = BloomFilter.from(wordList.wordList, errorRate)
