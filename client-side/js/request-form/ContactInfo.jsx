'use strict';
var React  = require('react');

var Email    = require('./Email.jsx');
var Password = require('./Password.jsx');
var Phone    = require('./Phone.jsx');
var styles   = require('../styles.js');
var Input    = require('../components/Input.jsx');
var SegmentedControl = require('../components/SegmentedControl.jsx');

var ContactInfo = React.createClass({

	getInitialState: function () {
		return {
			creatingAccount: false,
			contactMethod: 'none'
		}
	},

	getContactMethod: function () {return this.state.contactMethod},
	getEmail:         function () {return this.refs.email.getEmail()},
	getPhoneNumber:   function () {return this.refs.phone.getPhoneNumber()},
	getName:          function () {return this.refs.name.value()},
	getPassword:      function () {return this.refs.password.getPassword()},

    toggleAccountCreation: function () {
        this.setState({creatingAccount:!this.state.creatingAccount});
    },

    componentWillReceiveProps: function (newProps) {
    	if (!isUndefined(newProps.user.contact_method)) {
	    	this.setState({
	    		contactMethod: newProps.user.contact_method
	    	});
    	}
    },

    methodChanged: function (id, event) {
    	debugger;
    	this.setState({
    		contactMethod: id
    	});
    },

	render: function () {
		var nameStyle, passwordStyle, emailStyle, phoneStyle, accountCreationStyle

		passwordStyle = styles.visibleIf(this.state.creatingAccount === true && this.state.contactMethod !== 'none');
		nameStyle     = styles.hiddenIf(this.state.contactMethod === 'none');
		emailStyle    = styles.visibleIf(this.state.contactMethod === 'email');
		phoneStyle    = styles.visibleIf(this.state.contactMethod === 'text' || this.state.contactMethod === 'phone');
		
		if (this.state.contactMethod === 'none') {
			accountCreationStyle = styles.hidden;
		} else  {
			accountCreationStyle = styles.hiddenIf(this.props.user.loggedIn);
		}

		var activeClass   = 'btn btn-primary active';
		var inactiveClass = 'btn btn-primary';

		var buttonData = [
			{id: 'none',  label: 'No thanks'},
			{id: 'email', label: 'Email'},
			{id: 'text',  label: 'Text/SMS'},
			{id: 'phone', label: 'Phone call'}
		].map(function(item){
			item.className = (this.state.contactMethod === item.id) ? activeClass : inactiveClass;
			return item;
		}, this);
			 
		return (
			<div>
				<SegmentedControl
					ref='contactMethod'
					label='Preferred contact method:'
					data={buttonData}
					onChange={this.methodChanged}
				/>
				<Input label='Name'  initialValue={this.props.user.name}  ref='name'  style={nameStyle}></Input>
				<Email value={this.props.user.email} ref='email' style={emailStyle}></Email>
				<Phone value={this.props.user.phone_number} ref='phone' style={phoneStyle}></Phone>
				<div style={accountCreationStyle} className='checkbox'>
                    <label>
                        <input type='checkbox' onChange={this.toggleAccountCreation}/> Create an account <span className="small">(save your information for the next time you submit an issue)</span>
                    </label>
                </div>
                <Password creatingAccount={this.state.creatingAccount} style={passwordStyle} ref='password'/>
			</div>
		)
	},
});

module.exports = ContactInfo;