import { Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const DECK_DISTANCE = 450;
const ANIMATION_DURATION = 0.3;
const QUESTIONS_COLOR = '#8e4585';
const QUESTIONS_BORDER = '#45858e';
const DISCARDED_COLOR = '#808080';
const DISCARDED_BORDER = '#606060';
const ANIMATION_TYPE = 'spring';
const EASE_TYPE = 'easeOut';
const CARD_OFFSET = 3;

const variants = {
  animate: ({ discarded, index }) => ({
    x: discarded ? DECK_DISTANCE : -DECK_DISTANCE,
    backgroundColor: discarded ? QUESTIONS_COLOR : DISCARDED_COLOR,
    borderColor: discarded ? QUESTIONS_BORDER : DISCARDED_BORDER,
    zIndex: 1000,
    transition: {
      type: ANIMATION_TYPE,
      ease: EASE_TYPE,
      duration: ANIMATION_DURATION,
      bounce: 0,
      damping: 13,
      mass: 0.2,
      stiffness: 200,
    },
    top: index * -CARD_OFFSET,
  }),
  stop: ({ discarded, index }) => ({
    top: index * -CARD_OFFSET,
    zIndex: discarded ? 999 - index : 599 - index,
  }),
};

const Card = ({
  cardString,
  index,
  moveTo,
  discarded = false,
  shouldAnimate,
}) => {
  // console.log(discarded, index, cardString);
  return (
    <motion.li
      style={cardStyle}
      custom={{ discarded, index }}
      variants={variants}
      animate={index === 0 && shouldAnimate ? 'animate' : 'stop'}
      initial={{
        x: 0,
        zIndex: discarded ? 999 - index : 599 - index,
        backgroundColor: discarded ? DISCARDED_COLOR : QUESTIONS_COLOR,
        borderColor: discarded ? DISCARDED_BORDER : QUESTIONS_BORDER,
      }}
      onClick={index === 0 ? () => moveTo(cardString) : () => {}}
    >
      <Heading color="black" size="lg">
        {cardString}
      </Heading>
    </motion.li>
  );
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
