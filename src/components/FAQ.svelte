<script>
    import { fade, fly, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    // FAQ data as an array of objects
    const faqs = [
        {
            question: "How much will courses cost?",
            answer: "Our courses will be priced affordably to make quality education accessible. Free introductory courses will be available in each category, with premium courses ranging from KSh 5,000 to KSh 15,000 depending on complexity and duration."
        },
        {
            question: "How will the courses be delivered?",
            answer: "Courses will be delivered through our custom-built online learning platform featuring video lessons, interactive exercises, downloadable resources, and live Q&A sessions with instructors."
        },
        {
            question: "Will I receive a certificate?",
            answer: "Yes, all students who complete a course will receive a digital certificate of completion. For premium courses, you'll also receive a verifiable credential that you can share with employers."
        },
        {
            question: "How can I become a beta tester?",
            answer: "Subscribe to our newsletter and complete the beta application form that will be sent to you. We'll select a diverse group of 20 students across all course categories based on enthusiasm, commitment, and learning goals."
        }
    ];

    // Reactive array to track which FAQ is open
    let openStates = faqs.map(() => false);

    // Toggle function to expand/collapse answers
    function toggle(index) {
        openStates[index] = !openStates[index];
        openStates = openStates; // Trigger Svelte reactivity
    }

    // Handle entrance animation
    let visible = false;
    onMount(() => {
        visible = true;
    });
</script>

<div>
    <section class="max-w-3xl mx-auto">
        <div class="space-y-4">
        <h2 class="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>

        <div class="space-y-4">
            {#each faqs as faq, index}
                <div
                        class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg"
                        on:click={() => toggle(index)}
                        on:keypress={(e) => e.key === 'Enter' && toggle(index)}
                        role="button"
                        tabindex="0"
                        aria-expanded={openStates[index]}
                        aria-label={`Toggle ${faq.question}`}
                >
                    <div class="flex justify-between items-center">
                        <h3 class="font-bold text-lg text-purple-300">{faq.question}</h3>
                        <i class="fas {openStates[index] ? 'fa-minus' : 'fa-plus'} text-purple-400"></i>
                    </div>
                    {#if openStates[index]}
                        <p
                                class="text-gray-300 mt-3"
                                transition:slide={{ duration: 300, easing: quintOut }}
                        >
                            {faq.answer}
                        </p>
                    {/if}
                </div>
            {/each}
        </div>
    </section>
</div>

<style>
    section {
        transition: all 0.3s ease-in-out;
    }

    section:hover {
        transform: translateY(-5px);
    }

    h2 {
        background: linear-gradient(to right, #9333ea, #3b82f6);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .shadow-lg {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }
</style>