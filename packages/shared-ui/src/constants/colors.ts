// 🎯 색상 상수 정의 - 카테고리별로 정리된 디자인 시스템 색상

export const COLORS = {
  // 🎨 Primary Colors
  PRIMARY: {
    RED: '#DD1921',
    BLUE: '#2F80ED',
    BLUE_SECONDARY: '#2113DB', 
    YELLOW: '#FF9900',
    BLACK: '#111111',
  },

  // 📝 Text Colors
  TEXT: {
    BLACK_PRIMARY: '#222222',
    BLACK_SECONDARY: '#333333',
    GRAY_PRIMARY: '#707070',
    GRAY_SECONDARY: '#777777',
    GRAY_LIGHT: '#8B8B8B',
    GRAY_LIGHTER: '#888888',
    GRAY_CAPTION: '#959595',
    GRAY_DISABLED: '#AAAAAA',
    DARK_GRAY: '#5C5C5C',
    DARK_ACCENT: '#444447',
  },

  // 🎯 Background Colors
  BACKGROUND: {
    WHITE: '#FFFFFF',
    WHITE_SOFT: '#FAFAFA',
    GRAY_LIGHT: '#F5F5F5',
    GRAY_MEDIUM: '#F6F6F6',
    GRAY_BORDER: '#F1F1F2',
    GRAY_DISABLED: '#EFEFEF',
    GRAY_DISABLED_ALT: '#F3F3F3',
    GRAY_CHIP: '#6D6D6D',
    GREEN: '#2e7d32',
    RED_LIGHT: '#FFF1F1',
    BLUE_LIGHT: '#ECEEFC',
    SELECTED_ROW: 'rgba(221, 25, 33, 0.08)',
  },

  // 🔘 Button Colors
  BUTTON: {
    PRIMARY_HOVER: '#B9161C',
    SECONDARY_HOVER: '#888888',
    TERTIARY_HOVER: '#FFF1F1',
    DISABLED: '#D8D8D8',
    QUATERNARY: '#CACACA',
    CANCEL: '#AAAAAA',
    TICK: '#81C784',
    CLOSE: '#AE0007',
  },

  // 🖼️ Border & UI Elements
  BORDER: {
    LIGHT: '#EEEEEE',
    GRAY: '#E5E5E5',
    GRAY_DISABLED: '#E3E3E3',
    LIGHT_GRAY: '#D9D9D9',
    DARK_GRAY: '#DFDFDF',
  },

  // 🚫 Disabled States
  DISABLED: {
    TEXT_PRIMARY: '#C3C3C3',
    TEXT_SECONDARY: '#CECECE', 
    TEXT_TERTIARY: '#B6B6B6',
    TEXT_QUATERNARY: '#989898',
    ICON: '#B8B8B8',
    CAPTION: '#ABABAB',
    BACKGROUND: '#CACACA',
  },

  // 🎨 Accent Colors
  ACCENT: {
    BLUE_RED: '#F67272',
  },

  // 🌫️ Shadows (legacy colors)
  SHADOW: {
    DEFAULT: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    SOFT: '0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 22px 0px rgba(0, 0, 0, 0.04)',
  },
} as const;

// 🔄 Legacy 호환성을 위한 기존 Color 객체 유지 (deprecated)
const Color = {
  // Primary Colors
  red: COLORS.PRIMARY.RED,
  primaryRed: COLORS.PRIMARY.RED,
  primaryBlue: COLORS.PRIMARY.BLUE,
  primaryBlue2: COLORS.PRIMARY.BLUE_SECONDARY,
  primaryYellow: COLORS.PRIMARY.YELLOW,
  primaryBlack: COLORS.PRIMARY.BLACK,

  // Text Colors  
  textBlack: COLORS.TEXT.BLACK_PRIMARY,
  textBlack2: COLORS.TEXT.BLACK_SECONDARY,
  textGray1: COLORS.TEXT.GRAY_PRIMARY,
  textGray2: COLORS.TEXT.GRAY_DISABLED,
  captionDisable: COLORS.TEXT.GRAY_SECONDARY,
  captionDisable2: COLORS.TEXT.GRAY_CAPTION,
  captionDisableGray: COLORS.DISABLED.CAPTION,
  captionDisableGray2: COLORS.TEXT.GRAY_DISABLED,
  textDisabled: COLORS.DISABLED.TEXT_PRIMARY,
  textDisabled2: COLORS.DISABLED.TEXT_SECONDARY,
  textDisabled3: COLORS.DISABLED.TEXT_TERTIARY,
  textDisabled4: COLORS.DISABLED.TEXT_QUATERNARY,
  lightGray2: COLORS.TEXT.DARK_GRAY,

  // Background Colors
  bgWhite: COLORS.BACKGROUND.WHITE,
  bgGray: COLORS.BACKGROUND.GRAY_LIGHT,
  bgChipGray: COLORS.BACKGROUND.GRAY_CHIP,
  bgGreen: COLORS.BACKGROUND.GREEN,
  grey: COLORS.BACKGROUND.GRAY_MEDIUM,
  contentGrey: COLORS.BACKGROUND.GRAY_MEDIUM,
  whiteGrey: COLORS.BACKGROUND.GRAY_BORDER,
  bgDisabledGray: COLORS.BACKGROUND.GRAY_DISABLED,
  bgDisabledGray2: COLORS.BACKGROUND.GRAY_DISABLED_ALT,
  bgDisabledGray3: COLORS.BACKGROUND.GRAY_LIGHT,
  bgWb: COLORS.BACKGROUND.WHITE_SOFT,
  lightRed: COLORS.BACKGROUND.RED_LIGHT,
  bgSelectRed: COLORS.BACKGROUND.RED_LIGHT,
  bgBlue2: COLORS.BACKGROUND.BLUE_LIGHT,
  bgGrayText: COLORS.TEXT.GRAY_LIGHT,
  bgGrayText2: COLORS.TEXT.GRAY_LIGHTER,
  bgGrayText3: COLORS.TEXT.DARK_ACCENT,
  selectedRow: COLORS.BACKGROUND.SELECTED_ROW,

  // Button Colors
  buttonPrimaryHover: COLORS.BUTTON.PRIMARY_HOVER,
  buttonSecondaryHover: COLORS.BUTTON.SECONDARY_HOVER,
  buttonTertiaryHover: COLORS.BUTTON.TERTIARY_HOVER,
  buttonDisabled: COLORS.BUTTON.DISABLED,
  buttonQuaternaryDefault: COLORS.BUTTON.QUATERNARY,
  bgCancel: COLORS.BUTTON.CANCEL,
  bgDisable: COLORS.DISABLED.BACKGROUND,
  bgTick: COLORS.BUTTON.TICK,
  bgClose: COLORS.BUTTON.CLOSE,

  // Border & UI Elements
  bgBorder: COLORS.BORDER.LIGHT,
  bgBorderGray: COLORS.BORDER.GRAY,
  bgBorderGray2: COLORS.BACKGROUND.GRAY_MEDIUM,
  bgDisabledBorderGray: COLORS.BORDER.GRAY_DISABLED,
  lightGrey: COLORS.BORDER.LIGHT_GRAY,
  darkGrey: COLORS.BORDER.DARK_GRAY,
  lightGray: '#DDD', // 유일한 색상값 유지
  darkGray1: COLORS.TEXT.GRAY_SECONDARY,
  darkGray2: COLORS.TEXT.GRAY_LIGHTER,
  darkGray3: COLORS.PRIMARY.BLACK,
  gray: '#AAA', // 유일한 색상값 유지

  // Disabled States
  iconGrey: COLORS.DISABLED.TEXT_TERTIARY,
  iconDisabledGray: COLORS.DISABLED.ICON,

  // Accent Colors
  blueRed: COLORS.ACCENT.BLUE_RED,

  // Shadows
  shadow: COLORS.SHADOW.DEFAULT,
  shadow2: COLORS.SHADOW.SOFT,
};

export default Color;