// TODO: Implement the chat API with Groq and web scraping with Cheerio and Puppeteer
// Refer to the Next.js Docs on how to read the Request body: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// Refer to the Groq SDK here on how to use an LLM: https://www.npmjs.com/package/groq-sdk
// Refer to the Cheerio docs here on how to parse HTML: https://cheerio.js.org/docs/basics/loading
// Refer to Puppeteer docs here: https://pptr.dev/guides/what-is-puppeteer
import { NextResponse } from "next/server";
import { getResponse } from "@/utils/groq";
import { getScraped, urlRegex } from "@/utils/get-scraped";

export async function POST(req: Request) {
  try {
    // Get the user message from the request body
    const { message } = await req.json();
    console.log(`Message Received: ${message}`); // Verify that the message is received and accurate

    // Check if the user message includes a URL
    const url = message.match(urlRegex);

    let scrapedContent = "";
    if (url) {
      // If the message includes a URL, get the content of the website
      // returns a list of URLs received by the user
      console.log(`URL Found: ${url}`); // Verify that the URL(s) are received and accurate

      // Get the content of the website
      const scraperResponse = await getScraped(url);
      console.log(`URL scraped`); // Verify that url was scrapped and content is accurate
      scrapedContent = scraperResponse!.content;
    }

    // Extract user query from the message by removing the URL
    const userQuery = message.replace(url ? url[0] : "", "").trim(); // would need to change if expected multiple urls

    const prompt = `
    Answer my question: ${userQuery}

    Based on the following content:
    <content>
    ${scrapedContent}
    </content>
    `;
    console.log(`Prompt: ${prompt}`); // Verify that the prompt is accurate

    // Get the response from Groq
    const response = await getResponse(message);
    console.log("About to send response");

    return NextResponse.json({ message: response });
  } catch (error) {
    return NextResponse.error();
  }
}
