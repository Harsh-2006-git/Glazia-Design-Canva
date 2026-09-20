export type ElementType = 'rectangle' | 'circle' | 'text';

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  visible?: boolean;
}

export interface CanvasData {
  _id?: string;
  name: string;
  description?: string;
  width: number;
  height: number;
  backgroundColor: string;
  elements: CanvasElement[];
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  count?: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
  createdAt?: string;
}

export type ToolType = 'select' | 'rectangle' | 'circle' | 'text';
