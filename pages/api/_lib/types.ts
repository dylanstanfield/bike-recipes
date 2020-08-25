export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface Config {
    fileType: FileType;
    text: string;
    theme: Theme;
}