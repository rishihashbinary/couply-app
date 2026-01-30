INSERT INTO public.weekly_advice (
  user_id,
  week_start_date,
  week_end_date,
  mirror_text,
  insight_text,
  activity_text,
  mood_summary,
  notes_summary
) VALUES (
  'fcbfafa6-e326-4058-beef-7cb5573d3f70',
  '2026-01-25',
  '2026-01-29',

  -- mirror_text (therapist-style reflection)
  'Looking at your week together, I notice that your emotional baseline was stable and generally positive. The shift you experienced midweek wasn’t because the day went badly, but because an effort you shared didn’t feel emotionally received. This wasn’t about work or productivity—it was about connection. The following day, your sense of peace returned when you stepped back, planned ahead, and allowed space instead of seeking resolution. The week ended with happiness rooted in presence rather than effort.',

  -- insight_text (core pattern distilled)
  'You tend to feel unsettled not when things go wrong, but when you are emotionally exposed and the response you hoped for is unclear. Your mood improves when you stop waiting for reassurance and return to presence. This shows emotional awareness and an ability to self-regulate when you give yourself space.',

  -- activity_text (next-week exercise)
  'Once next week, when you feel irritation or heaviness, pause and ask: “Am I reacting to what happened, or to what I hoped would happen?” Name the hope quietly, then ground yourself with one sentence: “Even if the response is delayed or imperfect, I am still okay right now.”',

  -- mood_summary (structured aggregation)
  '{
    "Happy": 3,
    "Peaceful": 1,
    "Difficult": 1,
    "pattern": "Stable baseline with a brief emotional dip linked to perceived lack of emotional acknowledgment"
  }',

  -- notes_summary (key emotional themes extracted)
  '{
    "themes": [
      "effort seeking emotional reception",
      "sensitivity to connection during vulnerability",
      "self-regulation through planning and reflection",
      "relief through shared presence"
    ],
    "key_trigger": "Feeling that personal effort was ignored",
    "restorative_factors": [
      "planning",
      "philosophical reflection",
      "quality time"
    ]
  }'
);
