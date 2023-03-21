import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Toolbar from '../components/Toolbar';
import ToolbarMobile from '../components/ToolbarMobile';

const startColor = {
  r: '250',
  g: '204',
  b: '21',
  a: '1',
};

export default function Home() {
  const [savedCanvas, setSavedCanvas] = useState();
  const [history, setHistory] = useState([]);

  const [activeToolEl, setActiveToolEl] = useState('Brush');
  const [color, setColor] = useState(startColor);
  const [backgroundColor, setBackgroundColor] = useState(
    'rgba(255, 255, 255, 1)'
  );
  const [showColor, setShowColor] = useState(false);

  const [brushSize, setBrushSize] = useState(25);
  const [isErasing, setIsErasing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  // Store drawn lines in history
  const storeDrawn = (x, y, color, size) => {
    const line = {
      x,
      y,
      color,
      size,
      isErasing,
    };

    setHistory([...history, line]);
  };

  // Start drawing function
  const startDrawing = ({ nativeEvent }) => {
    setIsDrawing(true);

    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    storeDrawn(offsetX, offsetY, rgba, brushSize);
  };

  // Drawing function
  const drawing = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.stroke();

    storeDrawn(offsetX, offsetY, rgba, brushSize);
  };

  // Finish drawing function
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  // Draw what is stored in history
  const restoreCanvas = (array) => {
    for (let i = 0; i < array.length; i++) {
      const { x, y, color, size, isErasing } = array[i];

      contextRef.current.beginPath();

      if (i > 0) {
        const { x: prevX, y: prevY } = array[i - 1];
        contextRef.current.moveTo(prevX, prevY);
      } else {
        contextRef.current.moveTo(x, y);
      }

      contextRef.current.lineWidth = size;

      if (isErasing) {
        contextRef.current.strokeStyle = backgroundColor;
      } else {
        contextRef.current.strokeStyle = color;
      }

      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    }
  };

  const selectBrush = () => {
    setIsErasing(false);
    contextRef.current.strokeStyle = rgba;
    contextRef.current.lineWidth = brushSize;
  };

  const handleBrushSize = (e) => {
    setBrushSize(e.target.value);
    setIsErasing(false);
  };

  const fill = () => {
    contextRef.current.fillStyle = rgba;
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    setBackgroundColor(rgba);
    restoreCanvas(history);
    setIsErasing(false);
  };

  const erase = () => {
    setIsErasing(true);
    setActiveToolEl('Eraser');

    contextRef.current.strokeStyle = backgroundColor;
    contextRef.current.lineWidth = brushSize;
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setHistory([]);
    setIsErasing(false);
    setBackgroundColor('rgba(255, 255, 255, 1)');
  };

  // ====================== useEffects ======================

  // Restore canvas load from local storage
  useEffect(() => {
    if (!savedCanvas) return;
    contextRef.current.fillStyle = savedCanvas.bg;
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    restoreCanvas(savedCanvas.data);
    setIsErasing(false);
  }, [savedCanvas, restoreCanvas]);

  // Update brush size and color
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    context.lineWidth = brushSize;
  }, [brushSize, color.a, color.b, color.g, color.r]);

  // Create initial canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    context.lineWidth = brushSize;

    contextRef.current = context;
    contextRef.current.fillStyle = 'white';
    contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Set activeToolEl
  useEffect(() => {
    if (!isErasing) return setActiveToolEl('Brush');
    if (isErasing) return setActiveToolEl('Eraser');
  }, [isErasing]);

  return (
    <>
      <Head>
        <title>PaintPal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Toolbar
          {...{
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
          }}
        />

        <ToolbarMobile
          {...{
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
          }}
        />

        <canvas
          className="cursor-crosshair bg-white"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
        />
      </main>
    </>
  );
}
