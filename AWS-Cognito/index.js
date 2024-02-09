const express = require('express');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// here go the Region, I normally use: us-east-1
AWS.config.update({ region: 'us-east-1' });

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

// API endpoint for user signup
app.post('/api/signup', (req, res) => {
  const { username, password, email } = req.body;

  const params = {
    ClientId: 'CLIENT_ID', // client ID inside of the AWS panel
    Password: password,
    Username: username,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  cognitoIdentityServiceProvider.signUp(params, (err, data) => {
    if (err) {
      console.error('Error signing up:', err);
      res.status(500).json({ message: 'Failed to sign up' });
    } else {
      res.json({ message: 'User signed up successfully', data });
    }
  });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const params = {
    AuthFlow: 'PASSWORD_AUTH',
    ClientId: 'CLIENT_ID', // client ID inside of the AWS panel
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  cognitoIdentityServiceProvider.initiateAuth(params, (err, data) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(401).json({ message: 'Login failed' });
    } else {
      const token = data.AuthenticationResult.AccessToken;
      res.json({ token });
    }
  });
});

// Middleware for token validation
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token is required' });

  jwt.verify(token, 'SECRET_KEY', (err, decoded) => { // refers to the secret key used to sign and verify JSON Web Tokens (JWTs) for authentication.
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

app.get('/api/users', authenticateToken, (req, res) => {
  res.json({ message: 'Authenticated User', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
