import { handleActions } from 'redux-actions';

import actions from 'src/actions/product';

export const name = 'product';

const initialState = {
    galleryImageIndex: 0
};

const reducerMap = {
    [actions.updateGalleryIndex]: (state, { payload }) => {
        return {
            ...state,
            galleryImageIndex: payload
        };
    }
};

export default handleActions(reducerMap, initialState);
