# CDRF wounds

CDRF wound is an app to simulate the probability to achieve given result depending on a set of inputs. It relies on the game Confrontation (version CDRF). A link to the description of the basic mechanism and effect of inputs is given in the footer.

A **demo** is hosted on Vercel here : https://cdrf-wounds.vercel.app/

![app-preview](/docs/screenshot-homepage-v1.0.0.jpg)

## How to begin with the project

You need to first install [node](https://nodejs.org/en/) (v14.15.4 or later) on your device in order to run `npm` commands and [git](https://git-scm.com/) to run the `git` commands.

To install the project :

1. clone this repo with `git clone https://github.com/SebDelile/cdrf-wounds.git`

2. then go to the new folder with `cd cdrf-wounds`

3. install all dependencies with `npm ci`

Then you can start working on the project ! See the script section to learn how to run the project.

## Main dependencies

The project is a single page application powered by Next JS. it uses :

- **react** and **react-dom** as a basis to write react components
- **next** for the dev server, build tools and some custom components
- **typescript** to use ts and tsx files, allowing static typing
- **Material UI** as a component library (it includes **Emotion** as peer dependency)
- **d3** to build the charts

## Available scripts

In the project, you can run:

### `npm run dev`

Starts Next.js in development mode. Open [http://localhost:3000](http://localhost:3000) to see the app in the browser. The page is automatically reload if you make edit to the code. you will also see lint messages in the console.

### `npm run build`

Generates an optimized version of your application for production. This standard output includes:

- HTML files for pages using getStaticProps or Automatic Static Optimization
- CSS files for global styles or for individually scoped styles
- JavaScript for pre-rendering dynamic content from the Next.js server
- JavaScript for interactivity on the client-side through React

This output is generated inside the `.next` folder.

It is worth noting there is a `prebuild` script to automatically update the app version in the `.env.local` file from the `package.json` file

### `npm run start`

Starts the application in production mode. The application should be compiled with `npm run build` first.

Open [http://localhost:4000](http://localhost:4000) to see the app in the browser.

### `npm run lint`

Runs ESLint for all files in the `pages`, `components`, `lib`, `data` and `utils` directories. It also provides a guided setup to install any required dependencies if ESLint is not already configured in your application.
