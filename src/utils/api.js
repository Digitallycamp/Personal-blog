const API_URL = 'http://localhost:8000/api/v1';

export const fetchArticles = async () => {
	const response = await fetch(`${API_URL}/article`);

	if (!response.ok) {
		throw new Error('Failed to fetch articles');
	}

	return response.json();
};

export const fetchArticle = async (id) => {
	const response = await fetch(`${API_URL}/article/${id}`);

	if (!response.ok) {
		throw new Error('Failed to fetch article');
	}

	return response.json();
};