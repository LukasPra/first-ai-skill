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
2. Fetch search results — choose the method based on environment:
   - **VS Code / Desktop:** run `node ./scripts/search.js "<topic>"` in the terminal from the skill directory, then parse the returned JSON (`information`, `source`, or `error` fields).
   - **Mobile / AI Edge Gallery (no terminal available):** use the `fetch_webpage` tool with URL `https://api.duckduckgo.com/?q=<encoded-topic>&format=json&no_redirect=1&no_html=1` and query `"summary and source URL for <topic>"`. Extract the `AbstractText` field as the information and `AbstractURL` as the source. If `AbstractText` is empty, use the first item in `RelatedTopics[0].Text` and `RelatedTopics[0].FirstURL`.
3. Summarize the information in **at most 5 sentences** — be concise and factual.
4. Always append the `source` URL on a new line so the user can verify or read more.

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
