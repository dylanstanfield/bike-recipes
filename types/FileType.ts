export const FILE_TYPES = ['png', 'jpeg'] as const

export type FileType = typeof FILE_TYPES[number]
