import {
    domFromString,
    appendChilds,
    loadRemoteStyleByUrl,
} from "./DomManLib";

import { ElementsBuilder } from './ElementsBuilder';

import {
    createLine,
    loadDefaultCss,
    loadFccTests,
    unloadFccTest

} from './FccTestsLib';

/**
 * FreeCodeCamp Helper Class
 */
export class FH {

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
            if (el.target.checked) {
                this.loadFccTests();
            } else {
                this.unloadFccTests();
            }
        });
        const testsCheckboxLabel = elementsBuilder.buildTestsCheckboxLabel();

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
        if (url === 'default') {
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