import { CharData } from "../types";

// A curated local dictionary for common characters
// This replaces the need for the Gemini API
const LOCAL_DB: Record<string, CharData> = {
  '爱': {
    character: '爱',
    pinyin: 'ài',
    definition: 'Love; affection; to be fond of; to like.',
    exampleSentence: '我爱你。',
    exampleTranslation: 'I love you.'
  },
  '中': {
    character: '中',
    pinyin: 'zhōng',
    definition: 'Center; middle; inside; China.',
    exampleSentence: '我正在学习中文。',
    exampleTranslation: 'I am learning Chinese.'
  },
  '文': {
    character: '文',
    pinyin: 'wén',
    definition: 'Language; culture; writing; literature.',
    exampleSentence: '中国有着悠久的文化。',
    exampleTranslation: 'China has a long history of culture.'
  },
  '学': {
    character: '学',
    pinyin: 'xué',
    definition: 'To learn; to study; school; science.',
    exampleSentence: '好好学习，天天向上。',
    exampleTranslation: 'Study hard and make progress every day.'
  },
  '习': {
    character: '习',
    pinyin: 'xí',
    definition: 'To practice; to study; habit.',
    exampleSentence: '练习使人完美。',
    exampleTranslation: 'Practice makes perfect.'
  },
  '好': {
    character: '好',
    pinyin: 'hǎo',
    definition: 'Good; well; proper; good to.',
    exampleSentence: '你好吗？',
    exampleTranslation: 'How are you?'
  },
  '你': {
    character: '你',
    pinyin: 'nǐ',
    definition: 'You (second person singular).',
    exampleSentence: '很高兴认识你。',
    exampleTranslation: 'Nice to meet you.'
  },
  '我': {
    character: '我',
    pinyin: 'wǒ',
    definition: 'I; me; my.',
    exampleSentence: '我是一个学生。',
    exampleTranslation: 'I am a student.'
  },
  '他': {
    character: '他',
    pinyin: 'tā',
    definition: 'He; him.',
    exampleSentence: '他是我的朋友。',
    exampleTranslation: 'He is my friend.'
  },
  '人': {
    character: '人',
    pinyin: 'rén',
    definition: 'Person; people; human being.',
    exampleSentence: '人人为我，我为人人。',
    exampleTranslation: 'All for one, one for all.'
  },
  '大': {
    character: '大',
    pinyin: 'dà',
    definition: 'Big; huge; large; great.',
    exampleSentence: '这个苹果很大。',
    exampleTranslation: 'This apple is very big.'
  },
  '小': {
    character: '小',
    pinyin: 'xiǎo',
    definition: 'Small; little; young.',
    exampleSentence: '那只小猫很可爱。',
    exampleTranslation: 'That little cat is very cute.'
  },
  '水': {
    character: '水',
    pinyin: 'shuǐ',
    definition: 'Water; river; liquid.',
    exampleSentence: '多喝水对身体好。',
    exampleTranslation: 'Drinking more water is good for your health.'
  },
  '火': {
    character: '火',
    pinyin: 'huǒ',
    definition: 'Fire; flame; burn; anger.',
    exampleSentence: '小心火烛。',
    exampleTranslation: 'Be careful with fire.'
  },
  '谢': {
    character: '谢',
    pinyin: 'xiè',
    definition: 'To thank; to apologize; to wither.',
    exampleSentence: '谢谢你的帮助。',
    exampleTranslation: 'Thank you for your help.'
  },
  '家': {
    character: '家',
    pinyin: 'jiā',
    definition: 'Family; home; household.',
    exampleSentence: '我想回家。',
    exampleTranslation: 'I want to go home.'
  },
  '猫': {
    character: '猫',
    pinyin: 'māo',
    definition: 'Cat.',
    exampleSentence: '我有一只猫。',
    exampleTranslation: 'I have a cat.'
  },
  '狗': {
    character: '狗',
    pinyin: 'gǒu',
    definition: 'Dog.',
    exampleSentence: '那只狗在叫。',
    exampleTranslation: 'That dog is barking.'
  }
};

export const fetchCharacterData = async (char: string): Promise<CharData> => {
  // Simulate a short network delay for realism/UI consistency
  await new Promise(resolve => setTimeout(resolve, 400));

  if (LOCAL_DB[char]) {
    return LOCAL_DB[char];
  }

  // Fallback for characters not in the local dictionary
  return {
    character: char,
    pinyin: 'Unknown',
    definition: 'Definition not found in offline database.',
    exampleSentence: 'Try characters like: 爱, 中, 文, 学, 你, 我, 水...',
    exampleTranslation: 'Data is limited in offline mode.'
  };
};