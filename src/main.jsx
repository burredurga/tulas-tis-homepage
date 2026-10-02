import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, Moon, Sun, X, Play, Quote, Sparkles, Compass, Heart, Mountain, GraduationCap, Instagram, Facebook, Youtube } from 'lucide-react';
import './styles.css';

const MEDIA = {
  hero: 'https://tis.edu.in/_next/static/media/Image%202.0c5295c9.webp',
  logo: 'https://tis.edu.in/_next/static/media/schoolLogo.95f6e121.png',
  campus: 'https://tis.edu.in/_next/static/media/AtTIS.59351600.png',
  archery: 'https://tis.edu.in/_next/static/media/archery.7a805345.png',
};

const nav = [
  ['Our story', '#story'], ['Learning', '#learning'], ['Life at Tulas', '#life'], ['Admissions', '#admissions'],
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return progress;
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const hover = (e) => ref.current?.classList.toggle('cursor-hover', Boolean(e.target.closest('a, button')));
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', hover);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', hover); };
  }, []);
  return <div className="cursor" ref={ref} aria-hidden="true" />;
}

function Header({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <div className="header-inner wrap">
      <a className="brand" href="#top" aria-label="Tulas International School home">
        <img src={MEDIA.logo} alt="Tulas International School" />
        <span className="brand-name">TULAS <small>INTERNATIONAL SCHOOL</small></span>
      </a>
      <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
        {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-apply" href="https://admission.tis.edu.in/" target="_blank" rel="noreferrer">Apply now <ArrowUpRight size={15} /></a>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
        <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
  </header>;
}

function Eyebrow({ children, light = false }) { return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span className="eyebrow-dot" />{children}</div>; }

function App() {
  const [dark, setDark] = useState(false);
  const progress = useScrollProgress();
  useReveal();
  return <div className={`site ${dark ? 'theme-dark' : ''}`} id="top">
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    <Cursor />
    <Header dark={dark} setDark={setDark} />
    <main>
      <section className="hero section-pad">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Eyebrow>Dehradun · India · Est. 2012</Eyebrow>
            <h1 className="hero-title">A world<br /><em>opens</em> here<span className="title-period">.</span></h1>
            <p className="hero-lede">A little more wonder in every lesson. A little more courage in every child. This is where their next chapter begins.</p>
            <div className="hero-ctas">
              <a className="button button-dark" href="https://admission.tis.edu.in/" target="_blank" rel="noreferrer">Explore admissions <ArrowRight size={17} /></a>
              <a className="text-link" href="#story"><span className="play-mark"><Play size={12} fill="currentColor" /></span> Discover Tulas</a>
            </div>
            <div className="hero-footnote"><span className="avatar-stack"><i>✦</i><i>✦</i><i>✦</i></span><span>A school for the curious,<br /><strong>the brave & the becoming.</strong></span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo" role="img" aria-label="Students learning and growing at Tulas International School" style={{ backgroundImage: `url("${MEDIA.hero}")` }} />
            <div className="hero-photo-shade" />
            <div className="photo-caption"><span className="caption-mark">T</span><span>More than a school.<br /><strong>A place to become.</strong></span><ArrowUpRight size={18} /></div>
            <div className="orbit-note"><span className="orbit-number">16+</span><span>ways to find<br />your thing</span></div>
            <div className="hero-side-label">TULAS INTERNATIONAL SCHOOL <span>—</span> 30°21' N</div>
          </div>
        </div>
        <a href="#story" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      </section>

      <section className="ticker" aria-label="School values"><div className="ticker-track">{[0,1].map((n) => <div className="ticker-group" key={n}><span>Curiosity</span><Sparkles /><span>Character</span><Sparkles /><span>Community</span><Sparkles /><span>Possibility</span><Sparkles /></div>)}</div></section>

      <section className="story section-pad" id="story">
        <div className="wrap story-grid">
          <div className="story-aside" data-reveal><Eyebrow>Our point of view</Eyebrow><span className="index-number">01 <i>/ 04</i></span></div>
          <div className="story-content" data-reveal>
            <h2>School isn’t just about lessons. It’s about <em>endless opportunities</em> waiting to be explored.</h2>
            <div className="story-lower"><p>Tulas International School is a CBSE boarding and day school in Dehradun, built around one simple belief: every student deserves room to grow into who they can be.</p><a className="circle-link" href="https://tis.edu.in/about-tis/" target="_blank" rel="noreferrer" aria-label="Read the Tulas story"><ArrowUpRight /></a></div>
          </div>
        </div>
        <div className="wrap story-image-wrap" data-reveal><img src={MEDIA.campus} alt="The open campus at Tulas International School" loading="lazy"/><div className="image-stamp"><Compass size={19}/><span>Rooted in Dehradun.<br /><strong>Open to the world.</strong></span></div><span className="image-index">THE PLACE TO GROW · 01</span></div>
      </section>

      <section className="learning section-pad" id="learning">
        <div className="wrap">
          <div className="section-heading" data-reveal><div><Eyebrow>Learning, with room to grow</Eyebrow><h2>Built for the <em>whole</em><br />human.</h2></div><p>Strong foundations open doors. Curiosity helps students find what’s on the other side.</p></div>
          <div className="learning-grid">
            <article className="learning-card card-academic" data-reveal><div className="card-top"><span>01 / THINK</span><GraduationCap size={24}/></div><div className="card-content"><h3>Learn deeply.<br />Think freely.</h3><p>CBSE learning designed to nurture academic excellence, analytical thinking and a lifelong love of discovery.</p><a href="https://tis.edu.in/academics/affilation/" target="_blank" rel="noreferrer" className="arrow-link">Explore academics <ArrowUpRight size={16}/></a></div><div className="card-orbit">T</div></article>
            <article className="learning-card card-life" id="life" data-reveal><div className="card-top"><span>02 / BECOME</span><Heart size={23}/></div><div className="card-content"><h3>Find your<br />kind of brave.</h3><p>From sport and music to art and leadership, students are encouraged to try, make, play and grow.</p><a href="https://tis.edu.in/" target="_blank" rel="noreferrer" className="arrow-link">Life at Tulas <ArrowUpRight size={16}/></a></div><div className="sun-shape" /></article>
            <article className="learning-card card-belong" data-reveal><div className="card-top"><span>03 / BELONG</span><Mountain size={23}/></div><div className="card-content"><h3>Room to roam.<br />People who care.</h3><p>A nurturing boarding and day school community where confidence, connection and independence take root.</p><a href="https://tis.edu.in/about-tis/why-choose-us/" target="_blank" rel="noreferrer" className="arrow-link">Why Tulas <ArrowUpRight size={16}/></a></div><div className="card-line-art">⌁</div></article>
          </div>
        </div>
      </section>

      <section className="quote-section section-pad">
        <div className="wrap quote-grid"><div className="quote-visual" data-reveal><img src={MEDIA.archery} alt="A student taking aim in archery practice" loading="lazy"/><span className="quote-photo-label">COURAGE LOOKS DIFFERENT ON EVERYONE.</span></div><div className="quote-copy" data-reveal><Eyebrow>Room for every kind of spark</Eyebrow><Quote className="quote-icon" size={34}/><blockquote>“We feel supported in what we do and nudged further to do more.”</blockquote><p>At Tulas, the right support and inspiration help creativity find its way — whether it’s in academics, music, art or drama.</p><a className="text-link" href="https://tis.edu.in/" target="_blank" rel="noreferrer">Hear more from Tulas <ArrowUpRight size={15}/></a></div></div>
      </section>

      <section className="numbers-section section-pad">
        <div className="wrap numbers-wrap"><div className="numbers-heading" data-reveal><Eyebrow>Space to do more</Eyebrow><h2>Big enough for<br /><em>every possibility.</em></h2></div><div className="numbers-grid" data-reveal><div className="number-item"><strong>22<span>acres</span></strong><p>pollution-free campus</p></div><div className="number-item"><strong>16<span>+</span></strong><p>Olympic sports</p></div><div className="number-item"><strong>24<span>/7</span></strong><p>medical assistance</p></div><div className="number-item"><strong>6<span>:1</span></strong><p>student–teacher ratio</p></div></div><p className="numbers-note">A few of the things that make space for big dreams.<br /><small>*As shared by Tulas International School.</small></p></div>
      </section>

      <section className="admissions section-pad" id="admissions"><div className="admissions-bg" /><div className="wrap admissions-inner" data-reveal><Eyebrow light>Your next chapter starts here</Eyebrow><h2>There’s more<br />to <em>become.</em></h2><p>Find out what life at Tulas could open up for your child.</p><a className="button button-light" href="https://admission.tis.edu.in/" target="_blank" rel="noreferrer">Begin your Tulas story <ArrowRight size={17}/></a><span className="admission-mark">T</span></div></section>
    </main>
    <footer className="footer"><div className="wrap footer-top"><a className="brand footer-brand" href="#top"><img src={MEDIA.logo} alt=""/><span className="brand-name">TULAS <small>INTERNATIONAL SCHOOL</small></span></a><p>Curiosity leads.<br /><em>Possibility follows.</em></p><a href="https://maps.app.goo.gl/" className="footer-address" target="_blank" rel="noreferrer">Dhoolkot, P.O. Selaqui,<br />Chakrata Road, Dehradun<br />Uttarakhand — 248011 <ArrowUpRight size={14}/></a><div className="footer-contact"><a href="tel:+919837983791">+91 98379 83791</a><a href="mailto:info@tis.edu.in">info@tis.edu.in</a><div className="socials"><a href="https://www.instagram.com/tulasinternationalschool/" aria-label="Instagram"><Instagram size={16}/></a><a href="https://www.facebook.com/" aria-label="Facebook"><Facebook size={16}/></a><a href="https://www.youtube.com/" aria-label="YouTube"><Youtube size={16}/></a></div></div></div><div className="wrap footer-bottom"><span>© 2026 Tulas International School, Dehradun</span><span>A school for the curious, the brave & the becoming.</span><a href="https://tis.edu.in/" target="_blank" rel="noreferrer">Visit TIS.edu.in <ArrowUpRight size={13}/></a></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
