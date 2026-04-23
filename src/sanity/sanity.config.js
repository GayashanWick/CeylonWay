import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './schema';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'dummy123';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Ceylon Way Studio',
  plugins: [structureTool(), visionTool()],
  schema,
});
