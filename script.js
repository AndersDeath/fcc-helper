
function domFromString(html) {
    const container = document.createElement('template');
    container.innerHTML = html.trim();
    return container.content.firstChild;
}


function createLine(title, href, target = '_self') {
    return `<div><a 
        style="
            color: #000;
        "
    target="${target}" href="${href}">${title}</a></div>`
}


function fccHelper(linkList) {
    console.log(linkList)
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
    output +="</div>";
    document.querySelector('body').appendChild(domFromString(output));
}


window.fccHelper = fccHelper;