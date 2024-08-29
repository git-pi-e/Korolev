links = JSON.parse( '{"web": {"educelestia": "http://edu.sedscelestia.org/","sedsc": "http://sedscelestia.org","sedsi": "https://sedsindia.org","sedse": "http://sedsearth.org"},"social": {"ig": "https://instagr.am/sedscelestia/","fb": "https://facebook.com/celestiaclub","git": "https://github.com/SEDSCelestiaBPGC","lin": "https://linkedin.com/company/seds-celestia/"},"content": {"blog": "https://bitsgcelestia.wordpress.com","yt": "https://youtube.com/channel/UCuZ1RL7Qv5tKaQeWy28qhUw","spotify": "https://open.spotify.com/show/0NKbVLI7LpY6069IUCF6xi?si=nybrolgSQ5u2LoWEkm3U1A&nd=1","radiopub": "https://radiopublic.com/celestia-onair-WeRp1J","gpods": "https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy80NWYzZjAwOC9wb2RjYXN0L3Jzcw==","pocketcast": "https://pca.st/b3mqu7bk","breaker": "https://breaker.audio/celestia-on-air"}}' );

const redir = window.location.href.split( '#' )[ 1 ] || null;
if ( links.social[ redir ] ) window.location.href = links.social[ redir ];
// MAIN
const //
    starFieldWidth = window.innerWidth * 2,
    starFieldHeight = window.innerHeight * 2,
    starField = document.getElementById( "star-field" ),
    starSpace = document.getElementById( "star-space" ),
    density = 2 * ( starFieldHeight * starFieldWidth ) ** 0.25;

createRandomNodes( density, 1.5, starFieldWidth, starFieldHeight, starSpace );
if ( window.innerWidth > 600 ) createRandomNodes( density, 2, starFieldWidth, starFieldHeight, starField );

function createRandomNodes ( num, radius, xMax, yMax, canvas ) {
    canvas.width = xMax;
    canvas.height = yMax;
    let ctx = canvas.getContext( "2d" );
    ctx.clearRect( 0, 0, xMax, yMax );
    for ( let i = 0;i <= num;i++ ) {
        ctx.beginPath();
        let rand_x = Math.random( i ) * xMax; let rand_y = Math.random( i ) * yMax;
        ctx.arc( rand_x, rand_y, radius, 0, 2 * Math.PI );
        ctx.fillStyle = "#fff"; ctx.fill();
        ctx.closePath();
    }
    return 0;
}