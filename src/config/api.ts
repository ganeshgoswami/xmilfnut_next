const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.badwap.fun';

export const API_ENDPOINTS = {
  CATEGORIES: `${API_BASE_URL}/api/categoryFirstData`,
  CATEGORY_VIDEOS: (category: string, page: number) => 
    `${API_BASE_URL}/api/seprateCate?category=${encodeURIComponent(category)}&page=${page}`,
  MODEL_VIDEOS: (model: string, page: number = 1) =>
    `${API_BASE_URL}/api/findOneModelStar?model=${encodeURIComponent(model)}&page=${page}`,
  PORSTARS: `${API_BASE_URL}/api/pornstars`,
};
