import { useState } from 'react';
import { motion } from 'framer-motion';
import arrayMove from 'array-move';

const CARD_STRINGS = [
  'string1',
  'string2',
  'string3',
  'string4',
  'string5',
  'string6',
];
// const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const Cards = () => {
  const [cards, setCards] = useState(CARD_STRINGS);
  const moveToEnd = from => {
    setCards(arrayMove(cards, from, cards.length - 1));
  };

  return (
    <div style={wrapperStyle}>
      <ul style={cardWrapStyle}>
        {cards.map((string, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={string}
              style={{ ...cardStyle, cursor: canDrag ? 'grab' : 'auto' }}
              animate={{
                // top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: CARD_STRINGS.length - index,
              }}
              drag={canDrag ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={() => moveToEnd(index)}
            >
              <h2 style={textStyle}>{string}</h2>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

const wrapperStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const cardWrapStyle = {
  position: 'relative',
  width: '300px',
  height: '500px',
  top: '-80px',
};

const cardStyle = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '300px',
  height: '500px',
  borderRadius: '8px',
  transformOrigin: 'top center',
  listStyle: 'none',
  // border: '1px solid black',
  backgroundColor: 'purple',
};

const textStyle = {
  color: 'white',
};

export default Cards;
