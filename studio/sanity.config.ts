import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { projectId, dataset, apiVersion } from '../src/app/env';




export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'riccardo_laurenti',
  apiVersion,
  plugins: [deskTool(), visionTool()],
  schema,
});
