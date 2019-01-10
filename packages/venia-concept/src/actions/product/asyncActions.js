import actions from './actions';

export const updateGalleryIndex = index => async dispatch =>
    dispatch(actions.updateGalleryIndex(index));
