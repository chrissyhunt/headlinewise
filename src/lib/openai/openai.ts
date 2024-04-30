import OpenAI from "openai";

export const openai = new OpenAI({
  organization: process.env.OPENAI_ORG!,
  project: process.env.OPENAI_PROJECT!,
  apiKey: process.env.OPENAI_KEY!,
});

export const getAnalysisFromOpenAI = async (headline: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: process.env.ANTHROPIC_SYSTEM_PROMPT!,
      },
      {
        role: "user",
        content: headline,
      },
    ],
    stream: false,
    temperature: 1,
  });
  const response = await JSON.parse(completion.choices[0]?.message?.content!);
  response.model = "gpt-3.5-turbo";
  return response;
};
