import { useDndMonitor } from '@dnd-kit/core'
import React from 'react'

export default function DragOverlayWrapper() {

useDndMonitor({
    onDragStart: (event) => {
        console.log("Drag started", event);
    }
})


  return (
    <div>DragOverlayWrapper</div>
  )
}
