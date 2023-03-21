import { useRef } from 'react';
import {
  BsBrushFill,
  BsPaintBucket,
  BsEraserFill,
  BsFillImageFill,
} from 'react-icons/bs';
import { RiPaintBrushFill } from 'react-icons/ri';

import { SketchPicker } from 'react-color';

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
  } = props;

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
                  title="Current Selection"
                >
                  {activeToolEl}
                </span>

                <button
                  type="button"
                  className="my-2 mx-auto w-12 cursor-pointer rounded-sm bg-white p-[4px] shadow-sm"
                  title="Select Color"
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
                  title="Brush"
                  onClick={() => selectBrush()}
                >
                  <BsBrushFill className="m-auto h-5 w-5" />
                </button>

                <div className="relative flex items-center">
                  <input
                    type="range"
                    value={brushSize}
                    className="slider"
                    title="Brush Size"
                    onChange={(e) => handleBrushSize(e)}
                  />
                </div>

                <div className="flex items-center text-gray-300">
                  <span
                    className="mx-auto w-6 text-sm font-medium"
                    title="Brush Size"
                  >
                    {brushSize}
                  </span>
                </div>

                <button
                  type="button"
                  className="relative h-10 w-10 rounded-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  title="Fill Canvas"
                  onClick={() => fill()}
                >
                  <BsPaintBucket className="m-auto h-5 w-5" />
                </button>

                <button
                  type="button"
                  className={classNames(
                    isErasing
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white',
                    'relative h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  )}
                  title="Eraser"
                  onClick={() => erase()}
                >
                  <BsEraserFill className="m-auto h-5 w-5" />
                </button>

                <button
                  type="button"
                  className="relative h-10 w-10 rounded-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  title="Clear Canvas"
                  onClick={() => clearCanvas()}
                >
                  <RiPaintBrushFill className="m-auto h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 hidden items-center gap-x-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:flex sm:pr-0">
            <a
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              ref={exportRef}
              href=""
              title="Export as JPG"
              onClick={() => exportAsJPG()}
            >
              <BsFillImageFill className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
