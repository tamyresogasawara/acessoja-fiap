import { fireEvent, render } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';

describe('HomeScreen', () => {
  it('oferece as duas ações principais com rótulos acessíveis', async () => {
    const onPlanRoute = jest.fn();
    const onReportBarrier = jest.fn();
    const screen = await render(<HomeScreen onPlanRoute={onPlanRoute} onReportBarrier={onReportBarrier} />);

    await fireEvent.press(screen.getByLabelText('Planejar uma rota acessível'));
    await fireEvent.press(screen.getByLabelText('Relatar uma barreira'));

    expect(onPlanRoute).toHaveBeenCalledTimes(1);
    expect(onReportBarrier).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Sua cidade, sem barreiras.')).toBeTruthy();
  });
});
