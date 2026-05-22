export const fonts = {
  light: 'GothicA1-Light',
  regular: 'GothicA1-Regular',
  medium: 'GothicA1-Medium',
  semiBold: 'GothicA1-SemiBold',
  bold: 'GothicA1-Bold',
};

export const getFontFamily = (weight = 'regular') => fonts[weight] || fonts.regular;
