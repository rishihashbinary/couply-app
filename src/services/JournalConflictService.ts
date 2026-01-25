import { supabase } from './SupabaseClient';
import { JournalConflictFlags } from '../models/Journal';
import { JournalConflictMapper } from '../mappers/JournalConflictMapper';

export const JournalConflictService = {
  async getByEntry(
    journalEntryId: string
  ): Promise<JournalConflictFlags | null> {
    const { data, error } = await supabase
      .from('journal_conflict_flags')
      .select('*')
      .eq('journal_entry_id', journalEntryId)
      .single();

    if (error) return null;
    return JournalConflictMapper.fromDb(data);
  },

  async upsertFlags(
    flags: JournalConflictFlags
  ): Promise<JournalConflictFlags> {
    const { data, error } = await supabase
      .from('journal_conflict_flags')
      .upsert(
        JournalConflictMapper.toDb(flags),
        { onConflict: 'journal_entry_id' }
      )
      .select()
      .single();

    if (error) throw error;
    return JournalConflictMapper.fromDb(data);
  }
};
