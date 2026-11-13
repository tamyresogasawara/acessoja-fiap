import { fireEvent, render } from '@testing-library/react-native';
import { RoutePlannerScreen } from '../RoutePlannerScreen';

describe('RoutePlannerScreen', () => {
  it('planeja a rota com o perfil de mobilidade escolhido', async () => {
    const onRouteReady = jest.fn();
    const screen = await render(<RoutePlannerScreen onRouteReady={onRouteReady} />);

    await fireEvent.press(screen.getByLabelText('Perfil cadeira de rodas: rampas e piso nivelado'));
    await fireEvent.press(screen.getByLabelText('Encontrar rota mais segura até UBS Central'));

    expect(onRouteReady).toHaveBeenCalledWith('wheelchair');
    expect(screen.getByText('Selecionado ✓')).toBeTruthy();
  });
});
