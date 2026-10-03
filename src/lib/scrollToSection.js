// Scroll to a section by id, even when it lives in a lazy block that hasn't
// mounted yet. While the target is missing it asks the lazy blocks to mount
// (ochai:force-load, handled by LazyOnScroll in Home). Once found it scrolls,
// then re-aligns if lazy sections above it were still mounting and shifted
// the layout out from under the smooth scroll.
export function scrollToSection(id, { attempts = 40, interval = 50 } = {}) {
  let tries = 0;

  const find = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      [1200, 2500].forEach((ms) =>
        setTimeout(() => {
          const t = document.getElementById(id);
          if (t && Math.abs(t.getBoundingClientRect().top) > 80) {
            t.scrollIntoView({ behavior: 'auto' });
          }
        }, ms)
      );
      return;
    }
    if (tries++ < attempts) {
      window.dispatchEvent(new CustomEvent('ochai:force-load'));
      setTimeout(find, interval);
    }
  };

  find();
}
