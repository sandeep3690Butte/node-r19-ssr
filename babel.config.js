module.exports = function (api) {
    const isServer = api.caller(caller => caller && caller.target === 'node'); 
    return { 
        presets: [ 
            ['@babel/preset-env', 
                { targets: isServer ? { node: '18' } : { browsers: ['last 2 versions'] }, 
                modules: false, 
                useBuiltIns: 'usage', 
                corejs: 3 
                } 
            ], 
            '@babel/preset-react', 
            '@babel/preset-typescript' 
        ], 
        plugins: [ 
            '@loadable/babel-plugin', 
            '@babel/plugin-syntax-dynamic-import', 
            '@babel/plugin-transform-runtime', 
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            ["@babel/plugin-proposal-private-methods", { loose: true }],
            ["@babel/plugin-proposal-private-property-in-object", { loose: true }]
        ] 
    }; 
};