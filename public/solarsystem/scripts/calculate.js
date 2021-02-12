const mercury = document.querySelector( '#mercury' );
const venus = document.querySelector( '#venus' );
const earth = document.querySelector( '#earth' );
const mars = document.querySelector( '#mars' );
const jupiter = document.querySelector( '#jupiter' );
const saturn = document.querySelector( '#saturn' );
const uranus = document.querySelector( '#uranus' );
const neptune = document.querySelector( '#neptune' );

const mass = document.querySelector( '#mass' );
const radius = document.querySelector( '#radius' );
const velocity = document.querySelector( '#velocity' );

const planet = el => el.querySelector( '.planet' );
const moon = el => el.querySelector( '.moon' );
const orbit = el => el.querySelector( '.orbit' );
const pos = el => el.querySelector( '.pos' );
const ring = el => el.querySelector( '.ring' );

const G = 6.674e-11;
const sol = 333030;
const webCorrection = 32e15;
const GM = G * sol * webCorrection; // G * sol
const timeCorrection = 1e3 / 5;

const rad = ( v, n = 2 ) => {
    const raw = ( GM / ( v ** 2 ) ) ** ( 1 / ( n - 1 ) );
    return ( raw ** ( 1 / ( 2 * ( n - 1 ) ) ) )
};

const race = ( r, n = 2 ) => Math.pow( GM / ( r ** ( n - 1 ) ), 0.5 );
const period = ( v ) => 2 * Math.PI * rad( v ) * timeCorrection / v;

// MOON IS TAKEN AS 1
const planetSize = ( planet, scale ) => ( planet.style.fontSize = ( scale * 1.2 ) + 'em' )

// EARTH IS TAKEN AS 1
const planetOrbit = ( orbit, radi ) => {
    orbit.style.width = ( radi * 2 ) + 'em';
    orbit.style.height = ( radi * 2 ) + 'em';
    orbit.style.marginTop = ( radi * ( -1 ) ) + 'em';
    orbit.style.marginLeft = ( radi * ( -1 ) ) + 'em';
}

// EARTH IS TAKEN AS 1
const planetSpeed = ( plnName, scale ) => {
    plnName.style.animationDuration = ( scale * 12.00021 ) + 's';
    pos( plnName ).style.animationDuration = ( scale * 12.00021 ) + 's';
    planet( plnName ).style.animationDuration = ( scale * 12.00021 ) + 's';
    if ( plnName == 'saturn' ) ring( plnName ).style.animationDuration = ( scale * 12.00021 ) + 's';
}

fetch( './scripts/planets.json' ).then( res => res.json() ).then( r => {
    r.forEach( e => {
        const pln = document.querySelector( '#' + e.name );
        planetSize( planet( pln ), e.size );
        planetOrbit( pln, rad( e.realSpeed * 1e3 ) );
        planetSpeed( pln, e.speed );
    } );
    planetSize( moon( earth ), 1 );
} )

mass.onchange = ( e ) => {
    const chMass = e.target.value;
    console.log( e );
}

radius.onchange = ( e ) => {
    const chRad = e.target.value;
    console.log( e );
}

velocity.onchange = ( e ) => {
    const chVel = e.target.value;

    console.log( e.target.value );
}

console.log( period( 3e4 ) );


// Jupiter 5.20
// Saturn 9.583
// Uranus 19.201
// Neptune 30.048