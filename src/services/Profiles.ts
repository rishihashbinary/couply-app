// profiles.service.ts
import { supabase } from './SupabaseClient';
import { Profile, ProfileMapper } from '../models/Profiles';

export const ProfilesService = {

  async upsert(profile: Profile) {
    return supabase
      .from('profiles')
      .upsert(ProfileMapper.toDb(profile));
  },

  async getById(userId: string): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return ProfileMapper.fromDb(data);
  }
};
