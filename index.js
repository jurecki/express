const express = require('express');
const path = require('path')

const app = express();

app.listen(8000, () =>
    console.log('server is running at port 8000')
)

app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`))
    }
    next()
})

app.use(express.static(path.join(__dirname, '/public')))

app.use('/user', (req, res, next) => {
    res.show('forbidden.html')
    next()
})

app.get('/', (req, res) => {
    res.show('index.html')
})

app.get('/about', (req, res) => {
    res.show('about.html')
})

app.use((req, res, next) => {
    res.status(404).show('error.html')
})
