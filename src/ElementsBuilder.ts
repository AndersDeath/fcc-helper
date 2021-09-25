import { setAttrs } from "./DomManLib";

/**
 * FccHelper DOM Elements Builder class
 */
 export class ElementsBuilder {
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
