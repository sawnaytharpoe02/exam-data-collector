export interface IExamData {
  id: number;
  exam_type: string;
  description: string;
  section: string | null;
}

export interface IExamType {
  id: number;
  name: string;
}

export interface ISection {
  id: number;
  name: string;
}
