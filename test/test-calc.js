// Tests for coordinate generation
chai.config.truncateThreshold = 0;

function roundHelper(coords) {
    // Round the results to ensure deep comparisons of floating point numbers
    if (typeof coords === "number") {
        return coords.toFixed(3);
    } else {
        return coords.map(roundHelper);
    }
}

describe('generateCoords', function() {
    // Generate coordinates and round results as appropriate
    function coordHelper(ang1, ang2, ang3) {
        return roundHelper(generateCoords(ang1, ang2, ang3));
    }

    it('generates an equilateral triangle', function() {
        const res = coordHelper(60, 60, 60);

        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000'], ['0.500', '0.866']
        ]);
    });

    it('generates a right triangle', function() {
        const res = coordHelper(90, 45, 45);
        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000' ], ['0.000', '1.000']
        ]);
    });

    it('generates an isosceles triangle', function() {
        const res = coordHelper(70, 70, 40);
        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000' ], ['0.500', '1.374']
        ]);
    });

    it('generates an obtuse triangle', function() {
        const res = coordHelper(120, 30, 30);
        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000' ], ['-0.500', '0.866']
        ]);
    });
});


describe('generateAngles', function() {

});


describe('scaleCoords', function() {

});