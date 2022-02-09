const Post = require("../models/post");
const { v4: uuidv4 } = require('uuid');

router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find()
      res.json(posts)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  router.get('/posts/:id', getPost, (req, res) => {
    res.json(res.post)
  })

  router.post('/posts/new', async (req, res) => {
    const post = new Post({
      _id:uuidv4(),
      author_id: req.body.author_id,
      titulo: req.body.titulo,
      descricao: req.body.titulo,
      envolvidos: req.body.envolvidos
    });
    try {
      const newPost = await post.save()
      res.status(201).json(newPost)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

  async function getPost(req, res, next) {
    let post
    try {
        post = await Post.findById(req.params.id)
      if (post == null) {
        return res.status(404).json({ message: 'Cannot find Post' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.post = post
    next()
  }

  module.exports = router;