const router = require('express').Router();
const {Post, User} = require('../../models');
const sequelize = require('../../config/connection');


router.get('/', (req, res)=> {
    Post.findAll ({
        attributes:[
            'id',
            'title',
            'eventdate',
            'comments'
        ],
        order: [['created_at', 'DESC']],
    //     include: [
    //     {
    //         model: User,
    //         attributes:['firstname','lastname']
    //     }
    //   ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    });
})

router.get(':/id', (req, res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes:[
            'id',
            'title',
            'eventdate',
            'comments'
        ],
        order: [['created_at', 'DESC']],
    //     include: [
    //     {
    //         model: User,
    //         attributes:['user_id','firstname','lastname']
    //     }
    //   ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    });
});

router.post('/', (req, res)=> {
    Post.create ({
        title: req.body.title,
        eventdate: req.body.eventdate,
        comments: req.body.eventdate,
        // user_id: req.body.user_id
    })
    .then(dbPostData =>res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

router.put(':/id', (req, res) => {
    Post.update({

    })
})
router.delete(':/id', (req, res) => {
    Post.destroy({
        where: {
        id:req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message:'Cannot find a post with this id'})
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;
