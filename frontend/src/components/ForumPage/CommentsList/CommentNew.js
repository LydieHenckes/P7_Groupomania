import React, { Component } from 'react';
//import { useState, Component } from 'react';
import PropTypes from 'prop-types';
import { postApiObjetWithImage } from '../../../utils/network';
import { API_COMMENTS } from '../../../constants/api';

import styles from './CommentsList.module.css';

class CommentNew extends Component {

	state = {
		commentNewContent: '',
		file : ''
	}

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handlePicture = this.handlePicture.bind(this);
		this.handleSendNewComment = this.handleSendNewComment.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		this.setState({commentNewContent: event.target.value});
	}

	handlePicture (event) {
		this.setState({file: event.target.files[0]});

	}

	handleClick () {
		alert('555')
	}
	
	async handleSendNewComment (event)  {

		event.preventDefault();

		// envoyer la requête post avec
		if (this.state.commentNewContent !=='') {
			const data = new FormData();
			data.append('userId', this.props.userId);
			data.append('postId', this.props.postId);
			data.append('content', this.state.commentNewContent);
			if (this.state.file) data.append('image',this.state.file);

			const res = await postApiObjetWithImage(API_COMMENTS, data);
			if (res) {
				this.setState({commentNewContent: '', file: ''});
				this.props.setIsCommentAdded(true);
			};

		} else {alert('Message est vide!')}
		
	}

	render() {
		const id = 'a' + this.props.postId;
		return (
			<>
				<form onSubmit = {this.handleSendNewComment} >
					<div className = {styles.commentNew}>
						<div  className = {styles.comment__autorimg}>
							{this.props.userPhotourl 
								? <img src = {this.props.userPhotourl} alt = "Avatar de d'utilisateur" />
								: <i className="fas fa-user"></i>
							}
						</div>

						<div className = {styles.commentNew__addfile} aria-label ="Ajouter une image" role = "button" title = "Ajoutez une image">
							<label htmlFor={id} className="custom-file-upload">
								<i className="far fa-image"></i>
							</label>
							<input id={id} type="file"
								name={id}
								accept=".jpg, .jpeg, .png"
								onChange={this.handlePicture}
								onClick = {this.handleClick}
							/>
						</div>

						<label htmlFor='content'></label>
						<textarea className = {styles.commentNew__frame} name='content' placeholder="Votre commentaire..." onChange = {this.handleChange}  value = {this.state.commentNewContent} >

						</textarea>
						<div className = {styles.commentNew__btn}>
							<button type="submit" title="Cliquez pour envoyer"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
						</div>
					</div>

					<div className= {styles.commentNew__photourl} >
							{this.state.file && <div>{this.state.file.name}</div>}
					</div>
				</form>

			</>
		)
	}
}

CommentNew.propTypes = {
	postId:  PropTypes.number, 
	userId: PropTypes.number,
	userPhotourl: PropTypes.string,
	setIsCommentAdded: PropTypes.func
}

export default CommentNew;

