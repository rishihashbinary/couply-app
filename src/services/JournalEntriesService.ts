import { JournalEntry, JournalEntryMapper, Mood, MoodSource } from '../models/JournalEntry';
import { supabase } from './SupabaseClient';

export const JournalEntriesService = {

  async getByDate(
    userId: string,
    date: string // YYYY-MM-DD
  ): Promise<JournalEntry | null> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('entry_date', date)
      .single();

    if (error) return null;
    return JournalEntryMapper.fromDb(data);
  },

  async upsertMood(entry: JournalEntry): Promise<JournalEntry> {
    const { data, error } = await supabase
      .from('journal_entries')
      .upsert(
        JournalEntryMapper.toDb(entry),
        { onConflict: 'user_id,entry_date' }
      )
      .select()
      .single();

    if (error) throw error;
    return JournalEntryMapper.fromDb(data);
  }
};
