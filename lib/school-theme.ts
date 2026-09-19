type SchoolBranding = {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
};

export type SchoolTheme = {
  primary: string;
  secondary: string;
  accent: string;
  primaryInk: string;
  secondaryInk: string;
  accentInk: string;
  accentOnPrimary: string;
  primaryOnSecondary: string;
};

const fallback = {primary: '#701D33', secondary: '#F6F1E7', accent: '#D8B56D'};

function validHex(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
}

function luminance(hex: string) {
  const channels = hex.slice(1).match(/.{2}/g)!.map(value => Number.parseInt(value, 16) / 255);
  const linear = channels.map(value => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(a: string, b: string) {
  const [lighter,darker]=[luminance(a),luminance(b)].sort((x,y)=>y-x);
  return (lighter+.05)/(darker+.05);
}

function readableInk(background: string) {
  const dark='#171713', light='#FFFAF0';
  return contrastRatio(background,dark) >= contrastRatio(background,light) ? dark : light;
}

export function schoolTheme(school: {[key: string]: any; slug?: {current?: string}; branding?: SchoolBranding}): SchoolTheme {
  const primary = validHex(school.branding?.primaryColor) ? school.branding.primaryColor.toUpperCase() : fallback.primary;
  const secondary = validHex(school.branding?.secondaryColor) ? school.branding.secondaryColor.toUpperCase() : fallback.secondary;
  const accent = validHex(school.branding?.accentColor) ? school.branding.accentColor.toUpperCase() : fallback.accent;
  const primaryInk=readableInk(primary);
  const secondaryInk=readableInk(secondary);
  return {
    primary, secondary, accent,
    primaryInk,
    secondaryInk,
    accentInk:readableInk(accent),
    accentOnPrimary:contrastRatio(accent,primary)>=4.5 ? accent : primaryInk,
    primaryOnSecondary:contrastRatio(primary,secondary)>=4.5 ? primary : secondaryInk,
  };
}

export function withAlpha(hex: string, alpha: number) {
  return `${hex}${Math.round(Math.max(0, Math.min(1, alpha)) * 255).toString(16).padStart(2, '0')}`;
}
