// get the package.json version number and set it to the NEXT_PUBLIC_APP_VERSION env variable.
// the script is run in prebuild step, so it would be updated each time the app is deployed

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// get the version in the package.json
const packageJsonPath = path.resolve('./package.json');
const packageJson = require(packageJsonPath);
const version = packageJson.version;

// get the current .env file or create it if missing
const envPath = path.resolve('./.env.local');
const envConfig = fs.existsSync(envPath)
  ? dotenv.parse(fs.readFileSync(envPath))
  : {};

//update the .env variable and rewrite the file
envConfig.NEXT_PUBLIC_APP_VERSION = version;
const envString = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');
fs.writeFileSync(envPath, envString);

console.log(`La version a été synchronisée avec succès : version ${version}`);
