import { useEffect, useRef } from 'react'

const Canvas = ({ ...props }) => {
    const canvasConfig = useRef({ ...(props.config || {}) })

    useEffect(() => {
        const canvas = document.querySelector('.DecayCanvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

        const tilex = 20,
            tiley = 20

        if (props.config !== undefined) {
            ctx.fillStyle = '#AA22DD'
            ctx.fillRect(tilex, tiley, canvasConfig.current.tWidth, canvasConfig.current.tHeight)

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = '#000'
            ctx.font = 'bold 48px monospace' // TODO: Add to config.

            ctx.fillText('a', tilex + canvasConfig.current.tWidth / 2, tiley + canvasConfig.current.tHeight / 2)
        }
    }, [])

    return <canvas className="DecayCanvas" width={props.width}></canvas>
}

export default Canvas
