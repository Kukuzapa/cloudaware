import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

const Modal = inject('store')( observer(
class Modal extends Component {
	
	addUpdateNewPost = ( str ) => {
		const url = 'http://localhost:3001/note/' + str;

		const req = {
			note: this.props.store.testNote
		}

		if ( this.props.store.testTags ){
			req.tags = this.props.store.testTags.split(',').map( item => { return item.trim().toLowerCase() } ).filter( item => item.length > 0 );
		}

		if ( str == 'update' || str == 'delete' ){ req.id = this.props.store.testId }

		axios.post(url,req).then(res=>{
			this.props.store.getNotesFromDB( this.props.store.testCurPage );
		})
	}

	constructor(props) {
		super(props);
		this.onNoteChange = this.onNoteChange.bind(this);
		this.onTagChange  = this.onTagChange.bind(this);
	}

	onNoteChange(event) {
		this.props.store.testNote = event.target.value;
	}

	onTagChange(event) {
		this.props.store.testTags = event.target.value;
	}

	onCloseForm(){
		this.props.store.testNote = '';
	}

	render(){
		return (
			<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">{this.props.operation} note</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ () => this.onCloseForm() }>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="exampleFormControlTextarea1">Текст заметки</label>
									<textarea type="text" className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.props.store.testNote}
                           				onChange={this.onNoteChange}></textarea>
  								</div>

								<div className="form-group">
									<label htmlFor="formGroupExampleInput2">Tags</label>
									<input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" value={this.props.store.testTags}
										onChange={this.onTagChange} />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={ () => this.onCloseForm() }>Close</button>
							<button type="button" className="btn btn-primary" onClick={ () => this.addUpdateNewPost( this.props.operation ) }>Save changes</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}))

export default Modal;