import { ID } from '@api/types';
import { Omit, GraphMedia } from '../generated/graphql';
import BaseRepository from './utils/BaseRepository';
import { createLoader } from './utils/createLoader';
import { ApolloError } from 'apollo-server-micro';
import { omit } from 'lodash';
import { MediaModel } from './knex';
import { generateId } from './utils/generateId';

const createMediaByPostIdLoader = createLoader<ID, MediaModel>(
  (postIds) => MediaModel.query().whereIn('postId', postIds as ID[]),
  (media) => media.postId,
);

const mediaLoaders = () => ({
  mediaByPostId: createMediaByPostIdLoader(),
});

function mapMediaToGraphMedia(media: MediaModel): GraphMedia {
  const rest = omit(
    media,
    'smallImageHeight',
    'smallImageUrl',
    'smallImageWidth',
    'standardImageHeight',
    'standardImageUrl',
    'standardImageWidth',
    'thumbnailHeight',
    'thumbnailUrl',
    'thumbnailWidth',
  );
  const formattedMedia = {
    ...rest,
    thumbnail: {
      width: media.thumbnailWidth,
      height: media.thumbnailHeight,
      // TODO: Because that we copy images to the "public" folder to serve them,
      // all the URLs has this part in them.
      // But we don't need this part in the front-end project.
      // So it gets removed.
      url: media.thumbnailUrl.replace('/public', ''),
    },
    smallImage: {
      width: media.smallImageWidth,
      height: media.smallImageHeight,
      url: media.smallImageUrl.replace('/public', ''),
    },
    standardImage: {
      width: media.standardImageWidth,
      height: media.standardImageHeight,
      url: media.standardImageUrl.replace('/public', ''),
    },
  };
  return formattedMedia;
}

class MediaRepository extends BaseRepository {
  private loaders = mediaLoaders();

  async create(data: Omit<GraphMedia, 'id'>) {
    const { thumbnail, smallImage, standardImage } = data;
    const media = await MediaModel.query().insert({
      id: generateId(),
      thumbnailHeight: thumbnail.height,
      thumbnailWidth: thumbnail.width,
      thumbnailUrl: thumbnail.url,
      smallImageHeight: smallImage.height,
      smallImageWidth: smallImage.width,
      smallImageUrl: smallImage.url,
      standardImageHeight: standardImage.height,
      standardImageWidth: standardImage.width,
      standardImageUrl: standardImage.url,
    });
    const formattedMedia = mapMediaToGraphMedia(media);
    return formattedMedia;
  }

  async findOneByPostId(postId: ID) {
    const media = await this.loaders.mediaByPostId.load(postId);
    if (!media) {
      throw new ApolloError(`Post media not found`);
    }
    const graphMedia = mapMediaToGraphMedia(media);
    return graphMedia;
  }
}

export default MediaRepository;
