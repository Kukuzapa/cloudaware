import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

import Modal from './modal';
import Pagination from 'react-ultimate-pagination-bootstrap-4';

const Notes = inject('store')( observer(
    class Notes extends Component {

        constructor( props ){
            super( props );
            this.state = {
                operation: '',
            }
            this.onPageChange = this.onPageChange.bind(this);
            this.onFilterChange = this.onFilterChange.bind(this);
            this.props.store.getNotesFromDB( this.props.store.testCurPage );
        }

        onPageChange(page) {
            this.props.store.testCurPage = page;
            this.props.store.getNotesFromDB( this.props.store.testCurPage, this.props.store.testFilter );
        }

        onFilterChange(event){
            this.props.store.testFilter = event.target.value;
            this.props.store.getNotesFromDB( this.props.store.testCurPage, this.props.store.testFilter );
        }

        deleteNote( id ){
            const url = 'http://localhost:3001/note/delete';

            const req = { id: id }

            axios.post(url,req).then(res=>{
                this.props.store.getNotesFromDB( this.props.store.testCurPage );
            })
        }

        render(){
            return(
                <div className="row">
                    <div className="col-6">
                        <Pagination totalPages={this.props.store.testTotalPages} currentPage={this.props.store.testCurPage} onChange={this.onPageChange}/>  
                    </div>

                    <div className="col-6">
                        <form>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="formGroupExampleInput2" 
                                    value={this.props.store.testFilter}
                                    onChange={this.onFilterChange} 
                                />
                            </div>
                        </form>
                    </div>

                    <Modal operation={this.state.operation} />

                    <div className="col-12">
                        <button 
                            type="button" 
                            className="btn btn-primary btn-block" 
                            onClick={ () => {
                                this.setState( { operation: 'create' } );
                                this.props.store.testNote = '';
                                this.props.store.testTags = '';
                                this.props.store.testId = null;
                            } }
                            data-toggle="modal" 
                            data-target="#exampleModal"
                            >
                            Create new note
                        </button>
				    </div>

                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">note</th>
                                    <th scope="col">tags</th>
                                    <th scope="col">date</th>
                                    <th scope="col">delete</th>
                                    <th scope="col">update</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.props.store.testArr.map( (item,i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{item.id}</td>
                                            <td>{item.note}</td>
                                            <td>{item.tag}</td>
                                            <td>{item.date}</td>
                                            <td>
                                                <a href="#" onClick={ () => this.deleteNote( item.id ) }>
                                                    <i className="fas fa-trash"></i>
                                                </a>
                                            </td>
                                            <td>
                                                <a 
                                                    href="#" data-toggle="modal" data-target="#exampleModal" 
                                                    onClick={ () => {
                                                        this.setState( { operation: 'update' } );
                                                        this.props.store.testNote = item.note;
                                                        this.props.store.testTags = item.tag;
                                                        this.props.store.testId = item.id;
                                                    } }>
                                                    <i className="fas fa-edit"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        );
                                } ) }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
));

export default Notes;