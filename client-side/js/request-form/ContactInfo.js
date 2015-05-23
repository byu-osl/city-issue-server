'use strict';
var React            = require('react');
var styles           = require('styles');
var Input            = require('Input');
var SegmentedControl = require('SegmentedControl');

var ContactInfo = React.createClass({

	getInitialState: function () {
		return {
			creatingAccount: false,
			contactMethod: 'none'
		}
	},

	getContactMethod: function () {return this.state.contactMethod},
	getEmail:         function () {return this.refs.email.value()},
	getPhoneNumber:   function () {return this.refs.phone.value()},
	getName:          function () {return this.refs.name.value()},
	getPassword:      function () {return this.refs.password.value()},

    toggleAccountCreation: function () {
        this.setState({creatingAccount:!this.state.creatingAccount}, function (){
        		if (this.state.creatingAccount) {
        			this.refs.password.focus();
        		}
        });
    },

    componentWillReceiveProps: function (newProps) {
    	if (!isUndefined(newProps.user.contact_method)) {
	    	this.setState({
	    		contactMethod: newProps.user.contact_method
	    	});
    	}
    },

    methodChanged: function (id) {
    	this.setState({
    		contactMethod: id
    	}, this.refs.name.focus);
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
				<Input label='Email' initialValue={this.props.user.email} ref='email' style={emailStyle}/>
				<Input label='Phone' initialValue={this.props.user.phone_number} ref='phone' style={phoneStyle}/>
				<div style={accountCreationStyle} className='checkbox'>
                    <label>
                        <input type='checkbox' onChange={this.toggleAccountCreation}/> Create an account <span className="small">(save your information for the next time you submit an issue)</span>
                    </label>
                </div>
                <Input label='Password' style={passwordStyle} type='password' ref='password'/>
			</div>
		)
	},
});

module.exports = ContactInfo;