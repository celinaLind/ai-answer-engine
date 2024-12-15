# AI Search Engine

​For this project, you will be building an AI Answer Engine with Next.js and TypeScript that can scrape content from websites and mitigates hallucinations by citing its sources when providing answers. This project is inspired by Perplexity.ai, a company currently valued at over $9 Billion.

​Here is an example of what you can expect to build: https://www.webchat.so/

Completed the following TODOs and changed them to DONEs:

- src/app/page.tsx: Update the UI and handle the API response as needed
- src/app/api/chat/route.ts: Implement the chat API with Groq and web scraping with Cheerio and Puppeteer
- src/middleware.ts: Implement the code here to add rate limiting with Redis

Project Requirements:

A chat interface where a user can:

- Paste in a set of URLs and get a response back with the context of all the URLs through an LLM
- Ask a question and get an answer with sources cited
- Share their conversation with others, and let them continue with their conversation

TODOs:

1. Fix prompt for groq response to: use context provided at any point by user or search google when no user provided context.
2. Add share conversation feature, can look at message helper file for beginning code
3. Incorporate Puppeteer

## Resources

- [How to Build a Web Scraper API with Puppeteer](https://www.youtube.com/watch?v=kOdIzhPfLuo)
- [API Routes with Next.js](https://www.youtube.com/watch?v=gEB3ckYeZF4)
- [Connect to your Upstash Client](https://upstash.com/docs/redis/howto/connectclient)
- [Connect with Upstash-Redis](https://upstash.com/docs/redis/howto/connectwithupstashredis)
- [Rate Limiting your Nextjs 14 APIs using Upstash](https://www.youtube.com/watch?v=6QhLdQlyZJc)
- [Rate Limit - Methods](https://upstash.com/docs/redis/sdks/ratelimit-ts/methods#limit)
- [How to use Redis Caching](https://www.youtube.com/watch?v=-5RTyEim384)
- [Nextjs Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Write a Regular Expression for a URL](https://www.freecodecamp.org/news/how-to-write-a-regular-expression-for-a-url/)
- Web Scraping Packages/Web Scraping Tools:
  - [Selenium](https://www.selenium.dev/documentation/webdriver/getting_started/install_library/)
  - [Beautiful Soup](https://pypi.org/project/beautifulsoup4/)
  - [Puppeteer](https://pptr.dev/) - browser automation

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

#### [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)

This is used do get the users IP address from the header. Not really recommended to use, better to use the users' session for tracking.

#### [iron-session](https://www.npmjs.com/package/iron-session/v/8.0.0-beta.5) <-- TODO

A secure, stateless, and cookie-based session library for javascript. The session data is stored in signed and encrypted cookies.
[View Github](https://github.com/vvo/iron-session)
[Vercel Examples](https://get-iron-session.vercel.app/)

## Future (Attempt these after you have finished the requirements above)

- Build a comprehensive solution to extract content from any kind of URL or data source, such as YouTube videos, PDFs, CSV files, and images
- Generate visualizations from the data such as bar charts, line charts, histograms, etc.
- Implement a hierarchical web crawler that starts at a given URL and identifies all relevant links on the page (e.g., hyperlinks, embedded media links, and scrapes the content from those links as well
