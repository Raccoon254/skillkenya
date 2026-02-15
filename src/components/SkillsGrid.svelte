<script>
    import {onDestroy, onMount} from "svelte";

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

    let visible = false;

    onMount(() => {
        // Make visible immediately to ensure content shows
        visible = true;
    });
</script>

<section aria-label="Our Courses" class="py-16">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Our Courses</h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {#each skills as skill, i}
                <div class="group bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 cursor-pointer hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">

                    <!-- Free course badge -->
                    {#if skill.freeCourses > 0}
                        <div class="absolute -right-16 -top-8 bg-green-500 w-32 h-16 rotate-45 transform group-hover:-right-12 group-hover:-top-6 transition-all duration-300">
                            <span class="absolute bottom-1 right-12 text-xs font-bold text-white group-hover:scale-110 transition-all duration-300">
                                {skill.freeCourses} Free
                            </span>
                        </div>
                    {/if}

                    <!-- Icon -->
                    <div class="mb-4">
                        <lord-icon
                            src="https://cdn.lordicon.com/{skill.icon}.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#8930e8"
                            style="width:50px;height:50px">
                        </lord-icon>
                    </div>

                    <!-- Content -->
                    <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{skill.title}</h3>
                    <p class="text-gray-400 mb-4 text-sm leading-relaxed">{skill.description}</p>

                    <!-- Features -->
                    <div class="mt-4 pt-4 border-t border-gray-700/50">
                        <h4 class="text-sm font-semibold text-blue-400 mb-3">What you'll learn:</h4>
                        <ul class="space-y-2">
                            {#each skill.features as feature}
                                <li class="text-sm text-gray-400 flex items-start">
                                    <svg class="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    {feature}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>