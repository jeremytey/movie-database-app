const WATCHLIST_KEY = 'watchlistIds';

export function getWatchlistIds() {
  try {
    const ids = localStorage.getItem(WATCHLIST_KEY);
    return ids ? JSON.parse(ids) : [];
  } catch (error) {
    console.error('Error reading watchlist:', error);
    return [];
  }
}

export function addToWatchlist(movieId) {
  try {
    const existingIds = getWatchlistIds();
    
    // Check if already exists
    if (existingIds.includes(movieId)) {
      return { success: false, message: 'Movie already in watchlist' };
    }
    
    // Add new ID
    const updatedIds = [...existingIds, movieId];
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedIds));
    
    return { success: true, message: 'Added to watchlist' };
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return { success: false, message: 'Failed to add to watchlist' };
  }
}

export function removeFromWatchlist(movieId) {
  try {
    const existingIds = getWatchlistIds();
    const updatedIds = existingIds.filter(id => id !== movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedIds));
    
    return { success: true, message: 'Removed from watchlist' };
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return { success: false, message: 'Failed to remove from watchlist' };
  }
}

export function isInWatchlist(movieId) {
  const ids = getWatchlistIds();
  return ids.includes(movieId);
}