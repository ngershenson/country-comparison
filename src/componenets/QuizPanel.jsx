import React, { useState } from 'react'

export default function QuizPanel({ activeQuiz, setActiveQuiz }) {
    return (
        <div className="quiz-panel">
            {(
                activeQuiz
                && <button onClick={() => setActiveQuiz(false)}>End Quiz</button>
            )
                || <button onClick={() => setActiveQuiz(true)}>Start Quiz</button>}
        </div>
    )
}
