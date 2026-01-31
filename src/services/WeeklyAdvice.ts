import { supabase } from './SupabaseClient';
import { WeeklyAdvice, WeeklyAdviceMapper } from '../models/WeeklyAdvice';

export const WeeklyAdviceService = {

	/**
	 * Create or update weekly advice (manual or AI-generated)
	 */
	async upsert(advice: WeeklyAdvice) {
		return supabase
			.from('weekly_advice')
			.upsert(WeeklyAdviceMapper.toDb(advice));
	},

	/**
	 * Get weekly advice for a user for a specific week
	 */
	async getByWeek(
		userId: string,
		weekStartDate: string
	): Promise<WeeklyAdvice | null> {

		const { data, error } = await supabase
			.from('weekly_advice')
			.select('*')
			.eq('user_id', userId)
			.eq('week_start_date', weekStartDate)
			.maybeSingle();

		if (error) throw error;
		if (!data) return null;

		return WeeklyAdviceMapper.fromDb(data);
	},

	/**
	 * Get latest available weekly advice for a user
	 * (useful for Today page)
	 */
	async getLatest(userId: string): Promise<WeeklyAdvice | null> {
		const { data, error } = await supabase
			.from('weekly_advice')
			.select('*')
			.eq('user_id', userId)
			.order('created_at', { ascending: false })
			.limit(1)
			.maybeSingle();

		if (error) throw error;
		if (!data) return null;

		return WeeklyAdviceMapper.fromDb(data);
	}

};
