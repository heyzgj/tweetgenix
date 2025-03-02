##Tech Stack Document##
The TweetGenix web application is built with a modern set of tools to make development fast and the app reliable. Here’s everything we’re using, complete with details and links to learn more.
Next.js (v15.x): This is our main framework for both the frontend and backend. It’s built on React and gives us handy features like server-side rendering and API routes. You can find all the details in its documentation here: Next.js Documentation.

shadcn/ui: This is how we’re building the interface. It’s a set of ready-made components made with Radix UI and Tailwind CSS, keeping the look clean and user-friendly. Check out the docs here: shadcn/ui Documentation.

Gemini 2.0 Flash: This AI model powers our tweet generation. We connect to it through the Google AI SDK, feeding it prompts and reference styles to create tweets. The full guide is available here: Gemini API Documentation.

Supabase: This is our backend service, giving us a PostgreSQL database to save tweet history. We connect to it with the Supabase JavaScript client. Everything you need to know is here: Supabase Documentation.

We’ve also got some extra pieces to make it all work:
React (v18.x): The library we use to build the interface, tied into Next.js.

Tailwind CSS (v4.x): Our styling tool, letting us design with simple utility classes.

Lucide Icons: A collection of icons for buttons and navigation, keeping things visually consistent. See more here: Lucide Icons Documentation.

We manage all these packages with npm, and the app gets deployed on Vercel, which is built to handle Next.js projects smoothly.

