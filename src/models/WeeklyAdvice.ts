import type { DbMapper } from './DbMapper';

export type WeeklyAdvice = {
	id: string;
	userId: string;

	weekStartDate: string; // YYYY-MM-DD
	weekEndDate: string;   // YYYY-MM-DD

	mirrorText: string;
	insightText: string;
	activityText: string;

	moodSummary?: any;   // jsonb (optional)
	notesSummary?: any;  // jsonb (optional)

	createdAt?: string;
	updatedAt?: string;
};

export const WeeklyAdviceMapper = {

	toDb(advice: WeeklyAdvice) {
		return {
			id: advice.id,
			user_id: advice.userId,

			week_start_date: advice.weekStartDate,
			week_end_date: advice.weekEndDate,

			mirror_text: advice.mirrorText,
			insight_text: advice.insightText,
			activity_text: advice.activityText,

			mood_summary: advice.moodSummary ?? null,
			notes_summary: advice.notesSummary ?? null
		};
	},

	fromDb(row: any): WeeklyAdvice {
		return {
			id: row.id,
			userId: row.user_id,

			weekStartDate: row.week_start_date,
			weekEndDate: row.week_end_date,

			mirrorText: row.mirror_text,
			insightText: row.insight_text,
			activityText: row.activity_text,

			moodSummary: row.mood_summary,
			notesSummary: row.notes_summary,

			createdAt: row.created_at,
			updatedAt: row.updated_at
		};
	}

} satisfies DbMapper<WeeklyAdvice>;