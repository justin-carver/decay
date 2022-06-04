import './DecayCanvas.css';

export interface CanvasConfig {
    terminalWidth: number;
    terminalHeight: number;
    tileWidth: number;
    tileHeight: number;
}

const DecayCanvas = () => {
    return <canvas className="DecayCanvas" width={1420} height={1420}></canvas>;
};

export default DecayCanvas;
