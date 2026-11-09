import { useCallback, useEffect } from 'react';

export function useCarousel(trackRef, { interval = 3600 } = {}) {
  const step = useCallback((direction = 1) => {
    const node = trackRef.current;
    if (!node) return;

    const firstChild = node.firstElementChild;
    if (!firstChild) return;

    const styles = window.getComputedStyle(node);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '20') || 20;
    const itemWidth = firstChild.getBoundingClientRect().width + gap;
    const maxScroll = Math.max(node.scrollWidth - node.clientWidth, 0);

    if (maxScroll <= 0) return;

    const stepSize = Math.min(Math.max(itemWidth * 1.18, node.clientWidth * 0.9), maxScroll);
    const current = node.scrollLeft;

    if (direction > 0) {
      if (current >= maxScroll - 2) {
        node.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      node.scrollTo({
        left: Math.min(current + stepSize, maxScroll),
        behavior: 'smooth',
      });
      return;
    }

    if (current <= 0) {
      node.scrollTo({ left: maxScroll, behavior: 'smooth' });
      return;
    }

    node.scrollTo({
      left: Math.max(current - stepSize, 0),
      behavior: 'smooth',
    });
  }, [trackRef]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    let paused = false;
    let resumeTimer;

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };

    const resume = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, 1400);
    };

    const tick = () => {
      if (paused || !node.firstElementChild) return;

      const maxScroll = Math.max(node.scrollWidth - node.clientWidth, 0);
      if (maxScroll <= 0) return;

      if (node.scrollLeft >= maxScroll - 2) {
        node.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      step(1);
    };

    const timer = window.setInterval(tick, interval);

    const stopEvents = ['mouseenter', 'touchstart', 'pointerdown', 'focusin'];
    const resumeEvents = ['mouseleave', 'touchend', 'pointerup', 'focusout'];

    stopEvents.forEach((eventName) => node.addEventListener(eventName, pause));
    resumeEvents.forEach((eventName) => node.addEventListener(eventName, resume));

    return () => {
      window.clearInterval(timer);
      stopEvents.forEach((eventName) => node.removeEventListener(eventName, pause));
      resumeEvents.forEach((eventName) => node.removeEventListener(eventName, resume));
    };
  }, [interval, step, trackRef]);

  return {
    prev: () => step(-1),
    next: () => step(1),
  };
}
