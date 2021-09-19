/**
 * FH utility 
 * @author Vladimir Bolshakov <AndersDeath>
 * @version 0.0.1
 */

(() => {

    /**
     * 
     * @param {String} html  html string
     * @returns {Object} DOM element
     */
    function domFromString(html) {
        const container = document.createElement('template');
        container.innerHTML = html.trim();
        return container.content.firstChild;
    }

    /**
     * 
     * @param {String} title Link title
     * @param {String} href link url
     * @param {String} target A tag target attribute value
     * @returns {String}
     */
    function createLine(title, href, target = '_self') {
        return `<div><a 
            style="
                color: #000;
            "
        target="${target}" href="${href}">${title}</a></div>`
    }

    /**
     * 
     * @param {String} url remote script address
     * @param {String} id script tag id
     */
    function loadRemoteScriptByUrl(url, id) {
        const el = document.createElement('script');
        id !== undefined ? el.setAttribute('id', id) : null;
        el.setAttribute('src', url);
        document.body.appendChild(el);
    }

    /**
     * Remove element from DOM by querySelector parameter
     * @param {String} query querySelector parameter
     */
    function removeElementFromDOM(query) {
        const el = document.querySelector(query);
        el.parentNode.removeChild(el)
    }

    /**
     * Load FreeCodeCamp tests
     */
    function loadFccTests() {
        loadRemoteScriptByUrl('https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js', 'fccTest');
    }

    /**
     * Unload FreeCodeCamp tests
     */
    function unloadFccTest() {
        removeElementFromDOM('#fccTest');
        removeElementFromDOM('#fcc_test_suite_wrapper')
    }

    /**
     * FreeCodeCamp Helper Class
     */
    class FH {

        /**
         * Initialization of Link list that you want to show in helper
         * @param {Object} linkList link list
         */
        init(linkList) {
            let output = `<div
            style="
                position: fixed;
                top: 0;
                z-index: 99;
                right: 0;
                background: #fff;
                border: 1px solid #000;
                padding: 10px;
            "
            >`;
            linkList.forEach((el) => {
                output += createLine(el.title, el.href, el.target)
            });
            output += "</div>";
            document.querySelector('body').appendChild(domFromString(output));
        }

        /**
         * Load FreeCodeCamp Tests
         */
        loadFccTests() {
            loadFccTests();
        }

        /**
         * Unload FreeCodeCamp Tests
         */
        unloadFccTests() {
            unloadFccTest();
        }
    }
    /**
     * Attach new instance of FH class to window object by FH and FccHelper names
     */
    window.FH = window.FccHelper = new FH();
})();

