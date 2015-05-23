var webpack = require('webpack');

module.exports = {
	context: __dirname + '/js',

	entry: [
	  // 'webpack-dev-server/client?http://0.0.0.0:2999', // WebpackDevServer host and port
	  // 'webpack/hot/only-dev-server',
	  './App.js'
	],

	output: {
		filename: 'bundle.js',
		path: __dirname
	},

	module: {
		loaders: [
			{
				test:/\.js.?/,
				loaders: [
					// 'react-hot',
					'jsx-loader?insertPragma=React.DOM&harmony'
				]
			}
		]
	},

	plugins: [
		// new webpack.optimize.UglifyJsPlugin()
	// 	new webpack.HotModuleReplacementPlugin(),
	// 	new webpack.NoErrorsPlugin()
	],

	resolve: {
		modulesDirectories: ['components','utility','../node_modules']
	},

	devtool: 'cheap-source-map'
}