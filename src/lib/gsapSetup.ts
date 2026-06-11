import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One-time global GSAP configuration, imported by every animated component
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
gsap.ticker.lagSmoothing(0);
