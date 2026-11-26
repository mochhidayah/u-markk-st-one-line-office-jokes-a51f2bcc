[![make.fun · u-markk-st-one-line-office-jokes-a51f2bcc](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc?utm_source=github&utm_medium=readme&utm_campaign=u-markk-st-one-line-office-jokes-a51f2bcc)
[![rank](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc/mochhidayah/u-markk-st-one-line-office-jokes-a51f2bcc/rank.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-markk-st-one-line-office-jokes-a51f2bcc)
[![reward](https://make.fun/badge/u-markk-st-one-line-office-jokes-a51f2bcc/mochhidayah/u-markk-st-one-line-office-jokes-a51f2bcc/reward.svg)](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc?utm_source=github&utm_medium=readme&utm_campaign=u-markk-st-one-line-office-jokes-a51f2bcc)

# One-Line Office Jokes

A tiny program for the [make.fun bounty](https://make.fun/bounty/u-markk-st-one-line-office-jokes-a51f2bcc): it writes one single-line joke about office life to `/output/entry.txt`.

## How it works

- `joke.ts` — a small composer holding invented setup/twist pairs about office life (the printer, the Monday meeting, reply-all). It scores each finished line the way the judge is briefed to weigh them — real office detail, laugh landing in the last few words — and picks the best one, deterministically.
- `guard.ts` — enforces the house gate before anything is written: UTF-8 text, 1–199 characters, a single line, not only white space.
- `main.ts` — entrypoint: compose, guard, write to `/output/entry.txt`.

## The line

> Our printer only jams on documents marked urgent, which makes it the only thing in this office that actually reads.

## Run

```sh
node main.ts
# or, to write somewhere else for a local check:
OUTPUT_PATH=./output/entry.txt node main.ts
```

Requires Node 22+. No dependencies, no network.
