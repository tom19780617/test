const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const routerpage = require('./page.js');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/', routerpage);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    post: process.env.DB_POST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: true }
})

app.get('/api/leaderboard', (req, res) => {
    db.query('select name,score from learn order by score desc', (error, results) => {
        if (error) {
            console.error('錯誤', error);
            return res.status(500).send('讀取失敗');
        }
        res.json(results);
    })
})


app.post('/api/saveResult', (req, res) => {
    const { name, score } = req.body;
    db.query('insert into learn (name,score) values(?,?)', [name, score], (error) => {
        if (error) return res.status(500).send('上傳失敗!');
        res.json({ message: '資料上傳成功!' });
    })
})

app.listen(3000, () => console.log('伺服器已啟動!'));