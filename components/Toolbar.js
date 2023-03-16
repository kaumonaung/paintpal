import { useRef, useState } from 'react';
import {
  BsBrushFill,
  BsPaintBucket,
  BsEraserFill,
  BsDownload,
  BsUpload,
  BsTrash2Fill,
  BsFillImageFill,
} from 'react-icons/bs';
import { RiPaintBrushFill } from 'react-icons/ri';

import { SketchPicker } from 'react-color';
import Tooltip from './Tooltip';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Toolbar(props) {
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

  const [toolState, setBtnState] = useState({
    showTooltip: false,
    toolId: '',
  });

  const handleMouseEnter = (toolId) => {
    setTimeout(() => {
      setBtnState((prevState) => ({
        ...prevState,
        showTooltip: true,
        toolId,
      }));
    }, 200);
  };

  const handleMouseLeave = () => {
    setBtnState((prevState) => ({
      ...prevState,
      showTooltip: false,
      toolId: '',
    }));
  };

  const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  const exportRef = useRef(null);

  const exportAsJPG = () => {
    exportRef.current.href = canvasRef.current.toDataURL('image/jpeg');
    exportRef.current.download = `paintpal-canvas-${Date.now()}.jpg`;
  };

  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative hidden h-16 items-center justify-between sm:flex">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-2">
                <span
                  className="relative my-1 mr-1 inline-flex items-center rounded-full bg-yellow-600 px-3 py-0.5 text-sm font-medium text-white"
                  onMouseEnter={() => handleMouseEnter('current-selection')}
                  onMouseLeave={handleMouseLeave}
                >
                  {activeToolEl}
                  <Tooltip
                    id="current-selection"
                    text="Current Selection"
                    state={toolState}
                  />
                </span>

                <button
                  type="button"
                  className="my-2 mx-auto w-12 cursor-pointer rounded-sm bg-white p-[4px] shadow-sm"
                  onClick={() => setShowColor(!showColor)}
                >
                  <div
                    className="h-full w-full rounded-sm"
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
                      ? 'bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'bg-yellow-500 text-white',
                    'relative h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  )}
                  onClick={() => selectBrush()}
                  onMouseEnter={() => handleMouseEnter('btn-brush')}
                  onMouseLeave={handleMouseLeave}
                >
                  <BsBrushFill className="m-auto h-5 w-5" />
                  <Tooltip id="btn-brush" text="Brush" state={toolState} />
                </button>

                <div className="relative flex items-center">
                  <input
                    type="range"
                    value={brushSize}
                    className="slider"
                    onChange={(e) => handleBrushSize(e)}
                    onMouseEnter={() => handleMouseEnter('brush-size')}
                    onMouseLeave={handleMouseLeave}
                  />
                  <Tooltip
                    id="brush-size"
                    text="Brush Size"
                    state={toolState}
                  />
                </div>

                <div className="flex items-center text-gray-300">
                  <span className="mx-auto w-6 text-sm font-medium">
                    {brushSize}
                  </span>
                </div>

                <button
                  type="button"
                  className="relative h-10 w-10 rounded-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => fill()}
                  onMouseEnter={() => handleMouseEnter('btn-fill')}
                  onMouseLeave={handleMouseLeave}
                >
                  <BsPaintBucket className="m-auto h-5 w-5" />
                  <Tooltip id="btn-fill" text="Fill Canvas" state={toolState} />
                </button>

                <button
                  type="button"
                  className={classNames(
                    isErasing
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white',
                    'relative h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  )}
                  onClick={() => erase()}
                  onMouseEnter={() => handleMouseEnter('btn-erase')}
                  onMouseLeave={handleMouseLeave}
                >
                  <BsEraserFill className="m-auto h-5 w-5" />
                  <Tooltip id="btn-erase" text="Eraser" state={toolState} />
                </button>

                <button
                  type="button"
                  className="relative h-10 w-10 rounded-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => clearCanvas()}
                  onMouseEnter={() => handleMouseEnter('clear-canvas')}
                  onMouseLeave={handleMouseLeave}
                >
                  <RiPaintBrushFill className="m-auto h-5 w-5" />
                  <Tooltip
                    id="clear-canvas"
                    text="Clear Canvas"
                    state={toolState}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 hidden items-center gap-x-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:flex sm:pr-0">
            <button
              type="button"
              className="relative h-10 w-10 rounded-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => saveToLocalStorage()}
              onMouseEnter={() => handleMouseEnter('save-to-local-storage')}
              onMouseLeave={handleMouseLeave}
            >
              <BsUpload className="m-auto h-5 w-5" />
              <Tooltip
                id="save-to-local-storage"
                text="Save"
                state={toolState}
              />
            </button>

            <button
              type="button"
              className="relative h-10 w-10 rounded-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => loadFromLocalStorage()}
              onMouseEnter={() => handleMouseEnter('load-from-local-storage')}
              onMouseLeave={handleMouseLeave}
            >
              <BsDownload className="m-auto h-5 w-5" />
              <Tooltip
                id="load-from-local-storage"
                text="Load"
                state={toolState}
              />
            </button>

            <a
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              ref={exportRef}
              onClick={() => exportAsJPG()}
              href=""
              onMouseEnter={() => handleMouseEnter('export')}
              onMouseLeave={handleMouseLeave}
            >
              <BsFillImageFill className="h-5 w-5" />
              <Tooltip id="export" text="Export" state={toolState} />
            </a>

            <button
              type="button"
              className="relative h-10 w-10 rounded-full bg-gray-900 text-gray-300 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => deleteFromLocalStorage()}
              onMouseEnter={() => handleMouseEnter('delete')}
              onMouseLeave={handleMouseLeave}
            >
              <BsTrash2Fill className="m-auto h-5 w-5" />
              <Tooltip id="delete" text="Delete" state={toolState} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
