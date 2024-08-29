Nav = `
<div id="mySidebar" class="sidebar">
  <div id="background" style="">
  </div>
  <a style="width: 0%;" href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="/Galileo/index.html">Index</a>
  <a href="/Galileo/events.html">Events</a>
  <a href="/Galileo/observations.html">Observations</a>
  <a href="/Galileo/talks.html">Talks</a>
  <a href="/Galileo/projects.html">Projects</a>
  <a href="/Galileo/about.html">About</a>
</div>
<div id="main">
  <button style="font-size: 20px;  cursor: pointer;  background-color: rgba(255, 0, 0, 0);  color: white;  padding: 10px 15px;  border: none;" class="openbtn" onclick="openNav()">&#9776;</button>
</div>
`

document.getElementById( "nav-barr" ).innerHTML = Nav;
document.getElementById( "footer" ).innerHTML = `<p style="padding:5px;">© 2020 Copyright: Footer</p>`;

function openNav () {
  var x = window.matchMedia( "(max-width: 768px)" )
  document.getElementById( "mySidebar" ).style.width = x.matches ? "100%" : "250px";
  document.getElementById( "main" ).style.marginLeft = "250px";
  document.getElementById( "data" ).style.marginLeft = "150px";
}

function closeNav () {
  document.getElementById( "mySidebar" ).style.width = "1px";
  document.getElementById( "main" ).style.marginLeft = "0";
  document.getElementById( "data" ).style.marginLeft = "0";
}
