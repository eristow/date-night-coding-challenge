import * as React from 'react';
import { Frame, useMotionValue, useTransform, useAnimation } from 'framer-motion';

export function Swipe() {
  let animation = useAnimation();

  // Turn x and y into animatable values
  let x = useMotionValue(0);
  let y = useMotionValue(0);

  // Change the rotation value based on the x position
  let rotate = useTransform(x, [-150, 150], [-20, 20]);

  function handleDragEnd(event, info) {
    // Get the x value of the drag event
    let dragX = info.point.x;

    // If dragged past a certain point to the right, stop tracking the x and y positions
    // Animate the card to fly to the right
    if (dragX > 170) {
      x.stop();
      y.stop();
      animation.start({ left: 500, transition: { duration: 0.2 } });
    }

    // If dragged past a certain point to the left, stop tracking the x and y positions
    // Animate the card to fly to the left
    else if (dragX < -170) {
      x.stop();
      y.stop();
      animation.start({ right: 500, transition: { duration: 0.2 } });
    }
  }

  return {
    // Make the frame draggable
    drag: 'x',
    dragConstraints: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    dragElastic: 1,
    onDragEnd: handleDragEnd,

    // Set the x and y values to a value that is animatable
    x: x,
    y: y,

    // Add animations controls
    animate: animation,
    rotate: rotate,
    whileTap: { boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.05)' },
  };
}
