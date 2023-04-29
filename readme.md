# Knucklebones

## Project Intro
### Frontend
* The frontend app is in `apps/frontend`
* Main packages:
  * [React](https://react.dev/reference/react) w/ [Vite](https://vitejs.dev/guide/)
  * [Mantine](https://mantine.dev/)
  * [Socket Client](https://socket.io/)

### Backend
* The backend app is in `apps/server`
  * [Node Express](https://expressjs.com/)
  * [Socket](https://socket.io/)

### Lerna and Workspaces
* [Lerna](https://lerna.js.org/docs/getting-started) will manage these two apps in this one repo
 * This will help run common tasks like formatting and linting across apps
 * We will also be able to easily run both parts of the project at the same time for local dev
 * Lerna uses [Yarn Workspaces](https://yarnpkg.com/features/workspaces) under the hood

### References
* [graceless.city](https://medium.com/@nikpundik/create-a-multiplayer-game-with-react-and-socket-io-eef36f06ba7d)
* [React socket game article](https://medium.com/swlh/socket-io-games-the-right-way-using-nodejs-and-react-not-a-chat-app-part-1-e7a49d2f3f51)
* 

## Development
### Environment
Make sure you have node, npm, git, and yarn installed

### Getting started
```bash
git clone ... // Clone the repository
cd knucklebones // Move into it
yarn // Install all dependencies
```
### Running the app
```bash
yarn dev // Lerna will run both app and server
// Check console output for urls to both app and server!
// Making any edits in those dirs will update the corresponding app :)
```




