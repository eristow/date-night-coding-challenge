import { Heading, useColorModeValue } from '@chakra-ui/react';
// import { motion } from 'framer-motion';

import MotionListItem from './MotionListItem';

const DECK_DISTANCE_TO_DISCARD = 'calc(max(-452px, -1 * 45vw))';
const DECK_DISTANCE_TO_QUESTIONS = 'calc(min(452px, 45vw))';
const ANIMATION_DURATION = 0.6;
const ANIMATION_TYPE = 'spring';
const CARD_OFFSET = 1.3;

const Card = ({
  cardString,
  index,
  moveTo,
  discarded = false,
  shouldAnimate,
}) => {
  const QUESTIONS_COLOR = useColorModeValue('blue.200', 'purple.600');
  const QUESTIONS_BORDER = useColorModeValue('purple.200', 'blue.500');
  const DISCARDED_COLOR = useColorModeValue('gray.200', 'gray.700');
  const DISCARDED_BORDER = useColorModeValue('gray.300', 'gray.600');

  const variants = {
    animate: ({ discarded, index }) => ({
      x: discarded ? DECK_DISTANCE_TO_QUESTIONS : DECK_DISTANCE_TO_DISCARD,
      zIndex: 1000,
      transition: {
        type: ANIMATION_TYPE,
        duration: ANIMATION_DURATION,
      },
      top: index * -CARD_OFFSET,
    }),
    stop: ({ index }) => ({
      top: index * -CARD_OFFSET,
      zIndex: 999 - index,
    }),
  };

  return (
    <MotionListItem
      custom={{ discarded, index }}
      variants={variants}
      animate={index === 0 && shouldAnimate ? 'animate' : 'stop'}
      initial={{
        x: 0,
        zIndex: discarded ? 999 - index : 599 - index,
        borderColor: discarded ? DISCARDED_BORDER : QUESTIONS_BORDER,
      }}
      onClick={index === 0 ? () => moveTo(cardString) : () => {}}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={['40vw', '45vw', '350px', '350px']}
      height={['50vh', '55vh', '60vh', '65vh']}
      minWidth="150px"
      maxWidth="350px"
      minHeight="200px"
      maxHeight="600px"
      paddingX="5px"
      cursor={index === 0 ? 'pointer' : 'auto'}
      bg={discarded ? DISCARDED_COLOR : QUESTIONS_COLOR}
      borderWidth="7px"
      borderStyle="solid"
      borderRadius="8px"
      borderColor={discarded ? DISCARDED_BORDER : QUESTIONS_BORDER}
    >
      <Heading
        opacity={discarded ? 0.3 : 1}
        fontSize={[17, 20, 23, 35]}
        style={{
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        {cardString}
      </Heading>
    </MotionListItem>
  );
};

export default Card;
