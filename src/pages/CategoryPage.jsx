import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { articleAPI } from '../services/api';
import ArticleCard from '../components/ArticleCard';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategoryArticles();
  }, [categoryId]);

  const loadCategoryArticles = async () => {
    try {
      setLoading(true);
      const response = await articleAPI.getByCategory(categoryId);
      console.log('Category articles:', response.data);
      setArticles(response.data.data || []);
      
      
      if (response.data.data && response.data.data.length > 0 && response.data.data[0].category) {
        setCategoryName(response.data.data[0].category.name);
      }
    } catch (err) {
      console.error('Error loading category articles:', err);
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
      </div>
    );
  }

  return (
    <div className="category-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>
        {categoryName || 'Category'} Articles
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Found {articles.length} article(s) in this category
      </p>
      
      {articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>No articles found in this category</h3>
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