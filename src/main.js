import App from './App.svelte';

//  INITIALIZERS 
const starFieldWidth = window.innerWidth * 2, starFieldHeight = window.innerHeight * 2,
	starField = document.getElementById( "star-field" ),
	starLens = document.getElementById( "star-lens" ),
	starSpace = document.getElementById( "star-space" ), density = 2 * ( starFieldHeight * starFieldWidth ) ** 0.25;

for ( let i = 0;i < 2 * density;i++ ) {
	var star = document.createElement( "div" );
	star.className = "star near";
	star.style.top = Math.floor( Math.random() * starFieldHeight + 1 ) + "px";
	star.style.left = Math.floor( Math.random() * starFieldWidth + 1 ) + "px";
	starField.appendChild( star );
}

for ( let i = 0;i < 3 * density;i++ ) {
	var star = document.createElement( "div" );
	star.className = "star far";
	star.style.top = Math.floor( Math.random() * starFieldHeight + 1 ) + "px";
	star.style.left = Math.floor( Math.random() * starFieldWidth + 1 ) + "px";
	starSpace.appendChild( star );
}

for ( let i = 0;i < 4 * density;i++ ) {
	var star = document.createElement( "div" );
	star.className = "star semistat";
	star.style.top = Math.floor( Math.random() * starFieldHeight + 1 ) + "px";
	star.style.left = Math.floor( Math.random() * starFieldWidth + 1 ) + "px";
	starLens.appendChild( star );
}

const app = new App( { target: document.getElementsByTagName( 'main' )[ 0 ] } );

export default app;