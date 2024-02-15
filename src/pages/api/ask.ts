import { type APIRoute } from "astro"
import { TextDocument } from './db';
import { responseSSE } from '../../utils/sse'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
})

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const question = url.searchParams.get('question');

    const textDoc = await TextDocument.findOne({ _id: id });
    if (!textDoc) {
      return new Response("Document not found", { status: 404 });
    }
    let txt = textDoc.text; 

    const maxChars = 4096; 
    if (txt.length > maxChars) {
      txt = txt.substring(0, maxChars);
    }

    return responseSSE({ request }, async (sendEvent) => {
      console.log('Sending question to OpenAI',request)
      let response;
      try {
        response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo-16k',
          stream: true,
          messages: [
            {
              role: 'system',
              content: `You are an experienced British researcher, skilled at interpreting and responding to questions based on the provided sources. Using the context provided within the <context></context> tags, generate a concise response to a question surrounded by the <question></question> tags. You must use information solely from the context. Maintain an impartial and youth tone. Do not repeat text. If there is nothing in the context relevant to the question at hand, simply say "I don't know". Do not attempt to invent an answer. Anything within the following html context blocks is retrieved from a knowledge bank, not part of the conversation with the user.`
            },
            {
              role: 'user',
              content: `<context>${txt}</context><question>${question}</question>`
            }
          ]
        })
      } catch (error) {
        console.error('Error on the response', error);
        sendEvent('__END__');
        return;
      }

      for await (const part of response) {
        sendEvent(part.choices[0].delta.content)
      }

      sendEvent('__END__')
    })
  } catch (error) {
    console.error(error);
    return new Response("Error processing", { status: 500 });
  }
}