export type ResourceType = 'FILE' | 'FOLDER';

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  parentId: string | null;
  uri?: string;
  ownerId: string;
  createdAt: string;
}
