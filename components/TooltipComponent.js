import { Tooltip } from 'react-tooltip';

export default function TooltipComponent({ id }) {
  return (
    <Tooltip
      id={id}
      style={{
        backgroundColor: '#facc15',
        color: '#1f2937',
        opacity: 0.9,
        fontSize: '1rem',
      }}
    />
  );
}
