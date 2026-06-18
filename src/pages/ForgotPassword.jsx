import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const result = await forgotPassword(email);
    
    if (result.success) {
      setIsSuccess(true);
      setMessage(result.message);
    } else {
      setIsSuccess(false);
      setMessage(result.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Reset Password</h1>
        
        {message && (
          <div style={isSuccess ? styles.successMessage : styles.errorMessage}>
            {message}
          </div>
        )}
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <p style={styles.instruction}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                placeholder="your@email.com"
              />
            </div>
            
            <button type="submit" disabled={loading} style={{...styles.button, ...(loading && styles.buttonDisabled)}}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <p style={styles.backLink}>
              <Link to="/login" style={styles.link}>← Back to Login</Link>
            </p>
          </form>
        ) : (
          <div style={styles.successBox}>
            <p style={styles.successText}>
              A password reset link has been sent to your email address.
            </p>
            <Link to="/login" style={styles.backButton}>
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: { 
    textAlign: 'center', 
    marginBottom: '20px', 
    color: '#333', 
    fontSize: '28px' 
  },
  instruction: { 
    textAlign: 'center', 
    color: '#666', 
    marginBottom: '20px', 
    fontSize: '14px' 
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px' 
  },
  formGroup: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px' 
  },
  label: { 
    fontWeight: '600', 
    color: '#555', 
    fontSize: '14px' 
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  buttonDisabled: { 
    backgroundColor: '#6c757d', cursor: 'not-allowed' },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  successBox: { textAlign: 'center' },
  successText: { marginBottom: '20px', color: '#333' },
  backButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  backLink: { textAlign: 'center', marginTop: '10px' },
  link: { color: '#0066cc', textDecoration: 'none', fontSize: '14px' },
};