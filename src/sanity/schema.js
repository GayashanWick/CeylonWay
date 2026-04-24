import packageSchema from './schemas/package';
import postSchema from './schemas/post';
import gearSchema from './schemas/gear';
import authorSchema from './schemas/author';

export const schema = {
  types: [packageSchema, postSchema, gearSchema, authorSchema],
};
