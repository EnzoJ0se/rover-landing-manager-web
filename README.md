# rover-landing-manager-web

## Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/EnzoJ0se/rover-landing-manager-web.git
$ cd rover-landing-manager-web
```

Copy the environment file:
```sh
cp src/environment/environment.example.ts src/environment/environment.ts
```
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run with Docker

Run the following command to build the docker image:
```sh
npm run build-docker
```

To Execute the aplication execute the command:
```sh
npm run start-docker
```
The application will be served on <a href="http://localhost:8080/">localhost:8080</a>
