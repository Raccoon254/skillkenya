<script>
    import { fade, fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    // Props to make the component reusable
    export let betaTestersInfo = {
        total: 10,
        perSkill: 4,
        benefits: [
            "Early access to all course content",
            "One-on-one mentorship sessions",
            "Certificate of completion",
            "Opportunity to join as a teaching assistant"
        ]
    };

    // State for animation control
    let visible = false;

    // Trigger animation on mount
    import { onMount } from 'svelte';
    onMount(() => {
        visible = true;
    });
</script>

<section
        class="max-w-4xl mx-auto mb-24 p-8 my-10 rounded-2xl relative overflow-hidden"
        in:fly={{ y: 50, duration: 800, easing: quintOut }}
        out:fade={{ duration: 300 }}
        style="background-image: url('https://source.unsplash.com/1600x900/?coding');"
>
    <!-- Header with Icon -->
    <div class="flex justify-center items-center mb-6">
        <lord-icon
                src="https://cdn.lordicon.com/gsjfryhc.json"
                trigger="loop"
                colors="primary:#ffffff,secondary:#9333ea"
                style="width:40px;height:40px"
                class="mr-3"
        ></lord-icon>
        <h2 class="text-3xl md:text-4xl font-bold text-center text-purple-200">
            Join Our Beta Program
        </h2>
    </div>

    <!-- Description -->
    <p
            class="text-gray-200 text-center mb-8 max-w-2xl mx-auto text-lg"
            in:fade={{ duration: 600, delay: 200 }}
    >
        We're selecting <span class="text-purple-300 font-semibold">{betaTestersInfo.total}</span> students for our exclusive beta program. Approximately <span class="text-purple-300 font-semibold">{betaTestersInfo.perSkill}</span> students per course category will get early access to test our platform.
    </p>

    <!-- Benefits and How to Apply Grid -->
    <div class="grid md:grid-cols-2 gap-8 mb-8">
        <!-- Benefits Card -->
        <div
                class="bg-gray-800/60 p-6 rounded-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 shadow-md"
                in:fly={{ x: -50, duration: 700, delay: 300, easing: quintOut }}
        >
            <div class="flex items-center mb-4">
                <svg class="w-6 h-6 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h3 class="text-xl font-bold text-purple-300">Beta Tester Benefits</h3>
            </div>
            <ul class="space-y-3">
                {#each betaTestersInfo.benefits as benefit, i}
                    <li
                            class="flex items-center text-gray-300"
                            in:fade={{ duration: 500, delay: 400 + i * 100 }}
                    >
                        <svg class="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{benefit}</span>
                    </li>
                {/each}
            </ul>
        </div>

        <!-- How to Apply Card -->
        <div
                class="bg-gray-800/60 p-6 rounded-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 shadow-md"
                in:fly={{ x: 50, duration: 700, delay: 300, easing: quintOut }}
        >
            <div class="flex items-center mb-4">
                <svg class="w-6 h-6 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3-3 3 3m0 6l-3 3-3-3"></path>
                </svg>
                <h3 class="text-xl font-bold text-purple-300">How to Apply</h3>
            </div>
            <p class="text-gray-300 mb-4">To be considered for the beta program:</p>
            <ol class="list-decimal list-inside space-y-3 text-gray-300">
                {#each ["Subscribe to our newsletter below", "Complete our beta application survey (sent via email)", "Demonstrate enthusiasm and commitment to learning", "Be available for the full course duration"] as step, i}
                    <li in:fade={{ duration: 500, delay: 400 + i * 100 }}>{step}</li>
                {/each}
            </ol>
        </div>
    </div>

    <!-- Call to Action Button -->
    <div class="text-center">
        <a
                href="#newsletter"
                class="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                in:scale={{ duration: 600, delay: 600, easing: quintOut }}
        >
            Apply for Beta Access
        </a>
    </div>
</section>

<style>
    section {
        position: relative;
        transition: all 0.3s ease-in-out;
    }


    h2 {
        background: linear-gradient(to right, #e4c9ff, #fcfcfc);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .shadow-md {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    /* Subtle glow effect on hover */
    a:hover {
        box-shadow: 0 0 15px rgba(147, 51, 234, 0.5);
        color: #f9f9f9;
    }
</style>