import React from 'react'
import { Link } from 'react-router-dom'
import ShowroomMap from '../components/ShowroomMap'

export default function Home(){
  return (
    <div className="space-y-8">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Smart Used Car Price Prediction</h1>
          <p className="mt-4 text-gray-600">Predict the market value of your used car using state-of-the-art AI.</p>
          <div className="mt-6 flex gap-4 flex-wrap">
            <Link to="/predict" className="px-6 py-3 bg-primary text-white rounded-md shadow">Predict Price</Link>
            <Link to="/chat" className="px-6 py-3 border border-primary text-primary rounded-md">AI Chat</Link>
          </div>
        </div>
        <div className="card p-6">
          <div className="w-full h-64 rounded-md bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white flex items-center justify-center">
            <div className="text-center px-6">
              <div className="text-3xl font-semibold">AutoSmart</div>
              <div className="mt-2 text-sm text-slate-300">Modern valuation dashboard for used vehicles</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-4 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold">AI Prediction</h3>
          <p className="text-sm text-gray-600 mt-2">Deep learning models analyze market data to estimate prices.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Market Analysis</h3>
          <p className="text-sm text-gray-600 mt-2">Real-time tracking of regional supply and demand shifts.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Fast Results</h3>
          <p className="text-sm text-gray-600 mt-2">Get valuation in under 60 seconds with a few inputs.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Reliable Estimation</h3>
          <p className="text-sm text-gray-600 mt-2">Trusted by dealers and private sellers for transparent pricing.</p>
        </div>
      </section>

      <ShowroomMap />
    </div>
  )
}
