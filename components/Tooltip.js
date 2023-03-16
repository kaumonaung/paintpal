export default function Tooltip(props) {
  const { state, text, id } = props;
  const { showTooltip, toolId } = state;

  return (
    <>
      {showTooltip && toolId === id && (
        <span className="absolute -bottom-10 left-1/2 z-10 w-24 -translate-x-1/2 transform rounded-lg bg-yellow-400 p-2 text-sm text-gray-800 opacity-90 transition-opacity duration-300">
          {text}
        </span>
      )}
    </>
  );
}
