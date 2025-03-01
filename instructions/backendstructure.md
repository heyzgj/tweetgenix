##Backend Structure Document##
The backend for TweetGenix is simple and uses Supabase to handle the heavy lifting, while Next.js ties it all together. Here’s how it’s set up, covering the database, API routes, and plans for later.
Database (Supabase)
We store tweet history in a table called Tweets:
id: UUID (a unique code for each tweet)

content: TEXT (the actual tweet text)

created_at: TIMESTAMP (when the tweet was made)

prompt: TEXT (what the user typed in, optional)

reference_handle: TEXT (the Twitter handle used, optional)

length: VARCHAR (stores "short," "medium," or "long")

For now, since we’re not doing user logins in the first version, all tweets go into this one table, and everyone sees the same history. Later, we can add Supabase Auth to give each user their own private list.
API Routes (Next.js)
The app talks to the backend through these routes:
POST /api/generate: This makes the tweet. It takes the user’s idea, reference handle, and length, grabs five tweets from Nitter, sends everything to Gemini 2.0 Flash, and sends back the new tweet.

POST /api/save: This saves a tweet to Supabase, taking the tweet text, prompt, reference handle, and length, and adding them to the tweets table.

GET /api/history: This pulls all the saved tweets from Supabase and sends them to the frontend to show in the history page.

Authentication
We’re skipping logins for now to keep the MVP simple. That means no user accounts yet, and the tweet history is shared. Down the road, we can plug in Supabase Auth to let users sign in and keep their tweets private.
Storage
We don’t need extra storage since we’re only saving text, not files. Supabase’s database handles everything we need.
This setup keeps the backend lean and easy to manage, with Supabase doing the database work and Next.js handling the logic. It’s ready to grow when we add more features later.

