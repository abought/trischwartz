var calc = require('./lib/calc.js');
var draw = require('./lib/draw.js');

module.exports = {
    generateCoords: calc.generateCoords,
    generateAngles: calc.generateAngles,
    scaleCoords: calc.scaleCoords,

    createSvgContainer: draw.createSvgContainer,
    constructRect: draw.constructRect,
    constructPolygon: draw.constructPolygon
};