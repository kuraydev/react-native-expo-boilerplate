import { useSettings } from '../settings';

describe('settings store', () => {
  it('toggles haptics', () => {
    expect(useSettings.getState().hapticsEnabled).toBe(true);
    useSettings.getState().setHapticsEnabled(false);
    expect(useSettings.getState().hapticsEnabled).toBe(false);
  });
});
