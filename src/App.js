import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import alanBtn from "@alan-ai/alan-sdk-web"
import NewsCards from  "./components/NewsCards/NewsCards"
import wordsToNumbers from 'words-to-numbers';


const alanKey ="2a6f529d169a2e6b80a7f25fa2f9215c2e956eca572e1d8b807a3e2338fdd0dc/stage"
const App = () => {

  const [newsArticles, setNewsArticles] = useState([]);
  
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
      
        }
        else if (command === 'open') {
          const parsedNumber = number.lenght>2 ? wordsToNumbers(number , {fuzzy:true}): number;
          const article = articles[parsedNumber-1]

          if(parsedNumber>20){
            alanBtn().playText("there are only 20 articles")
          }
          else if(article){
            window.open(articles[number].url, '_blank')
            alanBtn().playText("opening...")
          }
        
      }
    },
  });
}, []);
  return (
    <div >
      <div className="head"><h1> News App </h1></div>
      <NewsCards articles={newsArticles} />
    <div className="footer">
          <Typography variant="body1" component="h2">
            Created by
            <a className="link" href="https://www.linkedin.com/in/parth-khandelwal-3051941a0/"> Parth Khandelwal</a> -
            <a className="link" href="https://twitter.com/cyborg_parth" > twitter</a>
          </Typography>
        </div>
    </div>
  );
}

export default App;
