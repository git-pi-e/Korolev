const planets = [
      {
    Planet:"mercury"
  },
{
      Planet:"venus"
    },
{
      Planet:"earth",
      Moon: "moon"
    },
{
      Planet:"mars"
    },
{
      Planet:"jupiter"
    },
{
      Planet:"saturn"
    },
{
      Planet:"uranus"
    },
{
      Planet:"neptune"
    }];

function system(body){
      return `
      <div id="${body.Planet}" class="orbit">
            <div class="pos">
              <div class="orbit">
                <div class="pos">
                  <div class="${body.Moon}"></div>
                </div>
              </div>
              <div class="planet">
                <dl class="infos">
                  <dt>${body.Planet}</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
      </div>
    `

  }

document.getElementById("insystem").innerHTML = `
    ${planets.map(system).join('')}
`

function dataz(body){
      return `
      <li><a id="button" class="${body.Planet}" title="${body.Planet}" href="#${body.Planet}speed">${body.Planet}</a></li>
      `

}

document.getElementById("planetlist").innerHTML = `
    ${planets.map(dataz).join('')}
`
