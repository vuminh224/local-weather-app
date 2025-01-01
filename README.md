# LocalCast Weather

> This is a project forked from Rochas Thibaut and Vu Tuan Minh

## All the changed we made in the front
> Addition of a drop-down menu ("Settings" on the page) to put the darkmod switch (already existing), the goal is to be able to add other parameters, such as a switch to go from °F to °c.
> The drop-down menu only opens if you click on the "Settings" button. If the cursor leaves the drop-down menu div ("Settings" button or the menu itself), it closes automatically, but you can also close it by clicking again on the "Settings" button. This seemed more ergonomic, especially on mobile where there is no cursor, so it is more intuitive to click on the button earlier than clicking outside the menu.
> We change city search as output to app.component ( parent - children ) to handle the search bar then add into the list of weather.
> For the list, we continue Input with the new component weather-list that we created.
> We also add new unit degree for interfaces F or C to it memorizes the choice that we use. For example,
  if I chose °F for New York then save to the list, it stays as °F.
  then I change to °C for Rennes then save to the list, Rennes stays as °C and New York as °F
> We use the same logic for weather-list as currentWeather: If there's nothing on the list, we add a warning.
> We change the design of the list same as the currentweather ( for the beauty )
> We add a search history that saves the location that it found and a button that clear everything (* ^ ω ^)

> See [Changes](#changes) section for important or breaking changes made to the project.

## Build

- `npm run build:prod` is used to build a production-optimized version of the app.
- `npm run docker:debug` to run tests and build a containerized version of the app.

### Pre-requisites

- Do NOT install `@angular/cli` or `typescript` globally to avoid version mismatch issues across multiple projects.
  - Note: When creating new projects in the future, execute `npx @angular/cli new app-name --routing` to create a new Angular app with basic routing wired.
  - If you have trouble with this command, try `npx -p @angular/cli new app-name --routing`
- To run `ng` commands from within the project directory, preprend `npx` to commands, like `npx ng build`.
- To continue using `ng` without having to prepend `npx`, configure shell autofallback as described here: https://www.npmjs.com/package/npx#shell-auto-fallback.


### During Development

- Run `npm start` for a development web server.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://cypress.io).

### Contributors
[//]: contributor-faces

<a href="https://github.com/vuminh224"><img src="https://avatars.githubusercontent.com/u/114408235?v=4" title="Tuan Minh VU" width="80" height="80"></a>

<a href="https://gitlab2.istic.univ-rennes1.fr/trochas"><img src="https://secure.gravatar.com/avatar/980b9890d56d0a70c7253e3a198111938d79d7b396fd31240a99a9d5c4cd6b96?s=384&d=identicon" title="Rochas Thibaut" width="80" height="80"></a>

