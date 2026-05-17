# 🧊 Icebreaker

### 🌍 It's live: **https://ambitious-desert-027b7dd0f.7.azurestaticapps.net**

Put that link on your trifold board — it works on any phone or computer.

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
| | **Math Sprint** — timed mental math (learn!) |
| | **Memory Sequence** — watch & repeat (memory trainer) |
| | **Slide Puzzle** — classic numbered tiles (logic) |

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

## 🌍 It's already on the cloud (Azure!)

This project is **already set up and deployed** — you don't have to do
anything to put it online. Here's how it works:

- **Code lives on GitHub:** https://github.com/codesidh/icebreaker
- **Website is hosted on Microsoft Azure** (Azure Static Web Apps, free tier):
  **https://ambitious-desert-027b7dd0f.7.azurestaticapps.net**
- **It updates by itself.** Every time you `git push` a change to the `main`
  branch on GitHub, a robot (GitHub Actions) automatically rebuilds the app
  and updates the live website in a couple of minutes. You can watch it happen
  on the **Actions** tab of the GitHub repo.

### The "push your change live" routine

```bash
git add .
git commit -m "Added my own jokes"
git push
```

That's it — wait ~2 minutes and refresh the Azure link. 🎉

<details>
<summary>For grown-ups: how the cloud was set up</summary>

- Azure resource group `icebreaker-rg`, an Azure Static Web App named
  `icebreaker-web` (Free SKU) in `eastus2`.
- The site is a static export (`next build` with `output: "export"`), so there
  is no server to manage and the free tier is plenty.
- `.github/workflows/azure-deploy.yml` builds and deploys on every push,
  using the repo secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.

</details>

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
