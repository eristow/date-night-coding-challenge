import { ListItem, forwardRef } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const MotionListItem = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <ListItem ref={ref} {...chakraProps} />;
  })
);

export default MotionListItem;
