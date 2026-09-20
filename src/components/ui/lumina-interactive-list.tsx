"use client";

import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;
declare const THREE: any;

export interface LuminaSlide {
  title: string;
  description: string;
  media: string;
  year?: string;
  myth?: string;
  fact?: string;
}

const defaultSlides: LuminaSlide[] = [
  { title: "LC COUPE", description: "The flagship luxury coupe. Experience uncompromised design and performance.", media: "/LEXUS LC500 highres.jpg" },
  { title: "LS SEDAN", description: "The pinnacle of executive luxury. A sanctuary of comfort and innovation.", media: "/LEXUS LS500h highres.jpg" },
  { title: "LX SUV", description: "Unrivaled capability meets ultimate luxury in our flagship SUV.", media: "/LEXUS LX600 highres.jpeg" }
];

export function LuminaInteractiveList({ slides = defaultSlides, theme = "default" }: { slides?: LuminaSlide[], theme?: "default" | "heritage" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    let shaderMaterial: any = null;
    let slideTextures: any[] = [];
    let currentSlideIndex = 0;
    let isTransitioning = false;
    let stInstance: any = null;
    let texturesLoaded = false;
    let animationFrameId: number | null = null;

    // --- DYNAMIC SCRIPT LOADING ---
    const loadScripts = async () => {
      const loadScript = (src: string, globalName: string) => new Promise<void>((res, rej) => {
        if ((window as any)[globalName]) { res(); return; }
        if (document.querySelector(`script[src="${src}"]`)) {
          const check = setInterval(() => {
            if ((window as any)[globalName]) { clearInterval(check); res(); }
          }, 50);
          setTimeout(() => { clearInterval(check); rej(new Error(`Timeout waiting for ${globalName}`)); }, 10000);
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => { setTimeout(() => res(), 100); };
        s.onerror = () => rej(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', 'ScrollTrigger');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'THREE');
      } catch (e) {
        console.error('Failed to load base scripts:', e);
      }
      
      if (isMounted) {
        initApplication();
      }
    };

    const initApplication = async () => {
        const TRANSITION_DURATION = 1.8;
        let targetScrollIndex = 0;

        // --- SHADERS (Classy Cinematic Cross-Dissolve with Micro-Zoom & Filmic Vignette) ---
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform sampler2D uTexture1;
            uniform sampler2D uTexture2;
            uniform float uProgress;
            uniform vec2 uResolution;
            uniform vec2 uTexture1Size;
            uniform vec2 uTexture2Size;
            varying vec2 vUv;

            vec2 getCoverUV(vec2 uv, vec2 textureSize, float scaleFactor) {
                vec2 s = uResolution / textureSize;
                float scale = max(s.x, s.y) * scaleFactor;
                vec2 scaledSize = textureSize * scale;
                vec2 offset = (uResolution - scaledSize) * 0.5;
                return (uv * uResolution - offset) / scaledSize;
            }

            void main() {
                float p = clamp(uProgress, 0.0, 1.0);
                
                // Smooth sinusoidal transition curve
                float ease = smoothstep(0.0, 1.0, p);
                
                // Classy subtle camera push-pull:
                // Outgoing image gently recedes (1.0 -> 1.03)
                // Incoming image gently glides into sharp focus (1.035 -> 1.0)
                float scale1 = 1.0 + ease * 0.03;
                float scale2 = 1.035 - ease * 0.035;

                vec2 uv1 = getCoverUV(vUv, uTexture1Size, scale1);
                vec2 uv2 = getCoverUV(vUv, uTexture2Size, scale2);

                vec4 col1 = texture2D(uTexture1, uv1);
                vec4 col2 = texture2D(uTexture2, uv2);

                // Subtle cinematic exposure swell during blend
                float exposure = sin(ease * 3.14159265) * 0.05;

                // Luxury edge falloff / cinematic vignette
                vec2 coord = vUv - vec2(0.5);
                float vignette = 1.0 - dot(coord, coord) * 0.3;

                // Pristine cinematic blend
                vec4 finalColor = mix(col1, col2, ease);
                finalColor.rgb += vec3(exposure);
                finalColor.rgb *= vignette;

                gl_FragColor = finalColor;
            }
        `;

        const splitText = (text: string) => {
            return text.split('').map((char: string) => `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        };

        let textTimeout: any = null;
        const updateContent = (idx: number) => {
            if (!containerRef.current) return;
            const titleEl = containerRef.current.querySelector('#mainTitle');
            const yearEl = containerRef.current.querySelector('#slideYear');
            const descEl = containerRef.current.querySelector('#mainDesc');
            const btnEl = containerRef.current.querySelector('#discoverBtn');

            if (titleEl && descEl) {
                 if (textTimeout) clearTimeout(textTimeout);
                 gsap.killTweensOf([titleEl.children, descEl, btnEl, yearEl].filter(Boolean));

                 gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.35, stagger: 0.01, ease: "power2.in" });
                 if (yearEl) gsap.to(yearEl, { y: -15, opacity: 0, duration: 0.3, ease: "power2.in" });
                 gsap.to(descEl, { y: -15, opacity: 0, duration: 0.3, ease: "power2.in" });
                 if (btnEl) gsap.to(btnEl, { y: -10, opacity: 0, duration: 0.25, ease: "power2.in" });
                 
                 textTimeout = setTimeout(() => {
                     if (!containerRef.current) return;
                     titleEl.innerHTML = splitText(slides[idx].title);
                     if (yearEl) yearEl.textContent = slides[idx].year || "";
                     descEl.textContent = slides[idx].description; 
                     
                     gsap.killTweensOf([titleEl.children, descEl, btnEl, yearEl].filter(Boolean));
                     
                     gsap.set(titleEl.children, { opacity: 0, y: 20 });
                     if (yearEl) gsap.set(yearEl, { opacity: 0, y: 15 });
                     gsap.set(descEl, { y: 15, opacity: 0 });
                     if (btnEl) gsap.set(btnEl, { y: 10, opacity: 0 });

                     gsap.to(titleEl.children, { y: 0, opacity: 1, duration: 1.0, stagger: 0.03, ease: "expo.out" });
                     if (yearEl) gsap.to(yearEl, { y: 0, opacity: 1, duration: 1.0, delay: 0.1, ease: "expo.out" });
                     gsap.to(descEl, { y: 0, opacity: 1, duration: 1.0, delay: 0.15, ease: "expo.out" });
                     if (btnEl) gsap.to(btnEl, { y: 0, opacity: 1, duration: 1.0, delay: 0.25, ease: "expo.out" });
                 }, 350); 
            }
        };

        const updateCounter = (idx: number) => { 
            if (!containerRef.current) return;
            const sn = containerRef.current.querySelector("#slideNumber"); 
            if (sn) sn.textContent = String(idx + 1).padStart(2, "0"); 
            const st = containerRef.current.querySelector("#slideTotal"); 
            if (st) st.textContent = String(slides.length).padStart(2, "0"); 
        };

        const updateNavigationState = (idx: number) => {
             if (!containerRef.current) return;
             containerRef.current.querySelectorAll(".slide-nav-item").forEach((el, i) => {
               el.classList.toggle("active", i === idx);
             });
        };

        const navigateToSlide = (targetIndex: number) => {
            if (isTransitioning || targetIndex === currentSlideIndex || !texturesLoaded) return;
            
            const currentTexture = slideTextures[currentSlideIndex];
            const targetTexture = slideTextures[targetIndex];
            if (!currentTexture || !targetTexture || !shaderMaterial) return;

            isTransitioning = true;
            shaderMaterial.uniforms.uTexture1.value = currentTexture;
            shaderMaterial.uniforms.uTexture2.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
            shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;
            
            updateContent(targetIndex);
            currentSlideIndex = targetIndex;
            updateCounter(currentSlideIndex);
            updateNavigationState(currentSlideIndex);
            
            gsap.fromTo(shaderMaterial.uniforms.uProgress, 
                { value: 0 },
                {
                    value: 1,
                    duration: TRANSITION_DURATION,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (!shaderMaterial) return;
                        shaderMaterial.uniforms.uProgress.value = 0;
                        shaderMaterial.uniforms.uTexture1.value = targetTexture;
                        shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
                        isTransitioning = false;
                        if (theme === 'heritage' && targetScrollIndex !== currentSlideIndex) {
                            navigateToSlide(targetScrollIndex);
                        }
                    }
                }
            );
        };

        const createSlidesNavigation = () => {
            if (!containerRef.current) return;
            const nav = containerRef.current.querySelector("#slidesNav"); 
            if (!nav) return;
            nav.innerHTML = "";
            slides.forEach((slide, i) => {
                const item = document.createElement("button");
                item.className = `slide-nav-item ${i === 0 ? "active" : ""}`;
                item.dataset.slideIndex = String(i);
                item.setAttribute("aria-label", `View ${slide.title}`);
                item.innerHTML = `<span class="slide-nav-halo"></span><span class="slide-nav-title">${slide.title}</span><span class="slide-nav-line"></span>`;
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (!isTransitioning && i !== currentSlideIndex) {
                        if (theme === 'heritage' && stInstance) {
                            const progress = i / slides.length;
                            const scrollPos = stInstance.start + (stInstance.end - stInstance.start) * progress + 5;
                            window.scrollTo({ top: scrollPos, behavior: 'smooth' });
                        } else {
                            navigateToSlide(i);
                        }
                    }
                });
                nav.appendChild(item);
            });
        };

        const loadImageTexture = (src: string) => new Promise<any>((resolve, reject) => {
             const l = new THREE.TextureLoader();
             l.load(src, (t: any) => { 
               t.minFilter = t.magFilter = THREE.LinearFilter; 
               t.userData = { size: new THREE.Vector2(t.image.width || window.innerWidth, t.image.height || window.innerHeight) }; 
               resolve(t); 
             }, undefined, reject);
        });

        const initRenderer = async () => {
            if (!containerRef.current) return;
            const canvas = containerRef.current.querySelector(".webgl-canvas") as HTMLCanvasElement; 
            if (!canvas) return;
            
            scene = new THREE.Scene(); 
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
            renderer.setSize(window.innerWidth, window.innerHeight); 
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture1: { value: null }, 
                    uTexture2: { value: null }, 
                    uProgress: { value: 0 },
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uTexture1Size: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }, 
                    uTexture2Size: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                },
                vertexShader, 
                fragmentShader
            });
            scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));
            
            for (let s of slides) {
              try { 
                slideTextures.push(await loadImageTexture(s.media)); 
              } catch (err) { 
                console.warn("Failed texture:", s.media, err); 
                // Create a pure black fallback texture so indices match
                const canvas = document.createElement('canvas');
                canvas.width = 1920; canvas.height = 1080;
                const ctx = canvas.getContext('2d');
                if (ctx) { ctx.fillStyle = '#111'; ctx.fillRect(0, 0, 1920, 1080); }
                const fallbackTexture = new THREE.CanvasTexture(canvas);
                fallbackTexture.userData = { size: new THREE.Vector2(1920, 1080) };
                slideTextures.push(fallbackTexture);
              }
            }

            if (slideTextures.length > 0) {
                shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
                shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
                if (slideTextures.length >= 2) {
                  shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
                  shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
                } else {
                  shaderMaterial.uniforms.uTexture2.value = slideTextures[0];
                  shaderMaterial.uniforms.uTexture2Size.value = slideTextures[0].userData.size;
                }
                texturesLoaded = true;
                if (containerRef.current) containerRef.current.classList.add("loaded");
            }
            
            const render = () => { 
                animationFrameId = requestAnimationFrame(render); 
                if (renderer && scene && camera) {
                  renderer.render(scene, camera); 
                }
            };
            render();
        };
        
        createSlidesNavigation(); 
        updateCounter(0); 

        if (theme === "heritage" && typeof window !== "undefined" && (window as any).ScrollTrigger && containerRef.current) {
            gsap.registerPlugin((window as any).ScrollTrigger);
            stInstance = (window as any).ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: `+=${slides.length * 100}%`,
                pin: true,
                scrub: 1.2,
                snap: {
                    snapTo: 1 / (slides.length - 1),
                    duration: { min: 0.3, max: 0.8 },
                    delay: 0.05,
                    ease: "power2.inOut"
                },
                onUpdate: (self: any) => {
                    if (!shaderMaterial || slideTextures.length === 0) return;
                    const maxIdx = slides.length - 1;
                    const rawProgress = self.progress * maxIdx;
                    const idx1 = Math.floor(rawProgress);
                    const idx2 = Math.min(maxIdx, idx1 + 1);
                    const mixValue = rawProgress - idx1;

                    shaderMaterial.uniforms.uTexture1.value = slideTextures[idx1] || slideTextures[0];
                    if (slideTextures[idx1]) shaderMaterial.uniforms.uTexture1Size.value = slideTextures[idx1].userData.size;
                    
                    if (idx1 !== idx2) {
                        shaderMaterial.uniforms.uTexture2.value = slideTextures[idx2] || slideTextures[0];
                        if (slideTextures[idx2]) shaderMaterial.uniforms.uTexture2Size.value = slideTextures[idx2].userData.size;
                    } else {
                        shaderMaterial.uniforms.uTexture2.value = slideTextures[idx1] || slideTextures[0];
                        if (slideTextures[idx1]) shaderMaterial.uniforms.uTexture2Size.value = slideTextures[idx1].userData.size;
                    }

                    shaderMaterial.uniforms.uProgress.value = mixValue;

                    const closestIdx = Math.round(rawProgress);
                    if (currentSlideIndex !== closestIdx) {
                        currentSlideIndex = closestIdx;
                        updateContent(closestIdx);
                        updateNavigationState(closestIdx);
                        updateCounter(closestIdx);
                    }
                }
            });
        }
        
        if (containerRef.current) {
            const tEl = containerRef.current.querySelector('#mainTitle');
            const yEl = containerRef.current.querySelector('#slideYear');
            const dEl = containerRef.current.querySelector('#mainDesc');
            const bEl = containerRef.current.querySelector('#discoverBtn');

            if (tEl && dEl) {
                tEl.innerHTML = splitText(slides[0]?.title || "");
                if (yEl) yEl.textContent = slides[0]?.year || "";
                dEl.textContent = slides[0]?.description || "";
                
                gsap.fromTo(tEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.03, ease: "expo.out", delay: 0.3 });
                if (yEl) gsap.fromTo(yEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.4 });
                gsap.fromTo(dEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 });
            }
            if (bEl) gsap.fromTo(bEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.7 });
        }

        initRenderer();
        
        const handleResize = () => { 
          if (renderer && shaderMaterial) { 
            renderer.setSize(window.innerWidth, window.innerHeight); 
            shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight); 
          } 
        };

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "ArrowRight") {
            navigateToSlide((currentSlideIndex + 1) % slides.length);
          } else if (e.key === "ArrowLeft") {
            navigateToSlide((currentSlideIndex - 1 + slides.length) % slides.length);
          }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyDown);

        cleanupListeners = () => {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("keydown", handleKeyDown);
        };
    };

    let cleanupListeners: (() => void) | null = null;

    loadScripts();

    return () => {
      isMounted = false;
      if (cleanupListeners) cleanupListeners();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
      if (stInstance) stInstance.kill();
    };
  }, [slides]);

  return (
    <>
      <style>{`
        .slider-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: #050505;
          color: #fff;
        }
        .webgl-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .slide-content {
          position: absolute;
          top: 48%;
          left: 8%;
          transform: translateY(-50%);
          z-index: 10;
          max-width: 650px;
          pointer-events: none;
        }
          .slide-title {
            font-size: ${theme === "heritage" ? "clamp(1.5rem, 3.5vw, 2.5rem)" : "clamp(3rem, 5vw, 4.5rem)"};
            font-family: ${theme === "heritage" ? "'Alexis', sans-serif" : "'Nobel-Light', sans-serif"};
            font-weight: 300;
            margin-bottom: 0.5rem;
            line-height: 0.95;
            letter-spacing: ${theme === "heritage" ? "0.05em" : "-0.01em"};
            color: ${theme === "heritage" ? "#D4AF37" : "#ffffff"};
            text-shadow: 0px 4px 16px rgba(0,0,0,0.8), 0px 1px 4px rgba(0,0,0,0.6);
            white-space: nowrap;
          }
          .slide-year {
            text-shadow: 0px 2px 8px rgba(0,0,0,0.8);
          }
          .slide-description {
            font-size: 1rem;
            line-height: 1.6;
            color: #ccc;
            max-width: ${theme === "heritage" ? "600px" : "400px"};
            margin-bottom: 2rem;
            font-weight: 300;
            text-shadow: 0px 2px 10px rgba(0,0,0,0.9);
          }
          .discover-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 2.5rem;
            padding: 1rem 3rem;
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 9999px;
            background: transparent;
            color: #ffffff;
            font-family: 'Nobel-Light', sans-serif;
            font-size: 0.8rem;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: auto;
          }
          .discover-button:hover {
            background: #ffffff;
            color: #000000;
            border-color: #ffffff;
            transform: translateY(-2px);
          }
          .back-button {
            position: absolute;
            top: 14%;
            left: 8%;
            z-index: 20;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-family: 'Nobel-Light', sans-serif;
            font-size: 0.85rem;
            letter-spacing: 0.2em;
            color: rgba(255, 255, 255, 0.7);
            text-transform: uppercase;
            text-decoration: none;
            transition: color 0.3s ease, transform 0.3s ease;
          }
          .back-button:hover {
            color: #ffffff;
            transform: translateX(-4px);
          }
        
        .slides-navigation {
            position: absolute;
            ${theme === "heritage" 
              ? `
                top: 50%;
                right: 5%;
                transform: translateY(-50%);
                flex-direction: column;
                align-items: flex-end;
                gap: 2.5rem;
              `
              : `
                bottom: 7%;
                left: 50%;
                transform: translateX(-50%);
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 4.5rem;
              `
            }
            display: flex;
            z-index: 20;
            width: auto;
            max-width: 90vw;
            flex-wrap: wrap;
          }
        .slide-nav-item {
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 14px;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
          border-radius: 9999px;
        }
        
        /* Ambient Halo Glow */
        .slide-nav-halo {
          position: absolute;
          inset: -4px -12px;
          border-radius: 9999px;
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.02) 65%, transparent 80%);
          opacity: 0;
          filter: blur(10px);
          pointer-events: none;
          transform: scale(0.65);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }

        .slide-nav-item:hover {
          color: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
        }
        .slide-nav-item:hover .slide-nav-halo {
          opacity: 0.75;
          transform: scale(1.05);
        }
        .slide-nav-item:hover .slide-nav-title {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.75), 0 0 24px rgba(255, 255, 255, 0.35);
        }

        .slide-nav-item.active {
          color: #ffffff;
          transform: translateY(-1px);
        }
        .slide-nav-item.active .slide-nav-halo {
          opacity: 1;
          transform: scale(1.2);
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 42%, rgba(255, 255, 255, 0.04) 68%, transparent 85%);
          filter: blur(12px);
        }
        
        .slide-nav-title {
            font-family: ${theme === "heritage" ? "'Alexis', sans-serif" : "'Nobel-Light', sans-serif"};
            font-size: 0.8rem;
            font-weight: 300;
            letter-spacing: 0.25em;
            color: ${theme === "heritage" ? "#D4AF37" : "inherit"};
            white-space: nowrap;
            transition: text-shadow 0.4s ease, letter-spacing 0.4s ease, color 0.4s ease;
            position: relative;
            z-index: 1;
          }
        .slide-nav-item.active .slide-nav-title {
          text-shadow: 0 0 14px rgba(255, 255, 255, 0.95), 0 0 28px rgba(255, 255, 255, 0.6), 0 0 42px rgba(255, 255, 255, 0.3);
        }
        
        .slide-nav-line {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 1.5px;
          background: #ffffff;
          box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.8);
          transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          opacity: 0;
          z-index: 1;
        }
        .slide-nav-item:hover:not(.active) .slide-nav-line {
          width: 35%;
          opacity: 0.5;
        }
        .slide-nav-item.active .slide-nav-line {
          width: 70%;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .slide-content {
            left: 6%;
            right: 6%;
            max-width: none;
          }
          .slide-counter-wrapper {
            top: 5%;
            left: 6%;
          }
          .slides-navigation {
            bottom: 4%;
            gap: 1.8rem;
          }
          .slide-nav-title {
            font-size: 0.7rem;
            letter-spacing: 0.18em;
          }
        }
      `}</style>
      <main className="slider-wrapper" ref={containerRef}>
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)'
        }}></div>
        <canvas className="webgl-canvas"></canvas>
        <a href="/collection" className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          BACK TO COLLECTIONS
        </a>
        
        <div className="slide-content">
            <h1 className="slide-title" id="mainTitle"></h1>
            <h2 className="slide-year text-[#D4AF37] font-serif text-2xl md:text-3xl italic mb-6 opacity-0" id="slideYear"></h2>
            <p className="slide-description" id="mainDesc"></p>
            <a href="#" className="discover-button" id="discoverBtn">DISCOVER</a>
        </div>
       
        <nav className="slides-navigation" id="slidesNav"></nav>
      </main>
    </>
  );
}
