import { ShoppingBag, Utensils, Car, Home, Zap, Heart, Film, Plane, GraduationCap, MoreHorizontal, type LucideIcon } from 'lucide-react'

export interface Category { id: string; label: string; color: string; icon: LucideIcon }

export const CATEGORIES: Category[] = [
  { id: 'food', label: 'Food & Dining', color: '#FF9F0A', icon: Utensils },
  { id: 'shopping', label: 'Shopping', color: '#0A84FF', icon: ShoppingBag },
  { id: 'transport', label: 'Transport', color: '#30D158', icon: Car },
  { id: 'housing', label: 'Housing', color: '#BF5AF2', icon: Home },
  { id: 'utilities', label: 'Utilities', color: '#64D2FF', icon: Zap },
  { id: 'health', label: 'Health', color: '#FF453A', icon: Heart },
  { id: 'entertainment', label: 'Entertainment', color: '#FF375F', icon: Film },
  { id: 'travel', label: 'Travel', color: '#5E5CE6', icon: Plane },
  { id: 'education', label: 'Education', color: '#FFD60A', icon: GraduationCap },
  { id: 'other', label: 'Other', color: '#8E8E93', icon: MoreHorizontal },
]

export function getCategory(id: string): Category {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
}