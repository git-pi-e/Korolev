const fs = require( 'fs' );

const evensts = JSON.parse( fs.readFileSync( './events.json' ) );
const filyered = evensts.filter( e => !e.title.includes( 'Elongation' ) )

fs.writeFileSync( './eventes', JSON.stringify( filyered ) )