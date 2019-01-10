import { createActions } from 'redux-actions';

const prefix = 'PRODUCT';
const actionTypes = ['UPDATE_GALLERY_INDEX'];

export default createActions(...actionTypes, { prefix });
