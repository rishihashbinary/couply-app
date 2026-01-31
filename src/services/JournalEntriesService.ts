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

	async getMonthlyEntries(
		userId: string,
		month: string, // MM
		year: string // YYYY
	): Promise<JournalEntry[]> {
		const startDate = `${year}-${month}-01`;

		// JS trick: day 0 of next month = last day of current month
		// const endDate = new Date(
		// 	Number(year),
		// 	Number(month), // month is 1-based, JS Date expects next month here
		// 	0
		// )
		// 	.toISOString()
		// 	.split('T')[0];

		const endDate = `${year}-${month}-${new Date(Number(year), Number(month), 0).getDate()}`; // TODO: change this to stat and end date of the month

		const { data, error } = await supabase
			.from('journal_entries')
			.select('*')
			.eq('user_id', userId)
			.gte('entry_date', startDate)
			.lte('entry_date', endDate)
			.order('entry_date', { ascending: true });

		if (error || !data) {
			console.error('getMonthlyEntries error', error);
			return [];
		}
		return data.map(JournalEntryMapper.fromDb);
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
