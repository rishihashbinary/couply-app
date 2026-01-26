import { supabase } from './SupabaseClient';
import { JournalReflection, JournalReflectionMapper } from '../models/JournalReflection';

export const JournalReflectionsService = {
	async getByEntry(
		journalEntryId: string
	): Promise<JournalReflection[]> {
		const { data, error } = await supabase
			.from('journal_reflections')
			.select('*')
			.eq('journal_entry_id', journalEntryId)
			.order('created_at', { ascending: true });

		if (error) throw error;
		return data.map(JournalReflectionMapper.fromDb);
	},

	async saveReflection(
		journalEntryId: string,
		promptKey: string,
		response?: string
	): Promise<JournalReflection> {
		const { data, error } = await supabase
			.from('journal_reflections')
			.insert({
				journal_entry_id: journalEntryId,
				prompt_key: promptKey,
				response
			})
			.select()
			.single();

		if (error) throw error;
		return JournalReflectionMapper.fromDb(data);
	}
};
