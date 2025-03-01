# Implementation Plan for TweetGenix

## 如何使用此文档
This document is a step-by-step guide for building TweetGenix using Cursor AI. It's designed to be updated as you progress. Here's how to use it:

- **Mark Completion**: For each step, change `[ ]` to `[x]` when done (e.g., `[x] 1. Initialize Next.js Project`).
- **Update Progress**: After finishing all steps in a phase, add 3-5 bullet points under "进展总结" (Progress Summary) in that phase. Include:
  1. Key tasks completed.
  2. Any issues encountered (if none, say "No issues").
  3. Readiness for the next phase (e.g., "Ready for frontend development").
  Example:
  **进展总结**:  
[x]Initialized Next.js project with TypeScript.
[x]Installed core dependencies successfully.
[x]No issues encountered.
[x]Ready for frontend development.

- **Log Issues**: If you hit a problem (e.g., API failure), add an entry to the "问题日志" (Issue Log) at the end with the date and details (e.g., "2025-02-28: Nitter fetch failed, trying backup").
- **Keep It Clear**: Only update the checkboxes, summaries, and log as you go—don't change the steps themselves unless instructed.

---

## Overview
TweetGenix is a Twitter AI tweet generator to help startup founders, investors, and crypto KOLs (technical novices) create natural tweets quickly, boosting Twitter exposure. This plan breaks development into 6 phases with 25 steps, ensuring Cursor AI can build it smoothly.

---

### Phase 1: Project Initialization
**Goal**: Set up the project environment and install core dependencies with Tailwind v4 and shadcn/ui.

- [x] **1. Initialize Next.js Project**
  - Run `pnpm create next-app@canary tweetgenix --tailwind --eslint --typescript --app` to start a new project with Tailwind v4 and React 19.
  - Enter the project folder: `cd tweetgenix`.

- [x] **2. Install Core Dependencies**
  - Init shadcn/ui: Run `pnpm dlx shadcn@canary init` to create `components.json` and set up CSS variables (select Next.js App Router when prompted).
  - Add shadcn components: Run `pnpm dlx shadcn@canary add input select textarea button card` to install required UI components.
  - Install Supabase client: `pnpm install @supabase/supabase-js`.
  - Install Gemini AI SDK: `pnpm install @google/generative-ai`.
  - Install Lucide icons: `pnpm install lucide-react`.

- [x] **3. Configure Tailwind CSS**
  - Created `tailwind.config.js` with the necessary configurations.
  - Verified and updated `app/globals.css` to match the initialized version.

- [x] **4. Create Project Directory Structure**
  - Set up the following directories in `src/`:
    - `api/` for API routes.
    - `utils/` for utility functions.
    - `styles/` for additional styles.

- [x] **5. Set Up Environment Variables**
  - Created `.env.local` and added placeholders for:
    ```
    GEMINI_API_KEY=
    SUPABASE_URL=
    SUPABASE_ANON_KEY=
    ```

**进展总结**:  
- [x] Initialized Next.js project with Tailwind, ESLint, and TypeScript.
- [x] Installed core dependencies including shadcn/ui, Supabase, and Gemini AI SDK.
- [x] Configured Tailwind CSS and verified styles.
- [x] Created project directory structure.
- [x] Set up environment variables.

---
### Phase 2: Frontend Development
**Goal**: Build the user interface using App Router, including landing, generate, and history pages.

- [x] **6. Design Landing Page**: Created a landing page with a title, description, and a 'Get Started' button.
- [x] **7. Develop Reusable Components**: Created `TweetDisplay`, `CopyButton`, and `SaveButton` components for displaying and managing tweets.
- [x] **8. Create Generate Page**: Implemented the generate page with input fields for tweet idea and reference handle, a select for length, and a generate button.
- [x] **9. Create History Page**: Developed the history page to display saved tweets with copy functionality.
- [x] **10. Implement Navigation Bar**: Added a navigation bar with links to the generate and history pages.

**进展总结**:
- [x] Designed landing page.
- [x] Developed reusable components.
- [x] Implemented generate page.
- [x] Developed history page.
- [x] Implemented navigation bar.

---

### Phase 3: Backend Development
**Goal**: Set up Supabase and build API routes for generating, saving, and fetching tweets.

- [x] **11. Configure Supabase**: Set up Supabase and created the `tweets` table.
- [x] **12. Implement Tweet Generation API Route**: Created the API route to generate tweets based on user input.
- [x] **13. Implement Save Tweet API Route**: Created the API route to save tweets to Supabase.
- [x] **14. Implement Fetch History API Route**: Created the API route to fetch saved tweets from Supabase.

**进展总结**:
- [x] Configured Supabase and created the `tweets` table.
- [x] Implemented the API route to generate tweets based on user input.
- [x] Implemented the API route to save tweets to Supabase.
- [x] Implemented the API route to fetch saved tweets from Supabase.

---

### Phase 4: Frontend-Backend Integration
**Goal**: Connect frontend pages to backend APIs for full functionality.

- [x] **15. Connect Generate Page to API**: Implemented API call to generate tweets based on user input.
- [x] **16. Implement Save Functionality**: Added functionality to save generated tweets to Supabase.
- [x] **17. Implement Copy Functionality**: Enabled copying of generated tweets to clipboard.
- [x] **18. Connect History Page to API**: Implemented fetching and displaying of saved tweets from Supabase.

**进展总结**:
- [x] Connected generate page to API.
- [x] Implemented save functionality.
- [x] Implemented copy functionality.
- [x] Connected history page to API.

---

### Phase 5: Testing and Debugging
**Goal**: Ensure all features work correctly and fix issues.

- [ ] **19. Test Tweet Generation**
- On `/generate`, test with prompts (e.g., "Startup tip") and handles (e.g., "@elonmusk").
- Confirm tweet generates in <5 seconds and matches length.

- [ ] **20. Test Save and History Functionality**
- Generate a tweet, click "Save", then check `/history`.
- Verify all fields (content, prompt, etc.) display correctly.

- [ ] **21. Test Copy Functionality**
- Click "Copy" on a tweet, paste into a text editor, and check accuracy.

- [ ] **22. Debug Issues**
- Open browser console to check for errors.
- Fix any API or UI bugs (e.g., failed fetches, display glitches).

**进展总结**:
- [ ] (Leave empty until phase completes)

---

### Phase 6: Deployment
**Goal**: Deploy the app to Vercel for live use.

- [ ] **23. Prepare Production Environment**
- Add real `GEMINI_API_KEY` to `.env.local`.
- Run `pnpm build` to check for build errors.

- [ ] **24. Deploy to Vercel**
- Push code to a GitHub repo.
- In Vercel dashboard, link the repo, set env vars, and deploy.

- [ ] **25. Final Testing**
- Visit the live URL, test all features end-to-end.

**进展总结**:
- [ ] (Leave empty until phase completes)

---

## Problem Log
- (Leave empty; add entries like "2025-02-28: Nitter fetch failed, used backup URL" as issues arise)

---