module.exports = {
    bundle: {
        'trischwartz.min': {
            scripts: [
                './lib/calc.js'
            ],
            options: {
                rev: false,
                maps: false
            }
        }
    }
};