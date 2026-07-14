import React, { useEffect, useState } from 'react'
import { getBrands, getModels, predict } from '../services/api'
import bmw5Series from '../assets/cars/bmw-5-series.svg'
import bmwX3 from '../assets/cars/bmw-x3.svg'
import bmwX5 from '../assets/cars/bmw-x5.svg'
import toyotaCar from '../assets/cars/toyota-car.svg'
import hyundaiCar from '../assets/cars/hyundai-car.svg'
import marutiCar from '../assets/cars/maruti-car.svg'
import placeholderCar from '../assets/cars/placeholder-car.svg'

const brandPreviewImages = {
  BMW: { default: bmw5Series, 'X3': bmwX3, 'X5': bmwX5 },
  Toyota: { default: toyotaCar },
  Hyundai: { default: hyundaiCar },
  Maruti: { default: marutiCar }
}

const emptyForm = {
  Brand:'', Model:'', Year:2020, Kilometers:0, Fuel:'Petrol', Transmission:'Manual', Seller_Type:'Dealer', Owners:1, Insurance:'Comprehensive', Service_History:'Full', Engine:1200, Mileage:15, City:'Mumbai'
}

export default function Predict(){
  const [form,setForm] = useState(emptyForm)
  const [brands,setBrands] = useState([])
  const [models,setModels] = useState([])
  const [loading,setLoading] = useState(false)
  const [result,setResult] = useState(null)

  useEffect(()=>{
    getBrands().then(setBrands).catch(()=>setBrands(['Toyota','Hyundai','Maruti']))
  },[])

  useEffect(()=>{
    if(form.Brand) {
      getModels(form.Brand).then(setModels).catch(()=>{
        if(form.Brand === 'BMW') setModels(['5 Series','X3','X5'])
        else setModels(['Model A','Model B'])
      })
    }
  },[form.Brand])

  function update(k,v){
    setForm(s=>{
      if(k === 'Brand'){
        return { ...s, Brand: v, Model: '' }
      }
      return { ...s, [k]: v }
    })
  }

  function getPreviewImage(){
    const brandImages = brandPreviewImages[form.Brand]
    if(!brandImages) return placeholderCar
    return brandImages[form.Model] || brandImages.default || placeholderCar
  }

  async function onPredict(){
    setLoading(true)
    try{
      const res = await predict(form)
      setResult(res)
    }catch(e){
      alert('Prediction failed. Is the backend running? Please start the backend at http://127.0.0.1:8000')
    }
    setLoading(false)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card p-6">
        <h3 className="font-semibold">Car Details</h3>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <label className="text-sm">Brand</label>
          <select value={form.Brand} onChange={e=>update('Brand',e.target.value)} className="border p-2 rounded">
            <option value="">Select Brand</option>
            {brands.map(b=> <option key={b} value={b}>{b}</option>)}
          </select>

          <label className="text-sm">Model</label>
          <select value={form.Model} onChange={e=>update('Model',e.target.value)} className="border p-2 rounded">
            <option value="">Select Model</option>
            {models.length > 0 ? models.map(m=> <option key={m} value={m}>{m}</option>) : <option value="5 Series">5 Series</option>}
          </select>

          <label className="text-sm">Year</label>
          <input type="number" value={form.Year} onChange={e=>update('Year',Number(e.target.value))} className="border p-2 rounded" />

          <label className="text-sm">Kilometers</label>
          <input type="number" value={form.Kilometers} onChange={e=>update('Kilometers',Number(e.target.value))} className="border p-2 rounded" />

          <label className="text-sm">Fuel</label>
          <select value={form.Fuel} onChange={e=>update('Fuel',e.target.value)} className="border p-2 rounded">
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>

          <label className="text-sm">Transmission</label>
          <select value={form.Transmission} onChange={e=>update('Transmission',e.target.value)} className="border p-2 rounded">
            <option>Manual</option>
            <option>Automatic</option>
          </select>

          <label className="text-sm">Seller Type</label>
          <select value={form.Seller_Type} onChange={e=>update('Seller_Type',e.target.value)} className="border p-2 rounded">
            <option>Dealer</option>
            <option>Individual</option>
          </select>

          <label className="text-sm">Previous Owners</label>
          <input type="number" value={form.Owners} onChange={e=>update('Owners',Number(e.target.value))} className="border p-2 rounded" />

          <label className="text-sm">Insurance</label>
          <select value={form.Insurance} onChange={e=>update('Insurance',e.target.value)} className="border p-2 rounded">
            <option>Comprehensive</option>
            <option>Third-Party</option>
          </select>

          <label className="text-sm">Service History</label>
          <select value={form.Service_History} onChange={e=>update('Service_History',e.target.value)} className="border p-2 rounded">
            <option>Full</option>
            <option>Partial</option>
            <option>None</option>
          </select>

          <label className="text-sm">Engine (cc)</label>
          <input type="number" value={form.Engine} onChange={e=>update('Engine',Number(e.target.value))} className="border p-2 rounded" />

          <label className="text-sm">Mileage (kmpl)</label>
          <input type="number" value={form.Mileage} onChange={e=>update('Mileage',Number(e.target.value))} className="border p-2 rounded" />

          <label className="text-sm">City</label>
          <input value={form.City} onChange={e=>update('City',e.target.value)} className="border p-2 rounded" />
        </div>

        <div className="mt-6">
          <button onClick={onPredict} className="px-6 py-3 bg-primary text-white rounded-md shadow" disabled={loading}>{loading? 'Predicting...':'Predict'}</button>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold">Summary</h3>
        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Brand:</strong> {form.Brand || '-'}</p>
              <p><strong>Model:</strong> {form.Model || '-'}</p>
              <p><strong>Year:</strong> {form.Year}</p>
              <p><strong>KMs:</strong> {form.Kilometers}</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-3 flex items-center justify-center">
              <img src={getPreviewImage()} alt={form.Brand ? `${form.Brand} car` : 'Select a car'} className="w-full h-auto max-h-40" />
            </div>
          </div>

          <p className="text-sm text-gray-600">Tips to increase resale value: Keep service records, professional detailing, fix dents.</p>

          {result && (
            <div className="mt-2 p-4 bg-[#f1f5ff] rounded-md">
              <h4 className="font-semibold">Predicted Price</h4>
              <div className="text-2xl font-bold mt-2">₹ {Math.round(result.predicted_price).toLocaleString()}</div>
              <div className="mt-2 text-sm">Model: {result.model_used} • Confidence: {(result.confidence*100).toFixed(1)}%</div>
              <div className="mt-2 text-sm">Range: ₹ {Math.round(result.price_range[0]).toLocaleString()} - ₹ {Math.round(result.price_range[1]).toLocaleString()}</div>
              <div className="mt-2 text-xs text-gray-600">Prediction time: {result.prediction_time_seconds}s</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
