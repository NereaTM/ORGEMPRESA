const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');


let archivoConfiguracion = '../../config.local.yaml';

const localYml = path.join(__dirname, archivoConfiguracion);

if (!fs.existsSync(localYml)) {
  archivoConfiguracion = '../../config.prod.yaml';
}

const configPath = path.join(__dirname, archivoConfiguracion);
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

module.exports = config;
