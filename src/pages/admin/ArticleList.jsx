import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../../services/api';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await articleAPI.getAll();
      setArticles(response.data.data || []);
    } catch (err) {
      console.error('Error loading articles:', err);
      alert('Error loading articles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      setDeletingId(id);
      try {
        await articleAPI.delete(id);
        await loadArticles();
        alert('✅ Article deleted successfully!');
      } catch (err) {
        console.error('Error deleting article:', err);
        alert('❌ Error deleting article');
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Articles</h1>
        <Link to="/admin/articles/create" style={styles.createButton}>
          + Create New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No articles yet. Create your first article!</p>
          <Link to="/admin/articles/create" style={styles.emptyStateButton}>
            Create Article
          </Link>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Views</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <Link to={`/blog/${article.slug}`} style={styles.articleLink}>
                      {article.title}
                    </Link>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.categoryBadge}>
                      {article.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td style={styles.td}>{article.viewCount || 0}</td>
                  <td style={styles.td}>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <Link 
                      to={`/admin/articles/edit/${article._id}`} 
                      style={styles.editButton}
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(article._id)}
                      disabled={deletingId === article._id}
                      style={{
                        ...styles.deleteButton,
                        ...(deletingId === article._id ? styles.deleteButtonDisabled : {})
                      }}
                    >
                      {deletingId === article._id ? '...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0',
    color: '#333'
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '500'
  },
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #e0e0e0'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff'
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e0e0e0'
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#555'
  },
  tableRow: {
    borderBottom: '1px solid #e0e0e0',
    transition: 'background-color 0.2s'
  },
  td: {
    padding: '12px 15px',
    verticalAlign: 'middle'
  },
  articleLink: {
    color: '#0066cc',
    textDecoration: 'none',
    fontWeight: '500'
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#e8f4f8',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#0066cc'
  },
  editButton: {
    marginRight: '10px',
    color: '#0066cc',
    textDecoration: 'none',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  deleteButton: {
    color: '#dc3545',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  deleteButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #0066cc',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  emptyStateButton: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px'
  }
};