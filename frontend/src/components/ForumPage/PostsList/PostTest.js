import React, { Component } from 'react';


/*
			<PostTest id = "1"/>
			<PostTest id = "2" />
*/
class PostTest extends Component {
	state = {
		value : '',
		file : ''
	}

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handlePicture = this.handlePicture.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handlePicture(event) {
		this.setState({file: event.target.files[0]});

	}

	handleClick() {
		alert('click! ')
		console.log(this.props.id, this.state.value, this.state.file.name);
	}

	render() {
		return (
			<>
				<div>{this.props.id}</div>
				<textarea  name='content' 
							placeholder="Votre commentaire..." 
							onChange = {this.handleChange}  
							value = {this.state.value} >
				</textarea>
				<div> value: {this.state.value} </div>
				<label htmlFor={this.props.id} className="custom-file-upload">
								<i className="far fa-image"></i>
							</label>
				<input id={this.props.id} type="file"
								name={this.props.id}
								accept=".jpg, .jpeg, .png"
								onChange={this.handlePicture}
							/>
				<div> <span>file name :  </span>{this.props.id}  {this.state.file && <span>{this.state.file.name}</span>}</div>
				<button onClick = {this.handleClick}>envoyer</button>
			</>
		)
	}
}
export default PostTest;