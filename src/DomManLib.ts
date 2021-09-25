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


export {
    domFromString,
    setAttrs,
    appendChilds,
    loadRemoteScriptByUrl,
    loadRemoteStyleByUrl,
    removeElementFromDOM
}