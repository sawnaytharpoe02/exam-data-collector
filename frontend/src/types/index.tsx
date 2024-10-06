export interface IExamData {
  id: number;
  exam_type: string;
  description: string;
  exam_language: string | null;
}


export interface IExamType {
  id: number;
  name: string;
}

export interface IExamLanguage {
  id: number;
  name: string;
}