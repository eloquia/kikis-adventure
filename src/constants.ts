// ----- Assets References -----

// Sounds: Background
export const THEME = 'theme';
export const DEPARTURE = 'departure';

// Sounds: Effects
export const GLISSANDO = 'glissando';
export const PLINK = 'plink';
export const PLUNK = 'plunk';
export const NEGATIVE = 'negative'

// Images: Background
export const COVER = 'cover';
export const PILE_OF_ROCKS = 'pile-of-rocks';

// Images: Kiki
export const ANGRY_KIKI = 'angry-kiki';
export const DETERMINED_KIKI = 'determined-kiki';
export const GRINNING_KIKI = 'grinning-kiki';
export const JOY_KIKI = 'joy-kiki';
export const SAD_KIKI = 'sad-kiki';
export const THUMBS_UP_KIKI = 'thumbs-up-kiki';
export const WISTFUL_KIKI = 'wistful-kiki';
export const KIKI_WAVE = 'kiki-wave';

// Scenes
export const BOOT_SCENE = 'boot-scene';
export const OPENING_SCENE = 'opening-scene';
export const INTRO_SCENE = 'intro-scene';
export const INSTRUCTION_SCENE = 'instruction-scene';
export const CLUES_SCENE = 'clues-scene';
export const SPELL_SCENE = 'spell-scene';
export const FINAL_SCENE = 'final-scene';
export const CREDITS_SCENE = 'credits-scene';

// Text Speed, time between characters
export const SAD_SPEED = 100;
export const NORMAL_SPEED = 25;

// ----- Graphics Constants -----
export const WINDOW_HEIGHT = window.innerHeight;
export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_X_CENTER = WINDOW_WIDTH / 2;
export const WINDOW_Y_CENTER = WINDOW_HEIGHT / 2;

export const DIALOG_BOX_MARGIN = 50;
export const DIALOG_BOX_INNER_WIDTH = window.innerWidth - (DIALOG_BOX_MARGIN * 2);
export const DIALOG_BOX_INNER_HEIGHT = 150;
export const DIALOG_TOP_LEFT_Y = window.innerHeight - DIALOG_BOX_INNER_HEIGHT - DIALOG_BOX_MARGIN;
export const DIALOG_PADDING = 20;

export const DIALOG_TEXT_WIDTH = DIALOG_BOX_INNER_WIDTH - (DIALOG_PADDING * 2);

export const NAME_Y = DIALOG_TOP_LEFT_Y + DIALOG_PADDING;

export const LINE_SPACING = 4;
export const PARAGRAPH_SPACING = LINE_SPACING * 2;

export const TEXT_SIZE = 16;

export const TEXT_Y = DIALOG_TOP_LEFT_Y + DIALOG_PADDING + TEXT_SIZE + LINE_SPACING;

export const GOLD = 0xFFD700;
export const OFF_BLACK = 0x0e1111;
export const OFF_BLACK_STRING = '#0e1111';
export const OFF_WHITE_HEX = 0xFAF9F6;
export const OFF_WHITE_TEXT = '#FAF9F6';
export const SOFT_RED_HEX = 0xF47174;
export const SOFT_RED_STRING = '#F47174';
export const TEAL_STRING = '#00CAB1';

export const OVERLAY_OPACITY = 0.8;
export const OVERLAY_MARGIN = 30;
export const OVERLAY_INNER_PADDING = 20;
export const OVERLAY_WIDTH = WINDOW_WIDTH - (OVERLAY_MARGIN * 2);
export const OVERLAY_X_START = OVERLAY_MARGIN;
export const OVERLAY_Y_START = 300;

export const OVERLAY_TEXT_CONTAINER_WIDTH = OVERLAY_WIDTH - (OVERLAY_MARGIN * 2);
export const OVERLAY_TEXT_CONTAINER_X_START = OVERLAY_X_START + OVERLAY_MARGIN;

export const INPUT_HEIGHT = 20;

export const NEGATIVE_RESULT_OPTIONS = [
  'Nope',
  'Not quite',
  'Try again',
  'I don\'t think so',
  "I don't think that's right",
  'Maybe on your next guess',
  "That doesn't sound right",
  "That doesn't sound familiar",
]

export const randomNegativeOption = () => {
  return NEGATIVE_RESULT_OPTIONS[Math.floor(Math.random() * NEGATIVE_RESULT_OPTIONS.length)];
}

export const POSITIVE_AFFIRMATION_OPTIONS = [
  'Nice!',
  'Correct!',
  'Good job!',
  'Well done!',
  'Great!',
  'Perfect!',
  'Amazing!',
  'Bravo!',
  'Way to go!',
  'You got it!'
]

export const randomPositiveAffirmation = () => {
  return POSITIVE_AFFIRMATION_OPTIONS[Math.floor(Math.random() * POSITIVE_AFFIRMATION_OPTIONS.length)];
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Spell Scene

// there are 12 lines
export const NUM_LINES = 12;
export const POEM_VERSE_SEGMENT_HEIGHT = WINDOW_HEIGHT / NUM_LINES;
export const HEIGHT_BY_INDEX = (i) => {
  return POEM_VERSE_SEGMENT_HEIGHT * i + POEM_VERSE_SEGMENT_HEIGHT / 2
}
export const SPELL_FRAGMENT_Y = WINDOW_WIDTH - 30;
export const SPELL_FRAGMENT_Y_INITIAL = 30;

// Stanza math
// The center of the screen is an empty line
// The line above and below the screen is a verse
export const FINAL_VERSE_HEIGHT = (index) => {
  switch (index) {
    case 0:
      return WINDOW_Y_CENTER - (TEXT_SIZE + LINE_SPACING) * 7;
    case 1:
      return WINDOW_Y_CENTER - (TEXT_SIZE + LINE_SPACING) * 6;
    case 2:
      return WINDOW_Y_CENTER - (TEXT_SIZE + LINE_SPACING) * 5;
    case 3:
      return WINDOW_Y_CENTER - (TEXT_SIZE + LINE_SPACING) * 4;
    case 4:
      return WINDOW_Y_CENTER - (TEXT_SIZE + LINE_SPACING) * 2;
    case 5:
      return WINDOW_Y_CENTER - (TEXT_SIZE + LINE_SPACING);
    case 6:
      return WINDOW_Y_CENTER + (TEXT_SIZE + LINE_SPACING) * 2;
    case 7:
      return WINDOW_Y_CENTER + (TEXT_SIZE + LINE_SPACING) * 3;
    case 8:
      return WINDOW_Y_CENTER + (TEXT_SIZE + LINE_SPACING) * 4;
    case 9:
      return WINDOW_Y_CENTER + (TEXT_SIZE + LINE_SPACING) * 5;
    case 10:
      return WINDOW_Y_CENTER + (TEXT_SIZE + LINE_SPACING) * 7;
    case 11:
      return WINDOW_Y_CENTER + (TEXT_SIZE + LINE_SPACING) * 8;
  }
}

// final animation
export const FINAL_ANIMATION_DELAY = (index) => {
  switch (index) {
    case 0:
      return 38000;
    case 1:
      return 37000;
    case 2:
      return 36000;
    case 3:
      return 35000;
    case 4:
      return 34000;
    case 5:
      return 33000;
    case 6:
      return 33000;
    case 7:
      return 34000;
    case 8:
      return 35000;
    case 9:
      return 36000;
    case 10:
      return 37000;
    case 11:
      return 38000;
  }
}

export function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
      document.fonts.add(loaded);
  }).catch(function (error) {
      return error;
  });
}

// DEV

export const IS_DEBUG = false;
export const DEBUG_SCENE = CLUES_SCENE;
export const ENVIRONMENT: 'local' | 'aws' | 'gcp' = 'gcp';
export const DEVICE = 'ios';
