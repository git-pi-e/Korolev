import fs from "fs";
const meta_file = './src/lib/data/meta.json';

const buildNumber = JSON.parse( fs.readFileSync( meta_file, 'utf-8' ) ).build.current;
const { owner, author, version } = JSON.parse( fs.readFileSync( './package.json', 'utf8' ) );
const buildTime = Date.now();

const metadata = {
    name: 'Korolev',
    author,
    owner,
    build: {
        current: buildNumber + 1,
        previous: buildNumber,
        version,
    },
    time: buildTime
};

fs.writeFileSync( meta_file, JSON.stringify( metadata ) );