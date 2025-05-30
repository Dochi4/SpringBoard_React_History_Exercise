import { React, useState,  useEffect } from "react";
import Joke from "./Joke";
import "./JokeList.css";
import useAxios from "./hooks/useAxios";

function JokeList() {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { response, error, fetchData } = useAxios();

  const defaultProps = {
    numJokesToGet: 5,
  };

  const getJokes = async () => {
     let jokesArray = [];
      const seenJokes = new Set();

    while (jokesArray.length < defaultProps.numJokesToGet) {
      const url = "https://icanhazdadjoke.com";
      const joke = await fetchData(url);

      if(!seenJokes.has(joke.id)){
        seenJokes.add(joke.id);
       jokesArray.push({ ...joke, votes: 0 }); 
      }else{
        console.log("duplicate found!");
      }
    }
    console.log(response)
    console.log(`Error:${error}`)
    setIsLoading(false)
    setJokes(jokesArray);
    
  };

  const generateNewJokes =() => {
    setIsLoading(true)
    getJokes()

  }

  const vote = (id, delta) =>{
    setJokes((oldJoke) =>
      oldJoke.map((j)=>
        j.id === id? {...j,votes: j.votes +delta} : j
      )
    )
  }

  const sortedJokes = [...jokes].sort((a,b)=>b.votes-a.votes)
  
  useEffect(() => {
    getJokes();
  }, []);

  if (isLoading){
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }
  
 
  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>
      {sortedJokes.map((j) => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
  );
}
export default JokeList;
