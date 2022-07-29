

# Zuplyd

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`


There are also many [community plugins](https://nx.dev/community) you could add.

# React

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@zuplyd/mylib`.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.


# Nest

## Generate an application

Run `nx g @nrwl/nest:app <app_name>` to generate an application.


Before creating the relevent Module, Service and Controller the folder to which they go in must be created.
## Generate Module
Run `nx g @nrwl/nest:module <folder path where the file is created>` then follow on screen instructions.

## Generate Service
Run `nx g @nrwl/nest:service <folder path where the file is created>` then follow on screen instructions.

## Generate Controller
Run `nx g @nrwl/nest:controller <folder path where the file is created>` then follow on screen instructions.


## Further help

Visit the [Nx Nest Documentation](https://nx.dev/packages/nest) to learn more.

Visit the [NestJs Documentation](https://docs.nestjs.com/) to learn more.

# Common

## Development server

Run `nx serve my-app` for a dev server. Navigate to `http://localhost:<port>/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g component <component-name> --directory=app/components --project=frontend --export` to generate a new component.
when asked for css chose `none`

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



