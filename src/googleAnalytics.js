import ReactGA from 'react-ga';
const TRACKING_ID = "G-XZ6CDB395M"; // YOUR_OWN_TRACKING_ID

console.log('Google analytics initialised');
export default ReactGA.initialize('G-XZ6CDB395M', {
    debug: false,
    titleCase: false,
});