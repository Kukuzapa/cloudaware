import { observable, autorun, computed, decorate, action } from 'mobx';

import axios from 'axios';

class Counts {
    testArr        = [];
    testCurPage    = 1;
    testTotalPages = 5;
    testNote       = '';
    testTags       = '';
    testId;
    testFilter     = '';

    getNotesFromDB( page, filter ){

        const req = {};
        req.page = page;

        if ( filter ){
            req.filter = filter;
        }

        axios.get(`http://localhost:3001/notes`, { params: req } ).then( res => {
            this.testArr = res.data.notes;

            if ( Number( res.data.pages ) < this.testCurPage ){ this.testCurPage = Number( res.data.pages ) }

            this.testTotalPages = Number( res.data.pages );
        })
    }
}

decorate( Counts, {
    testArr:        observable,
    testCurPage:    observable,
    testTotalPages: observable,
    testNote:       observable,
    testTags:       observable,
    testId:         observable,
    testFilter:     observable,

    getNotesFromDB: action
} )

export default Counts;