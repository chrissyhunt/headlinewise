import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
});

export const evaluateText = async (headline: string) => {
  const msg = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 1000,
    temperature: 0.8,
    system: process.env.ANTHROPIC_SYSTEM_PROMPT!,
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": headline,
          }
        ]
      }
    ]
  });
  const response = await JSON.parse(msg.content[0]?.text);
  return response;
}