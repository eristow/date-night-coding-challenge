import { List, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const DECK_DISTANCE = 450;
const ANIMATION_DURATION = 0.3;
const QUESTIONS_COLOR = '#8e4585';
const QUESTIONS_BORDER = '#45858e';
const DISCARDED_COLOR = '#808080';
const DISCARDED_BORDER = '#808080';
const ANIMATION_TYPE = 'spring';
const EASE_TYPE = 'easeOut';

const variants = {
  animate: ({discarded, index}) => ({
    x: discarded ? DECK_DISTANCE : -DECK_DISTANCE,
    backgroundColor: discarded ? QUESTIONS_COLOR : DISCARDED_COLOR,
    borderColor: discarded ? QUESTIONS_BORDER : DISCARDED_BORDER,
    zIndex: 999-index,
    transition: {
      type: ANIMATION_TYPE,
      ease: EASE_TYPE,
      duration: ANIMATION_DURATION,
      bounce: 0,
      damping: 13,
      mass: 0.2,
      stiffness: 200,
    },
  }),
  stop: {},
};

const Card = ({ cardString, index, moveTo, discarded = false, shouldAnimate }) => {
  // return cardString ? (
  return (
    <motion.li
      style={cardStyle}
      custom={{discarded, index}}
      variants={variants}
      animate={shouldAnimate ? 'animate' : 'stop'}
      initial={{
        x: 0,
        zIndex: 999-index,
        backgroundColor: discarded ? DISCARDED_COLOR : QUESTIONS_COLOR,
        borderColor: discarded ? DISCARDED_BORDER : QUESTIONS_BORDER,
      }}
      onClick={() => moveTo(cardString)}
    >
      <Heading color="black" size="lg">
        {cardString}
      </Heading>
    </motion.li>
  );
  // ) : (
  //   <List></List>
  // );
};

const cardStyle = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '350px',
  height: '600px',
  borderWidth: '7px',
  borderStyle: 'solid',
  borderRadius: '8px',
  listStyle: 'none',
  padding: '5px',
  cursor: 'pointer',
};

export default Card;
