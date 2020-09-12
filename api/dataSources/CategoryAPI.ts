import BaseDataSource from './BaseDataSource';

class CategoryAPI extends BaseDataSource {
  async findCategories() {
    const { db } = this.context;
    const categories = await db.category.find();
    return categories;
  }

  async findCategoryBySlug(name: string) {
    const { db } = this.context;
    const category = await db.category.findOneBySlug(name);
    return category;
  }
}

export default CategoryAPI;
