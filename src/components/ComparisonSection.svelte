<script>
    import { onMount } from 'svelte';

    // Props
    export let animationDelay = 300; // ms

    // Animation state variables
    let leftVisible = false;
    let rightVisible = false;
    let componentsVisible = false;

    onMount(() => {
        // Start animations with slight delays for a staggered effect
        setTimeout(() => {
            leftVisible = true;
            setTimeout(() => {
                rightVisible = true;
                setTimeout(() => {
                    componentsVisible = true;
                }, animationDelay);
            }, animationDelay);
        }, animationDelay);
    });
</script>

<section class="py-12 mb-32 overflow-hidden">
    <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <!-- Left Card - Without SkillKenya -->
            <div class="rounded-3xl p-8 bg-gray-800/40 backdrop-blur-sm text-white border border-gray-700/50 shadow-xl transition-all duration-700 transform {leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
                <h2 class="text-4xl font-bold mb-6">
                    <span class="text-white">Without</span>
                    <span class="text-gray-300">SkillKenya</span>
                </h2>

                <p class="text-lg text-gray-300 mb-12">
                    Endless scattered tutorials. Navigating outdated lessons. Lost amidst overwhelming coding content
                </p>

                <div class="relative h-72 transition-all duration-700 transform {componentsVisible ? 'opacity-100' : 'opacity-0'}">
                    <img src="/chaotic_learning_without_skillkenya.png" alt="Image of chaotic learning experience without SkillKenya" />
                </div>
            </div>

            <!-- Right Card - With SkillKenya -->
            <div class="rounded-3xl p-8 bg-blue-900/20 backdrop-blur-sm text-white border border-blue-500/30 shadow-xl transition-all duration-700 transform {rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
                <h2 class="text-4xl font-bold mb-6">
                    <span class="text-white">With</span>
                    <span class="text-blue-400">SkillKenya</span>
                </h2>

                <p class="text-lg text-gray-300 mb-12">
                    Streamlined, structured learning. Dive into current, curated content. Master coding with clarity and confidence at your own pace.
                </p>

                <div class="relative h-72 transition-all duration-700 transform {componentsVisible ? 'opacity-100' : 'opacity-0'}">
                    <img src="/how_skillkenya_streamlines_learning.png" alt="Image of SkillKenya platform learning experience" />
                </div>
            </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-12 text-center transition-all duration-700 transform {componentsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
            <a href="#newsletter" class="bg-blue-500/20 ring-2 ring-blue-500 text-blue-400 px-6 py-3 rounded-full font-semibold hover:bg-blue-500/30 transition-all duration-300 pulse-animation">
                Join our Beta Program
            </a>
        </div>
    </div>
</section>

<style>
    /* Animation for the chaotic path */
    .chaotic-path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: dash 3s ease-in-out forwards;
    }

    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
    }

    /* General animations */
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Pulse animation for CTA button */
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
</style>