type EmotionContent = {
	titles: string[];
	messages: string[];
};

export const EMOTION_CONTENT: Record<string, EmotionContent> = {
	happy: {
		titles: [
			"I heard you.",
			"This matters.",
			"A good moment.",
			"Pause and notice.",
			"Right here.",
			"Something warm.",
			"Let this stay.",
			"You’re allowed joy.",
			"A gentle yes.",
			"Hold this lightly."
		]
		, messages: [
			"It’s good to notice moments like this.",
			"You didn’t rush past this feeling — that matters.",
			"Nothing needs fixing right now.",
			"Let this feeling take up a little space.",
			"You earned this moment by being present.",
			"Joy doesn’t have to be loud to be real.",
			"This is one of those small wins.",
			"You’re allowed to feel good without guilt.",
			"Let this be enough for now.",
			"Moments like this quietly support us later.",

			"You noticed something good today.",
			"This feeling belongs to you.",
			"No need to analyze — just notice.",
			"It’s okay to stay here for a bit.",
			"This is part of your story too.",
			"You showed up for yourself today.",
			"Let this soften the rest of the day.",
			"Not everything has to be heavy.",
			"This moment counts.",
			"You didn’t ignore yourself today.",

			"Even brief happiness is real happiness.",
			"You allowed yourself to feel this.",
			"There’s nothing else you need to do.",
			"This is a quiet kind of okay.",
			"Let it linger gently.",
			"You noticed a good thing — that’s awareness.",
			"This doesn’t need to last forever to matter.",
			"You’re allowed to enjoy this.",
			"A simple moment can still be meaningful.",
			"You didn’t numb this feeling.",

			"You let yourself feel something positive.",
			"This is what being present looks like.",
			"Noticing joy is a skill — you practiced it.",
			"This moment doesn’t need permission.",
			"You were here for this.",
			"Let this settle into you.",
			"This is enough for now.",
			"You didn’t rush ahead.",
			"This is a gentle win.",
			"You allowed goodness in."
		]
	},
	peaceful: {
		titles: [
			"All is quiet.",
			"Nothing urgent.",
			"Soft moments.",
			"You can rest here.",
			"Stillness noticed.",
			"No pressure.",
			"This calm matters.",
			"Gentle pause.",
			"At ease.",
			"Just this."
		]
		, messages: [
			"Stillness is doing quiet work inside you.",
			"Nothing needs your reaction right now.",
			"This calm didn’t happen by accident.",
			"You allowed yourself to slow down.",
			"This is what rest can feel like.",
			"No one is asking anything of you here.",
			"This moment is complete as it is.",
			"You don’t have to fill the silence.",
			"Your nervous system appreciates this.",
			"This is a safe place to pause.",

			"You’re not behind right now.",
			"Nothing needs to be decided.",
			"This calm is enough.",
			"You don’t need to earn rest.",
			"Stillness counts as progress too.",
			"You allowed your body to exhale.",
			"This moment isn’t asking for effort.",
			"There’s nothing missing here.",
			"You can stay soft for a while.",
			"This is allowed.",

			"You’re not being pulled anywhere.",
			"Peace doesn’t need explanation.",
			"This calm is doing its work.",
			"You’re okay in this moment.",
			"No urgency exists here.",
			"This is a good place to stop.",
			"You don’t need to be productive.",
			"Your mind gets to be quiet now.",
			"This is gentle and real.",
			"Nothing is required of you.",

			"You noticed a peaceful state — that’s awareness.",
			"There’s nothing to chase here.",
			"This moment isn’t fragile.",
			"You can trust this calm.",
			"You’re allowed to feel settled.",
			"No need to prepare for the next thing.",
			"This stillness supports you.",
			"You’re not late to anything.",
			"Just being is enough.",
			"You’re safe in this pause."
		]
	},
	neutral: {
		titles: [
			"Just checking in.",
			"An ordinary moment.",
			"Nothing unusual.",
			"Right now.",
			"This is okay.",
			"In between.",
			"No label needed.",
			"Simply noticing.",
			"Here you are.",
			"Neither good nor bad."
		]
		, messages: [
			"Not every moment needs a strong feeling.",
			"This is what neutral looks like.",
			"Nothing stands out — and that’s okay.",
			"You noticed your state without judgment.",
			"This moment doesn’t need a story.",
			"You’re present, and that’s enough.",
			"Not everything needs to feel meaningful.",
			"This is a steady place.",
			"You’re not missing anything right now.",
			"Neutral still counts as awareness.",

			"You didn’t force a label.",
			"This moment is uncomplicated.",
			"Nothing is pulling you strongly.",
			"You allowed things to be as they are.",
			"This is a valid emotional state.",
			"You didn’t ignore yourself.",
			"There’s no problem here.",
			"This is part of the spectrum.",
			"You’re allowed to feel neutral.",
			"No reaction is required.",

			"You paused without needing clarity.",
			"This moment isn’t demanding.",
			"You’re not expected to feel more.",
			"This is a normal human state.",
			"You’re simply observing.",
			"Nothing needs changing.",
			"This is stable ground.",
			"You didn’t rush to interpret.",
			"Neutral is still real.",
			"You stayed honest with yourself.",

			"This moment doesn’t need emotion.",
			"You’re not disconnected — just steady.",
			"There’s nothing wrong with this.",
			"You didn’t force positivity.",
			"You didn’t dramatize neutrality.",
			"This is balanced.",
			"You’re okay right now.",
			"No need to dig deeper.",
			"This is enough for today.",
			"You showed awareness."
		]
	},
	difficult: {
		titles: [
			"I’m listening.",
			"You’re not alone.",
			"This is heavy.",
			"Thank you for saying it.",
			"I heard you.",
			"It’s okay to pause.",
			"This matters too.",
			"You don’t have to be strong.",
			"Holding space.",
			"You showed up."
		]
		, messages: [
			"I heard you. You didn’t have to be strong today.",
			"This was not easy to sit with.",
			"You showed up even though it was hard.",
			"Nothing is wrong with you for feeling this.",
			"You didn’t avoid yourself today.",
			"This feeling deserves space.",
			"You’re allowed to struggle here.",
			"You don’t need to solve this right now.",
			"This is heavy — and you noticed it.",
			"You didn’t pretend everything was fine.",

			"It’s okay if this doesn’t make sense yet.",
			"You’re not failing for feeling this way.",
			"You let yourself be honest.",
			"This moment is valid too.",
			"You didn’t push this away.",
			"You’re allowed to feel worn down.",
			"Nothing needs to be fixed immediately.",
			"You’re not weak for feeling this.",
			"You didn’t abandon yourself.",
			"This took courage.",

			"You don’t need clarity right now.",
			"This feeling won’t be judged here.",
			"You stayed with yourself.",
			"It’s okay if today feels heavy.",
			"You didn’t numb this experience.",
			"You showed up anyway.",
			"This is part of being human.",
			"You’re allowed to rest after this.",
			"This isn’t something you need to rush through.",
			"You’re not alone in this moment.",

			"You noticed something difficult — that’s awareness.",
			"You didn’t silence this feeling.",
			"This matters enough to acknowledge.",
			"You don’t owe anyone positivity.",
			"This doesn’t define you.",
			"You can take this one moment at a time.",
			"It’s okay to go slow here.",
			"You were honest today.",
			"This is not too much.",
			"I’m glad you shared this."
		]
	}
};

export function getRandomEmotionContent(emotion: string) {

	const content = EMOTION_CONTENT[emotion];
	// console.log('Getting content for emotion:', emotion, content);
	if (!content) return null;

	const title =
		content.titles[Math.floor(Math.random() * content.titles.length)];

	const message =
		content.messages[Math.floor(Math.random() * content.messages.length)];
	// console.log('Selected title and message:', title, message);
	return { title, message };
}

