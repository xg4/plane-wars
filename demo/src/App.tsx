import React, { useEffect, useRef } from 'react'
import Game from '../../src'

export default function App() {
  const canvas = useRef(null)
  useEffect(() => {
    new Game({ el: canvas.current })
  })
  return (
    <>
      {Game.version}
      <canvas ref={canvas} />
    </>
  )
}
