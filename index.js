const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();
const formidable = require('formidable')

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.listen(8000, () =>
    console.log('server is running at port 8000')
)

app.use(express.static(path.join(__dirname, '/public')))

app.use('/user', (req, res, next) => {
    res.render('forbidden')
    next()
})

app.use(express.urlencoded({ extended: true }));


app.post('/contact/send-message', (req, res, next) => {

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const { author, sender, title, message } = fields;

        if (author && sender && title && message && files.design.size !== 0) {
            res.render('contact', { isSent: true, design: files.design.name })
        } else {
            res.render('contact', { isError: true })
        }
    });
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name })
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about', { layout: 'dark' })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/info', (req, res) => {
    res.render('info')
})

app.get('/history', (req, res) => {
    res.render('history');
})

app.use((req, res, next) => {
    res.status(404).render('error')
})
