import fs from 'node:fs';
import vm from 'node:vm';

const requiredFiles = ['index.html', 'questions.json', 'manifest.webmanifest', 'sw.js'];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

const html = fs.readFileSync('index.html', 'utf8');
for (const marker of [
  'LearningQuest',
  'Mobile-native learning app',
  'manifest.webmanifest',
  'serviceWorker',
  'overflow-x: hidden'
]) {
  if (!html.includes(marker)) throw new Error(`Missing app marker: ${marker}`);
}

const hardcodedPrivateNames = ['Silas', 'Sylvie', 'Kyle', 'Cheryl', 'Tse Family', '謝家'];
for (const name of hardcodedPrivateNames) {
  if (html.includes(name)) throw new Error(`Private/family-specific UI name still present in index.html: ${name}`);
}

const scriptMatch = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);
if (!scriptMatch) throw new Error('Could not locate inline script');
new vm.Script(scriptMatch[1]);

const data = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
if (!data.meta || !Array.isArray(data.questions)) throw new Error('questions.json must contain meta and questions[]');
if (data.meta.questionCount !== data.questions.length) throw new Error(`questionCount ${data.meta.questionCount} != ${data.questions.length}`);
if (data.questions.length < 20) throw new Error('Expected at least 20 starter questions');
for (const [i, q] of data.questions.entries()) {
  for (const field of ['id', 'subject', 'question', 'options', 'answer', 'explanation']) {
    if (!(field in q)) throw new Error(`Question ${i + 1} missing ${field}`);
  }
  if (!Array.isArray(q.options) || q.options.length < 2) throw new Error(`Question ${q.id} has invalid options`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) throw new Error(`Question ${q.id} has invalid answer index`);
}

const manifest = JSON.parse(fs.readFileSync('manifest.webmanifest', 'utf8'));
if (manifest.display !== 'standalone') throw new Error('PWA manifest must use standalone display');
if (!manifest.name || !manifest.start_url) throw new Error('PWA manifest missing name/start_url');

console.log(`Validated LearningQuest static app with ${data.questions.length} questions.`);
