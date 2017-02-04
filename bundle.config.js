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
        }
    }
};