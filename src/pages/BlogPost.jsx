import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articleAPI } from '../services/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await articleAPI.getBySlug(slug);
      console.log('Article data:', response.data);
      setArticle(response.data.data);
      
      if (response.data.data?.category?._id) {
        const relatedRes = await articleAPI.getByCategory(response.data.data.category._id);
        const others = relatedRes.data.data.filter(a => a._id !== response.data.data._id);
        setRelatedArticles(others.slice(0, 3));
      }
    } catch (err) {
      console.error('Error loading article:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading article...</h2>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Article not found</h2>
        <Link to="/blog">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-post" style={{ maxWidth: '660px', width: '100%', marginLeft: 'auto' , marginRight: 'auto', borderLeft: '1px solid #a3a3a3', borderRight: '1px solid #a3a3a3', padding: '24px' }}>
      
      <header style={{ marginBottom: '30px' }}>
        <Link to="/blog" style={{ color: '#0066cc', textDecoration: 'none' }}>
          ← Back to Blog
        </Link>
        
        <h1 style={{ fontSize: '36px', marginTop: '20px', marginBottom: '20px' }}>
          {article.title}
        </h1>
        
        <div className="meta" style={{ 
          color: '#666', 
          borderBottom: '1px solid #e0e0e0',
          paddingBottom: '20px',
          marginBottom: '20px'
        }}>
          <span style={{ marginRight: '15px' }}>
            Category: {article.category?.name}
          </span>
          <span style={{ marginRight: '15px' }}>
            👁️ {article.viewCount} views
          </span>
          <span>
            📅 {new Date(article.createdAt).toLocaleDateString()}
          </span>
          {article.author && (
            <span style={{ marginLeft: '15px' }}>
              ✍️ By {article.author}
            </span>
          )}
        </div>
      </header>
      
      {article.featuredImage && (
        <img 
          src={article.featuredImage} 
          alt={article.title}
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '30px'
          }}
        />
      )}
      
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
        style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333'
        }}
      />
      
      {article.tags && article.tags.length > 0 && (
        <div className="tags" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
          <h3>Tags:</h3>
          <div>
            {article.tags.map((tag, index) => (
              <span key={index} style={{
                display: 'inline-block',
                backgroundColor: '#f0f0f0',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                marginRight: '10px',
                marginBottom: '10px'
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {relatedArticles.length > 0 && (
        <div className="related-articles" style={{ marginTop: '50px' }}>
          <h3 style={{ marginBottom: '20px' }}>Related Articles</h3>
          <div style={{ display: 'grid', gap: '20px' }}>
            {relatedArticles.map(related => (
              <Link 
                key={related._id} 
                to={`/blog/${related.slug}`}
                style={{
                  display: 'block',
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <h4 style={{ marginBottom: '5px', color: '#0066cc' }}>{related.title}</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>{related.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}