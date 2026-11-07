// Opens the Cal.com booking flow as an in-page modal so visitors never leave the site:
// Esc, the close button and a click outside are the built-in exits.
// Progressive enhancement: the <a href target="_blank"> stays in place, so Ctrl/Cmd/middle-click,
// no-JS and any load failure fall back to opening cal.com in a new tab, as before.
// Nothing is fetched until a visitor hovers, focuses or clicks a booking link.

export const CAL_LINK = 'jeremy-ochai-dev';
export const CAL_URL = `https://cal.com/${CAL_LINK}`;

let calReady = null;
const loadCal = () => {
  if (!calReady) {
    calReady = import('@calcom/embed-react').then(async ({ getCalApi }) => {
      const cal = await getCalApi({ namespace: CAL_LINK });
      cal('ui', {
        cssVarsPerTheme: { light: { 'cal-brand': '#06b6d4' }, dark: { 'cal-brand': '#06b6d4' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      return cal;
    });
    calReady.catch(() => { calReady = null; });
  }
  return calReady;
};

export const prefetchBooking = () => { loadCal().catch(() => {}); };

let opening = false;
export const openBooking = (e) => {
  // Let modified clicks (new tab / window) behave like a normal link.
  if (e && (e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) return;
  if (e) e.preventDefault();
  if (opening) return; // ignore impatient double-taps while the embed loads
  opening = true;
  setTimeout(() => { opening = false; }, 1500);
  loadCal()
    .then((cal) => cal('modal', { calLink: CAL_LINK, config: { layout: 'month_view' } }))
    .catch(() => { window.open(CAL_URL, '_blank', 'noopener,noreferrer'); });
};

export const bookingLinkProps = {
  onClick: openBooking,
  onPointerEnter: prefetchBooking,
  onFocus: prefetchBooking,
};
