<script>
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
    import {onMount} from 'svelte';
    import {
        Plus,
        Minus,
        DollarSign,
        Video,
        Award,
        Sparkles,
        Calendar,
        Users,
        Globe,
        MessageCircle,
        Star, ShieldCheck, Coins
    } from 'lucide-svelte';

    // FAQ data as an array of objects
    const faqs = [
        {
            question: "When will SkillKenya officially launch?",
            answer: "We're targeting a launch between August and November 2026. We're taking the time to create comprehensive, industry-relevant courses with practical projects that will genuinely prepare you for the job market.",
            icon: Calendar
        },
        {
            question: "How much will courses cost?",
            answer: "We believe in accessible education. Free introductory courses will be available in each category. Premium courses will range from KSh 500 to KSh 10,000 depending on complexity and duration. Beta testers get 100% free access!",
            icon: Coins
        },
        {
            question: "What makes SkillKenya different?",
            answer: "We focus on practical, job-ready skills tailored for the Kenyan market. Our courses feature real-world projects, one-on-one mentorship, and connections to local employers. We're built by Kenyans, for Kenyans.",
            icon: Star
        },
        {
            question: "How will courses be delivered?",
            answer: "Through our custom-built platform featuring live lessons, interactive coding exercises, downloadable resources, live Q&A sessions with instructors, and a supportive community forum for peer learning.",
            icon: Video
        },
        {
            question: "Will I receive a certificate?",
            answer: "Yes! All students who complete a course receive a digital certificate of completion. Premium course certificates are verifiable credentials you can share with employers on LinkedIn and your portfolio.",
            icon: ShieldCheck
        },
        {
            question: "How can I become a beta tester?",
            answer: "Join our waitlist below and complete the beta application survey sent via email. We're selecting 20 enthusiastic students across all course categories. Beta testers get free access, mentorship, and potential teaching assistant opportunities!",
            icon: Users
        },
        {
            question: "Do I need prior experience to enroll?",
            answer: "Not at all! Our free introductory courses are designed for complete beginners. We'll guide you step-by-step from fundamentals to advanced concepts. If you have experience, our advanced courses will help you level up.",
            icon: Globe
        },
        {
            question: "How can I get support if I'm stuck?",
            answer: "Multiple support channels: instructor Q&A sessions, community forums where you can ask questions and help others, direct messaging with teaching assistants, and comprehensive documentation for each lesson.",
            icon: MessageCircle
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
    <section class="max-w-4xl mx-auto">
        <div class="space-y-6">
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text-faq">Frequently Asked Questions</h2>
                <p class="text-gray-400 text-lg">Everything you need to know about SkillKenya</p>
            </div>

            <div class="flex flex-wrap gap-4">
                {#each faqs as faq, index}
                    {@const IconComponent = faq.icon}
                    <div
                            class="bg-gray-800/50 backdrop-blur-sm p-5 w-full md:w-[49%] rounded-xl border border-gray-700/50 cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:-translate-y-1 group"
                            on:click={() => toggle(index)}
                            on:keypress={(e) => e.key === 'Enter' && toggle(index)}
                            role="button"
                            tabindex="0"
                            aria-expanded={openStates[index]}
                            aria-label={`Toggle ${faq.question}`}
                    >
                        <div class="flex justify-between items-start gap-3">
                            <div class="flex items-start flex-col flex-1">
                                <div class="flex items-center  justify-between w-full gap-3">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-all">
                                            <IconComponent class="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div class="flex items-center h-10 gap-2">
                                            <h3 class="font-bold text-base text-purple-300">{faq.question}</h3>
                                        </div>
                                    </div>
                                    <div class="flex-shrink-0 mt-1">
                                        {#if openStates[index]}
                                            <Minus class="w-5 h-5 text-purple-400 transition-transform" />
                                        {:else}
                                            <Plus class="w-5 h-5 text-purple-400 transition-transform" />
                                        {/if}
                                    </div>
                                </div>
                                <div class="flex-1">
                                    {#if openStates[index]}
                                        <p
                                                class="text-start text-gray-400 text-sm leading-relaxed mt-3"
                                                transition:slide={{ duration: 300, easing: quintOut }}
                                        >
                                            {faq.answer}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>
</div>

<style>
    section {
        transition: all 0.3s ease-in-out;
    }

    .gradient-text-faq {
        background: linear-gradient(135deg, #9333ea 0%, #3b82f6 50%, #8b5cf6 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradient-shift 4s ease infinite;
        background-size: 200% 200%;
    }

    @keyframes gradient-shift {
        0%, 100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
</style>