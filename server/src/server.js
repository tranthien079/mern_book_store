require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const express = require('express');
const { getHomepage } = require('./controllers/homeController');
const userRouter = require('./routes/userRouter');
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const messageRouter = require('./routes/messageRoute');
const path = require('path');

const cors = require('cors')
const { app, io, server } = require('./socket/socket.js');
const port = process.env.PORT || 8888;



//config req.body
app.use(cors())
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data
//config template engine
configViewEngine(app);

//khai báo route
app.use('/v1/api/', userRouter);
app.use('/v1/api/author/', authorRouter);
app.use('/v1/api/book/', bookRouter);
app.use('/v1/api/message/', messageRouter);

// Cấu hình thư mục tĩnh
app.use(express.static(path.join(__dirname, 'client/dist')));

// Cấu hình route catch-all để trả về index.html cho các yêu cầu không khớp
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

(async () => {
    try {
        //using mongoose
        await connection();

        server.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()
