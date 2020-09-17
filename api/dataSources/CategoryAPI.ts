import BaseDataSource from './BaseDataSource';

class CategoryAPI extends BaseDataSource {
  async findManyCategories() {
    const { db } = this.context;
    const categories = await db.category.findMany();
    return categories;
  }

  async findOneCategoryBySlug(name: string) {
    const { db } = this.context;
    const category = await db.category.findOneBySlug(name);
    return category;
  }
}

export default CategoryAPI;
