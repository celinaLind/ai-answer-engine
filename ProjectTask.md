​For this project, you will be building an AI Answer Engine with Next.js and TypeScript that can scrape content from websites and mitigates hallucinations by citing its sources when providing answers. This project is inspired by Perplexity.ai, a company currently valued at over $9 Billion.

​Here is an example of what you can expect to build: https://www.webchat.so/

Getting Started

Clone this GitHub Repository
Take a look at the TODOs throughout the repo, namely:

- src/app/page.tsx: Update the UI and handle the API response as needed
- src/app/api/chat/route.ts: Implement the chat API with Groq and web scraping with Cheerio and Puppeteer
- src/middleware.ts: Implement the code here to add rate limiting with Redis

Project Submission Requirements

A chat interface where a user can:

- Paste in a set of URLs and get a response back with the context of all the URLs through an LLM
- Ask a question and get an answer with sources cited
- Share their conversation with others, and let them continue with their conversation

## Resources

- [How to Build a Web Scraper API with Puppeteer](https://www.youtube.com/watch?v=kOdIzhPfLuo)
- [API Routes with Next.js](https://www.youtube.com/watch?v=gEB3ckYeZF4)
- [Rate Limiting your Nextjs 14 APIs using Upstash](https://www.youtube.com/watch?v=6QhLdQlyZJc)
- [How to use Redis Caching](https://www.youtube.com/watch?v=-5RTyEim384)

## Skills

- React
- TypeScript
- Next.js
- Caching
- Middleware
- API Design

## Development Notes

#### Error 403

This error is provided during web scraping when the url you are trying to scrap is preventing you from accessing it. This error can be negated by using Puppeteer that spins up an instance of chrome, goes to provided URL, and extracts important properties. This is also considered to be using a headless browser.

#### npm run format:fix

This command will automatically fix the formatting of ALL files in your project

## Challenges (Attempt these after you have finished the requirements above)

- Build a comprehensive solution to extract content from any kind of URL or data source, such as YouTube videos, PDFs, CSV files, and images
- Generate visualizations from the data such as bar charts, line charts, histograms, etc.
- Implement a hierarchical web crawler that starts at a given URL and identifies all relevant links on the page (e.g., hyperlinks, embedded media links, and scrapes the content from those links as well
