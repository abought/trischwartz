// Tests of drawing functionality

chai.config.truncateThreshold = 0;

describe('_coordsToString', function() {
    it('formats coordinates as an SVG-readable string', function() {
        var res = _coordsToString([[1,2], [3,4], [3.1415, 6.28]]);
        assert.equal(res, '1,2 3,4 3.1415,6.28')
    });

});