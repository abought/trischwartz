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
            ['0.000', '0.000'], ['1.000', '0.000' ], ['0.000', '1.000']
        ]);
    });

    it('generates a right triangle facing left', function() {
        const res = coordHelper(45, 90, 45);
        assert.deepEqual(res, [
            ['0.000', '0.000'], ['1.000', '0.000' ], ['1.000', '1.000']
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
        sinon.stub(Math, 'random', function () {return 0;});
        const res = generateAngles(30, 25);
        Math.random.restore();

        assert.lengthOf(res, 3);

        assert.equal(res[0], 30);
        assert.equal(res[1], 25);
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

});