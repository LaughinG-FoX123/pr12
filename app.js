const express = require('express')
const fs = require('fs')

const app = express()



// 1
app.get('/error', (req, res) => {
    try {
        throw new Error('Тестовое исключение')
    } catch (e) {
        // 6
        fs.appendFile('errors.log', `\nСообщение ошибки: ${e.message}`, (e) => {
            console.log("\nFile Contents of file after append:",
                fs.readFileSync("errors.log", "utf8"));
        })
        res.status(500).send('Internal Server Error')
    }
})

// 2
app.post('/parse-json', (req, res) => {
    try{
        const json = req.body
        JSON.parse(json)
    } catch (err) {
        res.status(400).send('Bad Request')
    }
    
})

// 3
app.get('/user', (req, res) => {
    const name =  req.query.name
    try{
        if (name === '') {
            throw new Error('Имя обязательно')
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
})

// 4
app.get('/fetch', (req, res) => {
    try {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            console.log(json)
        })
    } catch (e) {
        res.status(503).send('Service Unavailable')
    }
})

// 5
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
});

// 7
app.get('/divide', (req, res) => {
    const a = req.query.a
    const b = req.query.b

    try {
        if (b == 0)
            throw new Error('Деление на ноль')
        else {
            throw new Error('...')
        }
    }catch (e) {
        if (e.message === 'Деление на ноль')
            res.status(400).send(e.message)
        else if (e.message === '...'){
            res.status(401).send(e.message)
        }
    }
    console.log(a/b)
})

// 8
app.get('/data', (req, res, next) => {
    try {
        throw new Error('test error')
    } catch (err) {
        next(err)
    }
    console.log('task complited')
})

// 9
app.get('/read-file', (req, res) => {
    try {
        fs.readFileSync('data.txt')
    } catch (e) {
        res.status(404).send(`404 Not Found`)
    }
})

// 10
app.get('/process', (req, res) => {
    try {
        const json = JSON.parse(req.body)
        if (typeof json.email === 'undefined') {
            console.log('Поля "email" нет');
        } else {
            console.log('Поле "email" в наличии, значение: ' + json.email);
        }
    } catch (e) {
        console.log(e)
        res.status(422).send('Unprocessable Entity')
    }
})














app.listen(3000, () => {
    console.log("Hello, server!")
})