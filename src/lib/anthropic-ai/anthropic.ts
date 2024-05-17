import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const model = "claude-3-opus-20240229";

export const getAnalysisFromAnthropic = async (headline: string) => {
  const msg = await anthropic.messages.create({
    model,
    max_tokens: 1000,
    temperature: 0.8,
    system: process.env.ANTHROPIC_SYSTEM_PROMPT!,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: headline,
          },
        ],
      },
    ],
  });
  const response = await JSON.parse(msg.content[0]?.text);
  response.model = model;
  return response;
};

export const getBatchAnalysisFromAnthropic = async (
  headlineBatch: string[]
) => {
  const msg = await anthropic.messages.create({
    model,
    max_tokens: 2000,
    temperature: 1,
    system: process.env.BATCH_SYSTEM_PROMPT!,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: JSON.stringify(headlineBatch),
          },
        ],
      },
    ],
  });
  const response = await JSON.parse(msg.content[0]?.text);
  const responseWithModel = response.map((r: any) => ({ ...r, model }));
  return responseWithModel;
};
