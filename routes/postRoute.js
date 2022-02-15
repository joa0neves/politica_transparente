const Post = require("../models/post");
const { v4: uuidv4 } = require('uuid');

router.get('/list', async (req, res) => {
    try {
      const posts = await Post.find()
      res.json(posts)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  router.get('/search/:tag', search, (req, res) => {
    res.json(res.posts)
  })

  router.get('/list/:titulo', getPostByTitulo, (req, res) => {
    res.json(res.post)
  })

  router.get('/list/author_id/:titulo', getPostByTitulo, (req, res) => {
    res.json(res.post)
  })

  router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
  })

  router.post('/new', async (req, res) => {
    const post = new Post({
      _id:uuidv4(),
      author_id: req.body.author_id,
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      envolvidos: req.body.envolvidos,
      searchTags: ''+req.body.titulo+' '+req.body.descricao
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

  async function getPostByAuthorId(req, res, next) {
    let post
    try {
      post = await Post.find({author_id: req.params.author_id}).exec();
      if (post == null) {
        return res.status(404).json({ message: 'Cannot find Post' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.post = post
    next()
  }

  async function getPostByTitulo(req, res, next) {
    let post
    try {
      post = await Post.find({titulo: { $regex: '.*' +  req.params.titulo + '.*' }}).exec();
      if (post == null) {
        return res.status(404).json({ message: 'Cannot find Post' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.post = post
    next()
  }

  async function getPostByTitulo(req, res, next) {
    let post
    try {
      post = await Post.find({titulo: { $regex: '.*' +  req.params.titulo + '.*' }}).exec();
      if (post == null) {
        return res.status(404).json({ message: 'Cannot find Post' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.post = post
    next()
  }

  async function search(req, res, next) {
    let posts
    let searchExp=req.params.tag.toLowerCase().split(" ").join('.*')
    try {
      posts = await Post.find({searchTags: { $regex: '.*' +  searchExp + '.*', $options: "si"} }).exec();
      if (posts == null) {
        return res.status(404).json({ message: 'Cannot find Post' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.posts = posts
    next()
  }

  module.exports = router;