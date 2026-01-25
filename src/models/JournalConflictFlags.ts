import { DbMapper } from "./DbMapper";

export type JournalConflictFlags = {
  journalEntryId: string;
  tensionLevel?: number | null; // 1–5
  feltHeard?: boolean | null;
  resolvedToday?: boolean | null;
};

export const JournalConflictMapper = {
  fromDb(row: any): JournalConflictFlags {
    return {
      journalEntryId: row.journal_entry_id,
      tensionLevel: row.tension_level,
      feltHeard: row.felt_heard,
      resolvedToday: row.resolved_today
    };
  },

  toDb(flags: Partial<JournalConflictFlags>) {
    return {
      journal_entry_id: flags.journalEntryId,
      tension_level: flags.tensionLevel,
      felt_heard: flags.feltHeard,
      resolved_today: flags.resolvedToday
    };
  }
} satisfies DbMapper<JournalConflictFlags>;