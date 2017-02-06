/**
 * Calculate the coordinates for a triangle give two angles and assuming a
 * base of unit length. Angles are specified for the vertices according to the
 * diagram below. Vertex 1 is assumed to be at (0,1), and for a base of unit
 * length, vertex 2 is assumed to be at (1,0)
 *         3
 *
 *     1      2
 *
 * @param {number} angle1 The angle at vertex 1, in degrees.
 * @param {number} angle2 The angle at vertex 2, in degrees
 * @param {number} [angle3 = 180-angle1-angle2] The angle at vertex 3, in degrees.
 * @returns {Array[]} An array containing the (x,y) coordinate pairs for each
 *   of the three vertices
 */
function generateCoords(angle1, angle2, angle3) {
    angle3 = angle3 || (180 - angle1 - angle2);

    var angles = [angle1, angle2, angle3];

    var a1r, a2r, a3r;
    var radians = angles.map(function(val) {return val * Math.PI / 180.0});
    a1r = radians[0];
    a2r = radians[1];
    a3r = radians[2];

    if ((angle1 + angle2 + angle3) !== 180 ) {
        throw 'Angles must add up to 180';
    }
    angles.forEach(function(value) {
        if (value < 0 || value > 180) {
            throw 'Specified angle is out of bounds';
        }
    });


    // Length of the base (side 3)- for now not configurable
    var baseLength = 1.0;
    // length of side B (vertex 1-->3), derived using law of sines
    var lengthB = Math.sin(a2r) / Math.sin(a3r) * baseLength;
    // Derive coordinates by projecting this length onto the base of the triangle
    var x3 = Math.cos(a1r) * lengthB;
    var y3 = Math.sin(a1r) * lengthB;

    return [
        [0, 0],
        [baseLength, 0],
        [x3, y3]];
}

/**
 * Scale coordinates so that largest side is of unit length, and
 * center of geometry is at 0,0
 * @param {Array[]} coords Array of (x,y) coordinates
 */
function scaleCoords(coords) {
    var xmin, xmax, ymin, ymax;
    var xc = coords.map(function(item) {return item[0]});
    var yc = coords.map(function(item) {return item[1]});

    xmin = Math.min.apply(Math, xc);
    xmax = Math.max.apply(Math, xc);
    ymin = Math.min.apply(Math, yc);
    ymax = Math.max.apply(Math, yc);

    var xr = xmax - xmin;
    var yr = ymax - ymin;

    // Scale both axes by same factor to preserve perspective
    var scale = 1 / Math.max(xr, yr);

    // Center of geometry
    var xshift = (xmax + xmin) / 2;
    var yshift = (ymax + ymin) / 2;

    return coords.map(function(item) {
        return [
            (item[0] - xshift) * scale,
            (item[1] - yshift) * scale
        ];
    });
}

/**
 * Generate angles for a triangle
 * @param {number} [angle1 = random] If one angle is provided (in deg), use this as a constraint and generate the others
 * @param {number} [minAngle = 15] Specify the minimum possible angle allowed. This can be used to ensure that the
 *   triangle isn't too narrow or weird looking.
 * @returns {number[]} An array of three angles that add up to 180
 *
 */
function generateAngles(angle1, minAngle) {
    minAngle = minAngle || 15;
    // Make sure that no angle gets too big to squeeze out the others
    var remaining = 180 - (angle1||minAngle) - minAngle;
    var angles = angle1 ? [angle1] : [];

    while (angles.length < 2) {
        // Generate any angle in the range (min...max)
        var newAngle = Math.random() * (remaining - minAngle) + minAngle;
        angles.push(newAngle);
        // Remaining should reflect the new angle, not the arbitrary space reserved
        remaining -= newAngle;
        remaining += minAngle
    }
    // angle 3 is whatever was left by definition
    var angle3 = 180 - (angles[0] + angles[1]);
    angles.push(angle3);

    return angles;
}

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
