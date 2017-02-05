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
 * @returns {Element}
 */
function constructPolygon(coords, options) {
    options = options || {};
    var defaults = {
        points: _coordsToString(coords),
        stroke: 'green',
        'stroke-width': 0.05,
        fill: 'transparent',
        transform: 'rotate(180)'
    };
    // Add defaults to any user-provided options
    _mergeKeys(options, defaults);
    var tri = document.createElementNS(svgNS, 'polygon');
    _setAttrs(tri, options);
    return tri;
}

/**
 * Create a rectangle element. Default settings draw a border around the
 * entire SVG viewbox.
 * @param {Object} options
 * @returns {Element}
 */
function constructRect(options) {
    options = options || {};
    var defaults = {
        height: 2,
        width:2,
        x: -1,
        y: -1,
        'stroke-width': 0.05,
        stroke: '#CCCCCC',
        fill: 'transparent'
    };
    _mergeKeys(options, defaults);
    var rect = document.createElementNS(svgNS, 'rect');
    _setAttrs(rect, options);
    return rect;
}

/**
 * Create an SVG element that can be inserted into the page. The default size
 * is large enough to hold any oddly shaped triangle (centered at the origin)
 * whose coordinates were calculated on a unit square
 *
 * @param  {Object} options
 * @returns {Element}
 */
function createSvgContainer(options) {
    options = options || {};
    var defaults = {
        viewBox: '-1 -1 2 2',
        preserveAspectRatio: 'xMinYMin'
    };
    _mergeKeys(options, defaults);
    var el = document.createElementNS(svgNS, 'svg');
    _setAttrs(el, options);
    return el;
}

function drawTriangle(container, coords) {
    var svg = createSvgContainer({width:'100%',height:'100%'});
    var tri = constructPolygon(coords);
    svg.appendChild(tri);
    container.appendChild(svg);
}