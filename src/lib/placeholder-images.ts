import { slugify } from './utils';
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description?: string;
  imageUrl: string;
  imageHint: string;
  title?: string;
  category?: string;
  span?: 'default' | 'col-2' | 'row-2';
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  mainImageId: string;
  galleryImageIds: string[];
  videoUrl?: string;
};

export const AllImages: ImagePlaceholder[] = data.images;
export const AllProjects: Project[] = data.projects;

export function getProjectById(projectId: string): Project | undefined {
  return AllProjects.find(p => p.id === projectId);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return AllProjects.find(p => slugify(p.id) === slug);
}

export function getImageById(imageId: string): ImagePlaceholder | undefined {
  return AllImages.find(img => img.id === imageId);
}
