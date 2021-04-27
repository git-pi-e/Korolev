import App from './App.svelte';

let basePage = "Home"
const allowed = [ "Home", "Team", "Observations", "Events", "Projects" ]
if ( allowed.includes( redir ) ) basePage = redir;

export default new App( {
    target: document.getElementsByTagName( 'main' )[ 0 ],
    props: { basePage }
} );