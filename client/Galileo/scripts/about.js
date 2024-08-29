let coordinators = [
    {
        Name: "Hrutwick Sawant",
        post: "President",
    },
    {
        Name: "Harshvardhan Chandirasekar",
        post: "Vice President",
    },
    {
        Name: "Paurush Punyasheel",
        post: "Secretary",
    },
    {
        Name: "Bhuvan S V",
        post: "Head of Lectures",
    },
    {
        Name: "Ankit Verma",
        post: "Head of Projects",
    },
    {
        Name: "Murudkar Kaustubh Mandar",
        post: "Head of Observations",
    },
    {
        Name: "Shirin Kaushik",
        post: "Vice President <br> SEDS India",
    },
    {
        Name: "Aditya Majali",
        post: "Treasurer <br> SEDS India",
    },
    {
        Name: "Dhruv Nagpal",
        post: "Projects Head <br> SEDS India",
    }

];


function Obs ( coordinators ) {
    return `
    <div class="card">
        <h3 class="title">${ coordinators.Name }</h3>
        <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar"></div>
        </div>
        <h4 class="position">${ coordinators.post }</h4>
    </div>
    `
}

document.getElementById( "cordis" ).innerHTML = `
    ${ coordinators.map( Obs ).join( '' ) }
`