import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// One scroll clock and one scoped lifecycle for every route. Nothing changes
// operational demo state, and the homepage evidence stack is never transformed.
export function createScrollMotion() {
  const lenis = new Lenis({duration: 1.12, smoothWheel: true, syncTouch: false, anchors: {offset: -(document.querySelector('.site-navigation')?.offsetHeight || 80) - 12}});
  lenis.on('scroll', ScrollTrigger.update);
  const tick = time => { if (!document.hidden) lenis.raf(time * 1000); };
  gsap.ticker.add(tick);
  const handoff = e => {const anchor=document.getElementById('home-hero-anchor');if(anchor)lenis.scrollTo(anchor.getBoundingClientRect().top+window.scrollY,{duration:1.35,onComplete:e.detail?.onComplete});};
  const cancelHandoff = () => lenis.scrollTo(lenis.actualScroll,{immediate:true});
  window.addEventListener('housingrelay:hero',handoff);
  window.addEventListener('housingrelay:cancel-handoff',cancelHandoff);
  let alive = true, refreshFrame;
  const refresh = () => {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => { if (alive) {lenis.resize(); ScrollTrigger.refresh();} });
  };
  const reveals = new Map();
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();
    mm.add({desktop: '(min-width: 1000px) and (min-height: 650px)', compact: '(max-width: 999px)', short: '(max-height: 649px)'}, ({conditions}) => {
      const desktop = conditions.desktop;
      const distance = desktop ? 46 : 22;
      const claimed = new Set();
      const reveal = (elements, {x = 0, y = distance, stagger = .085, delay = 0, trigger} = {}) => {
        const list = gsap.utils.toArray(elements).filter(el => !claimed.has(el));
        if (!list.length) return;
        list.forEach(el => claimed.add(el));
        const tween = gsap.fromTo(list, {opacity: 0, x, y}, {
          opacity: 1, x: 0, y: 0, duration: .85, stagger, delay, ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {trigger: trigger || list[0], start: 'top 94%', once: true},
        });
        list.forEach(el => reveals.set(el, tween));
      };
      const children = (selector, options) => document.querySelectorAll(selector).forEach(el => reveal([...el.children].filter(child => !child.matches('img,form,.faq-list,.neighborhood-evidence,.workflow-grid,.related-row')), {...options, trigger: el}));

      if (document.querySelector('.hero')) {
        gsap.fromTo('.hero-copy h1 span', {y: 38, opacity: 0}, {y: 0, opacity: 1, duration: .85, stagger: .11, ease: 'power3.out', scrollTrigger:{trigger:'.hero',start:'top 75%',once:true}});
        gsap.fromTo('.building-wrap', {opacity: 0}, {opacity: 1, duration: 1.25, ease: 'power3.out',scrollTrigger:{trigger:'.hero',start:'top 90%',once:true}});
      }
      children('.inner-copy', {x: -distance, y: 0});
      children('.inspection-copy,.cutaway-copy,.product-overview > div,.product-control > div,.editorial > div,.system > div:first-child,.pilot-summary > div:first-child,.pricing-detail > div,.decision > div,.product-commercial > div:first-child', {y: distance});
      children('.section-heading,.workflow,.related,.kit-hero > div,.kit-boundary > div,.demo-story-entry,.final-cta > div,.footer-intro > div,.form-story,.access-story', {y: distance * .75});
      // Section containers above own their copy; do not animate them a second time.
      document.querySelectorAll('[data-reveal]').forEach(el => {
        if (el.matches('img,.inner-copy,.inner-art,.cutaway-evidence,.module-card,.workflow-grid article') || el.querySelector('h1,h2,.module-card')) return;
        reveal(el, {x: el.dataset.reveal === 'left' ? -distance : el.dataset.reveal === 'right' ? distance : 0, y: el.dataset.reveal === 'up' ? distance : 0});
      });
      // Stagger each row rather than the whole grid, keeping later rows readable
      // on mobile and avoiding a long queued sequence after a fast scroll.
      document.querySelectorAll('.module-grid,.workflow-grid,.related-row,.resources-grid,.kit-grid,.demo-choices,.cutaway-evidence,.faq-list,.footer-top,.system-labels').forEach(group => {
        if (desktop && group.closest('.horizontal-modules')) return;
        const rows = new Map();
        [...group.children].forEach(el => {
          const row = Math.round(el.offsetTop / 4);
          const index = rows.get(row) || 0;
          rows.set(row, index + 1);
          reveal(el, {y: distance, stagger: 0, delay: Math.min(index, 3) * .09, trigger: el});
        });
      });
      reveal('.neighborhood-evidence .evidence-card', {x: 32, y: 0, stagger: .12, trigger: document.querySelector('.inner-art')});
      // These are display-only rows. Review controls, forms and live demo records
      // remain immediately usable, including after their React state changes.
      document.querySelectorAll('.workbench .record-row,.scorecard .score-row:not(.headings)').forEach(el => reveal(el, {x: 20, y: 0}));
      reveal('.measure-strip > *', {y: 20, stagger: .1});
      reveal('.access-panel > h2,.access-panel > p,.form-card > h2', {y: 18});
      reveal('.footer-wordmark', {y: 35});

      // Brick illustrations move relative to their surrounding text. CSS scale
      // and rotation are preserved, so reverse scrolling returns to the design.
      const artSelector = '.inner-art > img,.room-image,.cutaway-copy > img,.product-overview > img,.product-control > img,.editorial > img,.system-visual > img,.pricing-detail > img,.decision > img,.faq > div > img,.kit-hero > img,.form-story > img,.access-story > img,.final-cta > img,.footer-city > img:first-child';
      gsap.utils.toArray(artSelector).forEach(el => {
        const scale = Number(gsap.getProperty(el, 'scaleX')) || 1;
        gsap.fromTo(el, {y: desktop ? 48 : 16, scale: scale * .96}, {
          y: desktop ? -32 : -10, scale, ease: 'none',
          scrollTrigger: {trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: desktop ? .8 : .35},
        });
        gsap.fromTo(el, {opacity: 0}, {opacity: 1, duration: .7, scrollTrigger: {trigger: el, start: 'top 96%', once: true}});
      });
      gsap.utils.toArray('.module-art img,.related-row img,.resource-card img').forEach(el => {
        if (el.closest('.horizontal-modules')) return;
        gsap.fromTo(el, {y: 18}, {y: -12, ease: 'none', scrollTrigger: {trigger: el.closest('a'), start: 'top bottom', end: 'bottom top', scrub: .6}});
      });
      if (desktop) {
        if (document.querySelector('.hero')) {
          gsap.fromTo('.hero-building', {y: 0, scale: 1}, {y: -70, scale: 1.07, ease: 'none', scrollTrigger: {trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1}});
          gsap.to('.building-slice', {y: i => -25 * (6 - i), opacity: 0, stagger: .07, ease: 'none', scrollTrigger: {trigger: '.hero', start: '30% top', end: 'bottom top', scrub: 1}});
        }
        const rail = document.querySelector('.horizontal-modules .module-grid');
        if (rail) {
          const railTween = gsap.to(rail, {x: () => -Math.max(0, rail.scrollWidth - rail.parentElement.clientWidth + 144), ease: 'none', scrollTrigger: {trigger: '.horizontal-modules', start: 'top top+=80', end: () => '+=' + rail.scrollWidth, pin: true, scrub: 1, invalidateOnRefresh: true}});
          [...rail.children].forEach(card => gsap.fromTo(card.querySelector('img'), {y: 25, scale: .94}, {y: 0, scale: 1, ease: 'none', scrollTrigger: {trigger: card, containerAnimation: railTween, start: 'left 95%', end: 'left 40%', scrub: true}}));
        }
        if (document.querySelector('.story-scroll')) {
          const scenes = gsap.utils.toArray('.story-scene');
          gsap.set(scenes, {opacity: 0});
          gsap.set(scenes[0], {opacity: 1});
          const tl = gsap.timeline({scrollTrigger: {trigger: '.story-scroll', start: 'top top+=80', end: '+=2400', pin: '.story-sticky', scrub: .8, invalidateOnRefresh: true}});
          scenes.slice(1).forEach((scene, i) => {
            tl.to(scenes[i], {opacity: 0, y: -45, duration: .25}, i + .65)
              .fromTo(scene, {opacity: 0, y: 65}, {opacity: 1, y: 0, duration: .35}, i + .9)
              .fromTo(scene.querySelector('img'), {x: 70, scale: .9}, {x: 0, scale: 1, duration: .5}, i + .85);
          });
          tl.to('.story-progress span', {scaleX: 1, ease: 'none', duration: 3.6}, 0);
        }
      } else {
        document.querySelectorAll('.story-scene').forEach(scene => reveal(scene, {y: 25}));
      }
      const sketches = document.querySelector('.brick-sketches');
      if (sketches) ScrollTrigger.create({trigger: '.inspection', start: 'top bottom', end: 'bottom top', onToggle: self => sketches.style.setProperty('--sketch-play', self.isActive ? 'running' : 'paused')});
      return () => { reveals.clear(); sketches?.style.removeProperty('--sketch-play'); };
    });
  });
  // Keyboard focus completes the relevant reveal immediately, never leaving an
  // invisible focused link. Native focus/anchor scrolling remains available.
  const onFocus = e => {
    for (const [el, tween] of reveals) if (el.contains(e.target)) tween.progress(1);
  };
  document.addEventListener('focusin', onFocus);
  document.addEventListener('toggle', refresh, true);
  const images = [...document.images];
  images.forEach(im => im.addEventListener('load', refresh));
  document.fonts.ready.then(() => {if (alive) refresh();});
  refresh();
  return () => {
    alive = false;
    cancelAnimationFrame(refreshFrame);
    document.removeEventListener('focusin', onFocus);
    document.removeEventListener('toggle', refresh, true);
    images.forEach(im => im.removeEventListener('load', refresh));
    ctx.revert();
    gsap.ticker.remove(tick);
    window.removeEventListener('housingrelay:hero',handoff);
    window.removeEventListener('housingrelay:cancel-handoff',cancelHandoff);
    lenis.destroy();
    reveals.clear();
  };
}
