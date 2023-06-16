const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db');
const cookieParser = require('cookie-parser');
const moviesRouter = require('./routers/moviesRouters')
const membersRouters = require('./routers/memberRouters')
const usersRoutes = require('./routers/usersRouters')
const usersController = require('./controllers/usersController')
const subscriptionsRouter = require('./routers/subscriptionsRouters')
const bodyParser = require('body-parser');

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use('/api/movies', moviesRouter)
app.use('/api/auth', usersRoutes)
app.use('/api/users', usersController)
app.use('/api/Members', membersRouters)
app.use('/api/subscriptions', subscriptionsRouter)


const port = 8000;
app.listen(port, () => {
    console.log(`app is listening at: http://localhost:${port}`);
  });
  
