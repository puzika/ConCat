export const formatTime = (timestamp?: string | null) => {
  if (!timestamp) return '';

  return Intl.DateTimeFormat('en-us', { 
    dateStyle: 'medium', 
    timeStyle: 'short'
  }).format(new Date(timestamp));
}