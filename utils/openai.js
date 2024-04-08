import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: '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',
});

export const openaiClient = new OpenAIApi(configuration);