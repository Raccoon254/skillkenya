<script>
    import EmailForm from "$components/EmailForm.svelte";
    import CountdownTimer from "$components/CountdownTimer.svelte";
    import {onMount, onDestroy} from 'svelte';
    import BetaProgram from "$components/BetaProgram.svelte";
    import FAQ from '$components/FAQ.svelte';
    import ComparisonSection from '$components/ComparisonSection.svelte';
    import WaitlistForm from "$components/WaitlistForm.svelte";
    import {
        Code,
        Megaphone,
        Palette,
        Clock,
        Users as UsersIcon,
        CheckCircle2,
        Zap,
        Sparkles,
        Database,
        Star, MoonStar, Eclipse,
        ArrowDown,
        Rocket,
        ChevronDown,
        MessageCircle as MessageCircleIcon
    } from 'lucide-svelte';

    // Smooth scroll function
    function scrollToWaitlist() {
        const waitlistSection = document.querySelector('#waitlist-section');
        if (waitlistSection) {
            waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Calculate launch date - Updated to November 2026
    const launchDate = new Date(2026, 10, 1); // November 1, 2026 (month is 0-indexed)

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
    <div class="min-h-screen flex flex-col bg-gray-900 text-white relative">
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
            <div class="mb-8">
                <CountdownTimer launchDate={launchDate} title="Launching Later 2026" theme="blue"/>
            </div>

            <!-- Founder's Message / Apology Section -->
            <div class="container mx-auto px-4 mb-16 max-w-4xl">
                <div class="bg-gray-800/40 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-yellow-500/30 shadow-lg">
                    <div class="flex items-center gap-3 mb-6">
                        <svg class="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 class="text-2xl md:text-3xl font-bold text-yellow-400">A Message From Our Founder</h3>
                    </div>

                    <div class="space-y-5 text-gray-300 text-left">
                        <p class="text-lg leading-relaxed">
                            <strong class="text-white">Dear future learners,</strong>
                        </p>

                        <p class="leading-relaxed text-base">
                            I sincerely apologize for the delay in launching Skill Kenya. I know many of you have been
                            eagerly waiting, and I deeply appreciate your patience and continued interest.
                        </p>

                        <p class="leading-relaxed text-base">
                            Creating quality courses that truly make a difference in your learning journey is a process
                            that takes time. We're not just putting together random content – we're crafting comprehensive,
                            industry-relevant courses with practical projects, expert instruction, and real-world applications
                            that will genuinely prepare you for the job market.
                        </p>

                        <p class="leading-relaxed text-base">
                            We're now targeting a launch between <strong class="text-blue-400">August and November 2026</strong>.
                            This extended timeline ensures we deliver the high-quality education platform you deserve, not just
                            something rushed to meet a deadline.
                        </p>

                        <p class="leading-relaxed text-base">
                            Thank you for your understanding and continued support. Your future is worth the wait.
                        </p>
                    </div>

                    <!-- Founder's Signature Section -->
                    <div class="mt-8 pt-6 border-t border-gray-700/50">
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
                            <!-- Founder Info with Image -->
                            <div class="flex items-center gap-4">
                                <div class="relative">
                                    <div class="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/50 ring-offset-2 ring-offset-gray-800">
                                        <img src="https://www.skillkenya.com/ken.HEIC" alt="Steve - Founder of Skill Kenya" class="w-full h-full object-cover"/>
                                    </div>
                                </div>
                                <div class="text-left">
                                    <p class="font-bold text-white text-xl">Steve</p>
                                    <p class="text-sm text-gray-400">Founder, Skill Kenya</p>
                                </div>
                            </div>

                            <!-- WhatsApp Contact Button -->
                            <a href="https://wa.me/254758481320" target="_blank"
                               class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 hover:text-gray-50 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:ring-1 ring-blue-50 ring-offset-2 ring-offset-gray-800 hover:scale-105">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                Contact Me on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
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
<main class="bg-gray-900 text-white flex flex-col">
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
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-16">
                <div class="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30 mb-6">
                    <span class="text-green-400 font-semibold text-sm uppercase tracking-wider">100% Free</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Start Learning for Free
                </h2>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    We believe in accessible education. Get started with our premium introductory courses at absolutely no cost.
                </p>
            </div>

            <!-- Courses Grid -->
            <div class="grid md:grid-cols-3 gap-8">
                <!-- HTML & CSS Course -->
                <div class="group bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                    <!-- Icon & Badge -->
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-14 h-14 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                            <Code class="w-7 h-7 text-green-400" />
                        </div>
                        <span class="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Free</span>
                    </div>

                    <!-- Content -->
                    <h3 class="font-bold text-2xl text-white mb-3 group-hover:text-green-300 transition-colors">HTML & CSS Basics</h3>
                    <p class="text-gray-400 mb-6 leading-relaxed">
                        Learn the fundamentals of web development. Build your first responsive website from scratch with modern best practices.
                    </p>

                    <!-- Features -->
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <Clock class="w-4 h-4 text-green-400" />
                            <span>4 weeks • Self-paced</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <UsersIcon class="w-4 h-4 text-green-400" />
                            <span>Beginner friendly</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle2 class="w-4 h-4 text-green-400" />
                            <span>Certificate included</span>
                        </div>
                    </div>

                    <!-- What You'll Learn -->
                    <div class="pt-6 border-t border-gray-700/50">
                        <p class="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wider">You'll Learn</p>
                        <ul class="space-y-1 text-sm text-gray-400">
                            <li>• HTML structure & semantics</li>
                            <li>• CSS styling & layouts</li>
                            <li>• Responsive design</li>
                        </ul>
                    </div>
                </div>

                <!-- Digital Marketing Course -->
                <div class="group bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                    <!-- Icon & Badge -->
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-14 h-14 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                            <Megaphone class="w-7 h-7 text-green-400" />
                        </div>
                        <span class="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Free</span>
                    </div>

                    <!-- Content -->
                    <h3 class="font-bold text-2xl text-white mb-3 group-hover:text-green-300 transition-colors">Digital Marketing Intro</h3>
                    <p class="text-gray-400 mb-6 leading-relaxed">
                        Master the basics of digital marketing. Learn social media strategy, content creation, and data-driven analytics.
                    </p>

                    <!-- Features -->
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <Clock class="w-4 h-4 text-green-400" />
                            <span>3 weeks • Self-paced</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <UsersIcon class="w-4 h-4 text-green-400" />
                            <span>Beginner friendly</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle2 class="w-4 h-4 text-green-400" />
                            <span>Certificate included</span>
                        </div>
                    </div>

                    <!-- What You'll Learn -->
                    <div class="pt-6 border-t border-gray-700/50">
                        <p class="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wider">You'll Learn</p>
                        <ul class="space-y-1 text-sm text-gray-400">
                            <li>• Social media marketing</li>
                            <li>• Content strategy</li>
                            <li>• Analytics & reporting</li>
                        </ul>
                    </div>
                </div>

                <!-- Design Fundamentals Course -->
                <div class="group bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                    <!-- Icon & Badge -->
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-14 h-14 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                            <Palette class="w-7 h-7 text-green-400" />
                        </div>
                        <span class="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Free</span>
                    </div>

                    <!-- Content -->
                    <h3 class="font-bold text-2xl text-white mb-3 group-hover:text-green-300 transition-colors">Design Fundamentals</h3>
                    <p class="text-gray-400 mb-6 leading-relaxed">
                        Explore the principles of graphic design. Master color theory, typography, and composition for digital projects.
                    </p>

                    <!-- Features -->
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <Clock class="w-4 h-4 text-green-400" />
                            <span>3 weeks • Self-paced</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <UsersIcon class="w-4 h-4 text-green-400" />
                            <span>Beginner friendly</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle2 class="w-4 h-4 text-green-400" />
                            <span>Certificate included</span>
                        </div>
                    </div>

                    <!-- What You'll Learn -->
                    <div class="pt-6 border-t border-gray-700/50">
                        <p class="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wider">You'll Learn</p>
                        <ul class="space-y-1 text-sm text-gray-400">
                            <li>• Color theory basics</li>
                            <li>• Typography principles</li>
                            <li>• Visual composition</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Bottom CTA -->
            <div class="text-center mt-12">
                <p class="text-gray-400 text-lg">
                    More free courses coming soon!
                    <span class="text-green-400 font-semibold">Join the waitlist to be notified.</span>
                </p>
            </div>
        </div>
    </div>

    <!-- Tech Stack Section -->
    <div bind:this={featureSections[2]} class="bg-gray-950 kentom py-20 opacity-0 translate-y-10 transition-all duration-700">
        <div class="container mx-auto  px-4">
            <div class="max-w-6xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/30 mb-6">
                        <Eclipse class="w-4 h-4 text-blue-400" />
                        <span class="text-blue-400 font-semibold text-sm uppercase tracking-wider">Built with Modern Tech</span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Our Technology Stack
                    </h2>
                    <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                        Powered by cutting-edge web technologies for a lightning-fast, responsive, and engaging learning experience
                    </p>
                </div>

                <!-- Tech Stack Grid -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
                    {#each techStack as tech}
                        <div class="group backdrop-blur-sm border border-gray-50/5 p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
                            <div class="w-16 h-16 rounded-lg flex items-center justify-center mb-4 transition-all">
                                <i class="{tech.icon} text-5xl {tech.color} group-hover:scale-110 transition-transform"></i>
                            </div>
                            <span class="font-semibold text-white group-hover:text-blue-300 text-nowrap overflow-ellipsis text-ellipsis transition-colors">{tech.name}</span>
                        </div>
                    {/each}
                </div>

                <!-- Benefits Cards -->
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- Lightning Fast -->
                    <div class="bg-gray-800/5 backdrop-blur-xs p-6 rounded-xl border border-gray-700/10 hover:border-blue-500/50 transition-all duration-300">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                <Zap class="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 class="font-bold text-lg text-blue-300 mb-2">Lightning Fast</h3>
                                <p class="text-gray-400 text-sm leading-relaxed">
                                    Built with Svelte and Vite for optimal performance and instant page loads
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Modern Design -->
                    <div class="bg-gray-800/5 backdrop-blur-xs p-6 rounded-xl border border-gray-700/10 hover:border-purple-500/50 transition-all duration-300">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                <MoonStar class="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 class="font-bold text-lg text-purple-300 mb-2">Beautiful Design</h3>
                                <p class="text-gray-400 text-sm leading-relaxed">
                                    Stunning UI with TailwindCSS for an intuitive and enjoyable learning experience
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Reliable Data -->
                    <div class="bg-gray-800/5 backdrop-blur-xs p-6 rounded-xl border border-gray-700/10 hover:border-green-500/50 transition-all duration-300">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                <Database class="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h3 class="font-bold text-lg text-green-300 mb-2">Reliable Data</h3>
                                <p class="text-gray-400 text-sm leading-relaxed">
                                    Secure database integration for smooth progress tracking and data management
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Newsletter Section -->
<!--    <div id="newsletter" class="container mx-auto bg-gray-900 px-4 mb-24 my-8 py-10">-->
<!--        <div class="max-w-xl mx-auto text-center">-->
<!--            <section aria-label="Newsletter">-->
<!--                <h2 class="text-3xl font-bold mb-6">Stay Updated</h2>-->
<!--            </section>-->
<!--            <p class="text-gray-400 mb-8">-->
<!--                Be the first to know when we launch. Subscribe to our newsletter for early access and beta testing-->
<!--                opportunities.-->
<!--            </p>-->
<!--            <EmailForm/>-->
<!--        </div>-->
<!--    </div>-->
    <div class="container mx-auto px-4 my-16">
        <div class="max-w-xl mx-auto text-center">
            <WaitlistForm />
        </div>
    </div>

    <!-- FAQ Section -->
    <div bind:this={featureSections[3]} class="bg-gray-950 kentom px-4 py-16 opacity-0 translate-y-10 transition-all duration-700">
        <FAQ/>
    </div>

    <section class="bg-gray-900 text-white py-20 relative">
        <div class="container mx-auto bg-gray-900 px-4">
            <div class="max-w-4xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-12">
                    <h3 class="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Connect With Us</h3>
                    <p class="text-gray-400 text-lg">Join our growing community across social platforms</p>
                </div>

                <!-- Social Links Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <!-- TikTok -->
                    <a href="https://www.tiktok.com/@skillkenya" target="_blank"
                       class="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
                       aria-label="TikTok">
                        <div class="flex flex-col items-center gap-3">
                            <div class="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                                <i class="fa-brands fa-tiktok text-3xl text-purple-400 group-hover:scale-110 transition-transform"></i>
                            </div>
                            <div class="text-center">
                                <div class="font-semibold text-white group-hover:text-purple-300 transition-colors">TikTok</div>
                                <div class="text-xs text-gray-400">@skillkenya</div>
                            </div>
                        </div>
                    </a>

                    <!-- Instagram -->
                    <a href="https://www.instagram.com/raccoon.254/" target="_blank"
                       class="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2"
                       aria-label="Instagram">
                        <div class="flex flex-col items-center gap-3">
                            <div class="w-14 h-14 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-all">
                                <i class="fa-brands fa-instagram text-3xl text-pink-400 group-hover:scale-110 transition-transform"></i>
                            </div>
                            <div class="text-center">
                                <div class="font-semibold text-white group-hover:text-pink-300 transition-colors">Instagram</div>
                                <div class="text-xs text-gray-400">@raccoon.254</div>
                            </div>
                        </div>
                    </a>

                    <!-- Twitter/X -->
                    <a href="https://x.com/skill_kenya" target="_blank"
                       class="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2"
                       aria-label="Twitter">
                        <div class="flex flex-col items-center gap-3">
                            <div class="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                                <i class="fa-brands fa-x-twitter text-3xl text-blue-400 group-hover:scale-110 transition-transform"></i>
                            </div>
                            <div class="text-center">
                                <div class="font-semibold text-white group-hover:text-blue-300 transition-colors">Twitter</div>
                                <div class="text-xs text-gray-400">@skill_kenya</div>
                            </div>
                        </div>
                    </a>

                    <!-- WhatsApp -->
                    <a href="https://chat.whatsapp.com/DF40YyhA1ZJ14wFjkpXq1K" target="_blank"
                       class="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2"
                       aria-label="WhatsApp">
                        <div class="flex flex-col items-center gap-3">
                            <div class="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                                <i class="fa-brands fa-whatsapp text-3xl text-green-400 group-hover:scale-110 transition-transform"></i>
                            </div>
                            <div class="text-center">
                                <div class="font-semibold text-white group-hover:text-green-300 transition-colors">WhatsApp</div>
                                <div class="text-xs text-gray-400">Join Group</div>
                            </div>
                        </div>
                    </a>
                </div>

                <!-- Call to Action -->
                <div class="text-center">
                    <p class="text-gray-400">
                        Follow us for updates, learning tips, and exclusive content!
                        <span class="text-purple-400">🚀</span>
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="kentom bg-gray-950 text-white py-16 mt-8 relative">
        <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto">
                <div class="rounded-2xl p-8 md:p-12">
                    <div class="flex flex-col items-center text-center gap-6">
                        <!-- Logo -->
                        <a href="https://stevetom.vercel.app"
                           target="_blank"
                           class="group relative"
                           aria-label="Visit kenTom Portfolio">
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                            <div class="relative h-20 w-20 p-4 rounded-full bg-gray-800/50 border-2 border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                                <img src="/logo-light.png" alt="KenTom logo" class="w-full h-full object-contain"/>
                            </div>
                        </a>

                        <!-- Text Content -->
                        <div class="space-y-3">
                            <div class="flex items-center justify-center gap-2 text-sm text-gray-500 uppercase tracking-wider">
                                <div class="h-px w-8 bg-gradient-to-r from-transparent to-gray-600"></div>
                                <span>Crafted By</span>
                                <div class="h-px w-8 bg-gradient-to-l from-transparent to-gray-600"></div>
                            </div>

                            <a href="https://stevetom.vercel.app"
                               target="_blank"
                               class="group inline-block">
                                <h3 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300">
                                    kenTom<span class="text-lg align-super">™</span>
                                </h3>
                            </a>

                            <p class="text-gray-400 max-w-md text-sm leading-relaxed">
                                Building digital solutions that empower education and innovation across Kenya
                            </p>

                            <!-- Link -->
                            <a href="https://stevetom.vercel.app"
                               target="_blank"
                               class="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group mt-2">
                                <span>Visit Portfolio</span>
                                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
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

    .kentom{
        /*    grid dots*/
        position: relative;
        overflow: hidden;
    }

    .kentom::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(106, 106, 253, 0.3) 1px, transparent 1px);
        background-size: 40px 40px;
        transform: rotate(40deg) translate(-400px, -400px);
        z-index: 0;
        pointer-events: none;
        height: 1800px;
        filter: blur(1px);
    }

    .kentom > * {
        position: relative;
        z-index: 1;
    }
</style>