import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Decay from './Decay';
import DecayCanvas, { CanvasConfig } from './components/DecayCanvas';
import reportWebVitals from './reportWebVitals';
import GameMaster from './components/GameMaster';

/**
 *  @param terminalWidth - Width of canvas in pixels.
 *  @param terminalHeight - Height of terminal in pixels.
 *  @param tileHeight - Width of tile within canvas component.
 *  @param tileWidth - Height of tile within canvas component.
 */
const config: CanvasConfig = {
    // TODO: Fix the issue with having to flip terminalWidth and terminalHeight
    terminalWidth: 100,
    terminalHeight: 100,
    tileWidth: 16,
    tileHeight: 16,
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // React Strict Mode is causing components to render twice during development.
    // <React.StrictMode>
    <Decay {...config}>
        <GameMaster />
        <DecayCanvas />
    </Decay>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
