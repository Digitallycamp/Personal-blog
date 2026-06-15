import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();

  useEffect(() => {
    if (!token) {
      setMessage('Invalid reset link. Please request a new one.');
      setIsSuccess(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsSuccess(false);
      return;
    }
    
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setIsSuccess(false);
      return;
    }
    
    setLoading(true);
    setMessage(null);
    
    const result = await resetPassword(token, password);
    
    if (result.success) {
      setIsSuccess(true);
      setMessage(result.message);
      setTimeout(() => navigate('/login'), 3000);
    } else {
      setIsSuccess(false);
      setMessage(result.message);
    }
    setLoading(false);
  };

  if (!token && !isSuccess) {
    return (
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Invalid Reset Link</h1>
          <p style={styles.errorText}>{message || 'No reset token provided.'}</p>
          <Link to="/forgot-password" style={styles.backButton}>
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Create New Password</h1>
        
        {message && (
          <div style={isSuccess ? styles.successMessage : styles.errorMessage}>
            {message}
          </div>
        )}
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <p style={styles.instruction}>
              Please enter your new password below.
            </p>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
                placeholder="Enter new password"
                minLength="6"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={styles.input}
                placeholder="Confirm new password"
              />
            </div>
            
            <button type="submit" disabled={loading} style={{...styles.button, ...(loading && styles.buttonDisabled)}}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <div style={styles.successBox}>
            <p style={styles.successText}>
              Your password has been successfully reset!
            </p>
            <p style={styles.redirectText}>Redirecting to login...</p>
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
  title: { textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '28px' },
  instruction: { textAlign: 'center', color: '#666', marginBottom: '20px', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontWeight: '600', color: '#555', fontSize: '14px' },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  buttonDisabled: { backgroundColor: '#6c757d', cursor: 'not-allowed' },
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
  errorText: { textAlign: 'center', color: '#721c24', marginBottom: '20px' },
  successBox: { textAlign: 'center' },
  successText: { marginBottom: '20px', color: '#333' },
  redirectText: { color: '#666', fontSize: '14px' },
  backButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    textAlign: 'center',
  },
};