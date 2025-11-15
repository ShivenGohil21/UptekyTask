// API Configuration
const API_BASE_URL = 'http://localhost:5001/api';

// API Service for Feedback Management
const api = {
  // Get all feedbacks
  getAllFeedbacks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Failed to fetch feedbacks');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      // Re-throw with a more user-friendly message for network errors
      if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the backend server is running.');
      }
      throw error;
    }
  },

  // Get feedback by ID
  getFeedbackById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching feedback:', error);
      throw error;
    }
  },

  // Get feedback statistics
  getFeedbackStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Add new feedback
  addFeedback: async (feedbackData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add feedback');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw error;
    }
  },

  // Update feedback
  updateFeedback: async (id, feedbackData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update feedback');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating feedback:', error);
      throw error;
    }
  },

  // Delete feedback
  deleteFeedback: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting feedback:', error);
      throw error;
    }
  },
};

export default api;
