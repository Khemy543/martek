import ReactGA from 'react-ga';
import { createBrowserHistory } from "history";

const TRACKING_ID = "G-XZ6CDB395M"; // YOUR_OWN_TRACKING_ID

console.log('Google analytics initialised');
ReactGA.initialize(TRACKING_ID, {
    debug: true,
    titleCase: false,
});

//ReactGA.ga('set', 'checkProtocolTask', null);

const history = createBrowserHistory();

history.listen(location => {
    ReactGA.set({page : location.pathname});
    ReactGA.pageview(location.pathname);
})

export default history;