'use strict';

var styles = {};

styles.hidden = {
	display: 'none'
};

styles.visible = {
	display: 'inherit'
};

styles.spaceBelow = {
	marginBottom: '15px',
}

styles.block = {
	display: 'block'
}

styles.hiddenIf = function (condition) {
	return condition ? styles.hidden : styles.visible;
}

styles.visibleIf = function(condition) {
	return condition ? styles.visible : styles.hidden;
}



module.exports = styles;