const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid'); 

let videosArray = JSON.parse(fs.readFileSync('./data/videos.json'))

//GET /videos - contains only enough information to shows on the sidebar
router.get('/', (_req, res) => {
    let videosList = [];
    videosArray.forEach(video => {
        const {id, title, channel, image} = video;
        let newVideo = {id, title, channel, image};
        videosList.push(newVideo);
    });
    res.json(videosList)
})

//GET /videos/:id - returns a detailed object of a single video
router.get('/:id', (req, res) => {
    // let videosArray = JSON.parse(fs.readFileSync('./data/videos.json'))
    const videoDetail = videosArray.find(video => video.id === req.params.id)
    res.json(videoDetail)
})

// POST /videos that will add a new video with unique id
router.post('/', (req, res) => {
    const {title, description, image} = req.body;
    const newVideo = {
        title,
        channel: "me",
        image,
        description,
        views: Math.floor(Math.random() * 1000001).toLocaleString(),
        likes: Math.floor(Math.random() * 1000001).toLocaleString(),
        duration: "4:01",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [
            {
                "name": "Micheal Lyons",
                "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
                "likes": 0,
                "timestamp": 1628522461000
                },
                {
                "name": "Gary Wong",
                "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
                "likes": 0,
                "timestamp": 1626359541000
                },
                {
                "name": "Theodore Duncan",
                "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
                "likes": 0,
                "timestamp": 1626011132000
                }
        ],
        id: uniqid()
    }
    videosArray.push(newVideo);
    const updatedVideosFile = fs.writeFileSync('./data/videos.json', JSON.stringify(videosArray));
    res.json(updatedVideosFile)
})

module.exports = router