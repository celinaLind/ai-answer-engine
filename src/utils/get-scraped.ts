import axios from "axios"; // axios sends requests to the browser
import * as cheerio from "cheerio"; // cheerio is a jQuery-like library for Node.js used for web scraping
import { error } from "console";

// Regular expression to match URLs
export const urlRegex = /https?:\/\/[^\s]+/g;

// Function to clean text content
export function cleanText(text: string) {
  return text.replace(/\s+/g, " ").replace(/\n+/g, " ").trim();
}

// Function to scrape the website
export async function getScraped(url: string) {
  console.log(`Get content for URL: ${url}`);
  try {
    // Step 1: Get content of URL
    const response = await axios.get(url);
    // Step 2: Load the HTML into cheerio
    const $ = cheerio.load(response.data);
    // Step 3: Remove unnecessary script and style tags and comments
    $("script").remove();
    $("style").remove();
    $("noscript").remove();
    $("iframe").remove();
    // Step 4: Extract the ALL text content
    // Extract the title of the website
    const title = $("title").text();
    // Extract the meta description of the website
    const description = $('meta[name="description"]').attr("content");
    // Extract headers
    const h1 = $("h1")
      .map((_, elem) => $(elem).text())
      .get()
      .join(" ");
    const h2 = $("h2")
      .map((_, elem) => $(elem).text())
      .get()
      .join(" ");
    // Extract paragraphs
    const paragraphs = $("p")
      .map((_, elem) => $(elem).text())
      .get()
      .join(" ");
    // Extract links
    const links = $("a")
      .map((_, elem) => $(elem).attr("href"))
      .get();
    // Extract article content
    const article = $("article")
      .map((_, elem) => $(elem).text())
      .get()
      .join(" ");
    // Extract main text content
    const mainText = $("main")
      .map((_, elem) => $(elem).text())
      .get()
      .join(" ");
    // Extract content text
    const content = $('.content, #content, [class*="content"]')
      .map((_, elem) => $(elem).text())
      .get()
      .join(" ");
    // Get list items
    const listItems = $("li")
      .map((_, elem) => $(elem).text())
      .get()
      .join(" ");

    // Step 5: Combine the extracted content
    const combineContent = [
      title,
      description,
      h1,
      h2,
      paragraphs,
      links,
      article,
      mainText,
      content,
      listItems,
    ].join(" ");
    // Step 6: Clean the text content and limit token intake
    const cleanedContent = cleanText(combineContent).slice(0, 10000);

    // Return extracted and cleaned content
    return {
      url,
      title: cleanText(title),
      headings: {
        h1: cleanText(h1),
        h2: cleanText(h2),
      },
      metaDescription: description,
      content: cleanedContent,
      error: null,
    };
  } catch (error) {
    console.error("Error while scrapping the website:", error);
    return null;
  }
}