const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();


app.get('/tiktok-callback', async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    const YOUR_CLIENT_ID = process.env.TIKTOK_CLIENT_ID;
    const YOUR_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
    const YOUR_REDIRECT_URI = 'https://tiktok-automatic.vercel.app/';

    // Exchange the code for an access token
    try {
        const response = await axios.post('https://open-api.tiktok.com/oauth/access_token/', {
            client_key: YOUR_CLIENT_ID,
            client_secret: YOUR_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: YOUR_REDIRECT_URI
        });

        const accessToken = response.data.data.access_token;
        
        // Use the access token to get user data or authenticate the user in your system
        // ...

        res.send('Login successful!');
    } catch (error) {
        console.error('Error exchanging code for token', error);
        res.status(500).send('Authentication failed');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
