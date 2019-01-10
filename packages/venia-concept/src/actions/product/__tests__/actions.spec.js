import actions from '../actions';

const payload = 1;
const error = new Error('FAILURE');

const stringActionType = 'PRODUCT/UPDATE_GALLERY_INDEX';

test('updateGalleryIndex.toString() returns the proper action type', () => {
    expect(actions.updateGalleryIndex.toString()).toBe(stringActionType);
});

test('updateGalleryIndex() returns a proper action object', () => {
    expect(actions.updateGalleryIndex(payload)).toEqual({
        type: 'APP/TOGGLE_DRAWER',
        payload
    });
    expect(actions.updateGalleryIndex(error)).toEqual({
        type: stringActionType,
        payload: error,
        error: true
    });
});
