import type { DbMapper } from './DbMapper';

export type Mood = 'Happy' | 'Peaceful' | 'Neutral' | 'Difficult';

export type MoodSource =
  | 'self'
  | 'partner'
  | 'both'
  | 'external'
  | 'unknown';

export type JournalEntry = {
  id?: string;
  userId: string;
  entryDate: string; // YYYY-MM-DD

  mood: Mood;
  moodSource?: MoodSource | null; // ✅ NEW

  notes?: string | null;

  createdAt?: string;
  updatedAt?: string;
};

export const JournalEntryMapper = {
  fromDb(row: any): JournalEntry {
    return {
      id: row.id,
      userId: row.user_id,
      entryDate: row.entry_date,
      mood: row.mood,
      moodSource: row.mood_source, // ✅ NEW
      notes: row.notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  },

  toDb(entry: Partial<JournalEntry>) {
    return {
      user_id: entry.userId,
      entry_date: entry.entryDate,
      mood: entry.mood,
      mood_source: entry.moodSource, 
      notes: entry.notes
    };
  }
} satisfies DbMapper<JournalEntry>;