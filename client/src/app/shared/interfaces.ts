export interface AuditReport {
  launch_date?: Date;
  user?: string;
  system_name?: string;
  object_name?: string;
  data_code?: string;
  date_begin?: Date;
  date_end?: Date;
  status?: boolean;
  downloadUrl?: string
}

export interface User {
  email: string
  password: string
}

export interface Message {
  message: string
}

export interface Student {
  name: string
  imageSrc?: string
  lesson?: LessonReference[]
  user?: string
  _id?: string
}

export interface LessonReference {
  day: string
  time: string
  lesson: Lesson
  // _id?: string
}

export interface Lesson {
  name: string
  description: string;
  user?: string
  _id?: string
}
