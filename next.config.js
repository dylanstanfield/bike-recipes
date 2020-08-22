module.exports = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: 'base64-inline-loader'
        })

        // Important: return the modified config
        return config
    },
}