<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Kevin McCallister Itinerary <a href="http://nodejs.org" target="_blank">Node.js</a>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

TypeScript itinerary Kevin McCallister (Lost in Europe).

## REST API

```bash
 (POST) api/itinerary
 (GET) api/itinerary/:id
 (GET) api/itinerary/:id/readable
```

## Project setup

we init installing all dependencies of our project.

```bash

npm install

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Explanation

1 - I decided to manage the ticket list through strategies

```bash
 src/itinerary
 └── strategies
 ├── airplane.strategy.ts
 ├── boat.strategy.ts
 ├── bus.strategy.ts
 ├── train.strategy.ts
 ├── tram.strategy.ts
 └── transport-interface.strategy.ts
```

### The excuse of use Strategies for this was

- Clean separation of logic.
- Easier maintenance and extensibility
- Dynamic, flexible behavior.
- Better testing and reuse.

### In addition create a context that Is used in the separation of ticket to create the arrange list (sorted)

```bash
src/itinerary
├── itinerary.context.ts
```

### MongoDB

I decided to move forward through a document database like MongoDB because, I believe it's the best way to manage a dynamic @body ( ticketsDto) in my personal opinion. It could allow extensibility if we add a new ticket type with a different transportType. I configured with typeOrm

```bash
#//!bash
# configuration in app.module
 TypeOrmModule.forRoot({
      type: 'mongodb',
      username: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      url: process.env.MONGO_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      database: process.env.MONGO_DATABASE,
    }),

#configuration in itinerary.module
imports: [TypeOrmModule.forFeature([Itinerary])],
# Ensure TypeOrmModule is properly imported

```

## Stay in touch

- Author - [Douglas Barraza](https://www.linkedin.com/in/douglas-barraza/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
