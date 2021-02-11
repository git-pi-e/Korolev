const mercury = document.querySelector( '#mercury' );
const venus = document.querySelector( '#venus' );
const earth = document.querySelector( '#earth' );
const mars = document.querySelector( '#mars' );
const jupiter = document.querySelector( '#jupiter' );
const saturn = document.querySelector( '#saturn' );
const uranus = document.querySelector( '#uranus' );
const neptune = document.querySelector( '#neptune' );

const planet = el => el.querySelector( '.planet' );
const moon = el => el.querySelector( '.moon' );
const orbit = el => el.querySelector( '.orbit' );
const pos = el => el.querySelector( '.pos' );
const ring = el => el.querySelector( '.ring' );

// MOON IS TAKEN AS 1
const planetSize = ( planet, scale ) => ( planet.style.fontSize = ( scale * 1.2 ) + 'em' )

// EARTH IS TAKEN AS 1
const planetOrbit = ( orbit, scale ) => {
    orbit.style.width = ( scale * 56 ) + 'em';
    orbit.style.height = ( scale * 56 ) + 'em';
    orbit.style.marginTop = ( scale * ( -28 ) ) + 'em';
    orbit.style.marginLeft = ( scale * ( -28 ) ) + 'em';
}

// EARTH IS TAKEN AS 1
const planetSpeed = ( plnName, scale ) => {
    plnName.style.animationDuration = ( scale * 12.00021 ) + 's';
    pos( plnName ).style.animationDuration = ( scale * 12.00021 ) + 's';
    planet( plnName ).style.animationDuration = ( scale * 12.00021 ) + 's';
    if ( plnName == 'saturn' ) ring( plnName ).style.animationDuration = ( scale * 12.00021 ) + 's';
}

planetSize( planet( mercury ), 1.25 );
planetSize( planet( venus ), 3.1 );
planetSize( planet( earth ), 3.267 );
planetSize( moon( earth ), 1 );
planetSize( planet( mars ), 2.41 );
planetSize( planet( jupiter ), 10 );
planetSize( planet( saturn ), 9 );
planetSize( planet( uranus ), 3.9 );
planetSize( planet( neptune ), 4.083 );

planetOrbit( mercury, 0.57 );
planetOrbit( venus, 0.71 );
planetOrbit( earth, 1 );
planetOrbit( mars, 1.29 );
planetOrbit( jupiter, 1.79 );
planetOrbit( saturn, 2.68 );
planetOrbit( uranus, 3.32 );
planetOrbit( neptune, 3.75 );

planetSpeed( mercury, 0.241 );
planetSpeed( venus, 0.6152 );
planetSpeed( earth, 1 );
planetSpeed( mars, 1.881 );
planetSpeed( jupiter, 11.863 );
planetSpeed( saturn, 29.447 );
planetSpeed( uranus, 84.017 );
planetSpeed( neptune, 164.791 );