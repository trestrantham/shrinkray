# Shrink Ray

Shrink Ray is a TypeScript express application that will shorten provided URLs to a unique slug that will track how many
times that URL has been viewed/unfurled. Shrink Ray uses a PostgreSQL database to persist links and view counts.

## Setup

To setup a new installation of Shrink Ray:

1. Set the `DATABASE_URL` to your development PostgreSQL database connection string.
2. Run `yarn setup` to install application dependencies, create database, and run migrations.

That's it! The application should be ready to run if migrations run successfully. If there is an issue creating the
database or running migrations, confirm `DATABASE_URL` is set correctly.

## Run

Running Shrink Ray is as simple as running `yarn dev` in developement mode or `yarn build && yarn start` for production
mode. This will start the Shrink Ray web server.

## Test

The full coverage test suite can be run with `yarn test`.

## Caveats

1. This was my first time using Prisma so apologies for any missing idioms, but I really enjoyed it versus previous ORMs
   I've used (IE: Sequelize or Slonik).
2. Error reporting is generic and could be updated to give specific errors for data validation, DB insert, etc.
3. There is no authentication/authorization so anyone can create links or edit them.
4. This intentionally does not have a separate production configuration for the application or database for simplicity's sake.
