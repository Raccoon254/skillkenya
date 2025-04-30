<script>
    import EmailForm from "./components/EmailForm.svelte";
    import CountdownTimer from "./components/CountdownTimer.svelte";
    import {onMount, onDestroy} from 'svelte';
    import BetaProgram from "./components/BetaProgram.svelte";
    import FAQ from './components/FAQ.svelte';
    import ComparisonSection from './components/ComparisonSection.svelte';

    // Calculate launch date
    const launchDate = new Date(2025, 7, 1);

    // Course data
    const skills = [
        {
            title: "Programming",
            description: "Master web development, mobile apps & software engineering",
            icon: "gvtjlyjf",
            features: [
                "Full-stack web development",
                "Mobile app development",
                "Software architecture",
                "Cloud deployment"
            ],
            freeCourses: 2
        },
        {
            title: "Graphic Design",
            description: "Learn digital design, branding & visual communication",
            icon: "jestaxpl",
            features: [
                "Brand identity design",
                "UI/UX fundamentals",
                "Digital illustration",
                "Print & packaging"
            ],
            freeCourses: 1
        },
        {
            title: "Digital Marketing",
            description: "Excel in social media, SEO & content marketing",
            icon: "jdgfsfzr",
            features: [
                "Social media strategy",
                "Search engine optimization",
                "Content marketing",
                "Analytics & reporting"
            ],
            freeCourses: 2
        },
        {
            title: "Animation",
            description: "Create compelling visual effects & motion graphics",
            icon: "oajcrtsi",
            features: [
                "2D animation fundamentals",
                "Character animation",
                "Motion graphics",
                "Video effects"
            ],
            freeCourses: 1
        }
    ];

    // Tech stack data
    const techStack = [
        {name: "Svelte", icon: "devicon-svelte-plain", color: "text-orange-500"},
        {name: "TailwindCSS", icon: "devicon-tailwindcss-original", color: "text-blue-400"},
        {name: "JavaScript", icon: "devicon-javascript-plain", color: "text-yellow-400"},
        {name: "Vite", icon: "devicon-vitejs-plain", color: "text-purple-400"},
        {name: "Google Sheets API", icon: "devicon-googlecloud-plain", color: "text-green-400"},
        {name: "Node.js", icon: "devicon-nodejs-line", color: "text-green-400"},
    ];

    // Beta testers data
    const betaTestersInfo = {
        total: 20,
        perSkill: Math.floor(20 / skills.length),
        benefits: [
            "Early access to all course content",
            "One-on-one mentorship sessions",
            "Certificate of completion",
            "Opportunity to join as a teaching assistant"
        ]
    };

    // Animation variables
    let observer;
    let skillCards = [];
    let featureSections = [];
    let titleVisible = false;
    let subtitleVisible = false;

    onMount(() => {
        // Setup intersection observer for animations
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {threshold: 0.1});

        // Start title animations
        setTimeout(() => {
            titleVisible = true;
            setTimeout(() => {
                subtitleVisible = true;
            }, 400);
        }, 300);

        // Observe all elements that need animations
        skillCards.forEach((card, index) => {
            if (card) {
                setTimeout(() => {
                    observer.observe(card);
                }, 100 * index);
            }
        });

        featureSections.forEach((section, index) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    });

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    });
</script>

<main class="overflow-hidden bg-gray-900 text-white">
    <div class="min-h-screen bg-gray-900 text-white relative">
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
            <div class="container mx-auto bg-gray-900 px-4 pt-32">
                <h1 class="text-5xl md:text-7xl font-bold mb-6 text-center transition-all duration-700 transform {titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}">
                    Skill Kenya
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 transform {subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}">
                    Your gateway to professional skills. Empowering Kenyans with industry-ready expertise.
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
            </div>

            <!-- Countdown Timer Component -->
            <div class="mb-16">
                <CountdownTimer launchDate={launchDate} theme="blue"/>
            </div>

            <!-- Coming Soon Badge -->
            <div class="flex justify-center mb-16 transition-all gap-4 duration-700 delay-500 transform {subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
                <button class="bg-blue-500/20 ring-2 ring-blue-500 text-blue-400 px-6 py-3 rounded-full font-semibold hover:bg-blue-500/30 transition-all duration-300 pulse-animation">
                    Coming Soon
                </button>
                <a data-tip="Join Our Whatsapp Group" target="_blank" href="https://chat.whatsapp.com/DF40YyhA1ZJ14wFjkpXq1K" class="bg-blue-500/20 tooltip ring-2 ring-blue-500 text-blue-400 md:px-6 px-3 py-3 rounded-full font-semibold flex items-center justify-center md:gap-2 hover:bg-blue-500/30 transition-all duration-300 pulse-animation">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png?20220228223904" alt="Whatsapp Logo" class="w-6 h-6 inline-block"/>
                    <div class="hidden md:block">
                        Join our whatsapp group
                    </div>
                </a>
            </div>

            <!-- Beta Program Announcement -->
            <div bind:this={featureSections[0]}>
                <BetaProgram {betaTestersInfo} bind:this={featureSections[0]} />
            </div>
        </div>
    </div>
</main>
<section class="mt-2">
    <ComparisonSection/>
</section>
<main class="bg-gray-900 text-white">
    <!-- Skills Grid -->
    <section aria-label="Our Courses">
        <h2 class="text-3xl font-bold mb-8 text-center">Our Courses</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
            {#each skills as skill, i}
                <div
                        bind:this={skillCards[i]}
                        class="backdrop-blur-[1px] rounded-xl p-6 border border-gray-700/50 cursor-pointer hover:border-blue-500/50 transition-all duration-500 opacity-0 translate-y-8 relative overflow-hidden group"
                        style="transition-delay: {i * 150}ms;"
                >
                    <!-- Free course badge -->
                    {#if skill.freeCourses > 0}
                        <div class="absolute -right-20 -top-10 bg-green-500 w-40 h-20 rotate-45 transform group-hover:-right-[70px] group-hover:-top-8 transition-all duration-300">
                                    <span class="absolute bottom-1 right-16 text-xs font-bold group-hover:scale-110 transition-all duration-300">
                                        {skill.freeCourses}
                                        Free
                                    </span>
                        </div>
                    {/if}

                    <lord-icon
                            src="https://cdn.lordicon.com/{skill.icon}.json"
                            trigger="loop"
                            colors="primary:#ffffff,secondary:#8930e8"
                            style="width:50px;height:50px">
                    </lord-icon>
                    <h3 class="text-xl font-bold mb-2">{skill.title}</h3>
                    <p class="text-gray-400 mb-4">{skill.description}</p>

                    <div class="mt-4 pt-4 border-t border-gray-700/50">
                        <h4 class="text-sm font-semibold text-blue-400 mb-2">What you'll learn:</h4>
                        <ul class="space-y-1">
                            {#each skill.features as feature}
                                <li class="text-sm text-gray-400 flex items-start">
                                    <svg class="w-4 h-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    {feature}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- Free Courses Section -->
    <div bind:this={featureSections[1]}
         class="container mx-auto bg-gray-900 px-4 py-20 opacity-0 translate-y-10 transition-all duration-700">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold mb-6 text-center">Free Courses Available</h2>
            <p class="text-xl text-gray-300 text-center mb-12">
                We believe in accessible education. That's why we're offering several free courses to get you started on
                your learning journey.
            </p>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="font-bold text-xl">HTML & CSS Basics</h3>
                        <span class="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded">FREE</span>
                    </div>
                    <p class="text-gray-400 mb-4">Learn the fundamentals of web development with HTML and CSS. Build
                        your first responsive website from scratch.</p>
                    <p class="text-sm text-gray-500">Duration: 4 weeks</p>
                </div>

                <div class="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="font-bold text-xl">Digital Marketing Intro</h3>
                        <span class="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded">FREE</span>
                    </div>
                    <p class="text-gray-400 mb-4">Master the basics of digital marketing, including social media
                        strategy, content creation, and analytics.</p>
                    <p class="text-sm text-gray-500">Duration: 3 weeks</p>
                </div>

                <div class="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="font-bold text-xl">Design Fundamentals</h3>
                        <span class="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded">FREE</span>
                    </div>
                    <p class="text-gray-400 mb-4">Explore the principles of graphic design, color theory, typography,
                        and composition for digital projects.</p>
                    <p class="text-sm text-gray-500">Duration: 3 weeks</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Tech Stack Section -->
    <div bind:this={featureSections[2]} class="bg-gray-900 py-10 opacity-0 translate-y-10 transition-all duration-700">
        <div class="container mx-auto bg-gray-900 px-4">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold mb-6 text-center">Our Technology Stack</h2>
                <p class="text-gray-300 text-center mb-12">
                    We've built Skill Kenya using cutting-edge web technologies for a fast, responsive, and engaging
                    learning experience.
                </p>

                <div class="grid grid-cols-2 md:grid-cols-6 gap-6 mb-12">
                    {#each techStack as tech}
                        <div class="flex flex-col items-center text-center p-4 transition-all duration-300 transform hover:scale-105">
                            <i class="{tech.icon} text-4xl mb-3 {tech.color}"></i>
                            <span class="font-semibold">{tech.name}</span>
                        </div>
                    {/each}
                </div>

                <div class="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                    <h3 class="font-bold text-xl mb-4">Why This Matters For Students</h3>
                    <ul class="space-y-3">
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-start"><strong class="text-blue-400">Lightning Fast Experience:</strong> Built with Svelte and Vite for optimal performance and responsiveness.</span>
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-start"><strong class="text-blue-400">Modern Design:</strong> Beautiful UI with TailwindCSS for an intuitive learning experience.</span>
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-start"><strong class="text-blue-400">Seamless Data Handling:</strong> Integration with Google Sheets API for smooth user registration and progress tracking.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Newsletter Section -->
    <div id="newsletter" class="container mx-auto bg-gray-900 px-4 mb-24 my-8 py-10">
        <div class="max-w-xl mx-auto text-center">
            <section aria-label="Newsletter">
                <h2 class="text-3xl font-bold mb-6">Stay Updated</h2>
            </section>
            <p class="text-gray-400 mb-8">
                Be the first to know when we launch. Subscribe to our newsletter for early access and beta testing
                opportunities.
            </p>
            <EmailForm/>
        </div>
    </div>

    <!-- FAQ Section -->
    <div bind:this={featureSections[3]} class="bg-gray-950 px-4 py-16 opacity-0 translate-y-10 transition-all duration-700">
        <FAQ/>
    </div>

    <section class="bg-gray-900 min-h-60 center text-white py-8 mt-8 relative">
        <div class="container mx-auto bg-gray-900 px-4 flex items-center flex-col justify-center gap-4">
            <a href="https://stevetom.vercel.app" class="hover:rotate-12 transition-all duration-300">
                <div class="h-14 w-14 p-3 rounded-full ring-2 ring-offset-1 border-2">
                    <img src="/logo-light.png" alt="KenTom logo" class=""/>
                </div>
            </a>
            <div class="text-gray-400">A <a class="font-semibold" href="https://stevetom.vercel.app"><span
                    class="underline underline-offset-2">kenTom</span>&trade;</a> project
            </div>
        </div>
    </section>

    <section class="bg-gray-900 text-white py-16 relative">
        <div class="container mx-auto bg-gray-900 px-4">
            <div class="max-w-md mx-auto">
                <h3 class="text-2xl font-bold text-center mb-8">Connect With Us</h3>
                <div class="flex justify-center gap-8">
                    <!-- TikTok -->
                    <a href="https://www.tiktok.com/@skillkenya" target="_blank"
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

                    <!-- Twitter -->
                    <a href="https://x.com/skill_kenya" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                       aria-label="Twitter">
                        <i class="fa-brands fa-twitter text-2xl"></i>
                    </a>

                    <!-- WhatsApp -->
                    <a href="https://chat.whatsapp.com/DF40YyhA1ZJ14wFjkpXq1K" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                       aria-label="WhatsApp">
                        <i class="fa-brands fa-whatsapp text-2xl"></i>
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

    /* Animation for skills cards and feature sections */
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