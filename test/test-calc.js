// TODO: Test calculation functions

// - Coord gen
describe('testCoords', function() {
    it('generates an equilateral triangle', function() {
        const res = generateCoords(60, 60, 60);
        assert.equal(res,
        [[0,0], [0,1], [0, 0.867]]);
    });
});