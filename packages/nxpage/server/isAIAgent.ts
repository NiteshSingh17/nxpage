import type http from "http";

const AI_BOTS = [
  /gptbot/i,
  /chatgpt-user/i,
  /oai-searchbot/i,
  /openai/i,
  /operator-ai/i,
  /claudebot/i,
  /anthropic-ai/i,
  /anthropic/i,
  /google-extended/i,
  /gemini/i,
  /bard/i,
  /google-ai/i,
  /perplexitybot/i,
  /perplexity-user/i,
  /meta-externalagent/i,
  /meta-ai/i,
  /applebot-extended/i,
  /applebot-.*ai/i,
  /msn.*bot/i,
  /bing.*preview/i,
  /copilot/i,
  /ai[-_]?bot/i,
  /chat[-_]?gpt/i,
  /llm[-_]?bot/i,
];

export const isAIAgent = (req: http.IncomingMessage): boolean => {
  const userAgent = (req.headers["user-agent"] || "").toString().toLowerCase();
  if (!userAgent) return false;
  return AI_BOTS.some((pattern) => pattern.test(userAgent));
};
