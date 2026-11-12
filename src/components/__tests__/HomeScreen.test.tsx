import { fireEvent, render } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';

describe('HomeScreen', () => {
  it('offers both primary citizen actions with accessible labels', async () => {
    const onPlanRoute = jest.fn();
    const onReportBarrier = jest.fn();
    const screen = await render(
      <HomeScreen onPlanRoute={onPlanRoute} onReportBarrier={onReportBarrier} />,
    );

    await fireEvent.press(screen.getByLabelText('Plan an accessible route'));
    await fireEvent.press(screen.getByLabelText('Report a barrier'));

    expect(onPlanRoute).toHaveBeenCalledTimes(1);
    expect(onReportBarrier).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Your city, without barriers.')).toBeTruthy();
  });
});
