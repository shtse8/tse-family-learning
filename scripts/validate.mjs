import fs from 'node:fs';
import vm from 'node:vm';

const requiredFiles = ['index.html', 'questions.json', 'manifest.webmanifest', 'sw.js', 'Dockerfile', 'content-packs/registry.json', 'content-packs/hk-chinese-basics.json', 'content-packs/mandarin-basics.json'];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

const html = fs.readFileSync('index.html', 'utf8');
for (const marker of [
  'LearningQuest',
  'Mobile-native learning app',
  'manifest.webmanifest',
  'serviceWorker',
  'Set up today’s mission',
  'learningquest-onboarding-v1',
  'learner-1',
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

function validatePackFile(path, expectedId, fields, label) {
  const pack = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (pack.id !== expectedId) throw new Error(`${label} pack id changed unexpectedly`);
  if (!pack.activity || !pack.activity.includes('matching')) throw new Error(`${label} pack metadata must advertise matching practice`);
  if (!pack.activity || !pack.activity.includes('comparison')) throw new Error(`${label} pack metadata must advertise comparison drills`);
  if (!pack.activity || !pack.activity.includes('audio prompts')) throw new Error(`${label} pack metadata must advertise audio prompts`);
  if (!Array.isArray(pack.flashcards) || pack.flashcards.length < 10) throw new Error(`${label} pack needs at least 10 flashcards`);
  for (const [i, card] of pack.flashcards.entries()) {
    for (const field of fields) {
      if (!card[field]) throw new Error(`${label} flashcard ${i + 1} missing ${field}`);
    }
  }
  return pack;
}

const registry = JSON.parse(fs.readFileSync('content-packs/registry.json', 'utf8'));
if (registry.id !== 'learningquest-content-pack-registry-v1') throw new Error('Content pack registry id changed unexpectedly');
if (!Array.isArray(registry.packs) || registry.packs.length < 2) throw new Error('Content pack registry needs at least two packs');
const registryById = Object.fromEntries(registry.packs.map(pack => [pack.id, pack]));
for (const [id, path, fields] of [
  ['hk-chinese-basics-v1', 'content-packs/hk-chinese-basics.json', ['traditional', 'jyutping', 'canto', 'english', 'prompt']],
  ['mandarin-basics-v1', 'content-packs/mandarin-basics.json', ['simplified', 'traditional', 'pinyin', 'english', 'prompt']]
]) {
  const registered = registryById[id];
  if (!registered) throw new Error(`Content pack registry missing ${id}`);
  if (registered.path !== path) throw new Error(`Content pack registry path mismatch for ${id}`);
  if (!Array.isArray(registered.schema) || fields.some(field => !registered.schema.includes(field))) throw new Error(`Content pack registry schema mismatch for ${id}`);
  for (const field of ['kind', 'title', 'domain', 'language', 'learners', 'activity', 'readiness', 'next', 'renderTarget']) {
    if (!registered[field]) throw new Error(`Content pack registry ${id} missing ${field}`);
  }
  for (const field of ['recommendedStages', 'recommendedGoals']) {
    if (!Array.isArray(registered[field]) || !registered[field].length) throw new Error(`Content pack registry ${id} missing ${field}`);
  }
  if (!registered.activity.includes('matching')) throw new Error(`Content pack registry ${id} missing matching activity`);
  if (!registered.activity.includes('comparison')) throw new Error(`Content pack registry ${id} missing comparison activity`);
  if (!registered.activity.includes('audio prompts')) throw new Error(`Content pack registry ${id} missing audio prompt activity`);
  if (!Array.isArray(registered.progressionSteps) || registered.progressionSteps.length < 3) throw new Error(`Content pack registry ${id} missing progressionSteps`);
}
const hkChinesePack = validatePackFile('content-packs/hk-chinese-basics.json', 'hk-chinese-basics-v1', registryById['hk-chinese-basics-v1'].schema, 'HK Chinese');
const mandarinPack = validatePackFile('content-packs/mandarin-basics.json', 'mandarin-basics-v1', registryById['mandarin-basics-v1'].schema, 'Mandarin');
for (const marker of [
  'FALLBACK_CONTENT_PACK_REGISTRY',
  'renderCurriculumPacks',
  'content-packs/registry.json',
  'content-packs/hk-chinese-basics.json',
  'content-packs/mandarin-basics.json',
  'renderChineseMatchingPractice',
  'matchingPracticeCounts',
  'renderChineseComparisonDrill',
  'comparisonDrillCards',
  'comparisonDrillPairs',
  'comparison-card',
  'comparison-grid',
  'audio-button',
  'speakChinesePrompt',
  'speechSynthesisAvailable',
  'SpeechSynthesisUtterance',
  'audioPromptCards',
  'audioPromptCounts',
  'audioPromptLocales',
  'latestAudioPrompt',
  'zh-HK',
  'zh-CN',
  'Hear Cantonese',
  'Hear Mandarin',
  'matchingPracticeSummary',
  'matchingPracticeScores',
  'recordMatchingAnswer',
  'matchingPracticeMeta',
  'matching-practice',
  'latestMatchingProgress',
  'upsertHistoryEntry',
  'saveMatchingPracticeProgress',
  'Traditional HK Chinese matching practice',
  'Simplified Mandarin matching practice',
  'recommendCurriculumPacks',
  'recommendedCurriculumTitles',
  'loadHKChinesePack',
  'loadMandarinPack',
  'validateHKChinesePack',
  'validateMandarinPack',
  'hkChineseFlashcards',
  'mandarinFlashcards',
  'hkChinesePackError',
  'mandarinPackError',
  'flashcard-placeholder',
  'Question practice remains available'
]) {
  if (!html.includes(marker)) throw new Error(`Missing runtime HK Chinese content-pack marker: ${marker}`);
}
for (const inlineSeed of ['baa4 baa1', 'zou2 san4', 'bàba', 'zǎoshang hǎo', 'Find something red nearby']) {
  if (html.includes(inlineSeed)) throw new Error(`HK Chinese flashcards should be runtime-loaded from JSON, not inline seeded: ${inlineSeed}`);
}

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

const serverLog = fs.readFileSync('server.js', 'utf8');
if (serverLog.includes('Tse Family')) throw new Error('server.js still contains legacy family-specific branding');
if (!serverLog.includes('LearningQuest running on port')) throw new Error('server.js missing LearningQuest startup marker');

const dockerfile = fs.readFileSync('Dockerfile', 'utf8');
if (!dockerfile.includes('COPY content-packs ./content-packs')) throw new Error('Dockerfile must publish content-packs for production');
void hkChinesePack;
void mandarinPack;
