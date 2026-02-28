import { load, type CheerioAPI, type Cheerio } from "cheerio";

// ─── Shared Types ───────────────────────────────────────────────────────────

type MediaSource = { src?: string; type?: string };

type ExtractedImage = {
  src?: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
  loading?: string;
  srcset?: string;
};

type ExtractedVideo = {
  src?: string;
  poster?: string;
  width?: string;
  height?: string;
  type?: string;
  sources?: MediaSource[];
};

type ExtractedAudio = {
  src?: string;
  type?: string;
  sources?: MediaSource[];
};

type ExtractedLink = {
  href?: string;
  text: string;
  title?: string;
  rel?: string;
};

type ExtractedHeading = {
  level: number;
  text: string;
  id?: string;
};

type ExtractedMeta = {
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
  [key: string]: string | undefined;
};

type ExtractedIframe = {
  src?: string;
  title?: string;
  width?: string;
  height?: string;
};

type ExtractedScript = {
  src: string;
  type?: string;
  async?: boolean;
  defer?: boolean;
};

/** Rich content inside a table cell — text plus any embedded media. */
type CellContent = {
  text: string;
  images?: ExtractedImage[];
  videos?: ExtractedVideo[];
  links?: ExtractedLink[];
};

type ExtractedTable = {
  headers: CellContent[];
  rows: CellContent[][];
};

type ExtractedList = {
  type: "ordered" | "unordered";
  items: string[];
};

type ContentSection = {
  heading?: string;
  headingLevel?: number;
  headingId?: string;
  text: string;
};

export type ExtractedHtmlData = {
  title: string;
  meta: ExtractedMeta;
  language?: string;
  sections: ContentSection[];
  headings: ExtractedHeading[];
  images: ExtractedImage[];
  videos: ExtractedVideo[];
  audios: ExtractedAudio[];
  iframes: ExtractedIframe[];
  links: ExtractedLink[];
  tables: ExtractedTable[];
  lists: ExtractedList[];
  scripts: ExtractedScript[];
  structuredData: object[];
};

// ─── Shared Helpers ─────────────────────────────────────────────────────────

function extractImage(el: any): ExtractedImage {
  const a = el.attribs || {};
  return {
    src: a.src || a["data-src"],
    alt: a.alt,
    title: a.title,
    width: a.width,
    height: a.height,
    loading: a.loading,
    srcset: a.srcset,
  };
}

function extractVideo($: CheerioAPI, el: any): ExtractedVideo {
  const a = el.attribs || {};
  const sources = extractSources($, el);
  return {
    src: a.src,
    poster: a.poster,
    width: a.width,
    height: a.height,
    type: a.type,
    sources: sources.length > 0 ? sources : undefined,
  };
}

function extractAudio($: CheerioAPI, el: any): ExtractedAudio {
  const a = el.attribs || {};
  const sources = extractSources($, el);
  return {
    src: a.src,
    type: a.type,
    sources: sources.length > 0 ? sources : undefined,
  };
}

function extractSources($: CheerioAPI, parent: any): MediaSource[] {
  const sources: MediaSource[] = [];
  $(parent)
    .find("source")
    .each((_: number, src: any) => {
      sources.push({ src: $(src).attr("src"), type: $(src).attr("type") });
    });
  return sources;
}

function extractLink($: CheerioAPI, el: any): ExtractedLink | null {
  const a = el.attribs || {};
  const text = $(el).text().trim();
  if (!text && !a.href) return null;
  return { href: a.href, text, title: a.title, rel: a.rel };
}

/** Extract rich content from a table cell (text + embedded media). */
function extractCellContent($: CheerioAPI, cell: any): CellContent {
  const text = $(cell).text().trim();
  const images: ExtractedImage[] = [];
  const videos: ExtractedVideo[] = [];
  const links: ExtractedLink[] = [];

  $(cell)
    .find("img")
    .each((_: number, el: any) => { images.push(extractImage(el)); });
  $(cell)
    .find("video")
    .each((_: number, el: any) => { videos.push(extractVideo($, el)); });
  $(cell)
    .find("a")
    .each((_: number, el: any) => {
      const link = extractLink($, el);
      if (link) links.push(link);
    });

  const result: CellContent = { text };
  if (images.length > 0) result.images = images;
  if (videos.length > 0) result.videos = videos;
  if (links.length > 0) result.links = links;
  return result;
}

// ─── Meta Extraction ────────────────────────────────────────────────────────

const META_NAME_MAP: Record<string, keyof ExtractedMeta> = {
  description: "description",
  keywords: "keywords",
  author: "author",
  robots: "robots",
  "og:title": "ogTitle",
  "og:description": "ogDescription",
  "og:image": "ogImage",
  "og:type": "ogType",
  "og:url": "ogUrl",
  "twitter:card": "twitterCard",
  "twitter:title": "twitterTitle",
  "twitter:description": "twitterDescription",
  "twitter:image": "twitterImage",
};

function extractMeta($: CheerioAPI): ExtractedMeta {
  const meta: ExtractedMeta = {};
  $("meta").each((_: number, el: any) => {
    const name = ($(el).attr("name") || $(el).attr("property") || "").toLowerCase();
    const content = $(el).attr("content") || "";
    if (!name || !content) return;
    const key = META_NAME_MAP[name];
    if (key) meta[key] = content;
  });
  const canonical = $('link[rel="canonical"]').attr("href");
  if (canonical) meta.canonical = canonical;
  return meta;
}

// ─── Main Extractor ─────────────────────────────────────────────────────────

export const htmlExtractor = (html: string): ExtractedHtmlData => {
  const $ = load(html, {});

  const title = $("title").first().text().trim();
  const language = $("html").attr("lang") || undefined;
  const meta = extractMeta($);

  // --- Structured Data (JSON-LD) ---
  const structuredData: object[] = [];
  $('script[type="application/ld+json"]').each((_: number, el: any) => {
    try {
      structuredData.push(JSON.parse($(el).html() || ""));
    } catch {
      /* skip malformed */
    }
  });

  // --- Scripts (src only) ---
  const scripts: ExtractedScript[] = [];
  $("script[src]").each((_: number, el: any) => {
    const a = el.attribs || {};
    scripts.push({
      src: a.src,
      type: a.type || undefined,
      async: a.async !== undefined ? true : undefined,
      defer: a.defer !== undefined ? true : undefined,
    });
  });

  // --- Headings ---
  const headings: ExtractedHeading[] = [];
  $("h1, h2, h3, h4, h5, h6").each((_: number, el: any) => {
    const tag = el.tagName || el.name || "";
    const level = parseInt(tag.replace("h", ""), 10);
    if (!isNaN(level)) {
      headings.push({ level, text: $(el).text().trim(), id: $(el).attr("id") || undefined });
    }
  });

  // --- Global media (page-wide, using shared helpers) ---
  const images: ExtractedImage[] = [];
  $("img").each((_: number, el: any) => { images.push(extractImage(el)); });

  const videos: ExtractedVideo[] = [];
  $("video").each((_: number, el: any) => { videos.push(extractVideo($, el)); });

  const audios: ExtractedAudio[] = [];
  $("audio").each((_: number, el: any) => { audios.push(extractAudio($, el)); });

  const iframes: ExtractedIframe[] = [];
  $("iframe").each((_: number, el: any) => {
    const a = el.attribs || {};
    iframes.push({ src: a.src, title: a.title, width: a.width, height: a.height });
  });

  const links: ExtractedLink[] = [];
  $("a").each((_: number, el: any) => {
    const link = extractLink($, el);
    if (link) links.push(link);
  });

  // --- Tables (rich cell content) ---
  const tables: ExtractedTable[] = [];
  $("table").each((_: number, el: any) => {
    const headers: CellContent[] = [];
    $(el)
      .find("thead th, thead td")
      .each((_: number, th: any) => { headers.push(extractCellContent($, th)); });

    const rows: CellContent[][] = [];
    $(el)
      .find("tbody tr")
      .each((_: number, tr: any) => {
        const row: CellContent[] = [];
        $(tr)
          .find("td, th")
          .each((_: number, td: any) => { row.push(extractCellContent($, td)); });
        if (row.length > 0) rows.push(row);
      });

    if (headers.length > 0 || rows.length > 0) {
      tables.push({ headers, rows });
    }
  });

  // --- Lists (top-level only) ---
  const lists: ExtractedList[] = [];
  $("ul, ol").each((_: number, el: any) => {
    const tag = el.tagName || el.name || "";
    if ($(el).parents("ul, ol").length > 0) return; // skip nested
    const type: "ordered" | "unordered" = tag === "ol" ? "ordered" : "unordered";
    const items: string[] = [];
    $(el)
      .children("li")
      .each((_: number, li: any) => { items.push($(li).text().trim()); });
    if (items.length > 0) lists.push({ type, items });
  });

  // --- Sections (content split by headings, excluding tables/lists) ---
  const sections: ContentSection[] = [];
  const body = $("body");
  body.find("script,style,link,noscript,svg,canvas,template").remove();
  // Remove tables and lists from section text extraction to avoid duplication
  body.find("table,ul,ol").remove();

  const bodyChildren = body.children().toArray();
  let currentSection: ContentSection = { text: "" };

  for (const child of bodyChildren) {
    const tag = (child as any).tagName || (child as any).name || "";
    if (/^h[1-6]$/i.test(tag)) {
      if (currentSection.text.trim() || currentSection.heading) {
        sections.push({ ...currentSection, text: currentSection.text.trim() });
      }
      const level = parseInt(tag.replace("h", ""), 10);
      currentSection = {
        heading: $(child).text().trim(),
        headingLevel: level,
        headingId: $(child).attr("id") || undefined,
        text: "",
      };
    } else {
      const text = $(child).text().replace(/\s+/g, " ").trim();
      if (text) {
        currentSection.text += (currentSection.text ? " " : "") + text;
      }
    }
  }
  if (currentSection.text.trim() || currentSection.heading) {
    sections.push({ ...currentSection, text: currentSection.text.trim() });
  }

  return {
    title,
    meta,
    language,
    sections,
    headings,
    images,
    videos,
    audios,
    iframes,
    links,
    tables,
    lists,
    scripts,
    structuredData,
  };
};
