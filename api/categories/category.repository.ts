import BaseRepository from '../shared/base.repository';
import { createLoader } from '@api/dataloader/dataloader.utils';
import { CategoryModel } from './category.model';

const createCategoryBySlugLoader = createLoader<string, CategoryModel>(
  (slugs) => CategoryModel.query().whereIn('slug', slugs as string[]),
  (category) => category.slug,
);

const categoryLoaders = () => ({
  categoryBySlug: createCategoryBySlugLoader(),
});

class CategoryRepository extends BaseRepository {
  loaders = categoryLoaders();

  async findMany() {
    const categories = await CategoryModel.query().orderBy('order');
    return categories;
  }

  async findOneBySlug(slug: string) {
    const category = await this.loaders.categoryBySlug.load(slug);
    return category;
  }
}

export default CategoryRepository;
