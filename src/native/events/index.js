export const ANIMATIONS_COMPLETE = 'animationsComplete'

export const animationsComplete = () => document.dispatchEvent(new CustomEvent(ANIMATIONS_COMPLETE))
