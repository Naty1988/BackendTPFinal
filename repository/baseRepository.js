class BaseRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getAll(id) {
      return await this.dao.getAll(id);
    }
  
    async create(newEntity) {
      return await this.dao.create(newEntity);
    }
  }
  
  export default BaseRepository;