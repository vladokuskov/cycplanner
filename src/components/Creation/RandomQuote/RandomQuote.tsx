import { useEffect, useState } from 'react';

import QuoteIcon from '../../../assets/quote.svg';
import {
  StyledQuoteImageWrapper,
  StyledQuoteText,
  StyledRandomQuoteWrapper,
} from './RandomQuote.styles';

const RandomQuote = () => {
  const [quote, setQuote] = useState('');

  const quotes = [
    'Life is like riding a bicycle. To keep your balance, you must keep moving. - Albert Einstein',
    'When the spirits are low, when the day appears dark, when work becomes monotonous, when hope hardly seems worth having, just mount a bicycle and go out for a spin down the road, without thought on anything but the ride you are taking. - Arthur Conan Doyle',
    'It never gets easier, you just go faster. - Greg LeMond',
    'The bicycle is the noblest invention of mankind. - William Saroyan',
    'Riding a bike is everything to a cyclist. The friendship and camaraderie you have with other cyclists …to a cyclist, it was the be-all and end-all of your life. - Tommy Godwin',
    "I have always struggled to achieve excellence. One thing that cycling has taught me is that if you can achieve something without a struggle it's not going to be satisfying. - Greg LeMond",
    'The best rides are the ones where you bite off much more than you can chew—and live through it. - Doug Bradbury',
    'The bicycle is just as good company as most husbands and, when it gets old and shabby, a woman can dispose of it and get a new one without shocking the entire community. - Ann Strong',
    'The bicycle is a curious vehicle. Its passenger is its engine. - John Howard',
    "The bicycle is a simple solution to some of the world's most complicated problems. - Anonymous",
  ];

  useEffect(() => {
    const generateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };
    generateQuote();
  }, []);

  return (
    <StyledRandomQuoteWrapper>
      <StyledQuoteImageWrapper>
        <QuoteIcon />
      </StyledQuoteImageWrapper>
      <StyledQuoteText>{quote}</StyledQuoteText>
    </StyledRandomQuoteWrapper>
  );
};

export { RandomQuote };
