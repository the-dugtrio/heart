module.exports = {
    plugins: [
        require('postcss-ui-theme')({
            defaultNamespace: 'h',
            customProperties: {
                preserve: false,
                warnings: false
            }
        })
    ]
};
