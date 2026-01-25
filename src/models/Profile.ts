// Profile.mapper.ts
import type { DbMapper } from './DbMapper';

export type Profile = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export const ProfileMapper = {
  toDb(profile: Profile) {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      avatar_url: profile.avatarUrl
    };
  },

  fromDb(row: any): Profile {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      avatarUrl: row.avatar_url
    };
  }
} satisfies DbMapper<Profile>;
