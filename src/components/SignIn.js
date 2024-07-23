// SignIn.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS7IypqB-LTY2wLgxuZRdJGnXFye81kPw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      // Store token or redirect
      console.log('Signed in:', data);
       localStorage.setItem('authToken',data.idToken);
       history.push('/admin')

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Admin auth</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor='email' className="text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor='password' className="text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default SignIn;
