module.exports = {
    bundle: {
        'trischwartz.min': {
            scripts: [
                './lib/calc.js',
                './lib/draw.js'
            ],
            options: {
                rev: false,
                maps: false
            }
        },
        'trischwartz': {
            scripts: [
                './lib/*.js'
            ],
            options: {
                uglify: false,
                rev: false,
                maps: false
            }
        }
    }
};