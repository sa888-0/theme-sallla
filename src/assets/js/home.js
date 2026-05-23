import "lite-youtube-embed";
import BasePage from "./base-page";
import Lightbox from "fslightbox";
window.fslightbox = Lightbox;

class Home extends BasePage {
    onReady() {
        this.initFeaturedTabs();
        this.initLuxuryCurtain();
        this.initCustomCursor();
        this.initScrollProgress();
        this.initScrollReveal();
        this.initCardTilt();
        this.initNavScroll();
    }

    /**
     * used in views/components/home/featured-products-style*.twig
     */
    initFeaturedTabs() {
        app.all('.tab-trigger', el => {
            el.addEventListener('click', ({ currentTarget: btn }) => {
                let id = btn.dataset.componentId;
                // btn.setAttribute('fill', 'solid');
                app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'is-active opacity-0 translate-y-3', 'inactive', tab => tab.id == btn.dataset.target)
                    .toggleClassIf(`#${id} .tab-trigger`, 'is-active', 'inactive', tabBtn => tabBtn == btn);

                // fadeIn active tabe
                setTimeout(() => app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'opacity-100 translate-y-0', 'opacity-0 translate-y-3', tab => tab.id == btn.dataset.target), 100);
            })
        });
        document.querySelectorAll('.s-block-tabs').forEach(block => block.classList.add('tabs-initialized'));
    }

    initLuxuryCurtain() {
        const curtain = document.getElementById('lux-curtain');
        if (!curtain) return;
        setTimeout(() => {
            curtain.classList.add('open');
            setTimeout(() => curtain.remove(), 1400);
        }, 900);
    }

    initCustomCursor() {
        const dot  = document.getElementById('luxDot');
        const ring = document.getElementById('luxRing');
        if (!dot || !ring) return;

        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top  = my + 'px';
        });

        const animRing = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px';
            ring.style.top  = ry + 'px';
            requestAnimationFrame(animRing);
        };
        animRing();

        document.querySelectorAll('a, button, [class*="cursor-pointer"]').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        });
    }

    initScrollProgress() {
        const bar = document.getElementById('lux-progress');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
            bar.style.width = pct + '%';
        }, { passive: true });
    }

    initScrollReveal() {
        const els = document.querySelectorAll('.lux-reveal');
        if (!els.length) return;
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        els.forEach(el => obs.observe(el));
    }

    initCardTilt() {
        document.querySelectorAll('.lux-tilt').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
                const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
                card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
                setTimeout(() => { card.style.transform = ''; }, 600);
            });
        });
    }

    initNavScroll() {
        const nav = document.getElementById('mainnav');
        if (!nav) return;
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }
}

Home.initiateWhenReady(['index']);