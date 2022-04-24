import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

class PageTitle {
    create () {
        
        const pageTitle        = document.querySelector('.js-page-title');
        const pageTitleTrigger = document.querySelector('.js-trigger');
        
        if (window.matchMedia('(min-width:980px)').matches) {
            gsap.set(pageTitle, {
                scale: 1,
            });
            gsap.to(pageTitle, {
                scale: 0.25,
                scrollTrigger: {
                    trigger: pageTitleTrigger,
                    scrub: true,
                    start: 'top 255px',
                    end: '600px 255px',
                    // markers: true,
                }
            });
        }

    }
}

export { PageTitle };