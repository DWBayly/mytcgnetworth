require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');