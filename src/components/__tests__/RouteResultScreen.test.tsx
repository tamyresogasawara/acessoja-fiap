import { fireEvent, render } from '@testing-library/react-native';
import { RouteResultScreen } from '../RouteResultScreen';

describe('RouteResultScreen', () => {
  it('recomenda a rota sem barreiras e explica a troca de tempo por segurança', async () => {
    const screen = await render(<RouteResultScreen profile="wheelchair" onHome={jest.fn()} />);

    expect(screen.getByText('Otimizada para: cadeira de rodas')).toBeTruthy();
    expect(screen.getByText('Esta leva +4 min e tem 0 barreiras.')).toBeTruthy();
    expect(screen.getByText('Use a entrada lateral')).toBeTruthy();
  });

  it('adapta as instruções ao perfil de baixa visão', async () => {
    const screen = await render(<RouteResultScreen profile="low-vision" onHome={jest.fn()} />);
    expect(screen.getByText('Siga o piso tátil da direita')).toBeTruthy();

    await fireEvent.press(screen.getByLabelText('Iniciar navegação acessível'));
    expect(screen.getByText('Navegação iniciada')).toBeTruthy();
  });
});
