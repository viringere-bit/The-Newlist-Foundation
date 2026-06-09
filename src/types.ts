/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivePage = 'home' | 'about' | 'work' | 'involved' | 'resources' | 'news' | 'contact';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  type: 'founder' | 'trustee' | 'leadership' | 'wider';
  optIn?: boolean;
}

export interface ValueItem {
  number: number;
  title: string;
  description: string;
  category: 'Foundation' | 'Process' | 'Outcome';
}

export interface NewsPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'Announcements' | 'Research & Insights' | 'Stories from the Network' | 'Progress Updates';
  iconName: 'node' | 'arc' | 'gateway';
  author?: string;
  readTime?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'Report' | 'Guide' | 'Research';
  description: string;
  date: string;
  pdfUrl?: string;
}
