##Frontend Guidelines Document##
The frontend of TweetGenix is all about keeping things simple, easy to use, and nice to look at. Here’s how we’re designing it, from the big ideas down to the tiny details.
UI and Design Principles
We want the app to feel light and uncluttered. Every page only has what’s needed, so users don’t get lost in extra stuff. It’s built to be obvious—someone can jump in and figure it out without help, thanks to clear labels and hints like "Copied!" pop-ups. Plus, it works just as well on a phone as it does on a computer.
Color Palette
The colors keep it calm and focused:
Background: #FFFFFF (white) – Makes everything feel open and clean.

Text: #333333 (dark gray) – Dark enough to read easily.

Accent: #4F46E5 (indigo) – Pops up on buttons and links to grab attention.

Secondary: #6B7280 (gray) – Used for smaller text like labels, so it doesn’t distract.

Fonts
We’re using Inter, a modern sans-serif font that’s easy to read and looks sharp. For regular text like instructions, we use the Regular weight (400). For headings and buttons, we bump it up to Semi-bold (600) to make them stand out a bit more.
Icons
All our icons come from Lucide Icons. They’re simple and match the clean vibe we’re going for, showing up on buttons like "Copy" or in the navigation bar.
Styling
We style everything with Tailwind CSS, which lets us add design right into the code with classes like bg-white or text-gray-800. It’s fast and keeps the look consistent. Any custom tweaks, like adding our accent color, live in the tailwind.config.js file.
UI Components
We’re building with shadcn/ui components to keep things uniform:
Input Fields: The text boxes (like "Your tweet idea") use the Input component with placeholders to hint at what to type.

Buttons: Big action buttons like "Generate" and "Save" get the accent color (bg-indigo-600), while "Copy" uses an outline style (border border-indigo-600).

Text Areas: The spot where users edit tweets is a resizable text box with a light border.

Dropdowns: The tweet length picker uses the Select component, showing "short," "medium," and "long" clearly.

The goal is a fresh, open design with lots of space, so users can focus on making tweets without any fuss.