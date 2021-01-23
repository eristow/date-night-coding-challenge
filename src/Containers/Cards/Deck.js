import { List, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const Deck = ({ cards, moveTo }) => {
  return (
    <List position="relative" width="350px" height="600px" top="-80px">
      {cards.map((card, index) => {
        const canDrag = index === 0;

        return (
          <motion.li
            key={`deck ${index}`}
            style={{ ...cardStyle, cursor: canDrag ? 'grab' : 'auto' }}
            animate={{
              // top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
            drag={canDrag ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={() => moveTo(card, index)}
            // onClick={() => moveTo(card, index)}
          >
            <Heading color="black" size="lg">
              {card}
            </Heading>
          </motion.li>
        );
      })}
    </List>
  );
};

const cardStyle = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '350px',
  height: '600px',
  borderRadius: '8px',
  transformOrigin: 'top center',
  listStyle: 'none',
  border: '7px solid royalblue',
  backgroundColor: 'plum',
  padding: '5px',
};

export default Deck;
