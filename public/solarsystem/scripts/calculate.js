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

// MOON IS TAKEN AS 1
const planetSize = ( planet, scale ) => ( planet.style.fontSize = ( scale * 1.2 ) + 'em' )

// EARTH IS TAKEN AS 1
const planetOrbit = ( orbit, scale ) => {
    orbit.style.width = ( scale * 3 ) + 'em';
    orbit.style.height = ( scale * 3 ) + 'em';
    orbit.style.marginTop = ( scale * 1.5 ) + 'em';
    orbit.style.marginLeft = ( scale * 1.5 ) + 'em';
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