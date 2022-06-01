import React from 'react'
import './Decay.css'
import Canvas from './components/Canvas' // Maybe renamed at some point?

const Decay = () => {
    return (
        <div className="Decay">
            <Canvas config={{ terminalWidth: 500, terminalHeight: 400, tileWidth: 45, tileHeight: 45 }} />
        </div>
    )
}

export default Decay
