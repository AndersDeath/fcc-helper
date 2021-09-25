import { FH } from "./FH";
/**
 * FH utility 
 * @author Vladimir Bolshakov <AndersDeath>
 * @version 0.1.0
 */

(() => {
    /**
     * Attach new instance of FH class to window object by FH and FccHelper names
     */
    window['FH'] = window['FccHelper'] = new FH();
})();

