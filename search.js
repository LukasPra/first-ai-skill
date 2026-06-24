/**
 * search.js
 * Universal execution script (Mobile Sandbox + Desktop Node.js)
 */

async function performSearch(searchQuery) {
  if (!searchQuery) {
    return JSON.stringify({ error: "No search topic provided." });
  }

  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.AbstractText && data.AbstractURL) {
      return JSON.stringify({ information: data.AbstractText, source: data.AbstractURL });
    } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
      return JSON.stringify({ information: data.RelatedTopics[0].Text, source: data.RelatedTopics[0].FirstURL });
    } else {
      return JSON.stringify({
        information: "No clear summary found for this topic.",
        source: `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`
      });
    }
  } catch (error) {
    return JSON.stringify({ error: `Search request failed: ${error.message}` });
  }
}

// ENVIRONMENT CHECK: Node.js (VS Code) vs Sandbox (Mobile)
if (typeof process !== 'undefined' && process.argv) {
  // We are in VS Code / Desktop Terminal
  const terminalQuery = process.argv.slice(2).join(' ');
  performSearch(terminalQuery).then(console.log).catch(console.error);
} else {
  // We are in AI Edge Gallery Mobile Sandbox
  return performSearch(query);
}