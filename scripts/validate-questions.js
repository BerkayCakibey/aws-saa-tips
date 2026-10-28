'use strict';

const path = require('path');

const EXPECTED_COUNT = 325;
const OPTIONS_PER_QUESTION = 4;

const questions = require(path.join(__dirname, '..', 'website', 'questions-all.js'));
const errors = [];

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isDocsLink(value) {
  return nonEmptyString(value) && /^https?:\/\//.test(value);
}

if (!Array.isArray(questions)) {
  errors.push('question bank is not an array');
} else {
  if (questions.length !== EXPECTED_COUNT) {
    errors.push(`expected ${EXPECTED_COUNT} questions, found ${questions.length}`);
  }

  const seen = new Map();
  questions.forEach((item, index) => {
    const label = `question #${index + 1}`;
    if (!nonEmptyString(item.q)) {
      errors.push(`${label}: empty question text`);
    }
    if (!Array.isArray(item.options) || item.options.length !== OPTIONS_PER_QUESTION || !item.options.every(nonEmptyString)) {
      errors.push(`${label}: expected ${OPTIONS_PER_QUESTION} non-empty options`);
    }
    if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct >= OPTIONS_PER_QUESTION) {
      errors.push(`${label}: invalid correct index ${JSON.stringify(item.correct)}`);
    }
    if (!nonEmptyString(item.explanation)) {
      errors.push(`${label}: empty explanation`);
    }
    if (!Array.isArray(item.docs) || item.docs.length === 0 || !item.docs.every(isDocsLink)) {
      errors.push(`${label}: missing docs link`);
    }
    const key = nonEmptyString(item.q) ? item.q.trim().toLowerCase() : '';
    if (key) {
      if (seen.has(key)) {
        errors.push(`${label}: duplicate question text of question #${seen.get(key)}`);
      } else {
        seen.set(key, index + 1);
      }
    }
  });
}

if (errors.length > 0) {
  console.error(`validate-questions: ${errors.length} problem(s)`);
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(`validate-questions: ${questions.length} questions OK`);
