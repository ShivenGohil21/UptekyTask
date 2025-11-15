const AnalyticsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Feedbacks',
      value: stats?.totalFeedbacks || 0,
      icon: '📊',
      gradient: 'from-blue-500 to-blue-600',
      bgIcon: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Average Rating',
      value: stats?.averageRating || '0.00',
      icon: '⭐',
      gradient: 'from-yellow-500 to-orange-500',
      bgIcon: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      suffix: ' / 5.00'
    },
    {
      title: 'Positive Feedbacks',
      value: stats?.positiveFeedbacks || 0,
      icon: '👍',
      gradient: 'from-green-500 to-emerald-600',
      bgIcon: 'bg-green-100',
      textColor: 'text-green-600',
      subtitle: 'Rating 4+'
    },
    {
      title: 'Negative Feedbacks',
      value: stats?.negativeFeedbacks || 0,
      icon: '👎',
      gradient: 'from-red-500 to-rose-600',
      bgIcon: 'bg-red-100',
      textColor: 'text-red-600',
      subtitle: 'Rating < 3'
    }
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span className="text-4xl">📈</span>
          Analytics Dashboard
        </h2>
        <p className="text-gray-600 mt-2">Comprehensive feedback insights and analytics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-100"
          >
            <div className={`bg-gradient-to-br ${card.gradient} p-6 text-white relative overflow-hidden`}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 h-24 w-24 rounded-full bg-white opacity-10"></div>
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-32 w-32 rounded-full bg-white opacity-10"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.bgIcon} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3`}>
                    <span className="text-4xl">{card.icon}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold opacity-90 mb-2 uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-4xl font-extrabold">
                  {card.value}
                  {card.suffix && <span className="text-xl opacity-75">{card.suffix}</span>}
                </p>
                {card.subtitle && (
                  <p className="text-xs opacity-75 mt-2 font-medium">{card.subtitle}</p>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-medium">Analytics</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Updated
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsCards
