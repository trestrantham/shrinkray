# Shrink Ray

Shrink Ray is a TypeScript express application that will shorten provided URLs to a unique slug that will track how many
times that URL has been viewed/unfurled. Shrink Ray uses a PostgreSQL database to persist links and view counts.

## Setup

To setup a new installation of Shrink Ray, just run the `bin/setup` script to install dependencies, create the DB, and
run migrations.

## Running

Running Shrink Ray is as simple as running `yarn dev` in developement mode or `yarn build && yarn start` for production
mode.

## Caveats

1. This was my first time using Prisma so apologies for any missing idioms, but I really enjoyed it versus previous ORMs
   I've used (IE: Sequelize or Slonik).
2. Error reporting is generic and could be updated to give specific errors for data validation, DB insert, etc.
