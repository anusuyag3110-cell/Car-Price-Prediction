import React from 'react'
import dashboardBmw from '../assets/cars/dashboard-bmw.svg'
import dashboardToyota from '../assets/cars/dashboard-toyota.svg'
import dashboardHyundai from '../assets/cars/dashboard-hyundai.svg'
import dashboardMaruti from '../assets/cars/dashboard-maruti.svg'

const placeholder = '/placeholder-car.svg'

const images = {
  BMW: dashboardBmw,
  Toyota: dashboardToyota,
  Hyundai: dashboardHyundai,
  Maruti: dashboardMaruti
}

export default function CarCard({ brand }){
  return (
    <div className="card overflow-hidden shadow-sm">
      <div className="relative h-48 bg-slate-900 text-white p-4">
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${images[brand] || placeholder})` }}></div>
        <div className="relative z-10">
          <h4 className="text-xl font-semibold">{brand}</h4>
          <p className="text-sm mt-2">Explore original car images and price performance.</p>
        </div>
      </div>
      <div className="p-4">
        <h5 className="font-semibold">Top model preview</h5>
        <p className="text-sm text-gray-600 mt-2">Click Predict to see actual car details and an original image for BMW models.</p>
      </div>
    </div>
  )
}
