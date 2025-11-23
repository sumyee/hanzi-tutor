export enum WriteMode {
  WATCH = 'WATCH',
  PRACTICE = 'PRACTICE',
}

export interface CharData {
  character: string;
  pinyin: string;
  definition: string;
  exampleSentence: string;
  exampleTranslation: string;
}