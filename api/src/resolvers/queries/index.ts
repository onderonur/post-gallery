import merge from 'lodash/merge';
import postQueries from './post';
import viewerQueries from './viewer';

export default merge({}, postQueries, viewerQueries);
