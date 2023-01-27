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

Individual functionality can be tested with `cURL`:

```bash
# create a new link
$ curl -X POST 'http://localhost:3000/shrink' -H 'Content-Type: application/json' -d '{"url":"https://sonymusic.com"}'
{"id":1,"slug":"6lbi00hu","url":"https://sonymusic.com","view_count":0}

# get all link stats
$ curl 'http://localhost:3000/stats'
[{"id":1,"slug":"6lbi00hu","url":"https://sonymusic.com","view_count":0},{"id":2,"slug":"ajrmv12i","url":"https://wmg.com","view_count":0}]

# paginate link stats
$ curl 'http://localhost:3000/stats?limit=1&offset=1'
[{"id":2,"slug":"ajrmv12i","url":"https://wmg.com","view_count":0}]

# update a link (resets view count)
$ curl -X PUT 'http://localhost:3000/6lbi00hu' -H 'Content-Type: application/json' -d '{"url":"https://universalmusic.com"}'
{"id":1,"slug":"6lbi00hu","url":"https://universalmusic.com","view_count":0}

# unfurl a link (increments view count)
$ curl 'http://localhost:3000/6lbi00hu'
Found. Redirecting to https://universalmusic.com
```

### Load Testing

Shrink Ray uses Artillery to perform load testing. To run the load tests:

1. First create a new link via the cURL command above
2. Copy the created slug from the new link
3. Update the `test:load` script in `package.json` to paste in the slug
4. Start the server `yarn dev`
5. Run load tests `yarn test:load`

## Caveats

1. This was my first time using Prisma so apologies for any missing idioms. I did have trouble properly wrapping all
   tests in a transaction with Prisma which is currently causing 2 test failures (even though these features work as
   expected).
2. Error reporting is generic and could be updated to give specific errors for data validation, DB insert, etc.
3. There is no authentication/authorization so anyone can create links or edit them.
4. This intentionally does not have a separate production configuration for the application or database for simplicity's
   sake.
5. Model/schema logic is currently included in the route handlers. However, if the feature set got any bigger, I
   would refactor model logic into their own modules.
6. Tests do _not_ mock the DB so that real-world performance can be measured via the test suite.
