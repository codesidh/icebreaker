# 🧊 Icebreaker

**A friend-making app.** New at school or sitting alone at lunch? Icebreaker
gives you an easy way to start talking to someone: tell a joke, ask a riddle,
share a surprising fact, pick a side on a big question, or play a quick brain
game together.

It has two parts:

| 🧊 Break the Ice | 🎮 Play & Think |
| --- | --- |
| **Jokes** — read the setup, reveal the punchline | **Tic-Tac-Toe** — vs. the computer (Chill → Boss) |
| **Trivia** — guess the answer, learn a fun fact | **Count to 21** — with the secret math trick to win! |
| **Riddles** — stump a friend, then say "aha!" | **Word Search** — 6 themes, tap-to-find |
| **Conversation Starters** — pick a side, say *why*, and your answers get saved so you can compare with friends | **Sudoku** — 3 difficulty levels |
| | **Memory Match**, **Hangman**, **Rock Paper Scissors** |

> Every game is **100% original** — built from scratch, no copyrighted games
> copied. It works great on phones, tablets, and laptops, perfect for a
> science-fair table or trifold demo.

---

## ▶️ Run it on your own computer

You need [Node.js](https://nodejs.org) (version 18 or newer). Then open a
terminal **in this folder** and run:

```bash
npm install      # do this once — downloads the building blocks
npm run dev       # starts the app
```

Now open **http://localhost:3000** in your browser. 🎉

To stop it, press `Ctrl + C` in the terminal.

---

## 🌍 Put it on the internet (the cloud!)

The easiest, no-install way — great for showing your class:

1. Put this folder on **GitHub** (your teacher or a parent can help create a
   free account and a new repository).
2. Go to **[vercel.com](https://vercel.com)** and sign up (the free "Hobby"
   plan is perfect for a school project).
3. Click **Add New → Project**, choose your GitHub repository, and press
   **Deploy**. Vercel automatically sees it's a Next.js app — you don't have to
   change a single setting.
4. In about a minute you'll get a public link like
   `https://icebreaker.vercel.app` you can put on your trifold board. Every
   time you push a change to GitHub, the website updates by itself.

Prefer the command line instead? Install the Vercel CLI once with
`npm i -g vercel`, then run `vercel` in this folder and follow the prompts.

---

## ✏️ Make it your own

Want different jokes or your own questions? You don't need to touch the games —
just edit these simple list files and save:

| To change… | Edit this file |
| --- | --- |
| Jokes | `lib/data/jokes.ts` |
| Trivia questions | `lib/data/trivia.ts` |
| Riddles | `lib/data/riddles.ts` |
| Conversation / opinion questions | `lib/data/conversation.ts` |
| Word Search & Hangman words | `lib/data/words.ts` |

Each one is a list of items — copy a line, change the words, and your new
content shows up instantly while `npm run dev` is running. Colors and fonts
live in `app/globals.css` if you want to restyle it.

---

## 🧠 How it's built

- **Next.js + React + TypeScript** — the same tools real companies use.
- **Tailwind CSS v4** for the bright "recess arcade" look.
- No database needed. Conversation answers are saved privately in your own
  browser, so the app works even with no internet after it loads.

Made as a school project — to help people make friends. 💛
