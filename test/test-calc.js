// Tests for coordinate generation
chai.config.truncateThreshold = 0;
describe('generateCoords', function() {
    it('generates an equilateral triangle', function() {
        const res = generateCoords(60, 60, 60);

        // TODO: Floating point equality, can be improved
        assert.deepEqual(res, [
            [0,0], [1,0], [0.5000000000000001, 0.8660254037844386]
        ]);
    });
});


describe('generateAngles', function() {

});


describe('scaleCoords', function() {

});