/**
 * Converts an emoji character to a Twemoji CDN image URL.
 * Twemoji is Twitter's open-source emoji set (MIT / CC-BY 4.0).
 * CDN: https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/
 */
export function toTwemojiUrl(emoji: string): string {
  const codePoints = [...emoji].map((c) => c.codePointAt(0)!.toString(16));
  const filename = codePoints.join('-');
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${filename}.png`;
}
