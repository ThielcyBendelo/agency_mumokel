import { useEffect, useRef } from 'react';

export default function RippleGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gridSize = 40;
    const rippleSpeed = 0.02;
    const rippleAmplitude = 15;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 5) {
          const offset = Math.sin((x + y) * 0.01 + time) * rippleAmplitude;
          if (y === 0) {
            ctx.moveTo(x + offset, y);
          } else {
            ctx.lineTo(x + offset, y);
          }
        }
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 5) {
          const offset = Math.sin((x + y) * 0.01 + time) * rippleAmplitude;
          if (x === 0) {
            ctx.moveTo(x, y + offset);
          } else {
            ctx.lineTo(x, y + offset);
          }
        }
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offsetX = Math.sin((x + y) * 0.01 + time) * rippleAmplitude;
          const offsetY = Math.sin((x + y) * 0.01 + time) * rippleAmplitude;
          const pulse = Math.sin(time * 2 + (x + y) * 0.01) * 0.5 + 0.5;
          
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, 2 * pulse, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time += rippleSpeed;
      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: 'linear-gradient(to bottom, #0f172a, #1e1b4b)',
      }}
    />
  );
}
