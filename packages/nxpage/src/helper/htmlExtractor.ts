import { load } from "cheerio";

type ExtractedImage = {
  src?: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
};

type ExtractedLink = {
  href?: string;
  text: string;
  title?: string;
};

export type ExtractedHtmlData = {
  title: string;
  content: string;
  images: ExtractedImage[];
  links: ExtractedLink[];
};

export const htmlExtractor = (html: string): ExtractedHtmlData => {
  const $ = load(html, {});
  const title = $("title").first().text().trim();

  const body = $("body");
  body.find("script,style,link,noscript,iframe,svg,canvas,template").remove();

  const content = body.text().replace(/\s+/g, " ").trim();

  const images: ExtractedImage[] = [];
  $("img").each((_index: number, el: any) => {
    const attrs = el.attribs || {};
    images.push({
      src: attrs.src,
      alt: attrs.alt,
      title: attrs.title,
      width: attrs.width,
      height: attrs.height,
    });
  });

  const links: ExtractedLink[] = [];
  $("a").each((_index: number, el: any) => {
    const attrs = el.attribs || {};
    links.push({
      href: attrs.href,
      text: $(el).text().trim(),
      title: attrs.title,
    });
  });

  return {
    title,
    content,
    images,
    links,
  };
};
