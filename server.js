const express = require('express')
const morgan = require('morgan')
const route = require('./Routes/routes.js')
const routeAdmin = require('./Routes/admin')
const helmet = require('helmet')


const PORT = process.env.PORT || 3000;
const app = express()

app.use(morgan('dev'))
app.use(helmet())

app.use('/admin', routeAdmin)
app.use('/', route)


app.listen(PORT, ()=> {
    console.log('listening port 3000');
})