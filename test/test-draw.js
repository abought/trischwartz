// Tests of drawing functionality

chai.config.truncateThreshold = 0;

describe('_coordsToString', function() {
    it('formats coordinates as an SVG-readable string', function() {
        var res = _coordsToString([[1,2], [3,4], [3.1415, 6.28]]);
        assert.equal(res, '1,2 3,4 3.1415,6.28')
    });
});

describe('createSvgContainer', function() {
    it('returns an element with default options', function() {
        var el = createSvgContainer();
        assert.equal(el.tagName, 'svg');
        assert.equal(el.childNodes.length, 0);
        assert.equal(el.getAttributeNS(null, 'viewBox'), '-1 -1 2 2')
    });

    it('options can be overridden', function() {
        var el = createSvgContainer({viewBox: '0 0 1 1'});
        assert.equal(el.tagName, 'svg');
        assert.equal(el.getAttributeNS(null, 'viewBox'), '0 0 1 1')
    })
});

describe('constructRect', function() {
    it('returns an element with default options', function() {
        var el = constructRect();
        assert.equal(el.tagName, 'rect');
        assert.equal(el.getAttributeNS(null, 'x'), -1)
    });
});

describe('constructPolygon', function() {
    it('returns an element with default options', function() {
        var coords = [[0,0], [1,0], [0.5, 1]];
        var el = constructPolygon(coords);

        var expectedCoords = _coordsToString(coords);
        assert.equal(el.tagName, 'polygon');
        assert.equal(el.getAttributeNS(null, 'points'), expectedCoords);
    });

    it('allows some options to be overridden', function () {
        var coords = [[0,0], [1,0], [0.5, 1]];
        var el = constructPolygon(coords, {stroke: 'red'});
        assert.equal(el.getAttributeNS(null, 'stroke'), 'red');
    });
});