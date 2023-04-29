# Knucklebones

## Project Intro
### Frontend
* The frontend app is in `apps/frontend`
* Main packages:
  * React
  * Mantine
  * Socket Client


### Backend
* The backend app is in `apps/server`
  * Node Express
  * Socket

### Lerna and Workspaces
* [Lerna](https://lerna.js.org/docs/getting-started) will manage these two apps in this one repo
 * This will help run common tasks like formatting and linting across apps
 * We will also be able to easily run both parts of the project at the same time for testing
 * Lerna uses [Yarn Workspaces](https://yarnpkg.com/features/workspaces) under the hood

## Development
### Environment
Make sure you have node, npm, git, and yarn installed

### Getting started
```bash
git clone ... // Clone the repository
cd knucklebones // Move into it
yarn // Install all dependencies
```


