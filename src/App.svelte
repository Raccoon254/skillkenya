<script>
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
        <!-- Perspective Grid Background -->
        <div class="absolute inset-0 overflow-hidden grid-background">
            <svg class="absolute opacity-45 w-full h-full" viewBox="0 300 1000 500" preserveAspectRatio="xMidYMid slice">
                <!-- Horizontal Lines -->
                {#each Array(15) as _, i}
                    {@const y = 300 + i * 50}
                    <path
                            d="M0 {y} L1000 {y}"
                            class="grid-line"
                    />
                {/each}

                <!-- Converging Lines -->
                {#each Array(20) as _, i}
                    {@const x = -400 + i * 100}
                    <path
                            d="M{x} 1000 L500 0"
                            class="grid-line"
                    />
                {/each}
            </svg>
        </div>


        <!-- Main Content -->
        <div class="relative z-10">
            <!-- Hero Section -->
            <div class="container mx-auto px-4 pt-32 pb-20">
                <h1 class="text-5xl md:text-7xl font-bold mb-6 text-center">
                    Skill Kenya
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
                    Your gateway to professional skills. Coming soon with comprehensive online courses.
                </p>

                <!-- Coming Soon Badge -->
                <div class="flex justify-center mb-20">
                    <button class="bg-blue-500/20 ring-2 ring-blue-500 text-blue-400 px-6 py-2 rounded-full font-semibold">
                        Coming Soon
                    </button>
                </div>

                <!-- Skills Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                    {#each skills as skill}
                        <div class="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
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
            </div>
        </div>
      <!-- Scroll down button -->
        <div class="absolute bottom-0 left-0 right-0 flex justify-center mb-8 z-50">
            <a href="#newsletter" class="text-blue-500 hover:text-blue-400 transition-colors" aria-label="Scroll down">
              <i class="fa-solid fa-chevron-down text-4xl"></i>
            </a>
        </div>
      
    </div>
  
    <!-- Newsletter Section -->
    <div class="container mx-auto px-4 py-20">
        <div class="max-w-xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-6">Stay Updated</h2>
            <p class="text-gray-400 mb-8">
                Be the first to know when we launch. Subscribe to our newsletter.
            </p>
            <form class="flex gap-4 max-w-md mx-auto">
                <input
                        type="email"
                        placeholder="Enter your email"
                        class="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                        type="submit"
                        class="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Subscribe
                </button>
            </form>
        </div>
    </div>
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
        transform: perspective(1000px) rotateX(60deg) scale(1.6);
        transform-origin: center center;
    }
</style>