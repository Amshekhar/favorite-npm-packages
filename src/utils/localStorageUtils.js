export const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

export const addFavorite = (favorite) => {
  const favorites = getFavorites();
  localStorage.setItem('favorites', JSON.stringify([...favorites, favorite]));
};

export const removeFavorite = (packageName) => {
  const favorites = getFavorites().filter((fav) => fav.packageName !== packageName);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};


