// Formats an epoch-ms timestamp (as stored/returned by the backend) for
// display, in the resolved UI language.
export function formatDate(epochMs, language) {
  if (!epochMs) return ''
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-SG' : 'en-SG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(epochMs))
}
