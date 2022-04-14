class ArticlesDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, title, content, nameuser FROM articles order by id desc')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, title, content, nameuser FROM articles WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (article) {
    const response = await this.db.query('INSERT INTO articles (title, content, nameuser) VALUES (?, ?, ?)', [article.title, article.content, article.nameuser])
    const result = response[0]
    return result.insertId
  }

  async update (article) {
    const response = await this.db.query('UPDATE articles SET content = ? WHERE id = ?', [article.content, article.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM articles WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = ArticlesDAO
