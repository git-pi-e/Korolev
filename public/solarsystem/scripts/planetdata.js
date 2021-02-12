( () => {
  const solarsys = document.querySelector( "#solar-system" );
  window.onload = () => {
    document.querySelectorAll( '#data a' ).forEach( e => {
      e.addEventListener( "click", ( ev ) => {
        ev.preventDefault();
        let ref = e.classList.value;
        solarsys.classList.value = ref;
        e.parentElement.classList.toggle( 'active' );
      } );
    } )
  }

  const planets = [
    { Planet: "mercury" },
    { Planet: "venus" },
    {
      Planet: "earth",
      Moon: "moon"
    },
    { Planet: "mars" },
    { Planet: "jupiter" },
    { Planet: "saturn" },
    { Planet: "uranus" },
    { Planet: "neptune" } ];

  const system = ( body ) => `
      <div id="${ body.Planet }" class="orbit">
        <div class="pos">
        ${ body.Moon ? `<div class="orbit"><div class="pos"><div class="${ body.Moon }"></div></div></div>` : '' }
          <div class="planet">
            <dl class="infos">
              <dt>${ body.Planet }</dt>
              <dd><span></span></dd>
            </dl>
          </div>
        </div>
      </div>`
  document.getElementById( "insystem" ).innerHTML = `${ planets.map( system ).join( '' ) } `

  document.getElementById( "planetlist" ).innerHTML += `${ planets.map( body => `<li><a id="button" class="${ body.Planet } blur" title="${ body.Planet }" href="#${ body.Planet }speed">${ body.Planet }</a></li>` ).join( '' ) } `
} )();