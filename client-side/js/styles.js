'use strict';
var _ = require('./_.js')

var styles = {};

styles.hidden = {
	display: 'none'
};

styles.bold = {
	fontWeight: '900'
}

styles.visible = {
	display: 'inherit'
};

styles.spaceBelow = {
	marginBottom: 15
}

styles.block = {
	display: 'block'
}

styles.indented = {
	marginLeft: 10
}

styles.hiddenIf = function (condition) {
	return condition ? styles.hidden : styles.visible;
}

styles.visibleIf = function(condition) {
	return condition ? styles.visible : styles.hidden;
}

styles.mix = _.assign;



module.exports = styles;