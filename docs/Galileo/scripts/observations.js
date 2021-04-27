let observations = [
    {
        backgrounds: "/Galileo/img/allnight.jpeg",
        Name: "All Night Observations",
        icon: "fas fa-moon",

    },
    {
        backgrounds: "/Galileo/img/stpty.JPG",
        Name: "Star Party",
        icon: "fas fa-sun",

    },
    {
        backgrounds: "/Galileo/img/meteors.jpeg",
        Name: "Meteor Showers",
        icon: "fas fa-meteor",

    },
    {
        backgrounds: "/Galileo/img/bodies.JPG",
        Name: "Celestial Bodies",
        icon: "fas fa-globe-europe",

    }

];


function Obs ( observations ) {
    return `
    <div class="option" style="--optionBackground:url('${ observations.backgrounds }');">
                     <div class="shadow"></div>
                     <div class="label">
                        <div class="icon">
                           <i class="${ observations.icon }"></i>
                        </div>
                        <div class="info">
                           <div class="main">${ observations.Name }</div>

                        </div>
                     </div>
                  </div>
    `

}

document.getElementById( "sessions" ).innerHTML = `
    ${ observations.map( Obs ).join( '' ) }
`