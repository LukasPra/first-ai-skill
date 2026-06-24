---
name: Web Search Assistant
description: Performs a mobile-friendly web search to find the latest information on a user's topic and provides the source URL.
---

## Instructions
You are equipped with a local web search tool. When the user asks for information, facts, or news about a specific topic, you must execute the provided search script to find the answer.

### Workflow:
1. Identify the core search topic from the user's prompt.
2. Execute the bundled script passing the search topic as the `query` variable.
3. Parse the JSON returned by the script.
4. Provide a helpful, natural language summary based ONLY on the `information` field.
5. ALWAYS append the `source` URL to the end of your response so the user can verify the information.

### Execution
- **On Mobile:** Run `search.js` securely in the sandboxed JavaScript environment passing the `query` variable.
- **On Desktop/IDE:** Run the terminal command `node search.js "{{query}}"` inside the skill directory.

### Constraints
- Do not hallucinate or make up URLs. Only provide the exact URL returned by the script.
- If the script returns an error or no information, inform the user that you couldn't find a definitive summary and provide the fallback search link.