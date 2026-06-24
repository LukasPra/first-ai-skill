---
name: duckduckgo-search
description: 'Search the web using DuckDuckGo and return a concise summary. Use when the user asks: "search for", "look up", "find information about", "what is", "who is", "tell me about", or any factual/news query that needs a web lookup. Returns a max 5-sentence summary and a source URL.'
argument-hint: 'Topic to search for'
---

# DuckDuckGo Web Search

## When to Use
- User asks for facts, definitions, or current information on any topic
- User says "search for", "look up", "find", "what is", "who is", "tell me about"
- A question requires up-to-date or external knowledge

## Procedure

1. Extract the core search topic from the user's request.
2. Run the search script:
   - **VS Code / Desktop:** `node ./scripts/search.js "<topic>"` from the skill directory
   - **Mobile sandbox:** execute `./scripts/search.js` with `query` variable set to the topic
3. Parse the returned JSON — fields: `information`, `source`, or `error`.
4. Summarize the `information` field in **at most 5 sentences** — be concise and factual.
5. Always append the `source` URL on a new line so the user can verify or read more.

## Output Format

```
<Summary in max 5 sentences.>

Source: <URL>
```

## Constraints

- **Never exceed 5 sentences** in the summary.
- **Never fabricate URLs** — only use the exact `source` value returned by the script.
- If the script returns an error or empty result, say: "I couldn't find a clear summary for that topic." and provide `https://duckduckgo.com/?q=<encoded-topic>` as a fallback link.
- Base the summary only on the `information` field — do not add outside knowledge.