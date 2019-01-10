import { dispatch, getState } from 'src/store';
import actions from '../actions';
import { updateGalleryIndex } from '../asyncActions';

jest.mock('src/store');

const thunkArgs = [dispatch, getState];

afterEach(() => {
    dispatch.mockClear();
});

test('updateGalleryIndex() to return a thunk', () => {
    expect(updateGalleryIndex()).toBeInstanceOf(Function);
});

test('updateGalleryIndex thunk returns undefined', async () => {
    const payload = 2;
    const result = await updateGalleryIndex(payload)(...thunkArgs);

    expect(result).toBeUndefined();
});

test('updateGalleryIndex thunk dispatches actions', async () => {
    const payload = 3;
    await updateGalleryIndex(payload)(...thunkArgs);

    expect(dispatch).toHaveBeenCalledWith(actions.updateGalleryIndex(payload));
    expect(dispatch).toHaveBeenCalledTimes(1);

    const { updateedGalleryIndex } = getState();

    expect(updateedGalleryIndex).toBe(payload);
});
