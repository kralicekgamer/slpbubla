# 🎨 Moderní Portfolio Junior Web Developera – DESIGN.md

## Overview

Slpbubla je moderní, přístupný a responzivní web portfolio pro junior web developery, designery a freelancery. Projekt je postavený na **čistém HTML5, CSS3 a Vanilla JavaScriptu** bez použití frameworků. Návrh klade důraz na jednoduchost, výkon a dodržení WCAG 2.1 AA standarden přístupnosti.

## Motivation

Cílem projektu je vytvořit **šablonu portfolia**, která:
- Demonstruje best practices v moderním webovém vývoji
- Nemá žádné vnější závislosti (CDN, frameworky)
- Běží rychle a efektivně na všech zařízeních
- Je dostupná všem uživatelům včetně těch se speciálními potřebami
- Slouží jako referenční projekt pro junior vývojáře

## Goals

- ✅ Vytvořit přístupný, sémantický web bez frameworků (HTML, CSS, JS)
- ✅ Implementovat mobile-first design s perfektní responzivností
- ✅ Optimalizovat výkon (lazy loading, minimální bundle size ~50 KB)
- ✅ Dodržet WCAG 2.1 AA standard přístupnosti
- ✅ Poskytnout čitelný, modulární JavaScript s třídami a clear separation of concerns
- ✅ Implementovat moderní design systém (Catppuccin Mocha paleta)
- ✅ Měřit a monitorovat Web Vitals (LCP, CLS)

## Non-Goals

- Podpora pro velmi staré prohlížeče (< IE11)
- Komplexní backend nebo database
- Budování všeobecného CSS frameworku
- Automatizace developerských tasků (build, minifikace)
- Realtime features nebo WebSocket komunikace

## Detailed Design

### 1. Architektura

Projekt je strukturován jako **jednoduchá statická stránka** s modulárním JavaScriptem:

```
slpbubla/
├── index.html          (HTML struktura)
├── css/
│   └── styles.css      (Centralizované CSS)
├── js/
│   └── main.js         (Vanilla JS moduly)
├── assets/             (Obrázky, ikony)
├── README.md           (Dokumentace)
├── DESIGN.md           (Tento soubor)
├── sitemap.xml         (SEO)
├── robots.txt          (SEO)
└── .git/               (Version control)
```

### 2. HTML Struktura

**Sémantické značky:**
```html
<header>         <!-- Navigace + branding -->
<section id="">  <!-- Hlavní obsah (hero, about, projects, contact) -->
<footer>         <!-- Patička -->
```

**Klíčové atributy pro přístupnost:**
- `role="status"`, `aria-live="polite"` pro oznámení změn
- `aria-invalid="true/false"` pro validaci formulářů
- `aria-expanded` pro hamburger menu
- JSON-LD strukturované data (Person schema)
- Meta tags: OpenGraph, Twitter Card

### 3. CSS Systém

**Architektura: CSS Variables + Mobile-First**

```css
:root {
  /* Barvy (Catppuccin Mocha) */
  --bg-primary: #1e1e2e;
  --primary: #89b4fa;
  
  /* Spacing systém */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  /* ... atd */
  
  /* Typografie */
  --font-family-base: sans-serif;
  --font-size-base: 1rem;
  /* ... atd */
  
  /* Transitive a shadow */
  --transition-base: 250ms ease-out;
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
}
```

**Responsive Design (Mobile-First):**
- Basis na mobilních zařízeních (< 640px)
- Breakpointy: 640px (sm), 768px (md), 1024px (lg)
- Fluid typografie pomocí `clamp()`: `clamp(1rem, 2vw, 2rem)`

**Catppuccin Mocha Paleta:**
- Tmavé pastelové barvy pro přehlednost a estetiku
- Primární: modrá (#89b4fa), sekundární: růžová (#f5c2e7), accent: tyrkysová (#94e2d5)

### 4. JavaScript Architektura

**Paradigma: Class-based moduly se stanoveným životním cyklem**

Každý modul je třída s metodou `init()` a event listenerami:

```javascript
class ModuleName {
  constructor() {
    this.element = document.getElementById('id');
    if (this.element) this.init();
  }
  
  init() {
    // Registrace event listenerů
    this.element.addEventListener('click', () => this.handleClick());
  }
  
  handleClick() {
    // Logika
  }
}
```

**Moduly (v main.js):**

| Modul | Účel |
|-------|------|
| **HamburgerMenu** | Toggle mobilního menu s overlay close |
| **SmoothScroll** | Smooth scroll na kotvy (#target) |
| **ProjectFilter** | Filtrování projektů podle tagů |
| **LazyImageLoader** | Lazy loading s IntersectionObserver |
| **ContactForm** | Validace formuláře (client-side) |
| **ProgressBarAnimation** | Animace skill progress barů |
| **ActiveNavLink** | Highlight nav linku při scrollování |
| **ThemeToggle** | Detekce systémového dark/light mode |
| **PerformanceMonitor** | Měření Web Vitals (LCP, CLS) |

**Inicializace:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
  new HamburgerMenu();
  new SmoothScroll();
  // ... ostatní moduly
});
```

### 5. Obsah a Sekce

**Hlavní součásti stránky:**

1. **Header + Sticky Navigace**
   - Sticky positionování v CSS
   - Hamburger menu toggle v JS
   - Zviditelnění aktuální sekce (ActiveNavLink)

2. **Hero Sekce**
   - Velký heading s gradientem
   - Call-to-action tlačítka
   - Scroll indikátor (CSS animace)

3. **O Mně (About)**
   - Bio text a fotka
   - Skills s progress bary (animované při scrollování)
   - Tech stack

4. **Projekty (Projects)**
   - Karty projektů s obrázky
   - Filtrování podle technologií/tagů
   - Lazy-loaded obrázky

5. **Kontakt (Contact)**
   - Formulář s validací
   - Real-time error messages
   - ARIA atributy pro přístupnost

6. **Footer**
   - Sociální linky
   - Copyright

### 6. Klíčová Rozhodnutí

#### A) Vanilla JavaScript bez frameworků

**Rationale:**
- Minimální bundle size (< 50 KB)
- Bez learning curve pro junior vývojáře
- Plná kontrola nad chováním
- Demonstrace fundamentálních JS konceptů

**Tradeoffs:**
- Bez reactivity (manual DOM updates)
- Více boilerplate kódu
- Bez dev tools jako hot reload

#### B) CSS Variables místo SASS/LESS

**Rationale:**
- Nativní browser support
- Dynamické změny v runtime (themes)
- Jednodušší onboarding
- Žádný build step

**Tradeoffs:**
- Bez nesting (ale je to jednoduchost)
- Bez mixins (ale jsou to CSS funkce)
- Starší prohlížeče (~95% support)

#### C) Catppuccin Mocha Paleta

**Rationale:**
- Moderní, pastelové barvy
- Vysoký contrast (WCAG AA)
- Trendy v developer komunitě
- Hotové barvy pro consistency

**Tradeoffs:**
- Tmavý design (ne pro všechny)
- Může vyžadovat customizaci pro konkrétní brand

#### D) Lazy Loading Images s Fallback

**Rationale:**
- Optimalizace výkonu (LCP, bandwidth)
- IntersectionObserver pro modern browsers
- Fallback pro starší zařízení

**Tradeoffs:**
- Dodatečný HTML atribut (`data-src`)
- Komplexnější obraz loading

### 7. Data Flow

```
HTML (sémantické) 
  ↓
CSS (styling + responsive)
  ↓
JS (interaktivita)
  ├─ DOMContentLoaded
  ├─ Init všechny moduly
  ├─ Event listeners
  └─ Monitor performance
```

## Alternatives Considered

### 1. React/Vue Framework

**Popis:** Použít React nebo Vue místo vanilla JS

**Proč ne:**
- Zvyšuje bundle size (100+ KB)
- Zbytečná komplexita pro statickou stránku
- Harder pro junior vývojáře učit se fundamentálním konceptům

### 2. Tailwind CSS místo CSS Variables

**Popis:** Použít utility-first framework Tailwind

**Proč ne:**
- Zbytečné závislosti (build step)
- HTML se stává nečitelným (class soup)
- Obtížnější customizace pro junior vývojáře
- Větší bundle bez tree-shaking

### 3. Backend API (Node.js/Django)

**Popis:** Přidat backend pro dynamický obsah

**Proč ne:**
- Out of scope pro portfolio demo
- Hosting komplikace (static hosting je levnější)
- Nepotřebné pro showcase obsahu

## Risks and Mitigations

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Nekompatibilita se starými prohlížeči (IE11) | Low | Graceful degradation, polyfills nejsou potřeba |
| Formulář bez backend API | Medium | Pracuje jako demo, můžete připojit Formspree/Netlify Forms |
| WCAG compliance nesplnění | High | Regular audits, screen reader testing, manual a11y checks |
| Výkon (CLS, LCP) na pomalých sítích | Medium | Lazy loading, CSS optimalizace, minifikace |
| SEO indexace | Low | Sitemaps, robots.txt, structured data (JSON-LD) |
| XSS útok přes formulář | Medium | Input validation (regex), sanitizace, CSP headers |
| Přetečení HTML/CSS při editaci | Low | Dokumentace, code review, linting |

## Operational Considerations

### Deployment

**Hosting:**
- Statické hosting: Netlify, Vercel, GitHub Pages, Firebase Hosting
- Není potřeba server (CDN je dostačující)
- Doporučená: Netlify (free tier, HTTPS, custom domain)

**Deployment proces:**
1. Push na Git
2. CI/CD automaticky nasadí na production
3. Edge caching pro statické assety

**Prerequisites:**
- Git
- Node.js (volitelně, jen pro local preview)
- Text editor (VS Code)

### Monitoring a Observability

**Metriky (Web Vitals):**
```javascript
// V PerformanceMonitor:
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1
- FID (First Input Delay) < 100ms
```

**Tools:**
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- WebPageTest
- Real user monitoring (RUM)

**Observability v konsoli:**
```javascript
console.log('LCP:', entry.renderTime);
console.log('CLS Score:', clsScore);
```

### Performance

**Optimalizace:**
- Lazy loading obrázků (IntersectionObserver)
- CSS minifikace (ručně, nebo inline critical CSS)
- JS lazy execution (moduly se loadují až po DOMContentLoaded)
- Responsive obrázky (`srcset`, `picture`)
- Font optimization (system fonts, ne Google Fonts CDN)

**Bottlenecks:**
- Velké obrázky v hero sekci (optimalizovat pomocí WebP)
- Bez asset minifikace (ruční, nebo build script)
- Network latency (zavisle na hosting)

### Scalability

**Horizontální:**
- Přidat více projektů v projekts sekci (bez performance impact)
- Přidat více sekcí/stránek (static site generator by pomohl)

**Vertikální:**
- Cache assets na edge (Netlify edge functions)
- Image optimization (ImageMagick, ImageOptim)
- Minify CSS/JS (build script, např. esbuild)

**Limitace:**
- Bez database = bez dynamického obsahu
- Bez authentication = veřejné info
- Pro velkoutextové stránky > 10 MB by byl SSG (11ty, Hugo)

## Security Considerations

### Input Validation

**ContactForm:**
- Regex validace emailu: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Trimování whitespace
- Checking for required fields

### XSS Prevention

- Žádný `innerHTML` nebo `eval()`
- Použití `textContent` a `setAttribute()` pro DOM updates
- Content Security Policy (CSP) headery na hostingu

```
Content-Security-Policy: default-src 'self'; script-src 'self'
```

### Data Protection

- Lokální contact form (bez API) = no data sent
- Pokud chcete zbavit forma: připojit Formspree, Netlify Forms (GDPR compliant)
- Žádné cookies, tracking, nebo third-party scripts

### Known Vulnerabilities

- **Žádné frameworky = Žádné dependencies = Žádné CVEs**
- Starší prohlížeče: nižší support, ale graceful degradation
- Formulář bez backend: test sami s Postman/curl

## Testing and Validation

### Testing Strategy

**Manual Testing:**
1. **Accessibility:** Screen reader (NVDA, JAWS), keyboard navigation
2. **Responsiveness:** Chrome DevTools (mobile, tablet, desktop)
3. **Cross-browser:** Firefox, Safari, Edge, Chrome
4. **Performance:** Lighthouse, PageSpeed Insights
5. **SEO:** Google Search Console, Screaming Frog

**Automated Testing (volitelně):**
- Unit testy pro JS moduly (Jest, Vitest)
- E2E testy pro user flows (Playwright, Cypress)
- Accessibility audit (Pa11y, axe DevTools)

### Validation Criteria

- [x] Splnit WCAG 2.1 AA standard (ověřeno ručně + axe)
- [x] Lighthouse score > 90 (performance, accessibility, SEO)
- [x] LCP < 2.5s, CLS < 0.1 (web vitals)
- [x] Bundle size < 50 KB (HTML + CSS + JS)
- [x] Responsive na: mobil (320px), tablet (768px), desktop (1920px)
- [x] Bez console errors/warnings
- [x] Formulář validuje správně
- [x] Všechny linky (interní/externí) fungují

## Appendix

### References and Links

- [Catppuccin Mocha Colors](https://github.com/catppuccin/catppuccin)
- [WCAG 2.1 Standard](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals Guide](https://web.dev/vitals/)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [JSON-LD Schema](https://json-ld.org/)

### Glossary

| Termín | Vysvětlení |
|--------|-----------|
| **LCP** | Largest Contentful Paint – čas načtení největšího prvku |
| **CLS** | Cumulative Layout Shift – měří vizuální stabilitu |
| **FID** | First Input Delay – latence user interaction |
| **WCAG** | Web Content Accessibility Guidelines – standardy přístupnosti |
| **SEO** | Search Engine Optimization – optimalizace pro vyhledávače |
| **Vanilla JS** | JavaScript bez frameworků nebo knihoven |
| **IntersectionObserver** | Browser API pro lazy loading a triggering akcí |
| **Semantic HTML** | HTML tags s smysl (header, section, article) |
| **Fallback** | Záložní řešení pro starší prohlížeče |
| **Bundle Size** | Celková velikost JS/CSS/HTML souborů |

### Project Screenshots

- `ph.png` – Phone mockup
- `tb.png` – Tablet mockup
- `pc.png` – Desktop mockup

---

**Verze dokumentu:** 1.0  
**Poslední aktualizace:** 2. červen 2026  
**Autor(y):** Matěj Adamec
**Status:** ✅ Dokončeno a aktivní
