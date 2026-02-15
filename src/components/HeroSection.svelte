<script lang="ts">
    import { ArrowRight, Quote } from "lucide-svelte";
    import CountdownTimer from "$components/CountdownTimer.svelte";
    import { onDestroy, onMount } from "svelte";

    const launchDate = new Date(2026, 10, 1); // November 1, 2026

    let observer;
    let visible = false;

    onMount(() => {
        // Trigger entrance animations
        setTimeout(() => visible = true, 100);
    });

    onDestroy(() => {
        if (observer) observer.disconnect();
    });

    function scrollToWaitlist() {
        const waitlistSection = document.querySelector('#waitlist-section');
        console.log('HeroSection: Scrolling to waitlist section:', waitlistSection);
        if (waitlistSection) {
            waitlistSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        } else {
            console.error('HeroSection: Waitlist section not found!');
            // Fallback: try to scroll to any form on the page
            const form = document.querySelector('form');
            if (form) {
                console.log('HeroSection: Fallback - scrolling to form:', form);
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
</script>

<main class="relative bg-[#0B0F19] text-white overflow-hidden min-h-screen selection:bg-blue-500/30">

    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse-slow"></div>

        <div class="absolute top-[20%] right-0 w-[600px] h-[600px] bg-teal-600/10 blur-[100px] rounded-full opacity-30"></div>

        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <svg class="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" stroke-width="0.05"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
        </svg>
    </div>

    <div class="relative z-10 pt-32 pb-20">

        <div class="container mx-auto px-4 text-center">

            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 backdrop-blur-md mb-8 hover:border-blue-400/50 transition-all cursor-default animate-fade-in-down">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span class="text-sm font-medium text-blue-200">The Future of Kenyan Tech</span>
            </div>

            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                <span class="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 transform transition-all duration-700 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
                    Master the Skills
                </span>
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient transform transition-all duration-700 delay-100 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
                    That Define Tomorrow
                </span>
            </h1>

            <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transform transition-all duration-700 delay-200 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
                We are building the bridge between potential and professional expertise.
                A comprehensive ecosystem designed for the next generation of Kenyan innovators.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transform transition-all duration-700 delay-300 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
                <button
                        on:click={scrollToWaitlist}
                        class="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all overflow-hidden"
                >
                    <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    <span class="relative flex items-center gap-2">
                        Join Early Access
                        <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </span>
                </button>

                <a
                        href="https://chat.whatsapp.com/DF40YyhA1ZJ14wFjkpXq1K"
                        target="_blank"
                        class="group px-8 py-4 rounded-full font-semibold text-lg border border-gray-700 hover:border-green-500/50 hover:bg-green-900/10 text-gray-300 hover:text-green-400 transition-all flex items-center gap-3 backdrop-blur-sm"
                >
                    <i class="fa-brands fa-whatsapp text-3xl text-green-400 group-hover:scale-110 transition-transform"></i>
                    Community Chat
                </a>
            </div>

            <div class="flex flex-col items-center gap-4 transform transition-all duration-700 delay-500 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
                <div class="flex -space-x-4">
                    <img class="w-12 h-12 rounded-full border-2 border-blue-800 cursor-pointer hover:scale-105 transition-all duration-300 object-cover grayscale hover:grayscale-0 z-10" src="/user.png" alt="User" />
                    <img class="w-12 h-12 rounded-full border-2 border-blue-800 cursor-pointer hover:scale-105 transition-all duration-300 object-cover grayscale hover:grayscale-0 z-20" src="/kentom.png" alt="User" />
                    <div class="w-12 h-12 rounded-full border-2 border-blue-800 cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs font-bold text-gray-400 z-30">
                        +231
                    </div>
                </div>
                <p class="text-sm text-gray-500">Join hundreds of developers waiting for launch</p>
            </div>
        </div>

        <div class="mt-24 mb-32">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-semibold text-white">Launching Late 2026</h2>
                <div class="h-1 w-20 bg-blue-500/50 mx-auto mt-4 rounded-full"></div>
            </div>
            <CountdownTimer launchDate={launchDate} theme="blue"/>
        </div>

        <div class="container mx-auto max-w-5xl px-4">
            <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                <div class="relative backdrop-blur-xl p-4 rounded-2xl overflow-hidden">

                    <Quote class="absolute top-10 left-10 w-32 h-32 text-white/5 rotate-180 pointer-events-none" />

                    <div class="grid md:grid-cols-[1.5fr_1fr] gap-12 items-center relative z-10">

                        <div class="space-y-6">
                            <h3 class="text-3xl md:text-4xl font-bold text-white font-serif">
                                "We aren't just building a platform."
                            </h3>
                            <div class="space-y-4 text-lg text-gray-400 leading-relaxed">
                                <p>
                                    <span class="text-white font-semibold">Dear Future Innovator,</span>
                                </p>
                                <p>
                                    In an era where technology moves faster than curriculum, Kenya needs more than just another online course. We need a forge for real-world expertise.
                                </p>
                                <p>
                                    I am personally overseeing the curriculum to ensure that when we launch in <span class="text-blue-400 font-bold">2026</span>, you aren't just learning syntax, you are learning how to build, ship, and scale products that matter.
                                </p>
                                <p class="italic text-gray-500 border-l-2 border-blue-500/30 pl-4 my-6">
                                    "Quality takes time. Your future career is worth the wait."
                                </p>
                            </div>

                            <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                                <div>
                                    <p class="font-handwriting text-3xl text-white transform -rotate-2">Steve Tom</p>
                                    <p class="text-sm text-blue-400 mt-1 uppercase tracking-widest font-bold text-[10px]">Founder & Lead Instructor</p>
                                </div>
                                <a href="https://wa.me/254758481320" class="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                                    Direct Line <ArrowRight class="w-3 h-3"/>
                                </a>
                            </div>
                        </div>

                        <div class="w-full relative mx-auto md:mx-0">
                            <div class="relative w-full md:w-64 h-96 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#0F1623] via-transparent to-transparent z-10 opacity-60"></div>
                                <img src="/kentom.png" alt="Steve Tom" class="w-full h-full object-cover" />

                                <div class="absolute bottom-4 left-4 right-4 z-20">
                                    <div class="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl">
                                        <p class="text-white text-xs font-medium">Building Skill Kenya</p>
                                        <div class="flex items-center gap-2 mt-1">
                                            <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                            <span class="text-[10px] text-gray-300">Online & working</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="absolute -z-10 top-[-20px] right-[-20px] w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                            <div class="absolute -z-10 bottom-[-10px] left-[-20px] w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</main>

<style>
    /* Custom Animations */
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .animate-gradient {
        background-size: 200% auto;
        animation: gradient 4s linear infinite;
    }

    @keyframes shimmer {
        100% { transform: translateX(100%); }
    }

    .group-hover\:animate-shimmer:hover {
        animation: shimmer 1.5s infinite;
    }

    @keyframes pulse-slow {
        0%, 100% { opacity: 0.5; transform: translate(-50%, 0) scale(1); }
        50% { opacity: 0.3; transform: translate(-50%, 0) scale(1.1); }
    }

    .animate-pulse-slow {
        animation: pulse-slow 8s infinite ease-in-out;
    }

    /* Reveal Animation Class - Using :global to work with Svelte scoped CSS */
    :global(.reveal-on-scroll) {
        --reveal-opacity: 0;
        --reveal-transform: translateY(32px);
        opacity: var(--reveal-opacity);
        transform: var(--reveal-transform);
        transition: opacity 1000ms ease-out, transform 1000ms ease-out;
    }

    :global(.reveal-on-scroll.animate-in) {
        --reveal-opacity: 1;
        --reveal-transform: translateY(0);
    }

    /* Direct animation fallback */
    :global(.animate-reveal) {
        animation: reveal 1s ease-out forwards;
    }

    /* Fallback animation for better performance */
    @keyframes reveal {
        from {
            opacity: 0;
            transform: translateY(32px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }


    /* Handwriting Font Fallback */
    .font-handwriting {
        font-family: 'Cedarville Cursive', 'Brush Script MT', cursive;
    }
</style>