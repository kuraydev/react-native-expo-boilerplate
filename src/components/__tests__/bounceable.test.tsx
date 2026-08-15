import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Bounceable } from '../bounceable';

describe('Bounceable', () => {
  it('renders children and handles press', async () => {
    const onPress = jest.fn();
    await render(
      <Bounceable onPress={onPress}>
        <Text>Tap me</Text>
      </Bounceable>,
    );

    fireEvent.press(screen.getByText('Tap me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
