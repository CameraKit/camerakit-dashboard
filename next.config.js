const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const webpack = require('webpack');

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const commonsChunkConfig = (config, test = /(?!global)\.css$/) => {
    config.plugins = config.plugins.map(plugin => {
        if (
            plugin.constructor.name === 'CommonsChunkPlugin' &&
            plugin.minChunks != null
        ) {
            const defaultMinChunks = plugin.minChunks;
            plugin.minChunks = (module, count) => {
                if (module.resource && module.resource.match(test)) {
                    return true;
                }
                return defaultMinChunks(module, count);
            };
        }
        return plugin;
    });
    const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
};

module.exports = withImages(withSass({
    cssModules: true,
    webpack: config => {
        config = commonsChunkConfig(config, /\.(sass|scss|css)$/);
        return config;
    },
}));
