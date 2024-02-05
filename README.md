# Pool Scoreboard

An MVP for played matches, keeping scores for players and keeping scores for teams.

## Setup

Install dependancies:

```bash
npm i
```

Fill up an `.env` file with the following:
For my direct colleagues, ask me for the Supabase credentials via slack

```txt
# Transaction link from the Supabase Dashboard - port:6543
DATABASE_URL="LinkToSupabaseConnection"
# Session link from the Supabase Dashboard - port:5432
DIRECT_URL="LinkToSupabaseConnection"
```

Run prisma update

```bash
npx prisma db pull
npx prisma generate
```

Run the project

``` bash
# or start the server and open the app in a new browser tab
npm run dev -- --open
``````

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
