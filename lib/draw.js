// Drawing functions

var svgNS = "http://www.w3.org/2000/svg";

/**
 *
 * @param {Array[]} coords Array of (x,y) coordinate pairs
 * @returns {string} An SVG-readable coordinate string
 * @private
 */
function _coordsToString(coords) {
    var flat = coords.map(function(item) {return item.join(',')});
    return flat.join(' ');

}

/**
 * Merge keys of two objects. If dest has same keys, override.
 * @param dest
 * @param src
 * @private
 */
function _mergeKeys(dest, src) {
    Object.keys(src).forEach(function(key) {
        if (!dest.hasOwnProperty(key)) {
            dest[key] = src[key];
        }
    });
}

/**
 * Set multiple attributes on a namespaces element
 * @private
 */
function _setAttrs(el, options) {
    Object.keys(options).forEach(function(attr) {
        var val = options[attr];
        el.setAttributeNS(null, attr, val);
    })

}

/**
 * Construct an SVG polygon element, where options represent any SVG polygon
 * attribute specs.
 *
 * @param {Array[]} coords
 * @param {Object} options
 */
//TODO :Return value?
function constructPolygon(coords, options) {
    options = options || {};
    var defaults = {
        points: _coordsToString(coords),
        stroke: 'green',
        'stroke-width': 0.05,
        fill: 'transparent',
        transform: 'rotate(180, 0.5, 0.5)'
    };
    // Add defaults to any user-provided options
    _mergeKeys(options, defaults);
    //TODO: Write code to make svg polygon element
    var tri = document.createElementNS(svgNS, 'polygon');
    _setAttrs(tri, options);
    return tri;
}


function createSvgContainer(options) {
    options = options || {};
    var defaults = {
        viewBox: '-1 -1 2 2',
        preserveAspectRatio: 'xMinYMin'
    };
    _mergeKeys(options, defaults);
    // TODO: Write code here

    var el = document.createElementNS(svgNS, 'svg');

    _setAttrs(el, options);
    return el;
}

function drawTriangle(container, coords) {
    var svg = createSvgContainer({width:100,height:400});
    var tri = constructPolygon(coords);
    svg.appendChild(tri);
    container.appendChild(svg);
}