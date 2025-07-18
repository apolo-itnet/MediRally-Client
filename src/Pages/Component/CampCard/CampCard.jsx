// CampCard.jsx
import { useQuery } from '@tanstack/react-query'
import { MapPin, DollarSign, Tag } from 'lucide-react'
import axios from 'axios'
import Loader from '../../../Shared/Loader/Loader'

const fetchCamps = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/available-camps`)
  return res.data
}

const CampCard = () => {
  const { data: camps = [], isLoading, isError } = useQuery({
    queryKey: ['camps'],
    queryFn: fetchCamps,
  })

  if (isLoading) return <div className="text-center p-10"><Loader/></div>
  if (isError) return <div className="text-center p-10 text-red-500">Error fetching camps!</div>

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {camps.map((camp) => (
        <div
          key={camp._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl"
        >
          <img
            src={camp.image}
            alt={camp.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-5 space-y-2">
            <h2 className="text-xl font-semibold">{camp.title}</h2>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-blue-600" />
              {camp.location}
            </p>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <DollarSign size={16} className="text-green-600" />
              {camp.price} BDT
            </p>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <Tag size={16} className="text-purple-600" />
              {camp.category}
            </p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CampCard
