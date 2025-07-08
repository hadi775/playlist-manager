import { Music, Film, BookOpen, Star, Menu, Headphones, GraduationCap, MoreHorizontal } from 'lucide-react';

export const GROUP_ID = 36;
// export const API_BASE = 'https://webfmsi.singapoly.com/api/playlist';
export const API_BASE = 'http://127.0.0.1:5000';

export const GENRES = ['music', 'song', 'movie', 'education', 'others'];

export const GENRE_ICONS = {
  music: Music,
  song: Music,
  movie: Film,
  education: BookOpen,
  others: Star
};

export const NAV_ITEMS = [
  { id: 'all', label: 'All', icon: Menu },
  { id: 'songs', label: 'Songs', icon: Headphones },
  { id: 'movie', label: 'Movie', icon: Film },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'others', label: 'Others', icon: MoreHorizontal }
];

export const INITIAL_FORM_DATA = {
  play_name: '',
  play_url: '',
  play_thumbnail: '',
  play_genre: 'music',
  play_description: ''
};