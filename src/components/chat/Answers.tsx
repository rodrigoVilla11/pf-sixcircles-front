import React, { Fragment, useState, useEffect, ReactNode } from "react";
import "./QA.scss";
import { useParams } from "react-router-dom";
import { getToken, urlAxios } from "../../utils";

interface Question {
  id: number;
  text: string;
}

interface Answer {
  body: ReactNode;
  question: any;
  id: number;
}

export function Answers(props:any) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswer, setNewAnswer] = useState("");
  const {token, config}=getToken()
  const { id } = useParams();
  const newAnswerObj = {
    body: newAnswer,
    question: id,
    token
  };




  const handleAnswerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newAnswer.trim() === "") {
      return;
    }

   
    try {
      const response = await urlAxios.post("/product/questions/answers", newAnswerObj, config);
      console.log(response);
      setAnswers([...answers, response.data]);
      setNewAnswer(" ");
      
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

 
  return (
    <Fragment>
     
        
        <br />
        <ul>
          {answers &&
            answers?.map((answer: any) => (
              <li key={answer._id}>{answer.body}</li>
            ))}
        </ul>
        <form onSubmit={handleAnswerSubmit}>
        <div className="new">
          <input
            type="text"
            value={newAnswer}
            onChange={(event) => setNewAnswer(event.target.value)}
            placeholder="Escribe tu respuesta"
          /></div>
          <button type="submit">Enviar respuesta</button>
          
        </form>
      
    </Fragment>
  );
}

