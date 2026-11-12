import { fireEvent, render } from '@testing-library/react-native';
import { BarrierReportScreen } from '../BarrierReportScreen';

describe('BarrierReportScreen', () => {
  it('confirms a complete barrier report with feedback beyond color', async () => {
    const onDone = jest.fn();
    const screen = await render(<BarrierReportScreen onDone={onDone} />);

    await fireEvent.press(screen.getByLabelText('Select blocked sidewalk'));
    await fireEvent.changeText(
      screen.getByLabelText('Barrier details'),
      'Construction blocks the full sidewalk near the bus stop.',
    );
    await fireEvent.press(screen.getByLabelText('Submit barrier report'));

    expect(screen.getByText('Report saved!')).toBeTruthy();
    expect(screen.getByText('The community can now avoid this barrier.')).toBeTruthy();
  });
});
