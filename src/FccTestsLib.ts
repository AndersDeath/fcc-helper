import { loadRemoteScriptByUrl, loadRemoteStyleByUrl, removeElementFromDOM } from './DomManLib';
import { hostUrl } from './constants';
import { LIB_VERSION } from './version';

/**
  * 
  * @param {String} title Link title
  * @param {String} href link url
  * @param {String} target A tag target attribute value
  * @returns {String}
  */
function createLine(title, href, target = '_self') {
    return `<div><a class="fh-link" target="${target}" href="${href}">${title}</a></div>`
}

/**
 * Load FreeCodeCamp tests
 */
function loadFccTests() {
    loadRemoteScriptByUrl('https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js', 'fccTest');
}

/**
 * Load default css
 */
function loadDefaultCss() {
    const host = window.location.host;
    if (host.indexOf('127.0.0.1') || host.indexOf('localhost')) {
        loadRemoteStyleByUrl(`./fh-default.css`);
    } else {
        loadRemoteStyleByUrl(hostUrl + `fh-default-${LIB_VERSION}.css`);
    }
}

/**
 * Unload FreeCodeCamp tests
 */
function unloadFccTest() {
    removeElementFromDOM('#fccTest');
    removeElementFromDOM('#fcc_test_suite_wrapper')
}

export {
    createLine,
    loadFccTests,
    loadDefaultCss,
    unloadFccTest
}