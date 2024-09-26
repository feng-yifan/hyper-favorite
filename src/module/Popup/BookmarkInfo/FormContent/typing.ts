import Tag from '@domain/tag/Tag.ts';

export type TFormContent = {
  name?: string
  pathInfo?: {
    path: string
    fullPath: string
  }
  tags?: Tag[]
}
