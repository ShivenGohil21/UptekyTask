const FeedbackTable = ({ feedbacks }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
        <div className="text-center">
          <span className="text-8xl block mb-4">📭</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Feedbacks Yet</h3>
          <p className="text-gray-500">Be the first to share your thoughts!</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating)
  }

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-green-100 text-green-700 border-green-300'
    if (rating === 3) return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    return 'bg-red-100 text-red-700 border-red-300'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span className="text-4xl">💬</span>
          All Feedbacks
          <span className="text-lg font-normal text-gray-500 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-1 rounded-full border border-blue-200">
            {feedbacks.length} {feedbacks.length === 1 ? 'feedback' : 'feedbacks'}
          </span>
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((feedback, index) => (
              <tr 
                key={feedback._id} 
                className="hover:bg-blue-50 transition duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-200">
                      <span className="text-white font-bold text-lg">
                        {feedback.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {feedback.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{feedback.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border-2 ${getRatingColor(feedback.rating)}`}>
                    {getRatingStars(feedback.rating)} ({feedback.rating})
                  </span>
                </td>
                <td className="px-6 py-4 max-w-md">
                  <div className="text-sm text-gray-700 line-clamp-2" title={feedback.message}>
                    {feedback.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>🕐</span>
                    {formatDate(feedback.createdAt)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FeedbackTable
