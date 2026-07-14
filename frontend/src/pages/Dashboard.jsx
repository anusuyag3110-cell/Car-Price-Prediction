import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import CarCard from '../components/CarCard'

export default function Dashboard(){
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('/dataset.json')
      .then(r => Array.isArray(r.data) ? setData(r.data) : setData([]))
      .catch(()=>setData([]))
  },[])

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {['BMW', 'Toyota', 'Hyundai'].map(brand => (
          <CarCard key={brand} brand={brand} />
        ))}
      </div>

      <div className="card p-6">
        <h3 className="font-semibold">Brand-wise Average Price</h3>
        <div style={{width:'100%',height:300}} className="mt-4">
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="Brand" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Target" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold">Price by Year</h3>
          <div style={{width:'100%',height:240}} className="mt-4">
            <ResponsiveContainer>
              <LineChart data={data}>
                <XAxis dataKey="Year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Target" stroke="#2563EB" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Kilometers vs Price</h3>
          <p className="text-sm text-gray-600 mt-2">Visual correlation from dataset sample.</p>
        </div>
      </div>
    </div>
  )
}
