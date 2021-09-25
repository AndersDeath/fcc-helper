/**
 * DOM Manipulations library
 */

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

export {
    domFromString
}