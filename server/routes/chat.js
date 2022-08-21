const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const pusherConfig = require('../config')
const pusher = new Pusher({
    appId: pusherConfig.appId,
    key: pusherConfig.key,
    secret: pusherConfig.secret,
    cluster: pusherConfig.cluster,
    useTLS: pusherConfig.useTLS
});

router.get('/', (req, res) => {
    res.status(200).send(`/`);
});
router.post('/sendmessage', (req, res) => {
    pusher.trigger(req.query.name, req.query.event, {
        message: req.body.message
    }, null, (err) => {
        res.status(404).send(`err ${err}`);
    });
    res.status(200).send(`message sent to ${req.query.name}`);
});
router.post('/pusher/auth', (req, res) => {
    const query = req.query;
    const socketId = query.socket_id;

    const userInfo = {
        id: 'sesha',
        user_info: { name: "sesha prasan" },
    };

    const auth = JSON.stringify(
        pusher.authenticateUser(socketId, userInfo)
    );

    res.set({
        'content-Type': 'application/javascript'
    });

    res.send(auth)
})
module.exports = router;