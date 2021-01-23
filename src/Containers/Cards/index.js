import { useState, useEffect, Fragment } from 'react';
import { Box, Heading } from '@chakra-ui/react';
// import arrayMove from 'array-move';
import { API } from 'aws-amplify';

import Deck from './Deck';

const Cards = () => {
  const [questions, setQuestions] = useState(null);
  const [discarded, setDiscarded] = useState([]);
  const [loading, setLoading] = useState(true);

  const moveToDiscarded = (questionToRemove, index) => {
    const currentCard = localStorage.getItem('currentCard');
    localStorage.setItem('currentCard', Number(currentCard) + 1);
    // setCards(arrayMove(cards, index, cards.length - 1));
    setQuestions(questions.filter(question => question !== questionToRemove));
    setDiscarded([questions[index], ...discarded]);
  };

  const moveToQuestions = (questionToMove, index) => {
    const currentCard = localStorage.getItem('currentCard');
    localStorage.setItem('currentCard', Number(currentCard) - 1);
    setDiscarded(discarded.filter(question => question !== questionToMove));
    setQuestions([discarded[index], ...questions]);
  };

  useEffect(() => {
    const getQuestions = async () => {
      const data = await API.get('dateNightApi', '/questions');
      setQuestions(data.questions);
    };

    try {
      setLoading(true);
      getQuestions();
    } catch (err) {
      console.log('error getting questions!');
    }
  }, []);

  useEffect(() => {
    if (questions && loading) {
      const currentCard = localStorage.getItem('currentCard');
      if (currentCard) {
        setDiscarded(questions.splice(0, currentCard).reverse());
        setQuestions(questions.slice(0, questions.length));
      } else {
        localStorage.setItem('currentCard', 0);
      }
      setLoading(false);
    }
  }, [questions]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <Heading>Swipe left on the deck to see the next card.</Heading>
      {loading ? (
        <Heading>LOADING...</Heading>
      ) : (
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="100vh"
          paddingX="100px"
        >
          <Deck cards={discarded} moveTo={moveToQuestions} />
          <Deck cards={questions} moveTo={moveToDiscarded} />
        </Box>
      )}
    </Fragment>
  );
};

export default Cards;
