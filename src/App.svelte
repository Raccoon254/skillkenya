<script>
    import EmailForm from "./components/EmailForm.svelte";

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
</script>

<main class="">
    <div class="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div class="fade-down bg-gradient-to-b z-10 from-gray-900 via-gray-900 to-transparent min-h-64 w-full absolute top-40"></div>

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
                <h1 class="text-5xl md:text-7xl font-bold mb-6 text-center">
                    Skill Kenya
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
                    Your gateway to professional skills. Coming soon with comprehensive online courses.
                </p>

                <div class="w-full grid place-items-center mb-8">
                    <div class="avatar-group mx-auto -space-x-6 rtl:space-x-reverse">
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

                <!-- Coming Soon Badge -->
                <div class="flex justify-center mb-32">
                    <button class="bg-blue-500/20 ring-2 ring-blue-500 text-blue-400 px-6 py-2 rounded-full font-semibold">
                        Coming Soon
                    </button>
                </div>

                <!-- Skills Grid -->
                <section aria-label="Our Courses">
                    <h2 class="sr-only">Our Courses</h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                        {#each skills as skill}
                            <div class="backdrop-blur-[1px] rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <lord-icon
                                        src="https://cdn.lordicon.com/{skill.icon}.json"
                                        trigger="loop"
                                        state="roll"
                                        delay="1000"
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

            <a href="https://stevetom.vercel.app">
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
                Be the first to know when we launch. Subscribe to our newsletter.
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
                       class="text-gray-400 hover:text-white transition-colors"
                       aria-label="TikTok">
                        <i class="fa-brands fa-tiktok text-2xl"></i>
                    </a>

                    <!-- Instagram -->
                    <a href="https://www.instagram.com/raccoon.254/" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors"
                       aria-label="Instagram">
                        <i class="fa-brands fa-instagram text-2xl"></i>
                    </a>

                    <!-- WhatsApp -->
                    <a href="https://wa.me/254758481320" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors"
                       aria-label="WhatsApp">
                        <i class="fa-brands fa-whatsapp text-2xl"></i>
                    </a>

                    <!-- Email -->
                    <a href="mailto:tomsteve187@gmail.com" target="_blank"
                       class="text-gray-400 hover:text-white transition-colors"
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
</style>