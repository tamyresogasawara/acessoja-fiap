import { fireEvent, render } from '@testing-library/react-native';
import { BarrierReportScreen } from '../BarrierReportScreen';

describe('BarrierReportScreen', () => {
  it('mantém o envio desabilitado até o formulário estar completo', async () => {
    const screen = await render(<BarrierReportScreen onDone={jest.fn()} />);

    const submit = screen.getByLabelText('Enviar relato de barreira');
    expect(submit.props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
    await fireEvent.press(submit);
    expect(screen.queryByText('Relato salvo!')).toBeNull();
  });

  it('confirma um relato completo com retorno além da cor', async () => {
    const onDone = jest.fn();
    const screen = await render(<BarrierReportScreen onDone={onDone} />);

    await fireEvent.press(screen.getByLabelText('Calçada bloqueada'));
    await fireEvent.changeText(screen.getByLabelText('Detalhes da barreira'), 'Obra bloqueia toda a calçada perto do ponto de ônibus.');
    await fireEvent.press(screen.getByLabelText('Enviar relato de barreira'));

    expect(screen.getByText('Relato salvo!')).toBeTruthy();
    expect(screen.getByText('A comunidade já pode evitar esta barreira.')).toBeTruthy();
  });
});
