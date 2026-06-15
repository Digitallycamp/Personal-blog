import { useEffect, useState } from 'react';
import { articleAPI } from '../services/api';
import ArticleCard from '../components/ArticleCard';

export default function BlogListing() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await articleAPI.getAll();
      console.log('API Response:', response.data);
      setArticles(response.data.data || []);
    } catch (err) {
      console.error('Error loading articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading articles...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h2>Error: {error}</h2>
        <p>Make sure your backend is running on http://localhost:5001</p>
      </div>
    );
  }

  return (
    <div className="blog-listing" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 className='flex items-end gap-2 text-2xl font-bold mb-8'>
                My Blog <span className='w-10 h-1 bg-blue-500 block'></span>
      </h2>
      
      {articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>No articles yet</h3>
          <p>Check back soon for new content!</p>
        </div>
      ) : (
        <div className="articles-list">
          {articles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}