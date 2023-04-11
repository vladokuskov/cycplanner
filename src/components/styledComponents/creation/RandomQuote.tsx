import { useEffect, useState } from 'react';
import QuoteIcon from '../../../assets/quote.svg';
import styled from 'styled-components';

const RandowQuoteWrapper = styled.div`
  width: 100%;
  padding: 6rem 1rem;
  position: relative;
  @media (min-width: 680px) {
    max-width: 80%;
  }
`;
const QuoteText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: #585858;
`;

const QuoteImageWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  @media (min-width: 680px) {
    left: 5rem;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

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
  ];

  useEffect(() => {
    const generateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };
    generateQuote();
  }, []);

  return (
    <RandowQuoteWrapper>
      <QuoteImageWrapper>
        <QuoteIcon />
      </QuoteImageWrapper>
      <QuoteText>{quote}</QuoteText>
    </RandowQuoteWrapper>
  );
};

export { RandomQuote };
