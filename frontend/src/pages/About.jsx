import React from 'react'

export default function About(){
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold text-primary">About Smart Used Car Price Prediction</h2>
      <p className="mt-4 text-gray-700">This project demonstrates an end-to-end ML-powered valuation platform built with React and FastAPI.</p>
      <h3 className="mt-6 font-semibold">Technology Stack</h3>
      <ul className="list-disc pl-6 mt-2 text-gray-700">
        <li>React, Vite, Tailwind CSS</li>
        <li>FastAPI, Python, Scikit-learn</li>
        <li>Joblib for model persistence</li>
      </ul>
      <h3 className="mt-6 font-semibold">Developer</h3>
      <p className="text-gray-700">Your Name — Full Stack Developer / ML Engineer</p>
      <div className="mt-4 flex gap-4">
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-primary">GitHub</a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-primary">LinkedIn</a>
      </div>
    </div>
  )
}
