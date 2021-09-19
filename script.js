/**
 * FH utility 
 * @author Vladimir Bolshakov <AndersDeath>
 * @version 0.0.1
 */

(() => {

    /**
     * Library host url
     */
    const hostUrl = 'https://andersdeath.github.io/fcc-helper/';

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
        return `<div><a class="fh-link" target="${target}" href="${href}">${title}</a></div>`
    }

    /**
     * Load remote JavaScript file by url
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
     * Load remote stylesheet by url
     * @param {String} url remote stylesheet address
     * @param {String} id 
     */
    function loadRemoteStyleByUrl(url, id) {
        const el = document.createElement('link');
        id !== undefined ? el.setAttribute('id', id) : null;
        el.setAttribute('href', url);
        el.setAttribute('rel', 'stylesheet');
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
            this.loadTheme();

            const main = document.createElement('div');
            main.classList.add('fh-main');

            const testsCheckboxDiv = document.createElement('div');
            testsCheckboxDiv.classList.add('fh-tests-checkbox');

            const testsCheckboxInput = document.createElement('input');
            testsCheckboxInput.setAttribute('type', 'checkbox');
            testsCheckboxInput.setAttribute('id', 'fcc-tests');
            testsCheckboxInput.setAttribute('name', 'fcc-tests');
            testsCheckboxInput.setAttribute('value', 'fcc-tests');
            testsCheckboxInput.addEventListener('change', (el) => {
                if(el.target.checked) {
                    this.loadFccTests();
                } else {
                    this.unloadFccTests();
                }
            })
            const testsCheckboxLabel= document.createElement('label');
            testsCheckboxLabel.setAttribute('for', 'fcc-tests');
            testsCheckboxLabel.innerText = 'Show tests'

            linkList.map((el) => {
                main.appendChild(domFromString(createLine(el.title, el.href, el.target)));
            });
            testsCheckboxDiv.appendChild(document.createElement('hr'));
            testsCheckboxDiv.appendChild(testsCheckboxInput);
            testsCheckboxDiv.appendChild(testsCheckboxLabel);
            main.appendChild(testsCheckboxDiv)
            document.querySelector('body').appendChild(main);

        }

        /**
         * Load css theme for utility
         * @param {String} url theme address
         */
        loadTheme(url = 'default') {
            if(url === 'default') {
                const host = window.location.host;
                if(host.indexOf('127.0.0.1') || host.indexOf('localhost')) {
                    loadRemoteStyleByUrl('./fh-default.css');
                } else {
                    loadRemoteStyleByUrl(hostUrl + 'fh-default.css');
                }
            } else {
                loadRemoteStyleByUrl(url);
            }
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

