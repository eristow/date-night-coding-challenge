import { useState, useEffect, Fragment } from 'react';
import { List, Box, Button, Heading } from '@chakra-ui/react';
import { API } from 'aws-amplify';

import Card from './Card';

const TIMEOUT_VALUE = 250;

const Cards = () => {
  const [questions, setQuestions] = useState(null);
  const [baseDeck, setBaseDeck] = useState([]);
  const [discarded, setDiscarded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateQuestions, setAnimateQuestions] = useState(false);
  const [animateDiscarded, setAnimateDiscarded] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await API.get('dateNightApi', '/questions');
      setBaseDeck([...data.questions]);
      setQuestions([...data.questions]);
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

  const moveToDiscarded = questionToRemove => {
    const currentCard = Number(localStorage.getItem('currentCard')) + 1;
    localStorage.setItem('currentCard', currentCard);

    setAnimateQuestions(true);
    setTimeout(() => {
      setAnimateQuestions(false);
      setDiscarded([questions[0], ...discarded]);
      setQuestions(questions.filter(question => question !== questionToRemove));
    }, TIMEOUT_VALUE);
  };

  const moveToQuestions = questionToMove => {
    const currentCard = Number(localStorage.getItem('currentCard')) - 1;
    localStorage.setItem('currentCard', currentCard);

    setAnimateDiscarded(true);
    setTimeout(() => {
      setAnimateDiscarded(false);
      setQuestions([discarded[0], ...questions]);
      setDiscarded(discarded.filter(question => question !== questionToMove));
    }, TIMEOUT_VALUE);
  };

  const resetDeck = () => {
    setQuestions(baseDeck);
    setDiscarded([]);
    localStorage.setItem('currentCard', 0);
  };

  return (
    <Fragment>
      <Heading>Click on the deck to see the next card.</Heading>
      {loading ? (
        <Heading>LOADING...</Heading>
      ) : (
        <Box>
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="80vh"
            maxWidth="1000px"
            marginX="auto"
            paddingX="100px"
          >
            <List position="relative" width="350px" height="600px">
              {discarded.map((card, index) => (
                <Card
                  key={`discard ${card}`}
                  cardString={card}
                  index={index}
                  moveTo={moveToQuestions}
                  discarded
                  shouldAnimate={index === 0 && animateDiscarded}
                />
              ))}
            </List>
            <List position="relative" width="350px" height="600px">
              {questions.map((card, index) => (
                <Card
                  key={`question ${card}`}
                  cardString={card}
                  index={index}
                  moveTo={moveToDiscarded}
                  shouldAnimate={index === 0 && animateQuestions}
                />
              ))}
            </List>
          </Box>
          <Button size="lg" onClick={resetDeck}>
            Reset Deck
          </Button>
        </Box>
      )}
    </Fragment>
  );
};

export default Cards;
