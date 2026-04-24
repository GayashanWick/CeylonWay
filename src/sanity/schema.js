import packageSchema from './schemas/package';
import postSchema from './schemas/post';
import gearSchema from './schemas/gear';
import authorSchema from './schemas/author';
import destinationSchema from './schemas/destination';

export const schema = {
  types: [packageSchema, postSchema, gearSchema, authorSchema, destinationSchema],
};
