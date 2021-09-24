/**
 * FH utility 
 * @author Vladimir Bolshakov <AndersDeath>
 * @version 0.1.0
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
    function loadRemoteStyleByUrl(url, id?) {
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
     * Load default css
     */
    function loadDefaultCss() {
        const host = window.location.host;
        if(host.indexOf('127.0.0.1') || host.indexOf('localhost')) {
            loadRemoteStyleByUrl('./fh-default.css');
        } else {
            loadRemoteStyleByUrl(hostUrl + 'fh-default.css');
        }
    }

    /**
     * Unload FreeCodeCamp tests
     */
    function unloadFccTest() {
        removeElementFromDOM('#fccTest');
        removeElementFromDOM('#fcc_test_suite_wrapper')
    }

    /**
     * 
     * @param {Object} target target DOM object
     * @param {Objcet} attrs object with attrs data
     * @returns 
     */
    function setAttrs(target, attrs) {
        for (let index = 0; index < attrs.length; index++) {
            target.setAttribute(attrs[index].prop, attrs[index].val);
        }
        return target;
    }

    /**
     * 
     * @param {Object} target target DOM object
     * @param {Object} childs object with sequence of childs
     * @returns 
     */
    function appendChilds(target, childs) {
        for (let index = 0; index < childs.length; index++) {
            target.appendChild(childs[index]);
        }
        return target;
    }

    /**
     * FccHelper DOM Elements Builder class
     */
    class ElementsBuilder {
        /**
         * checkbox Input name
         */
        fccTestId = 'fcc-tests';

        /**
         * Checkbox Input attrs
         */
        fccTestAttrs = [
            {
                prop: 'type',
                val: 'checkbox'
            },
            {
                prop: 'id',
                val: this.fccTestId
            }
            ,
            {
                prop: 'name',
                val: this.fccTestId
            },
            {
                prop: 'value',
                val: this.fccTestId
            }
        ];

        /**
         * Build Main Div
         * @returns DOM object
         */
        buildMainDiv() {
            const main = document.createElement('div');
            main.classList.add('fh-main');
            return main;
        }

        /**
         * Build Test checkbox div
         * @returns DOM Object
         */
        buildTestsCheckboxDiv() {
            let testsCheckboxDiv =  document.createElement('div');
            testsCheckboxDiv.classList.add('fh-tests-checkbox');
            return testsCheckboxDiv;
        }

        /**
         * Build test checkbox input
         * @returns DOM Object
         */
        buildTestsCheckboxInput(changeCallback) {
            let testsCheckboxInput = document.createElement('input');
            testsCheckboxInput = setAttrs(testsCheckboxInput, this.fccTestAttrs);
            testsCheckboxInput.addEventListener('change', (el) => {
                changeCallback(el);
            });
            return testsCheckboxInput;
        }

        /**
         * Build trst checkbox label
         * @returns DOM object
         */
        buildTestsCheckboxLabel() {
            const testsCheckboxLabel= document.createElement('label');
            testsCheckboxLabel.setAttribute('for', 'fcc-tests');
            testsCheckboxLabel.innerText = 'Show tests';
            return testsCheckboxLabel;
        }

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

            const elementsBuilder = new ElementsBuilder();
            this.loadTheme();

            const main = elementsBuilder.buildMainDiv()
            let testsCheckboxDiv = elementsBuilder.buildTestsCheckboxDiv(); 
            let testsCheckboxInput = elementsBuilder.buildTestsCheckboxInput((el) => {
                if(el.target.checked) {
                    this.loadFccTests();
                } else {
                    this.unloadFccTests();
                }
            });
            const testsCheckboxLabel= elementsBuilder.buildTestsCheckboxLabel();

            linkList.map((el) => {
                main.appendChild(domFromString(createLine(el.title, el.href, el.target)));
            });
            main.appendChild(document.createElement('hr'));
            testsCheckboxDiv = appendChilds(testsCheckboxDiv, [
                testsCheckboxInput,
                testsCheckboxLabel
            ]);
            main.appendChild(testsCheckboxDiv)
            document.querySelector('body').appendChild(main);
        }

        /**
         * Load css theme for utility
         * @param {String} url theme address
         */
        loadTheme(url = 'default') {
            if(url === 'default') {
                loadDefaultCss();
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
    window['FH'] = window['FccHelper'] = new FH();
})();

