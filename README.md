Running project
===============
Requires npm version 7 (support of monorepo / workspaces)

To start database
```
docker-compose up -d
```
then
```
npm install
```

```
cd packages/thedoor-backend/
npm run db:reset
npm run db:fixtures
npm run start:dev
```

then

```
cd packages/thedoor-frontend
npm start
```

Backend
=======

Notes
-------------------------
- Never used prisma.io before, but wanted to check it finally :), usually I've used knex.
- Db id field should be of type `uuid` instead of `text`
- if infinite scroll endpoint would have to operate on much larger dataset it should use cursor intead of offset
  for performance reasons
- jwt token should expire after time, now it's using default library configuration

How do you document your backend code
-------------------------------------

As for writing documentation I try to write it only as necessary and I try to make self documenting code, for example:
```
  const isUniqueError = e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';
  if (isUniqueError) {
    ...
  }
```

Basically I like to keep all the documentation inside code, I find that describing it in wiki or other place tends
to make it outdated quickly. Also it makes it easier to keep up to date, since it has to go alongside the PR.

Also used swagger to document the api, recently found https://www.npmjs.com/package/swagger-typescript-api which looks
interesting

What are your thoughts on testing for the backend
-------------------------------------------------
Functional tests to test if it works in general + unit tests for checking all edge cases.


What design pattern you have used in your backend project
---------------------------------------------------------
Dependency container, Inversion of Control, Dependency Injection, ORM (Prisma library)

What do you think about Typescript on the backend?
--------------------------------------------------
Can't imaginw working without it, speeds up development and catches a lot of silly mistakes

What are the most important performance issues in nodejs webapps
----------------------------------------------------------------
This is very broad topic :)
As with most apps cpu and memory usage mostly.
"Backpressure" problem, so for example too many requests that nodejs can't handle.


Frontend
========

Things to improve / notes
-----------------
- Debounce filter input
- implement infinite list by using infinite list library
- more responsive design for mobile clients

How do you document your frontend code?
---------------------------------------
Usualy I try to make simple components and self documenting code. Using typescript also helps with the task.
I try to use available libs for the task, so documentation is already there (like create-react-app or redux stack)

What are your thoughts on testing for the frontend?
---------------------------------------------------
Usually I'm using e2e tests library (like codecept.io)

What Design Patterns have you used in your frontend projects?
-------------------------------------------------------------
Usualy it's Dependency Injection, IoC and the Design Patterns provided with React/Redux library.

What do you think about Typescript on the frontend?
---------------------------------------------------
Makes life much easier, also there is good 3rd party component support so much less going throught
all the websites in search for the relevant piece of documentation

What are the most important performance issues in React web applications?
-------------------------------------------------------------------------
In general there is not too much specific to React, since all forntend code tends to have the same issues.
React just helps with some. In general preventing redraw is the key to performance and not rendering too many
components at the same time. For example, in the frontend task is infite scroll list, it would be good idea to use
library like: https://github.com/ankeetmaini/react-infinite-scroll-component
