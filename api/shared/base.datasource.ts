import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { GQLContext } from './shared.types';

class BaseDataSource extends DataSource {
  context: GQLContext;

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  // https://www.apollographql.com/docs/tutorial/data-source/#build-a-custom-data-source
  initialize(config: DataSourceConfig<GQLContext>) {
    this.context = config.context;
  }
}

export default BaseDataSource;
