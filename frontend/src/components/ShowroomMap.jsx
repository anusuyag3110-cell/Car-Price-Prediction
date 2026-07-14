import React from 'react'

const locations = [
  { name: 'Elite Motors', distance: '1.2 miles', status: 'Open Now' },
  { name: 'Urban Electric Hub', distance: '2.8 miles', status: 'Closing Soon' },
  { name: 'Luxury Hub', distance: '4.1 miles', status: 'Open Now' }
]

export default function ShowroomMap(){
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-primary">Showrooms Nearby</h3>
          <p className="text-sm text-gray-600">Find nearby partner showrooms and view pricing trends.</p>
        </div>
      </div>
      <div className="mt-6 bg-slate-100 rounded-3xl overflow-hidden" style={{ minHeight: '260px' }}>
        <div className="relative h-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-3xl">
          <div className="text-xl font-semibold">Nearby Showrooms</div>
          <p className="mt-2 text-sm text-slate-100/90">Track verified dealers and service centers in your region.</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-sm font-semibold">Elite Motors</div>
              <div className="text-xs mt-1 text-slate-100/90">1.2 miles • Open Now</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-sm font-semibold">Urban Electric Hub</div>
              <div className="text-xs mt-1 text-slate-100/90">2.8 miles • Closing Soon</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-sm font-semibold">Luxury Hub</div>
              <div className="text-xs mt-1 text-slate-100/90">4.1 miles • Open Now</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-sm font-semibold">Elite Motors Flagship</div>
              <div className="text-xs mt-1 text-slate-100/90">Premium review center</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {locations.map((location) => (
          <div key={location.name} className="p-4 bg-white rounded-2xl shadow-sm flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{location.name}</h4>
              <p className="text-sm text-gray-500">{location.distance}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs ${location.status === 'Open Now' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}`}>{location.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
