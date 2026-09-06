gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

let name = SplitText.create(".hero_name", {
    types: "words chars"
});

name.chars.forEach((char, index) => {
    const tl = gsap.timeline();
    tl.from(char, {
        y: gsap.utils.random(-200, 200),
        x: gsap.utils.random(-200, 200),
        duration: .5,
        rotate: gsap.utils.random(-360, 360),
        scale: gsap.utils.random(0,4),
        delay: index * 0.01,
        opacity: 0,
        ease: "back.out"
    })
    tl.from(char, {
        color: `rgb(${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)})`
    }, "-=.25")
    
    char.addEventListener("mouseenter", nameHover);
    
    function nameHover() {
        gsap.timeline()
        .to(char, {
            y: gsap.utils.random(-100, 100),
            x: gsap.utils.random(-100, 100),
            rotate: gsap.utils.random(-360, 360),
            scale: gsap.utils.random(0,2),
            ease: "back.out",
            color: `rgb(${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)})`,
            onComplete: () => {
                char.removeEventListener("mouseenter", nameHover);
            }
        })
        .to(char, {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            color: "#000000",
            onComplete: () => {
                char.addEventListener("mouseenter", nameHover);
            }
        })
    }
});

let contextHero = SplitText.create(".hero__desc", {
    types: "lines, words, chars"
});

contextHero.lines.forEach((line, index) => {
    const tl = gsap.timeline();
    tl.from(line, {
        opacity: 0,
        y: 100,
        ease: "back.out",
        delay: index * 0.2
    })
})

const items = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }
});
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

items.forEach((el) => observer.observe(el))
