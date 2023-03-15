import { useRef } from 'react';
import {
  BsBrushFill,
  BsPaintBucket,
  BsEraserFill,
  BsArrowCounterclockwise,
  BsDownload,
  BsUpload,
  BsTrash2Fill,
  BsFillImageFill,
} from 'react-icons/bs';
import { SketchPicker } from 'react-color';

import Tooltip from './TooltipComponent';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ToolbarMobile(props) {
  const {
    canvasRef,
    activeToolEl,
    color,
    setColor,
    showColor,
    setShowColor,
    selectBrush,
    brushSize,
    handleBrushSize,
    fill,
    erase,
    isErasing,
    clearCanvas,
    saveToLocalStorage,
    loadFromLocalStorage,
    deleteFromLocalStorage,
  } = props;

  const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  const exportRef = useRef(null);

  const exportAsJPG = () => {
    exportRef.current.href = canvasRef.current.toDataURL('image/jpeg');
    exportRef.current.download = `paintpal-canvas-${Date.now()}.jpg`;
  };

  return (
    <div className="bg-gray-800">
      <div className="flex flex-col space-y-2 py-3 px-2 sm:hidden">
        <div className="flex flex-row justify-between">
          <span
            className="inline-flex items-center rounded-full my-1 bg-yellow-600 px-3 py-0.5 text-sm font-medium text-white mr-1"
            data-tooltip-id="current-selection"
            data-tooltip-content="Current Selection"
          >
            {activeToolEl}
          </span>
          <Tooltip id="current-selection" />

          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="save"
              data-tooltip-content="Save to Local Storage"
              onClick={() => saveToLocalStorage()}
            >
              <BsUpload className="m-auto h-5 w-5" />
              <Tooltip id="save" />
            </button>

            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="load"
              data-tooltip-content="Load from Local Storage"
              onClick={() => loadFromLocalStorage()}
            >
              <BsDownload className="m-auto h-5 w-5" />
              <Tooltip id="load" />
            </button>

            <a
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center"
              data-tooltip-id="export"
              data-tooltip-content="Export as JPG"
              ref={exportRef}
              onClick={() => exportAsJPG()}
              href=""
            >
              <BsFillImageFill className="h-5 w-5" />
              <Tooltip id="export" />
            </a>

            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="delete"
              data-tooltip-content="Delete Saved Canvas"
              onClick={() => deleteFromLocalStorage()}
            >
              <BsTrash2Fill className="m-auto h-5 w-5" />
              <Tooltip id="delete" />
            </button>
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <button
            type="button"
            className="p-[4px] w-12 my-2 mx-auto bg-white rounded-sm shadow-sm cursor-pointer"
            onClick={() => setShowColor(!showColor)}
          >
            <div
              className="w-full h-full rounded-sm"
              style={{ backgroundColor: rgba }}
            />
          </button>

          {showColor && (
            <div className="absolute z-10">
              <div
                className="fixed inset-0"
                onClick={() => setShowColor(false)}
              />
              <SketchPicker
                className="absolute top-10"
                color={color}
                onChange={(color) => setColor(color.rgb)}
              />
            </div>
          )}

          <button
            type="button"
            className={classNames(
              isErasing
                ? 'bg-gray-900 text-gray-300 hover:text-white hover:bg-gray-700'
                : 'bg-yellow-500 text-white',
              'rounded-full h-10 w-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
            )}
            data-tooltip-id="brush"
            data-tooltip-content="Brush"
            onClick={() => selectBrush()}
          >
            <BsBrushFill className="m-auto h-5 w-5" />
            <Tooltip id="brush" />
          </button>

          <div className="flex items-center">
            <input
              type="range"
              value={brushSize}
              className="slider"
              data-tooltip-id="brush-size"
              data-tooltip-content="Brush Size"
              onChange={(e) => handleBrushSize(e)}
            />
            <Tooltip id="brush-size" />
          </div>

          <div className="flex items-center text-gray-300">
            <span className="text-sm font-medium mx-auto w-6">{brushSize}</span>
          </div>

          <button
            type="button"
            className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            data-tooltip-id="fill"
            data-tooltip-content="Fill"
            onClick={() => fill()}
          >
            <BsPaintBucket className="m-auto h-5 w-5" />
            <Tooltip id="fill" />
          </button>

          <button
            type="button"
            className={classNames(
              isErasing
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-900 text-gray-300 hover:text-white hover:bg-gray-700',
              'rounded-full h-10 w-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
            )}
            data-tooltip-id="erase"
            data-tooltip-content="Eraser"
            onClick={() => erase()}
          >
            <BsEraserFill className="m-auto h-5 w-5" />
            <Tooltip id="erase" />
          </button>

          <button
            type="button"
            className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            data-tooltip-id="clear"
            data-tooltip-content="Clear Canvas"
            onClick={() => clearCanvas()}
          >
            <BsArrowCounterclockwise className="m-auto h-5 w-5" />
            <Tooltip id="clear" />
          </button>
        </div>
      </div>
    </div>
  );
}
