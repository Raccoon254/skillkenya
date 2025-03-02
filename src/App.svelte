<script>
    import EmailForm from "./components/EmailForm.svelte";
    import { onMount } from 'svelte';

    const skills = [
        {
            title: "Programming",
            description: "Master web development, mobile apps & software engineering",
            icon: "gvtjlyjf"
        },
        {
            title: "Graphic Design",
            description: "Learn digital design, branding & visual communication",
            icon: "jestaxpl"
        },
        {
            title: "Digital Marketing",
            description: "Excel in social media, SEO & content marketing",
            icon: "jdgfsfzr"
        },
        {
            title: "Animation",
            description: "Create compelling visual effects & motion graphics",
            icon: "oajcrtsi"
        }
    ];

    // Timer calculation
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 6); // 6 months from now

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    let observer;
    let skillCards = [];
    let titleVisible = false;
    let subtitleVisible = false;
    let badgeVisible = false;

    function updateCountdown() {
        const now = new Date();
        const diff = launchDate - now;

        days = Math.floor(diff / (1000 * 60 * 60 * 24));
        hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((diff % (1000 * 60)) / 1000);
    }

    onMount(() => {
        // Initial update
        updateCountdown();

        // Update every second
        const timer = setInterval(updateCountdown, 1000);

        // Setup intersection observer for animations
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe title elements with a delay
        setTimeout(() => {
            titleVisible = true;
            setTimeout(() => {
                subtitleVisible = true;
                setTimeout(() => {
                    badgeVisible = true;
                }, 500);
            }, 400);
        }, 300);

        // Observe skill cards
        skillCards.forEach((card, index) => {
            if (card) {
                setTimeout(() => {
                    observer.observe(card);
                }, 100 * index); // Stagger the animations
            }
        });

        return () => {
            clearInterval(timer);
            if (observer) {
                observer.disconnect();
            }
        };
    });
</script>

<main>
    <div class="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div class="fade-down bg-gradient-to-b z-10 from-gray-900 via-gray-900 to-transparent min-h-64 w-full absolute top-40"></div>

        <!-- Floating particles background -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="particles-container">
                {#each Array(20) as _, i}
                    <div class="particle" style="--index: {i}"></div>
                {/each}
            </div>
        </div>

        <!-- Perspective Grid Background -->
        <div class="absolute inset-0 overflow-hidden grid-background">
            <svg class="absolute opacity-45 w-full h-full" viewBox="0 300 1000 500"
                 preserveAspectRatio="xMidYMid slice">
                <!-- Horizontal Lines -->
                {#each Array(15) as _, i}
                    {@const y = 500 + i * 50}
                    <path
                            d="M0 {y} L1000 {y}"
                            class="grid-line"
                    />
                {/each}

                <!-- Converging Lines -->
                {#each Array(20) as _, i}
                    {@const x = -600 + i * 100}
                    <path
                            d="M{x} 1000 L500 0"
                            class="grid-line"
                    />
                {/each}
            </svg>
        </div>

        <!-- Main Content -->
        <div class="relative z-20">
            <!-- Hero Section -->
            <div class="container mx-auto px-4 pt-32 pb-20">
                <h1 class="text-5xl md:text-7xl font-bold mb-6 text-center transition-all duration-700 transform {titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}">
                    Skill Kenya
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 transform {subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}">
                    Your gateway to professional skills. Coming soon with comprehensive online courses.
                </p>

                <div class="w-full grid place-items-center mb-8">
                    <div class="avatar-group mx-auto -space-x-6 rtl:space-x-reverse animate-pulse-slow">
                        <div class="avatar">
                            <div class="w-12">
                                <img class="p-2" src="/logo-light.png" alt="steve tom"/>
                            </div>
                        </div>
                        <div class="avatar">
                            <div class="w-12">
                                <img src="/ken.HEIC" alt="steve tom"/>
                            </div>
                        </div>
                        <div class="avatar bg-gray-900 placeholder">
                            <div class="bg-gray-900 text-neutral-content w-12">
                                <span>+99</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Countdown Timer -->
                <div class="flex justify-center mb-16 transition-all duration-700 transform {badgeVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}">
                    <div class="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
                        <p class="text-blue-400 text-center mb-2 font-semibold">Launching In</p>
                        <div class="flex space-x-4 text-center">
                            <div class="flex flex-col">
                                <span class="text-3xl font-bold">{days}</span>
                                <span class="text-xs text-gray-400">DAYS</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-3xl font-bold">{hours}</span>
                                <span class="text-xs text-gray-400">HOURS</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-3xl font-bold">{minutes}</span>
                                <span class="text-xs text-gray-400">MINUTES</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-3xl font-bold">{seconds}</span>
                                <span class="text-xs text-gray-400">SECONDS</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Coming Soon Badge -->
                <div class="flex justify-center mb-32 transition-all duration-700 delay-500 transform {badgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
                    <button class="bg-blue-500/20 ring-2 ring-blue-500 text-blue-400 px-6 py-2 rounded-full font-semibold hover:bg-blue-500/30 transition-all duration-300 pulse-animation">
                        Coming Soon
                    </button>
                </div>

                <!-- Skills Grid -->
                <section aria-label="Our Courses">
                    <h2 class="sr-only">Our Courses</h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                        {#each skills as skill, i}
                            <div
                                    bind:this={skillCards[i]}
                                    class="backdrop-blur-[1px] rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 opacity-0 translate-y-8"
                                    style="transition-delay: {i * 150}ms;"
                            >
                                <lord-icon
                                        src="https://cdn.lordicon.com/{skill.icon}.json"
                                        trigger="hover"
                                        state="hover-roll"
                                        colors="primary:#ffffff,secondary:#8930e8"
                                        style="width:50px;height:50px">
                                </lord-icon>
                                <h3 class="text-xl font-bold mb-2">{skill.title}</h3>
                                <p class="text-gray-400">{skill.description}</p>
                            </div>
                        {/each}
                    </div>
                </section>
            </div>
        </div>
        <!-- Scroll down button -->
        <div class="absolute -bottom-8 opacity-45 left-0 right-0 flex justify-center mb-8 z-50">
            <a href="#newsletter"
               class="text-blue-500 grid place-items-center relative hover:text-blue-400 h-14 w-8 rounded-full border-2 transition-colors"
               aria-label="Scroll down">
                <div class="dot w-2 h-2 bg-blue-500 rounded-full mb-1 bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </a>
        </div>
        <div class="fade-up bg-gradient-to-t z-10 from-gray-900 via-gray-900 to-transparent min-h-64 w-full absolute bottom-0"></div>
    </div>

    <section class="bg-gray-900 min-h-60 center text-white py-12 mt-8 relative">
        <div class="container mx-auto px-4 flex items-center flex-col justify-center gap-4">
            <div class="text-gray-400">A <a class="font-semibold" href="https://stevetom.vercel.app"><span
                    class="underline underline-offset-2">kenTom</span>&trade;</a> project
            </div>

            <a href="https://stevetom.vercel.app" class="hover:rotate-12 transition-all duration-300">
                <div class="h-14 w-14 p-3 rounded-full ring-2 ring-offset-1 border-2">
                    <img src="/logo-light.png" alt="KenTom logo" class=""/>
                </div>
            </a>
        </div>
    </section>

    <!-- Newsletter Section -->
    <div id="newsletter" class="container mx-auto px-4 py-10">
        <div class="max-w-xl mx-auto text-center">
            <section aria-label="Newsletter">
                <h2 class="text-3xl font-bold mb-6">Stay Updated</h2>
            </section>
            <p class="text-gray-400 mb-8">
                Be the first to know when we launch. Subscribe to our newsletter for early access.
            </p>
            <EmailForm />
        </div>
    </div>

    <section class="bg-gray-900 text-white py-16 relative">
        <div class="container mx-auto px-4">
            <div class="max-w-md mx-auto">
                <h3 class="text-2xl font-bold text-center mb-8">Connect With Us</h3>
                <div class="flex justify-center gap-8">
                    <!-- TikTok -->
                    <a href="https://www.tiktok.com/@raccoon.254" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                       aria-label="TikTok">
                        <i class="fa-brands fa-tiktok text-2xl"></i>
                    </a>

                    <!-- Instagram -->
                    <a href="https://www.instagram.com/raccoon.254/" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                       aria-label="Instagram">
                        <i class="fa-brands fa-instagram text-2xl"></i>
                    </a>

                    <!-- WhatsApp -->
                    <a href="https://wa.me/254758481320" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                       aria-label="WhatsApp">
                        <i class="fa-brands fa-whatsapp text-2xl"></i>
                    </a>

                    <!-- Email -->
                    <a href="mailto:tomsteve187@gmail.com" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                       aria-label="Email">
                        <i class="fa-solid fa-envelope text-2xl"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }

    .grid-line {
        stroke: rgba(255, 255, 255, 0.1);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
    }

    .grid-background {
        transform: perspective(600px) rotateX(60deg) scale(1.6);
        transform-origin: center center;
    }

    /* Animation for the coming soon button */
    .pulse-animation {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
        }
    }

    /* Animation for the scroll down button */
    .bounce {
        animation: bounce 2s infinite;
        position: absolute;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
        }
        40% {
            transform: translateY(-8px) translateX(-50%);
        }
        60% {
            transform: translateY(-4px) translateX(-50%);
        }
    }

    /* Animation for skills cards */
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Floating particles */
    .particles-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .particle {
        position: absolute;
        width: 6px;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        animation: float 15s infinite linear;
        opacity: 0;
    }

    @keyframes float {
        0% {
            transform: translate(calc(var(--index) * 5vw + 10vw), 100vh) rotate(0deg);
            opacity: 0;
        }
        5% {
            opacity: 0.1;
        }
        90% {
            opacity: 0.1;
        }
        100% {
            transform: translate(calc(var(--index) * 5vw + 5vw + var(--index) * 2vw), -50px) rotate(360deg);
            opacity: 0;
        }
    }

    /* Set different delays for each particle */
    .particle:nth-child(odd) {
        animation-delay: calc(var(--index) * 0.3s);
    }

    .particle:nth-child(even) {
        animation-delay: calc(var(--index) * 0.5s + 2s);
    }

    /* Slow pulse animation for avatar group */
    .animate-pulse-slow {
        animation: pulse-slow 4s infinite;
    }

    @keyframes pulse-slow {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
</style>