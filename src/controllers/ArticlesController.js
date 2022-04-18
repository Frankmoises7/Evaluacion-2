const ArticlesDAO = require('../models/dao/ArticlesDAO')

class ArticlesController {
  constructor (db) {
    this.articlesDao = new ArticlesDAO(db)
    this.renderHome = this.renderHome.bind(this)
    this.renderSingleArticle = this.renderSingleArticle.bind(this)
    this.renderArticleCreationForm = this.renderArticleCreationForm.bind(this)
    this.renderArticleUpdateForm = this.renderArticleUpdateForm.bind(this)
    this.insertAndRenderArticle = this.insertAndRenderArticle.bind(this)
    this.updateAndRenderArticle = this.updateAndRenderArticle.bind(this)
    this.deleteArticleAndRenderResponse = this.deleteArticleAndRenderResponse.bind(this)
    this.renderReviews = this.renderReviews.bind(this)
  }

  renderHome (req, res) {
    res.render('home')
  }

  async renderSingleArticle (req, res) {
    const id = req.params.id

    try {
      const article = await this.articlesDao.getById(id)

      if (!article) {
        res.status(404).render('404')
        return
      }

      res.render('article', {
        id,
        title: article.title,
        content: article.content,
        nameuser: article.nameuser
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderArticleCreationForm (req, res) {
    res.render('article-form')
  }

  //Muestra las reviews en una nueva vista
  async renderReviews (req, res) {
    const articles = await this.articlesDao.getAll()
    res.render('reviews', {
      articles
    })
  }

  async renderArticleUpdateForm (req, res) {
    const id = req.params.id

    try {
      const article = await this.articlesDao.getById(id)

      if (!article) {
        res.status(404).render('404')
        return
      }

      res.render('article-form', {
        id,
        title: article.title,
        content: article.content,
        nameuser: article.nameuser
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderArticle (req, res) {
    const title = req.body.title
    const content = req.body.content
    const nameuser = req.body.nameuser

    const article = { title, content, nameuser }

    try {
      const id = await this.articlesDao.create(article)

      res.redirect(`/articles/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderArticle (req, res) {
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const nameuser = req.body.nameuser

    try {
      const article = { title, content, nameuser, id }

      await this.articlesDao.update(article)

      res.redirect(`/articles/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteArticleAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const article = await this.articlesDao.getById(id)

      if (!article) {
        res.status(404).render('404')
        return
      }

      await this.articlesDao.delete(id)

      res.render('article-deleted', {
        id,
        title: article.title,
        nameuser: article.nameuser
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = ArticlesController
