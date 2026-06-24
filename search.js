/**
 * search.js
 * Mobile-friendly execution script using standard Web APIs.
 */

async function performSearch(searchQuery) {
  if (!searchQuery) {
    return JSON.stringify({ error: "No search topic provided." });
  }

  // Using DuckDuckGo's free instant answer API
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.AbstractText && data.AbstractURL) {
      // Primary abstract found
      return JSON.stringify({
        information: data.AbstractText,
        source: data.AbstractURL
      });
    } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
      // Fallback to the first related topic
      return JSON.stringify({
        information: data.RelatedTopics[0].Text,
        source: data.RelatedTopics[0].FirstURL
      });
    } else {
      // Fallback when no clear summary is generated
      return JSON.stringify({
        information: "No clear summary found for this topic.",
        source: `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`
      });
    }
  } catch (error) {
    return JSON.stringify({ error: `Search request failed: ${error.message}` });
  }
}

// Return the promise so the AI Edge runtime can resolve it
return performSearch(query);