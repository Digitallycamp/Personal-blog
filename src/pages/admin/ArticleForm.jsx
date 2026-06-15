import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { articleAPI } from '../../services/api';

export default function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    author: 'Admin'
  });

  
  useEffect(() => {
    fetchCategories();
    if (id) {
      loadArticle();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
    console.log('Fetching categories...');
    const response = await fetch('http://localhost:5001/api/v1/cat');
    const data = await response.json();
    console.log('Categories response:', data);
    
    
    if (data.status && data.data) {
      
      setCategories(data.data);
    } else if (Array.isArray(data)) {
      
      setCategories(data);
    } else if (data.categories) {
      
      setCategories(data.categories);
    } else {
      console.error('Unexpected categories response structure:', data);
      setCategories([]);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    setCategories([]);
  }
  };

  const loadArticle = async () => {
    setLoading(true);
    try {
      const response = await articleAPI.getById(id);
      const article = response.data.data;
      setFormData({
        title: article.title || '',
        description: article.description || '',
        content: article.content || '',
        category: article.category?._id || '',
        tags: article.tags ? article.tags.join(', ') : '',
        featuredImage: article.featuredImage || '',
        author: article.author || 'Admin'
      });
    } catch (error) {
      console.error('Error loading article:', error);
      alert('Error loading article');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      content: formData.content,
      category: formData.category,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      featuredImage: formData.featuredImage.trim(),
      author: formData.author.trim()
    };

    try {
      if (id) {
        await articleAPI.update(id, payload);
        alert('✅ Article updated successfully!');
      } else {
        await articleAPI.create(payload);
        alert('✅ Article created successfully!');
      }
      navigate('/admin/articles');
    } catch (err) {
      console.error('Error saving article:', err);
      alert('❌ Error saving article. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/admin/articles" style={styles.backLink}>
          ← Back to Articles
        </Link>
        <h1 style={styles.title}>
          {id ? 'Edit Article' : 'Create New Article'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Title <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter an engaging title"
            value={formData.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <small style={styles.helperText}>
            This will be used as the main heading and for the URL slug
          </small>
        </div>

        <div style={styles.row}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>
              Category <span style={styles.required}>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={styles.label}>Author</label>
            <input
              type="text"
              name="author"
              placeholder="Author name"
              value={formData.author}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Description <span style={styles.required}>*</span>
          </label>
          <textarea
            name="description"
            placeholder="Write a compelling short description (this appears in blog listings)"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
            style={styles.textarea}
          />
          <small style={styles.helperText}>
            This will appear in blog cards and SEO meta descriptions (150-160 characters recommended)
          </small>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Content <span style={styles.required}>*</span>
          </label>
          <textarea
            name="content"
            placeholder="Write your article content here... (HTML supported: <p>, <h2>, <img>, etc.)"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            required
            style={styles.contentTextarea}
          />
          <small style={styles.helperText}>
            💡 Tip: You can use HTML tags like {'<h2>'}, {'<p>'}, {'<img src="url">'}, {'<ul>'}, {'<li>'} for formatting
          </small>
        </div>

        <div style={styles.row}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="react, javascript, webdev"
              value={formData.tags}
              onChange={handleChange}
              style={styles.input}
            />
            <small style={styles.helperText}>
              Comma-separated tags (e.g., "react, tutorial, beginners")
            </small>
          </div>

          <div style={{ flex: 1 }}>
            <label style={styles.label}>Featured Image URL</label>
            <input
              type="url"
              name="featuredImage"
              placeholder="https://example.com/image.jpg"
              value={formData.featuredImage}
              onChange={handleChange}
              style={styles.input}
            />
            <small style={styles.helperText}>
              External image URL for the article thumbnail
            </small>
          </div>
        </div>

        {formData.featuredImage && (
          <div style={styles.imagePreviewContainer}>
            <label style={styles.label}>Image Preview</label>
            <div style={styles.imagePreview}>
              <img 
                src={formData.featuredImage} 
                alt="Preview" 
                style={styles.previewImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML += '<p style="color: red;">Invalid image URL</p>';
                }}
              />
            </div>
          </div>
        )}

        {formData.content && (
          <div style={styles.previewContainer}>
            <label style={styles.label}>Content Preview</label>
            <div style={styles.contentPreview}>
              <div dangerouslySetInnerHTML={{ 
                __html: formData.content.length > 500 
                  ? formData.content.substring(0, 500) + '...' 
                  : formData.content 
              }} />
            </div>
          </div>
        )}

        <div style={styles.actions}>
          <Link to="/admin/articles" style={styles.cancelButton}>
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={saving}
            style={{
              ...styles.submitButton,
              ...(saving ? styles.submitButtonDisabled : {})
            }}
          >
            {saving ? (
              <>
                <span style={styles.spinnerSmall}></span>
                {id ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              id ? 'Update Article' : 'Create Article'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    marginBottom: '30px'
  },
  backLink: {
    color: '#0066cc',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'inline-block',
    marginBottom: '15px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0',
    color: '#333'
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  formGroup: {
    marginBottom: '24px'
  },
  row: {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '14px'
  },
  required: {
    color: '#dc3545'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#fff',
    fontFamily: 'inherit'
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  contentTextarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'monospace',
    resize: 'vertical'
  },
  helperText: {
    display: 'block',
    marginTop: '5px',
    fontSize: '12px',
    color: '#666'
  },
  imagePreviewContainer: {
    marginBottom: '24px'
  },
  imagePreview: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    textAlign: 'center'
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '4px'
  },
  previewContainer: {
    marginBottom: '24px'
  },
  contentPreview: {
    marginTop: '10px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    maxHeight: '300px',
    overflow: 'auto',
    fontSize: '14px'
  },
  actions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    textDecoration: 'none',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center'
  },
  submitButton: {
    padding: '10px 24px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d',
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
  spinnerSmall: {
    display: 'inline-block',
    width: '14px',
    height: '14px',
    border: '2px solid #f3f3f3',
    borderTop: '2px solid #fff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  }
};