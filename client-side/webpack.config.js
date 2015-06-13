var webpack = require('webpack');

module.exports = {
	context: __dirname + '/js',

	entry: [
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
					'jsx-loader?insertPragma=React.DOM&harmony'
				]
			}
		]
	},

	resolve: {
		modulesDirectories: ['components','utility','../node_modules']
	},

	devtool: 'cheap-source-map'
}