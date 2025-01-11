export interface UploadResponse {
  id: string;
}

export interface SpeakerResponse {
  percentage: number;
  isAnnotationDone: boolean;
  isDone: boolean;
  persons: Record<string, string>;
}
