/**
 * search.js — DuckDuckGo Instant Answer API lookup
 * Usage: node search.js "your search topic"
 */

async function performSearch(searchQuery) {
  if (!searchQuery) {
    return JSON.stringify({ error: "No search topic provided." });
  }

  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json&no_redirect=1&no_html=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.AbstractText && data.AbstractURL) {
      return JSON.stringify({ information: data.AbstractText, source: data.AbstractURL });
    } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
      return JSON.stringify({
        information: data.RelatedTopics[0].Text,
        source: data.RelatedTopics[0].FirstURL
      });
    } else {
      return JSON.stringify({
        information: null,
        source: `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`
      });
    }
  } catch (error) {
    return JSON.stringify({ error: `Search request failed: ${error.message}` });
  }
}

// Node.js (VS Code / Desktop) vs Mobile Sandbox
if (typeof process !== 'undefined' && process.argv) {
  const terminalQuery = process.argv.slice(2).join(' ');
  performSearch(terminalQuery).then(console.log).catch(console.error);
} else {
  return performSearch(query); // eslint-disable-line no-undef
}