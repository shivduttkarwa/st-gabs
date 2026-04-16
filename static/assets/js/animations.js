(function () {
    const SGAnimations = {
        animateHeroSlide(slide, includeTitle = true, includeEyebrow = true, includeArrows = false) {
            if (!slide || typeof gsap === 'undefined') return;
            const eyebrow = slide.querySelector('.sg-hero__label');
            const title = slide.querySelector('.sg-hero__h1-sans');
            const subtitle = slide.querySelector('.sg-hero__h1-serif');
            const body = slide.querySelector('.sg-hero__body');
            const arrows = document.querySelector('.sg-hero__arrows');

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
            if (includeEyebrow && eyebrow) {
                tl.fromTo(eyebrow, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0);
            }
            if (subtitle) {
                tl.fromTo(subtitle, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.45 }, includeTitle ? 0.34 : 0.12);
            }
            if (body) {
                tl.fromTo(body, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45 }, includeTitle ? 0.46 : 0.22);
            }
            if (includeArrows && arrows) {
                tl.fromTo(arrows, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45 }, includeTitle ? 0.46 : 0.22);
            }
            if (includeTitle && title) {
                tl.fromTo(title, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.08);
            }
        },

        hideHeroSlideContent(slide, includeTitle = true, includeEyebrow = true) {
            if (!slide || typeof gsap === 'undefined') return;
            const eyebrow = slide.querySelector('.sg-hero__label');
            const title = slide.querySelector('.sg-hero__h1-sans');
            const subtitle = slide.querySelector('.sg-hero__h1-serif');
            const body = slide.querySelector('.sg-hero__body');
            const targets = includeTitle
                ? (includeEyebrow ? [eyebrow, title, subtitle, body] : [title, subtitle, body])
                : (includeEyebrow ? [eyebrow, subtitle, body] : [subtitle, body]);
            gsap.set(targets.filter(Boolean), { autoAlpha: 0 });
            if (includeEyebrow && eyebrow) gsap.set(eyebrow, { y: 14 });
            if (body) gsap.set(body, { y: 14 });
            if (subtitle) gsap.set(subtitle, { y: 20 });
            if (includeTitle && title) gsap.set(title, { y: 20 });
        },

        resetHeroSlides(swiper, includeTitle = true, includeEyebrow = true) {
            if (!swiper) return;
            swiper.slides.forEach((slide) => {
                slide.classList.remove('sg-hero__slide--anim');
                if (typeof gsap !== 'undefined') {
                    gsap.killTweensOf(slide.querySelectorAll('.sg-hero__label, .sg-hero__h1-sans, .sg-hero__h1-serif, .sg-hero__body'));
                }
                this.hideHeroSlideContent(slide, includeTitle, includeEyebrow);
            });
        },

        animateCurrentHeroSlide(swiper, includeTitle = true, includeArrows = false) {
            if (!swiper) return;
            const active = swiper.slides[swiper.activeIndex];
            if (!active) return;
            active.classList.add('sg-hero__slide--anim');
            this.animateHeroSlide(active, includeTitle, true, includeArrows);
        },

        initSplitTextAndBatch() {
            const splitTextElements = document.querySelectorAll('.sg-split-init');
            splitTextElements.forEach((item) => {
                if (item.classList.contains('sg-split-lines')) {
                    const targets = item.querySelectorAll('p, li, h4, h3, h5, h6');
                    if (targets.length > 0) {
                        targets.forEach((el) => {
                            new SplitText(el, { type: 'lines', linesClass: 'line-st', aria: 'none' });
                        });
                    } else {
                        new SplitText(item, { type: 'lines', linesClass: 'line-st', aria: 'none' });
                    }
                } else if (item.classList.contains('sg-split-chars')) {
                    new SplitText(item, { type: 'chars,lines', linesClass: 'line-st', charsClass: 'char-st', aria: 'none' });
                }
            });

            const headerItems = document.querySelectorAll('.sg-anim-header-item');
            if (!window.is_preloader && headerItems.length > 0) {
                headerItems.forEach((el) => el.classList.add('sg-anim-item', 'sg-anim-item--static'));
            }

            const textBlocks = document.querySelectorAll('.sg-children-anim > *:not(blockquote)');
            if (textBlocks.length > 0) {
                textBlocks.forEach((el) => el.classList.add('sg-anim-item', 'sg-anim-item--static'));
            }

            const blockquoteBlocks = document.querySelectorAll('.sg-children-anim > blockquote');
            if (blockquoteBlocks.length > 0) {
                blockquoteBlocks.forEach((el) => {
                    const line1 = document.createElement('div');
                    line1.classList.add('blockquote-line', 'blockquote-line-top');
                    const line2 = document.createElement('div');
                    line2.classList.add('blockquote-line', 'blockquote-line-bottom');
                    const wrapper = document.createElement('div');
                    wrapper.classList.add('blockquote-lines-wrapper', 'sg-anim-item', 'sg-anim-item--blockquote', 'blockquote-added-lines');
                    wrapper.appendChild(el.cloneNode(true));
                    el.parentNode.replaceChild(wrapper, el);
                    wrapper.appendChild(line1);
                    wrapper.appendChild(line2);
                });
            }

            const batchItems = document.querySelectorAll('.sg-anim-item');
            if (batchItems.length === 0) return;

            if (document.querySelectorAll('.sg-anim-item--text.sg-split-lines .line-st').length > 0) {
                gsap.set('.sg-anim-item--text.sg-split-lines .line-st', { y: 30, autoAlpha: 0 });
            }
            if (document.querySelectorAll('.sg-anim-item--text.sg-split-chars .char-st').length > 0) {
                gsap.set('.sg-anim-item--text.sg-split-chars .char-st', { autoAlpha: 0 });
            }
            if (document.querySelectorAll('.sg-anim-item--default').length > 0) {
                gsap.set('.sg-anim-item--default', { y: 30, autoAlpha: 0 });
            }
            if (document.querySelectorAll('.sg-anim-item--blockquote').length > 0) {
                gsap.set('.sg-anim-item--blockquote blockquote', { y: 30, autoAlpha: 0 });
            }
            if (document.querySelectorAll('.sg-anim-item--static').length > 0) {
                gsap.set('.sg-anim-item--static', { autoAlpha: 0 });
            }
            if (document.querySelectorAll('.sg-anim-item--from-right').length > 0) {
                gsap.set('.sg-anim-item--from-right', { x: '15%', autoAlpha: 0 });
            }
            if (document.querySelectorAll('.sg-anim-item--from-left').length > 0) {
                gsap.set('.sg-anim-item--from-left', { y: '-15%', autoAlpha: 0 });
            }

            function animateDefault(card, index = 0, isStatic = false, useEvents = false) {
                if (!isStatic) {
                    gsap.to(card, { duration: 0.7, ease: 'power1.out', x: 0, y: 0, delay: index * 0.1 });
                }
                gsap.to(card, {
                    duration: 0.5,
                    ease: 'power1.out',
                    autoAlpha: 1,
                    delay: index * 0.1 + 0.1,
                    onStart: () => useEvents && card.classList.add('start-animation'),
                    onComplete: () => useEvents && card.classList.add('end-animation'),
                });
            }

            function runBatch(batch) {
                batch.forEach((card, index) => {
                    if (card.classList.contains('sg-anim-item--default')) animateDefault(card, index);
                    if (card.classList.contains('sg-anim-item--blockquote')) {
                        gsap.to(card.querySelector('blockquote'), { duration: 0.7, ease: 'power1.out', x: 0, y: 0, delay: index * 0.1 });
                        gsap.to(card.querySelector('blockquote'), {
                            duration: 0.5, ease: 'power1.out', autoAlpha: 1, delay: index * 0.1 + 0.1,
                            onStart: () => card.classList.add('start-animation'),
                            onComplete: () => card.classList.add('end-animation'),
                        });
                    }
                    if (card.classList.contains('sg-anim-item--static')) animateDefault(card, index, true);
                    if (card.classList.contains('sg-anim-item--from-right')) animateDefault(card, index);
                    if (card.classList.contains('sg-anim-item--from-left')) animateDefault(card, index);
                    if (card.classList.contains('sg-anim-item--clip')) {
                        gsap.fromTo(card, { '--clip-value': '100%' }, {
                            duration: 1.1, ease: 'power3.out', '--clip-value': '0%', delay: index * 0.2,
                            onComplete: () => card.classList.add('disable-clip'),
                        });
                    }
                    if (card.classList.contains('sg-split-lines')) {
                        const lines = card.querySelectorAll('.line-st');
                        gsap.to(lines, { y: 0, duration: 0.6, stagger: 0.15, ease: 'power1.out', delay: index * 0.1 });
                        gsap.to(lines, { autoAlpha: 1, duration: 0.5, stagger: 0.15, ease: 'power1.out', delay: index * 0.1 + 0.1 });
                    }
                    if (card.classList.contains('sg-split-chars')) {
                        const chars = card.querySelectorAll('.char-st');
                        gsap.to(chars, { duration: 0.4, stagger: 0.05, ease: 'power3.inOut', autoAlpha: 1, delay: index * 0.1 });
                    }
                });
            }

            ScrollTrigger.batch('.sg-anim-item:not(.sg-anim-item--hero)', {
                start: 'top bottom-=100',
                once: true,
                onEnter: (batch) => runBatch(batch),
            });

            ScrollTrigger.batch('.sg-anim-item--hero', {
                start: 'top bottom',
                once: true,
                onEnter: (batch) => runBatch(batch),
            });
        },

        initParallax() {
            const customParallaxElements = document.querySelectorAll('.sg-parallax-custom');
            customParallaxElements.forEach((item) => {
                const container = item.closest('.sg-parallax-custom-container');
                if (!container) return;
                item.classList.add('add-styles');
                const startValue = item.classList.contains('sg-parallax-custom-hero') ? 'top top' : 'top bottom';
                gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: startValue,
                        end: 'bottom top',
                        pin: item,
                        pinSpacing: false,
                    },
                });
            });

            const customHeroParallaxElements = document.querySelectorAll('.sg-parallax-custom-hero');
            if (customHeroParallaxElements.length > 0) {
                document.body.classList.add('disable-offset-top');
                customHeroParallaxElements.forEach((item) => {
                    const container = item.closest('.sg-parallax-custom-container');
                    if (!container) return;
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: container,
                            start: 'top top',
                            end: `bottom-=${document.querySelector('#header')?.offsetHeight || 0}px top`,
                            onLeave: () => document.body.classList.remove('disable-offset-top'),
                            onEnterBack: () => document.body.classList.add('disable-offset-top'),
                        },
                    });
                });
            }

            const disableLgParallax = document.querySelectorAll('.sg-disable-lg-parallax');
            if (disableLgParallax.length > 0 && window.innerWidth < 992) {
                disableLgParallax.forEach((item) => item.classList.remove('sg-parallax'));
            }

            const parallaxes = document.querySelectorAll('.sg-parallax');
            if (!parallaxes.length) return;

            parallaxes.forEach((el) => {
                const isImg = el.classList.contains('sg-parallax-img');
                const isBlock = el.classList.contains('sg-parallax-block');
                const isReverse = el.classList.contains('sg-parallax-reverse');
                const translateValue = parseFloat(el.dataset.parallaxValue) || 0;
                const translateY = el.classList.contains('sg-parallax-y') ? translateValue : 0;
                const translateX = el.classList.contains('sg-parallax-x') ? translateValue : 0;
                const scale = el.classList.contains('sg-parallax-scale') ? translateValue : 1;
                const scrubVal = el.dataset.parallaxScrub !== undefined ? el.dataset.parallaxScrub : 1;
                const startPos = el.dataset.parallaxTriggerStart || 'top bottom';
                const endPos = el.dataset.parallaxTriggerEnd || 'bottom top';
                const trig = el.classList.contains('sg-is-parallax-trigger') ? el.closest('.sg-parallax-trigger') : el;
                const trigEnd = el.dataset.endTrigger || trig;

                if (isImg && (translateY || translateX)) {
                    const translateYVal = isReverse ? 0 : -translateY;
                    const translateXVal = isReverse ? 0 : -translateX;
                    Object.assign(el.style, {
                        height: `calc(100% + ${translateY}%)`,
                        width: `calc(100% + ${translateX}%)`,
                        position: 'relative',
                        top: `${translateYVal}%`,
                        left: `${translateXVal}%`,
                    });
                }

                if (isBlock && (translateY || translateX)) {
                    let translateYVal = translateY / 2;
                    let translateXVal = translateX / 2;
                    if (!isReverse) {
                        translateYVal *= -1;
                        translateXVal *= -1;
                    }
                    Object.assign(el.style, {
                        position: 'relative',
                        top: `${translateYVal}%`,
                        left: `${translateXVal}%`,
                    });
                }

                const section = el.closest('section');
                const isSafariBrowser = typeof window.isSafari === 'function' ? window.isSafari() : false;
                const parallaxTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: trig,
                        endTrigger: trigEnd,
                        start: startPos,
                        end: endPos,
                        scrub: scrubVal,
                        pin: false,
                        onEnter: () => isSafariBrowser && section && section.classList.add('use-will-change-on-children'),
                        onLeave: () => isSafariBrowser && section && section.classList.remove('use-will-change-on-children'),
                        onEnterBack: () => isSafariBrowser && section && section.classList.add('use-will-change-on-children'),
                        onLeaveBack: () => isSafariBrowser && section && section.classList.remove('use-will-change-on-children'),
                    },
                });

                let translateYVal = translateY;
                let translateXVal = translateX;
                if (isReverse) {
                    if (translateY) translateYVal = -translateY + 3;
                    if (translateX) translateXVal = -translateX + 3;
                }
                parallaxTL.to(el, {
                    xPercent: translateXVal,
                    yPercent: translateYVal,
                    scale,
                    duration: 1,
                    ease: 'none',
                });
            });
        },

        initContainersAndSections() {
            const animContainers = document.querySelectorAll('.sg-anim-container');
            if (animContainers.length > 0) {
                gsap.set(animContainers, { autoAlpha: 1 });
            }

            const sectionsInView = document.querySelectorAll('.sg-safari-section-trigger');
            if (sectionsInView.length && typeof window.isSafari === 'function' && window.isSafari()) {
                sectionsInView.forEach((section) => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            onEnter: () => section.classList.add('section-in-view'),
                            onLeave: () => section.classList.remove('section-in-view'),
                            onEnterBack: () => section.classList.add('section-in-view'),
                            onLeaveBack: () => section.classList.remove('section-in-view'),
                        },
                    });
                });
            }

            const videos = document.querySelectorAll('.sg-video');
            if (videos.length) {
                videos.forEach((video) => {
                    const container = video.closest('.sg-video-container');
                    if (!container) return;
                    const play = () => video.play();
                    const pause = () => video.pause();
                    pause();
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: container,
                            start: 'top bottom',
                            end: 'bottom top',
                            onEnter: play,
                            onLeave: pause,
                            onEnterBack: play,
                            onLeaveBack: pause,
                        },
                    });

                    video.addEventListener('play', () => container.classList.add('child-video-play'));
                    video.addEventListener('pause', () => container.classList.remove('child-video-play'));
                    video.addEventListener('ended', () => container.classList.remove('child-video-play'));
                });
            }

            const headerMobBtns = document.querySelector('#header-mob-btns');
            if (headerMobBtns) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: '#footer',
                        start: 'top bottom',
                        onEnter: () => headerMobBtns.classList.add('hide-object'),
                        onLeaveBack: () => headerMobBtns.classList.remove('hide-object'),
                    },
                });
            }
        },

        initSectionTitleWriteReveal() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof SplitText === 'undefined') return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const titleSelectors = [
                '#main section h2',
                '#main section [class$="title-sans"]',
                '#main section [class$="title-serif"]',
            ].join(', ');

            const blockedHeroSections = [
                '.sg-hero',
                '.sg-about-hero',
                '.sg-internal-hero',
                '.sg-contact-hero',
            ].join(', ');

            const titles = Array.from(document.querySelectorAll(titleSelectors)).filter((title) => {
                if (!title || title.closest('#preloader')) return false;
                if (blockedHeroSections && title.closest(blockedHeroSections)) return false;
                if (!title.textContent || !title.textContent.trim()) return false;
                return true;
            });

            if (!titles.length) return;

            titles.forEach((title) => {
                title.dataset.sgTitleWrite = 'true';

                const split = new SplitText(title, {
                    type: 'chars',
                    charsClass: 'sg-title-char',
                    aria: 'none',
                });

                const chars = split.chars || [];
                if (!chars.length) {
                    split.revert();
                    return;
                }

                gsap.set(chars, { autoAlpha: 0 });

                ScrollTrigger.create({
                    trigger: title,
                    start: 'top bottom-=90',
                    once: true,
                    onEnter: () => {
                        gsap.to(chars, {
                            autoAlpha: 1,
                            ease: 'none',
                            stagger: 0.02,
                            duration: 0.045,
                            onComplete: () => split.revert(),
                        });
                    },
                });
            });
        },

        initMaskClipReveal() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const isHomepage = document.body.classList.contains('homepage');
            const maskBlocks = Array.from(document.querySelectorAll(
                '.sg-promo-card-frame, .sg-news-card-frame, .sg-school-life-tile, .sg-split-slider-pic-slider, .sg-internal-card-image, .sg-profile-card-image, .sg-contact-map-wrap'
            )).filter((block) => !(isHomepage && block.matches('.sg-promo-card-frame, .sg-news-card-frame')));
            if (!maskBlocks.length) return;

            gsap.set(maskBlocks, {
                clipPath: 'inset(100% 0% 0% 0%)',
                willChange: 'clip-path',
            });

            ScrollTrigger.batch(maskBlocks, {
                start: 'top bottom-=60',
                once: true,
                onEnter: (batch) => {
                    gsap.to(batch, {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1.05,
                        ease: 'power3.out',
                        stagger: 0.12,
                        clearProps: 'willChange',
                    });
                },
            });
        },

        initMaskGrowReveal() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const maskBlocks = Array.from(
                document.querySelectorAll('.homepage .sg-story-media, .homepage .sg-promo-card-frame, .homepage .sg-news-card-frame')
            ).filter((block) => !block.classList.contains('sg-mask-sweep-reveal'));
            if (!maskBlocks.length) return;

            const getSvgCenter = (svg) => {
                const viewBox = svg?.viewBox?.baseVal;
                if (!viewBox || !viewBox.width || !viewBox.height) return null;
                return `${viewBox.x + (viewBox.width / 2)} ${viewBox.y + (viewBox.height / 2)}`;
            };

            const getMaskGrowConfig = (block) => {
                if (block.matches('.sg-promo-card-frame, .sg-news-card-frame')) {
                    return {
                        origin: '200 257',
                        startScale: 0.006,
                        overshootScale: 1.003,
                        imageStartScale: 1.03,
                    };
                }

                if (block.classList.contains('sg-story-media--secondary')) {
                    const mediaCol = block.closest('.sg-story-media-col');
                    const hasLeftTip = mediaCol?.classList.contains('order-lg-2');
                    return {
                        origin: hasLeftTip ? '0 216' : '640 216',
                        startScale: 0.004,
                        overshootScale: 1.004,
                        imageStartScale: 1.04,
                    };
                }

                return {
                    origin: '639.5005 310',
                    startScale: 0.004,
                    overshootScale: 1.004,
                    imageStartScale: 1.04,
                };
            };

            maskBlocks.forEach((block) => {
                const svg = block.querySelector('svg');
                const maskShell = svg?.querySelector('.sg-mask-grow-shell');
                const maskImage = svg?.querySelector('.sg-mask-grow-image');
                if (!svg || !maskShell) return;

                const config = getMaskGrowConfig(block);
                const maskOrigin = config.origin || getSvgCenter(svg) || '0 0';
                const startScale = config.startScale;
                const overshootScale = config.overshootScale;
                const imageStartScale = config.imageStartScale;

                gsap.set(block, {
                    autoAlpha: 0,
                    willChange: 'opacity',
                });
                gsap.set(maskShell, {
                    scale: startScale,
                    svgOrigin: maskOrigin,
                    willChange: 'transform',
                    force3D: true,
                });

                if (maskImage) {
                    gsap.set(maskImage, {
                        scale: imageStartScale,
                        svgOrigin: maskOrigin,
                        willChange: 'transform',
                        force3D: true,
                    });
                }

                ScrollTrigger.create({
                    trigger: block,
                    start: 'top 30%',
                    once: true,
                    onEnter: () => {
                        const tl = gsap.timeline({
                            defaults: { overwrite: 'auto' },
                            onComplete: () => {
                                gsap.set(block, { clearProps: 'opacity,visibility,willChange' });
                                gsap.set(maskShell, { clearProps: 'transform,willChange' });
                                if (maskImage) gsap.set(maskImage, { clearProps: 'transform,willChange' });
                            },
                        });

                        tl.to(block, {
                            autoAlpha: 1,
                            duration: 0.1,
                            ease: 'none',
                        }, 0);
                        tl.to(maskShell, {
                            scale: overshootScale,
                            duration: 1.12,
                            ease: 'expo.out',
                        }, 0);

                        if (maskImage) {
                            tl.to(maskImage, {
                                scale: 1,
                                duration: 1.08,
                                ease: 'power2.out',
                            }, 0.04);
                        }

                        tl.to(maskShell, {
                            scale: 1,
                            duration: 0.26,
                            ease: 'power1.out',
                        }, '-=0.2');
                    },
                });
            });
        },

        initMaskShapeReveal() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const revealBlocks = document.querySelectorAll('.sg-mask-shape-reveal');
            if (!revealBlocks.length) return;

            const getCenter = (svg, path) => {
                try {
                    const box = path?.getBBox?.();
                    if (box && box.width && box.height) {
                        return `${box.x + (box.width / 2)} ${box.y + (box.height / 2)}`;
                    }
                } catch (e) {
                    // Ignore and fallback to viewBox center.
                }

                const viewBox = svg?.viewBox?.baseVal;
                if (viewBox && viewBox.width && viewBox.height) {
                    return `${viewBox.x + (viewBox.width / 2)} ${viewBox.y + (viewBox.height / 2)}`;
                }
                return '0 0';
            };

            revealBlocks.forEach((block) => {
                const svg = block.querySelector('svg');
                const maskShape = svg?.querySelector('.sg-mask-shape-reveal-path');
                if (!svg || !maskShape) return;

                const origin = getCenter(svg, maskShape);

                gsap.set(maskShape, {
                    scale: 0.004,
                    svgOrigin: origin,
                    willChange: 'transform',
                    force3D: true,
                });

                ScrollTrigger.create({
                    trigger: block,
                    start: 'top 75%',
                    once: true,
                    onEnter: () => {
                        gsap.timeline({
                            defaults: { overwrite: 'auto' },
                            onComplete: () => {
                                gsap.set(maskShape, { clearProps: 'transform,willChange' });
                            },
                        })
                            .to(maskShape, {
                                scale: 1.012,
                                duration: 1.02,
                                ease: 'expo.out',
                            }, 0)
                            .to(maskShape, {
                                scale: 1,
                                duration: 0.24,
                                ease: 'power1.out',
                            }, '-=0.16');
                    },
                });
            });
        },

        initMaskSweepReveal() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const blocks = document.querySelectorAll('.sg-mask-sweep-reveal');
            if (!blocks.length) return;

            const SVG_NS = 'http://www.w3.org/2000/svg';

            const ensureSweepMask = (block, blockIndex) => {
                const svg = block.querySelector('svg');
                const image = svg?.querySelector('image');
                const clipPath = svg?.querySelector('clipPath');
                const clipShape = clipPath?.querySelector('path');
                if (!svg || !image || !clipPath || !clipShape) return null;

                let maskPath = svg.querySelector('.sg-mask-sweep-reveal-path');
                if (maskPath) return { svg, maskPath };

                let defs = svg.querySelector('defs');
                if (!defs) {
                    defs = document.createElementNS(SVG_NS, 'defs');
                    svg.insertBefore(defs, svg.firstChild);
                }

                if (!clipPath.id) {
                    clipPath.id = `sg-mask-sweep-clip-${blockIndex}`;
                }

                const viewBox = svg.viewBox?.baseVal;
                const width = viewBox?.width || parseFloat(svg.getAttribute('width')) || 640;
                const height = viewBox?.height || parseFloat(svg.getAttribute('height')) || 432;

                const mask = document.createElementNS(SVG_NS, 'mask');
                const maskId = `${clipPath.id}-sweep-mask`;
                mask.setAttribute('id', maskId);
                mask.setAttribute('maskUnits', 'userSpaceOnUse');
                mask.setAttribute('x', '0');
                mask.setAttribute('y', '0');
                mask.setAttribute('width', String(width));
                mask.setAttribute('height', String(height));

                const bg = document.createElementNS(SVG_NS, 'rect');
                bg.setAttribute('x', '0');
                bg.setAttribute('y', '0');
                bg.setAttribute('width', String(width));
                bg.setAttribute('height', String(height));
                bg.setAttribute('fill', 'black');

                maskPath = document.createElementNS(SVG_NS, 'path');
                maskPath.setAttribute('class', 'sg-mask-sweep-reveal-path');
                maskPath.setAttribute('d', clipShape.getAttribute('d') || '');
                maskPath.setAttribute('fill', 'white');

                const fillRule = clipShape.getAttribute('fill-rule');
                const clipRule = clipShape.getAttribute('clip-rule');
                if (fillRule) maskPath.setAttribute('fill-rule', fillRule);
                if (clipRule) maskPath.setAttribute('clip-rule', clipRule);

                mask.appendChild(bg);
                mask.appendChild(maskPath);
                defs.appendChild(mask);

                image.setAttribute('mask', `url(#${maskId})`);
                image.removeAttribute('clip-path');

                return { svg, maskPath };
            };

            blocks.forEach((block, blockIndex) => {
                const setup = ensureSweepMask(block, blockIndex);
                if (!setup) return;
                const { svg, maskPath } = setup;

                const viewBox = svg.viewBox?.baseVal;
                const boxWidth = viewBox?.width || 640;
                const boxHeight = viewBox?.height || 432;
                const sweepOrigin = block.dataset.sweepOrigin;
                let tipX, tipY;
                if (sweepOrigin === 'bottom') {
                    tipX = boxWidth / 2;
                    tipY = boxHeight;
                } else {
                    const mediaCol = block.closest('.sg-story-media-col');
                    const hasLeftTip = !!mediaCol?.classList.contains('order-lg-2');
                    tipX = hasLeftTip ? 0 : boxWidth;
                    tipY = boxHeight / 2;
                }

                gsap.set(maskPath, {
                    scale: 0.004,
                    svgOrigin: `${tipX} ${tipY}`,
                    willChange: 'transform',
                    force3D: true,
                });

                const sweepDelay = parseFloat(block.dataset.sweepDelay) || 0;
                const sweepStart = block.dataset.sweepStart || 'top 55%';

                ScrollTrigger.create({
                    trigger: block,
                    start: sweepStart,
                    once: true,
                    onEnter: () => {
                        gsap.timeline({
                            delay: sweepDelay,
                            defaults: { overwrite: 'auto' },
                            onComplete: () => {
                                gsap.set(maskPath, { clearProps: 'transform,willChange' });
                            },
                        })
                            .to(maskPath, {
                                scale: 1.012,
                                duration: 1.08,
                                ease: 'expo.out',
                            }, 0)
                            .to(maskPath, {
                                scale: 1,
                                duration: 0.26,
                                ease: 'power1.out',
                            }, '-=0.18');
                    },
                });
            });
        },

initPreloaderHeroFlow() {
            const heroLine = document.querySelector('#sg-hero-line') || document.querySelector('#s-hero-line');
            const heroLineAnim = () => {
                if (!heroLine) return;
                heroLine.classList.add('play');
                gsap.timeline({
                    scrollTrigger: {
                        trigger: heroLine,
                        start: 'bottom top',
                        end: 'bottom top',
                        onLeave: () => heroLine.classList.remove('play'),
                        onEnterBack: () => heroLine.classList.add('play'),
                    },
                });
            };

            if (window.tl_preloader) {
                let heroTitleSplit = null;
                const heroTitleEl = document.querySelector('#sg-hero__title');
                const heroTipEl = document.querySelector('#sg-hero__tip-txt');
                const shouldSplitHeroTitle = !!heroTitleEl && window.innerWidth >= 992;
                const tlHero = gsap.timeline({
                    paused: true,
                    defaults: {
                        duration: 0.35,
                        ease: 'power1.out',
                        stagger: 0.06,
                    },
                });

                if (shouldSplitHeroTitle) {
                    heroTitleSplit = new SplitText(heroTitleEl, {
                        type: 'chars',
                        charsClass: 'char-st',
                        aria: 'none',
                    });
                }
                const heroTitleAnimTargets = heroTitleSplit
                    ? heroTitleEl.querySelectorAll('.char-st')
                    : (heroTitleEl ? [heroTitleEl] : []);
                const heroTitleAnimProps = heroTitleSplit
                    ? {
                        autoAlpha: 0,
                        ease: 'none',
                        stagger: 0.02,
                        duration: 0.045,
                    }
                    : {
                        autoAlpha: 0,
                        y: 20,
                        ease: 'power2.out',
                        duration: 0.42,
                    };

                tlHero
                    .from('.sg-anim-header-item', {
                        autoAlpha: 0,
                        y: -8,
                        duration: 0.28,
                        stagger: 0.03,
                    }, 0)
                    .from(heroTipEl, {
                        autoAlpha: 0,
                        y: 14,
                        duration: 0.26,
                        ease: 'power2.out',
                    }, 0.02)
                    .from(heroTitleAnimTargets, heroTitleAnimProps, 0.12);

                gsap.set('.sg-anim-hero-container', { autoAlpha: 1 });

                (window.tl_preloader_exit || window.tl_preloader).then(() => {
                    const curtainDuration = 1.05; // must match preloader exit tween duration
                    const heroEntranceDelay = -0.4;  // 0 = curtain fully gone, negative = prepone (e.g. -0.5 starts 0.5s before curtain clears)
                    const resolvedDelay = Math.max(0, curtainDuration + heroEntranceDelay);
                    tlHero.eventCallback('onComplete', () => {
                        if (heroTitleSplit) {
                            heroTitleSplit.revert();
                            heroTitleSplit = null;
                        }
                        const swiper = typeof window.getHeroSwiperInstance === 'function' ? window.getHeroSwiperInstance() : null;
                        const active = swiper ? swiper.slides[swiper.activeIndex] : null;
                        if (active) {
                            active.classList.add('sg-hero__slide--anim');
                            this.animateHeroSlide(active, false, false, true);
                        }
                    });
                    gsap.delayedCall(resolvedDelay, () => tlHero.play(0));
                    heroLineAnim();
                    gsap.delayedCall(2, () => {
                        const modal = document.querySelector('#modal');
                        if (modal) modal.classList.add('is-open');
                    });
                });
            } else {
                heroLineAnim();
                const getCookie = window.getCookie;
                if (!getCookie || getCookie('modalClose') !== 'true') {
                    gsap.delayedCall(2, () => {
                        const modal = document.querySelector('#modal');
                        if (modal) modal.classList.add('is-open');
                    });
                }
            }
        },

        initAboutHeroIntro() {
            if (typeof gsap === 'undefined') return;
            const aboutHero = document.querySelector('.sg-about-hero');
            if (!aboutHero) return;

            const label = aboutHero.querySelector('.sg-about-hero-label');
            const titleSans = aboutHero.querySelector('.sg-about-hero-title-sans');
            const titleSerif = aboutHero.querySelector('.sg-about-hero-title-serif');
            const copy = aboutHero.querySelector('.sg-about-hero-copy');
            const targets = [label, titleSans, titleSerif, copy].filter(Boolean);
            if (!targets.length) return;

            gsap.set(targets, { autoAlpha: 0 });
            if (label) gsap.set(label, { y: 14 });
            if (titleSans) gsap.set(titleSans, { y: 20 });
            if (titleSerif) gsap.set(titleSerif, { y: 24 });
            if (copy) gsap.set(copy, { y: 16 });

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
            if (label) {
                tl.to(label, { autoAlpha: 1, y: 0, duration: 0.35 }, 0);
            }
            if (titleSans) {
                tl.to(titleSans, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.08);
            }
            if (titleSerif) {
                tl.to(titleSerif, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.34);
            }
            if (copy) {
                tl.to(copy, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.46);
            }
        },

        initSecondaryHeroIntro() {
            if (typeof gsap === 'undefined') return;

            const animateHero = (heroSelector, sansSelector, serifSelector, copySelector) => {
                const hero = document.querySelector(heroSelector);
                if (!hero) return;

                const titleSans = hero.querySelector(sansSelector);
                const titleSerif = hero.querySelector(serifSelector);
                const copy = hero.querySelector(copySelector);
                const targets = [titleSans, titleSerif, copy].filter(Boolean);
                if (!targets.length) return;

                gsap.set(targets, { autoAlpha: 0 });
                if (titleSans) gsap.set(titleSans, { y: 20 });
                if (titleSerif) gsap.set(titleSerif, { y: 24 });
                if (copy) gsap.set(copy, { y: 16 });

                const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
                if (titleSans) tl.to(titleSans, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.08);
                if (titleSerif) tl.to(titleSerif, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.34);
                if (copy) tl.to(copy, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.46);
            };

            animateHero('.sg-internal-hero', '.sg-internal-hero-title-sans', '.sg-internal-hero-title-serif', '.sg-internal-hero-copy');
            animateHero('.sg-contact-hero', '.sg-contact-hero-title-sans', '.sg-contact-hero-title-serif', '.sg-contact-hero-copy');
        },

        activateRibbon(section) {
            if (!section || section.classList.contains('is-ribbon-active')) return;
            section.classList.add('is-ribbon-active');
        },

        initRibbonGrow() {
            const sections = document.querySelectorAll('.js-ribbon-grow');
            if (!sections.length) return;

            const RIBBON_TRIGGER_START = 'top 5%';
            const RIBBON_ANIM_DURATION = 2.4;

            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                sections.forEach((section) => {
                    const path = section.querySelector('.sg-full-promo-overlay-ribbon-path');
                    if (!path) return;

                    let length = 4200;
                    try {
                        length = path.getTotalLength();
                    } catch (e) {
                        // Keep fallback path length when browser cannot calculate it.
                    }

                    gsap.set(path, {
                        strokeDasharray: length,
                        strokeDashoffset: length,
                    });

                    gsap.to(path, {
                        strokeDashoffset: 0,
                        duration: RIBBON_ANIM_DURATION,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: RIBBON_TRIGGER_START,
                            toggleActions: 'play none none none',
                            once: true,
                        },
                    });
                });
                return;
            }

            if (!('IntersectionObserver' in window)) {
                sections.forEach((section) => this.activateRibbon(section));
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    this.activateRibbon(entry.target);
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: 0,
                rootMargin: '0px',
            });

            sections.forEach((section) => observer.observe(section));
        },

        init() {
            this.initSplitTextAndBatch();
            this.initParallax();
            this.initContainersAndSections();
            this.initSectionTitleWriteReveal();
            this.initMaskGrowReveal();
            this.initMaskShapeReveal();
            this.initMaskSweepReveal();
            this.initMaskClipReveal();
            this.initPreloaderHeroFlow();
            this.initAboutHeroIntro();
            this.initSecondaryHeroIntro();
            this.initRibbonGrow();
        },
    };

    window.SGAnimations = SGAnimations;
})();
