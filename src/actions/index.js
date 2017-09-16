import { getCategories } from '../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchCategories() {
  getCategories()
    .then(function (response) {
      return {
        type: FETCH_CATEGORIES,
        payload: response.data.categories
      }
    })
};
