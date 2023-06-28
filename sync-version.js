// get the package.json version number and set it to the NEXT_PUBLIC_APP_VERSION env variable.
// the script is run in prebuild step, so it would be updated each time the app is deployed

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const packageJsonPath = path.resolve('./package.json');
const packageJson = require(packageJsonPath);
const version = packageJson.version;

const envPath = path.resolve('./.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

envConfig.NEXT_PUBLIC_APP_VERSION = version;

const envString = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');
fs.writeFileSync(envPath, envString);

console.log(`La version a été synchronisée avec succès : version ${version}`);
