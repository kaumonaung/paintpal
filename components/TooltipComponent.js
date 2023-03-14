import { Tooltip } from 'react-tooltip';

export default function TooltipComponent({ id }) {
  return (
    <Tooltip
      id={id}
      style={{
        backgroundColor: '#bae6fd',
        color: '#075985',
        opacity: 0.9,
        fontSize: '1rem',
      }}
    />
  );
}
