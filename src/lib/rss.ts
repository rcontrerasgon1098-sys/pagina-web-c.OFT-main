export type Article = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  thumbnail: string;
};

export async function getNews(): Promise<Article[]> {
  const rssUrl = "https://www.archdaily.cl/clfeed.xml";
  const apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(rssUrl);

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } }); // Fetch and cache for 1 hour
    if (!response.ok) {
      console.error(`rss2json API response not ok: ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      console.error("rss2json API returned an error or no items:", data.message);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.map((item: any) => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      contentSnippet: (item.description?.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim().slice(0, 150) + '...') || '',
      thumbnail: item.thumbnail || '',
    }));
  } catch (error) {
    console.error("Failed to fetch or parse RSS feed:", error);
    return [];
  }
}
