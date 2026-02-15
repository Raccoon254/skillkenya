<script>
    import CountdownTimer from "$components/CountdownTimer.svelte";
    import {onMount, onDestroy} from 'svelte';
    import BetaProgram from "$components/BetaProgram.svelte";
    import FAQ from '$components/FAQ.svelte';
    import ComparisonSection from '$components/ComparisonSection.svelte';
    import WaitlistForm from "$components/WaitlistForm.svelte";
    import HeroSection from "$components/HeroSection.svelte";
    import SkillsGrid from "$components/SkillsGrid.svelte";

    import {
        Code,
        Megaphone,
        Palette,
        Clock,
        Users as UsersIcon,
        CheckCircle2,
        Zap,
        Database,
        ArrowDown,
        ChevronDown,
        Eclipse,
        MoonStar
    } from 'lucide-svelte';

    // Smooth scroll function - available globally
    export function scrollToWaitlist() {
        const waitlistSection = document.querySelector('#waitlist-section');
        console.log('Scrolling to waitlist section:', waitlistSection);
        if (waitlistSection) {
            waitlistSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        } else {
            console.error('Waitlist section not found!');
        }
    }

    // Make it available on window object for any component to use
    if (typeof window !== 'undefined') {
        window.scrollToWaitlist = scrollToWaitlist;
    }

    // Tech stack data
    const techStack = [
        {name: "Svelte", icon: "devicon-svelte-plain", color: "text-orange-500"},
        {name: "TailwindCSS", icon: "devicon-tailwindcss-original", color: "text-blue-400"},
        {name: "JavaScript", icon: "devicon-javascript-plain", color: "text-yellow-400"},
        {name: "Vite", icon: "devicon-vitejs-plain", color: "text-purple-400"},
        {name: "Google Sheets API", icon: "devicon-googlecloud-plain", color: "text-green-400"},
        {name: "Node.js", icon: "devicon-nodejs-line", color: "text-green-400"},
    ];

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

<section>
    <HeroSection />
</section>

<section>
    <!-- Beta Program Announcement -->
    <div bind:this={featureSections[0]}>
        <BetaProgram bind:this={featureSections[0]} />
    </div>
</section>

<section class="mt-2">
    <ComparisonSection/>
</section>

<main class="bg-gray-900 text-white flex flex-col">
    <!-- Skills Grid -->
   <div class="bg-gray-900 kentom">
       <SkillsGrid />
   </div>

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
                            <span class="font-semibold text-white group-hover:text-blue-300 text-nowrap text-ellipsis transition-colors">{tech.name}</span>
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
    <div id="waitlist-section" class="relative pt-28 bg-[#0B0F19] text-white overflow-hidden min-h-screen selection:bg-blue-500/30">

            <div class="absolute inset-0 z-0 pointer-events-none">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-700/10 blur-[120px] rounded-full opacity-40 mix-blend-screen animate-pulse-slow"></div>

                <div class="absolute top-[20%] right-0 w-[600px] h-[600px] bg-teal-900/10 blur-[100px] rounded-full opacity-30"></div>

                <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <svg class="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                    <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" stroke-width="0.05"/>
                </pattern>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>
            </div>
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