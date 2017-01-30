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

    it('generates a right triangle facing right', function() {
        const res = coordHelper(90, 45, 45);
        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000'], ['0.000', '1.000']
        ]);
    });

    it('generates a right triangle facing left', function() {
        const res = coordHelper(45, 90, 45);
        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000'], ['1.000', '1.000']
        ]);
    });

    it('generates an isosceles triangle', function() {
        const res = coordHelper(70, 70, 40);
        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000'], ['0.500', '1.374']
        ]);
    });

    it('generates an obtuse triangle', function() {
        const res = coordHelper(120, 30, 30);
        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000'], ['-0.500', '0.866']
        ]);
    });
});


describe('generateAngles', function() {
    it('generates three angles given none', function() {
        const res = generateAngles();
        assert.lengthOf(res, 3);
        assert.equal(res.reduce(function(a,b) {return a+b}),
            180.0);
    });

    it('generates two angles + uses the one given', function() {
        const res = generateAngles(30);
        assert.lengthOf(res, 3);

        assert.equal(res[0], 30);
        assert.equal(res.reduce(function(a,b) {return a+b}),
            180.0);
    });

    it('No angle can be less than the minimum', function() {
        var minAngle = 25;
        sinon.stub(Math, 'random', function () {return 0;});
        const res = generateAngles(30, minAngle);
        Math.random.restore();

        assert.lengthOf(res, 3);
        assert.equal(res[0], 30);
        assert.equal(res[1], minAngle);
        assert.equal(res.reduce(function(a,b) {return a+b}),
            180.0);
    });

    it('A big angle leaves room for the others', function() {
        var minAngle = 25;
        sinon.stub(Math, 'random', function () {return 0.99999;});
        const res = generateAngles(null, minAngle);
        Math.random.restore();

        assert.lengthOf(res, 3);
        assert.isTrue(res.every(function(item) {return item >= minAngle}));
        assert.equal(res.reduce(function(a,b) {return a+b}),
            180.0);
    });

});


describe('scaleCoords', function() {
    it('scales three coordinates to fit inside a unit square', function() {
        const coords = [
            [0, 0], [1,1], [2,2]
        ];
        const res = scaleCoords(coords);

        assert.deepEqual(res, [
            [0, 0], [.5, .5], [1, 1]
        ]);
    });

    it('translates and scales three coordinates to fit inside a unit square', function() {
        const coords = [
            [-2, -2], [-1, -1], [0, 0]
        ];
        const res = scaleCoords(coords);

        assert.deepEqual(res, [
            [0, 0], [.5, .5], [1, 1]
        ]);
    });

    it('scales three coordinates, preserving aspect ratio', function() {
        const coords = [
            [0, 0], [1, 2], [1, 4]
        ];
        const res = scaleCoords(coords);

        assert.deepEqual(res, [
            [0, 0], [.25, .5], [.25, 1]
        ]);
    });

    it('fits an obtuse triangle into a unit square', function() {
        const coords = [
            [0.000, 0.000], [1.000, 0.000], [-0.500, 0.866]
        ];
        const res = roundHelper(scaleCoords(coords));
        assert.deepEqual(res, [
            ['0.333', '0.000'], ['1.000', '0.000'], ['0.000', '0.577']
        ]);
    });
});