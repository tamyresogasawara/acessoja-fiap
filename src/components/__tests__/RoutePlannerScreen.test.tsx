import { fireEvent, render } from '@testing-library/react-native';
import { RoutePlannerScreen } from '../RoutePlannerScreen';

describe('RoutePlannerScreen', () => {
  it('plans a route using the selected mobility profile', async () => {
    const onRouteReady = jest.fn();
    const screen = await render(<RoutePlannerScreen onRouteReady={onRouteReady} />);

    await fireEvent.press(screen.getByLabelText('Select wheelchair profile'));
    await fireEvent.press(screen.getByLabelText('Plan route to Central Health Clinic'));

    expect(onRouteReady).toHaveBeenCalledWith('wheelchair');
    expect(screen.getByText('Central Health Clinic')).toBeTruthy();
  });
});
