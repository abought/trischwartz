/**
 * Calculate the coordinates for a triangle give two angles and assuming a
 * base of unit length. Angles are specified for the vertices according to the
 * diagram below.
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
function generateTriangle(angle1, angle2, angle3) {
    angle3 = angle3 || (180 - angle1 - angle2);

    var angles = [angle1, angle2, angle3];

    var a1r, a2r, a3r;
    [a1r, a2r, a3r] = angles.map(function(val) {return val * Math.PI / 180.0});

    if ((angle1 + angle2 + angle3) !== 180 ) {
        throw 'Angles must add up to 180';
    }
    angles.forEach(function(value) {
        if (value < 0 || value > 180) {
            throw 'Specified angle is out of bounds';
        }
    });

    // length of side B (1-->3) = sine(angle2) / sine(angle3)
    var length = Math.sin(a2r) / Math.sin(a3r);
    // Derive coordinates by projecting this length onto the base of the triangle
    var x3 = Math.cos(a1r) * length;
    var y3 = Math.sin(a1r) * length;

    return [
        [0, 0],
        [1,0],
        [x3, y3]];
}

module.exports = {
    generateTriangle: generateTriangle
};