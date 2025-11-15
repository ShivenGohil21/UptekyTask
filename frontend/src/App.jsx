import { useState } from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackTable from './components/FeedbackTable'
import AnalyticsCards from './components/AnalyticsCards'

// Mock data for demonstration
const mockFeedbacks = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    rating: 5,
    message: 'Excellent service! The team was very responsive and professional. Highly recommend!',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    rating: 4,
    message: 'Great experience overall. The product quality exceeded my expectations. Will definitely use again.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    rating: 5,
    message: 'Outstanding customer support! They went above and beyond to help me. Thank you so much!',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '4',
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    rating: 3,
    message: 'It was okay. The service met my basic needs but there is room for improvement.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '5',
    name: 'Jessica Williams',
    email: 'jessica.williams@example.com',
    rating: 5,
    message: 'Absolutely fantastic! Best experience I have had in a long time. Keep up the great work!',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '6',
    name: 'Robert Martinez',
    email: 'robert.martinez@example.com',
    rating: 4,
    message: 'Very satisfied with the quality and delivery time. Professional team and great communication.',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
]

function App() {
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks)
  const [loading, setLoading] = useState(false)

  // Calculate stats from feedbacks
  const calculateStats = (feedbacksList) => {
    if (!feedbacksList || feedbacksList.length === 0) {
      return {
        totalFeedbacks: 0,
        averageRating: '0.00',
        positiveFeedbacks: 0,
        negativeFeedbacks: 0
      }
    }

    const totalFeedbacks = feedbacksList.length
    const totalRating = feedbacksList.reduce((sum, f) => sum + f.rating, 0)
    const averageRating = (totalRating / totalFeedbacks).toFixed(2)
    const positiveFeedbacks = feedbacksList.filter(f => f.rating >= 4).length
    const negativeFeedbacks = feedbacksList.filter(f => f.rating < 3).length

    return {
      totalFeedbacks,
      averageRating,
      positiveFeedbacks,
      negativeFeedbacks
    }
  }

  const stats = calculateStats(feedbacks)

  // Handle adding new feedback
  const handleAddFeedback = (newFeedback) => {
    // Simulate async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        const feedback = {
          ...newFeedback,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }
        setFeedbacks(prev => [feedback, ...prev])
        resolve({ success: true, data: feedback })
      }, 500) // Simulate network delay
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                <span className="text-6xl">💭</span>
              </div>
              <div>
                <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                  Feedback Hub
                </h1>
                <p className="text-blue-100 mt-2 text-lg font-medium">
                  Share your thoughts and help us improve
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition duration-300">
                <p className="text-white text-sm font-medium">Built with</p>
                <p className="text-blue-200 text-xs">React + Vite + TailwindCSS</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Analytics Cards */}
        <AnalyticsCards stats={stats} />

        {/* Feedback Form */}
        <FeedbackForm onSubmit={handleAddFeedback} />

        {/* Feedback Table */}
        <FeedbackTable feedbacks={feedbacks} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 font-medium">
              © 2025 Feedback Management System
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Powered by React, Vite & TailwindCSS | Professional UI Design
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
