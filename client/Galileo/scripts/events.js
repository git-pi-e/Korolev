const events = [
      {
      class:"undefined",
      color:"night",
      daticon:"12",
      title:"Perseids Meteor Shower",
      date:"12<sup> th</sup> &amp; 13<sup> th</sup> August, All Night",
      text:"The annual Perseid meteor shower — one of the most highly anticipated meteor showers of the year — peaked overnight on Aug. 12-13. Despite the fact that bright light from a nearly-full moon obstructed the view of fainter meteors this year, skywatchers were still treated to an incredible show with up to dozens of meteors streaking through the sky every hour."
      },
      {
      class:"timeline-inverted",
      color:"green",
      daticon:"1-7",
      title:"Pre-induction Lectures",
      date:"1<sup>st</sup> Week of September",
      text:"Lec 1: Akash and Atharva<br>Lec 2: Avdhoot and Harshvardhan<br>Lec 3: On campus Lecturer Confirmed! by Aditya Majali"
      },
      {
      class:"undefined",
      color:"night",
      daticon:"9",
      title:"Neptune",
      date:"9<sup> th</sup> September",
      text:"Best time to view Neptune."
      },
      {
      class:"timeline-inverted",
      color:"night",
      daticon:"27",
      title:"Uranus",
      date:"27<sup> th</sup> October",
      text:"Best time to view Uranus."
      },
      {
      class:"undefined",
      color:"red",
      daticon:"9-10",
      title:"Storming Aurora",
      date:"9<sup> th</sup> & 10<sup> th</sup> November",
      text:"Fault in our Physics <br> Schrodinger's Cat and Einstein's Space-Time"
      },
      {
      class:"timeline-inverted",
      color:"yellow",
      daticon:"11",
      title:"Mercury transits Sun",
      date:"11<sup> th</sup> November",
      text:"Unsure if can be seen from India. Solar Filter is a must."
      },
      {
      class:"undefined",
      color:"yellow",
      daticon:"24",
      title:"Conjunction of Venus and Jupiter",
      date:"24<sup> th</sup> November",
      text:""
      },
      {
      class:"timeline-inverted",
      color:"sky",
      daticon:"13",
      title:"Geminids",
      date:"13<sup>th</sup> December",
      text:"The most prominent meteor shower of the year."
      },
      {
      class:"undefined",
      color:"night",
      daticon:"10",
      title:"Penumbral Lunar Exlipse",
      date:"10<sup>th</sup> January",
      text:""
      },
      {
      class:"timeline-inverted",
      color:"night",
      daticon:"1-3",
      title:"Quark",
      date:"1-3<sup>rd</sup> Feb",
      text:"Uniwars<br>Planetarium"
      },
      {
      class:"undefined",
      color:"red",
      daticon:"22",
      title:"Start Party",
      date:"22<sup>nd</sup> February",
      text:""
      },
      {
      class:"timeline-inverted",
      color:"yellow",
      daticon:"24",
      title:"Mercury, Venus",
      date:"24<sup>th</sup> March",
      text:"Best viewing time for Mercury and Venus."
      },
      {
      class:"undefined",
      color:"sky",
      daticon:"6/7",
      title:"Eta Aquarids Shower",
      date:"6/7<sup>th</sup> March",
      text:"Better than average, 60 meteors/hr."
      }
    ];

function list(body){
      return `
      <li class="${body.class}">
         <div class="timeline-badge ${body.color}"><h2>${body.daticon}</h2></div>
         <div class="timeline-panel">
           <div class="timeline-heading">
             <h4 class="timeline-title">${body.title}</h4>
             <p style="color:rgba(200,200,200, 0.9)"><i class="glyphicon glyphicon-time"></i>${body.date}</p>
           </div>
           <div class="timeline-body">
             <p>${body.text}</p>
           </div>
         </div>
       </li>
      `
  
  }

document.getElementById("timeline").innerHTML = `
    ${events.map(list).join('')}
`