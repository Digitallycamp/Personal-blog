import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  
  const formattedDate = article.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recent';

  return (
    <div className="article-card" style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      backgroundColor: '#fff'
    }}>
      {article.featuredImage && (
        <img 
          src={article.featuredImage} 
          alt={article.title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '15px'
          }}
        />
      )}
      
      <div className="article-meta" style={{
        fontSize: '14px',
        color: '#666',
        marginBottom: '10px'
      }}>
        <span className="category" style={{
          backgroundColor: '#f0f0f0',
          padding: '4px 8px',
          borderRadius: '4px',
          marginRight: '10px'
        }}>
          {article.category?.name || 'Uncategorized'}
        </span>
        <span className="date">{formattedDate}</span>
        {article.viewCount !== undefined && (
          <span className="views" style={{ marginLeft: '10px' }}>
            👁️ {article.viewCount} views
          </span>
        )}
      </div>
      
      <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '10px',
          color: '#333'
        }}>
          {article.title}
        </h2>
      </Link>
      
      <p style={{
        color: '#666',
        lineHeight: '1.6',
        marginBottom: '15px'
      }}>
        {article.description}
      </p>
      
      <div className="article-footer">
        {article.tags && article.tags.length > 0 && (
          <div className="tags" style={{ marginBottom: '10px' }}>
            {article.tags.map((tag, index) => (
              <span key={index} style={{
                display: 'inline-block',
                backgroundColor: '#e8f4f8',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                marginRight: '8px'
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <Link 
          to={`/blog/${article.slug}`}
          style={{
            display: 'inline-block',
            color: '#0066cc',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}