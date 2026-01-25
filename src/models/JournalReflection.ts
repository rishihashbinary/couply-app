import { DbMapper } from "./DbMapper";

export type JournalReflection = {
  id: string;
  journalEntryId: string;
  promptKey: string;
  response?: string | null;
  createdAt: string;
};

export const JournalReflectionMapper = {
  fromDb(row: any): JournalReflection {
    return {
      id: row.id,
      journalEntryId: row.journal_entry_id,
      promptKey: row.prompt_key,
      response: row.response,
      createdAt: row.created_at
    };
  },

  toDb(reflection: Partial<JournalReflection>) {
    return {
      id: reflection.id,
      journal_entry_id: reflection.journalEntryId,
      prompt_key: reflection.promptKey,
      response: reflection.response,
	  created_at: reflection.createdAt
    };
  }
} satisfies DbMapper<JournalReflection>;


