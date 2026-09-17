type SchoolBranding = {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
};

const fallback = {primary: '#701D33', secondary: '#F6F1E7', accent: '#D8B56D'};

function validHex(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
}

function contrast(hex: string) {
  const channels = hex.slice(1).match(/.{2}/g)!.map(value => Number.parseInt(value, 16) / 255);
  const linear = channels.map(value => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return (0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]) > 0.48 ? '#171713' : '#FFFAF0';
}

export function schoolTheme(school: {slug?: {current?: string}; branding?: SchoolBranding}) {
  const primary = validHex(school.branding?.primaryColor) ? school.branding.primaryColor.toUpperCase() : fallback.primary;
  const secondary = validHex(school.branding?.secondaryColor) ? school.branding.secondaryColor.toUpperCase() : fallback.secondary;
  const accent = validHex(school.branding?.accentColor) ? school.branding.accentColor.toUpperCase() : fallback.accent;
  return {primary, secondary, accent, primaryInk: contrast(primary), secondaryInk: contrast(secondary), accentInk: contrast(accent)};
}

export function withAlpha(hex: string, alpha: number) {
  return `${hex}${Math.round(Math.max(0, Math.min(1, alpha)) * 255).toString(16).padStart(2, '0')}`;
}
