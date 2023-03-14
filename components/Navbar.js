import {
  BsBrushFill,
  BsPaintBucket,
  BsEraserFill,
  BsArrowCounterclockwise,
  BsDownload,
  BsUpload,
  BsTrash2Fill,
} from 'react-icons/bs';
import { IoSaveOutline } from 'react-icons/io5';
import { ChromePicker } from 'react-color';

import Tooltip from './TooltipComponent';

export default function Navbar(props) {
  const {
    showColor,
    setShowColor,
    color,
    onColorChange,
    brushSize,
    setBrushSize,
  } = props;

  const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative h-16 items-center justify-between hidden sm:flex">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-2">
                <span
                  className="inline-flex items-center rounded-full my-1 bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800 mr-5"
                  data-tooltip-id="current-selection"
                  data-tooltip-content="Current Selection"
                >
                  Brush
                </span>
                <Tooltip id="current-selection" />

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
                    <ChromePicker
                      className="absolute top-10"
                      color={color}
                      onChange={(color) => onColorChange(color)}
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  data-tooltip-id="brush"
                  data-tooltip-content="Brush"
                >
                  <BsBrushFill className="m-auto h-5 w-5" />
                  <Tooltip id="brush" />
                </button>

                <div className="flex items-center">
                  <input
                    type="range"
                    value={brushSize}
                    className="slider"
                    onChange={(e) => setBrushSize(e.target.value)}
                    data-tooltip-id="brush-size"
                    data-tooltip-content="Brush Size"
                  />
                  <Tooltip id="brush-size" />
                </div>

                <div className="flex items-center text-gray-300">
                  <span className="text-sm font-medium mx-auto w-6">
                    {brushSize}
                  </span>
                </div>

                <button
                  type="button"
                  className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  data-tooltip-id="fill"
                  data-tooltip-content="Fill"
                >
                  <BsPaintBucket className="m-auto h-5 w-5" />
                  <Tooltip id="fill" />
                </button>

                <button
                  type="button"
                  className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  data-tooltip-id="erase"
                  data-tooltip-content="Eraser"
                >
                  <BsEraserFill className="m-auto h-5 w-5" />
                  <Tooltip id="erase" />
                </button>

                <button
                  type="button"
                  className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  data-tooltip-id="undo"
                  data-tooltip-content="Undo"
                >
                  <BsArrowCounterclockwise className="m-auto h-5 w-5" />
                  <Tooltip id="undo" />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 sm:flex gap-x-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden">
            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="download"
              data-tooltip-content="Download from Local Storage"
            >
              <BsDownload className="m-auto h-5 w-5" />
              <Tooltip id="download" />
            </button>

            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="save"
              data-tooltip-content="Save to Local Storage"
            >
              <BsUpload className="m-auto h-5 w-5" />
              <Tooltip id="save" />
            </button>

            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="export"
              data-tooltip-content="Export to JPG"
            >
              <IoSaveOutline className="m-auto h-5 w-5" />
              <Tooltip id="export" />
            </button>

            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="clear"
              data-tooltip-content="Clear Canvas"
            >
              <BsTrash2Fill className="m-auto h-5 w-5" />
              <Tooltip id="clear" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex flex-col space-y-2 py-3 px-2 sm:hidden">
        <div className="flex flex-row justify-between">
          <span
            className="inline-flex items-center rounded-full my-1 bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800"
            data-tooltip-id="current-selection"
            data-tooltip-content="Current Selection"
          >
            Brush
          </span>
          <Tooltip id="current-selection" />

          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="download"
              data-tooltip-content="Download from Local Storage"
            >
              <BsDownload className="m-auto h-5 w-5" />
              <Tooltip id="download" />
            </button>

            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="save"
              data-tooltip-content="Save to Local Storage"
            >
              <BsUpload className="m-auto h-5 w-5" />
              <Tooltip id="save" />
            </button>

            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="export"
              data-tooltip-content="Export to JPG"
            >
              <IoSaveOutline className="m-auto h-5 w-5" />
              <Tooltip id="export" />
            </button>

            <button
              type="button"
              className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              data-tooltip-id="clear"
              data-tooltip-content="Clear Canvas"
            >
              <BsTrash2Fill className="m-auto h-5 w-5" />
              <Tooltip id="clear" />
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
              <ChromePicker
                className="absolute top-10"
                color={color}
                onChange={(color) => onColorChange(color)}
              />
            </div>
          )}

          <button
            type="button"
            className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            data-tooltip-id="brush"
            data-tooltip-content="Brush"
          >
            <BsBrushFill className="m-auto h-5 w-5" />
            <Tooltip id="brush" />
          </button>

          <div className="flex items-center">
            <input
              type="range"
              value={brushSize}
              className="slider"
              onChange={(e) => setBrushSize(e.target.value)}
              data-tooltip-id="brush-size"
              data-tooltip-content="Brush Size"
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
          >
            <BsPaintBucket className="m-auto h-5 w-5" />
            <Tooltip id="fill" />
          </button>

          <button
            type="button"
            className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            data-tooltip-id="erase"
            data-tooltip-content="Eraser"
          >
            <BsEraserFill className="m-auto h-5 w-5" />
            <Tooltip id="erase" />
          </button>

          <button
            type="button"
            className="rounded-full bg-gray-900 h-10 w-10 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            data-tooltip-id="undo"
            data-tooltip-content="Undo"
          >
            <BsArrowCounterclockwise className="m-auto h-5 w-5" />
            <Tooltip id="undo" />
          </button>
        </div>
      </div>
    </div>
  );
}
