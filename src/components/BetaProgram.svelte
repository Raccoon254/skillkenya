<script>
    import {fade, fly, scale} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
    import {onMount} from 'svelte';

    // Lucide Icons
    import {
        Sparkles,
        CheckCircle2,
        Users,
        GraduationCap,
        Award,
        UserPlus,
        FileCheck,
        Heart,
        Calendar,
        Info, Star
    } from 'lucide-svelte';

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

    onMount(() => {
        visible = true;
    });

    const benefitIcons = [GraduationCap, Users, Award, UserPlus];

    const applicationSteps = [
        {
            number: "01",
            title: "Join the Waitlist",
            description: "Fill out the waitlist form below to get started",
            icon: CheckCircle2
        },
        {
            number: "02",
            title: "Complete Survey",
            description: "Fill out our beta application survey sent via email",
            icon: FileCheck
        },
        {
            number: "03",
            title: "Show Commitment",
            description: "Demonstrate enthusiasm and dedication to learning",
            icon: Heart
        },
        {
            number: "04",
            title: "Stay Available",
            description: "Be available for the full course duration",
            icon: Calendar
        }
    ];
</script>

<section
        class="max-w-6xl mx-auto px-4 py-12 my-10 relative overflow-hidden"
        in:fly={{ y: 50, duration: 800, easing: quintOut }}
        out:fade={{ duration: 300 }}
>
    <!-- Header Section -->
    <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center mb-4">
            <div class="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/30">
                <Star class="w-5 h-5 text-purple-400" />
                <span class="text-purple-300 font-semibold text-sm uppercase tracking-wider">Limited Spots</span>
            </div>
        </div>

        <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Join Our Beta Program
        </h2>

        <p class="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            We're selecting <span class="text-purple-400 font-bold text-xl">{betaTestersInfo.total}</span> students for our exclusive beta program.
            Get early access and help shape the future of SkillKenya.
        </p>

        <!-- Stats Bar -->
        <div class="flex flex-wrap justify-center gap-6 mt-8">
            <div class="text-center">
                <div class="text-3xl font-bold text-purple-400">{betaTestersInfo.total}</div>
                <div class="text-sm text-gray-400 uppercase tracking-wide">Total Spots</div>
            </div>
            <div class="w-px bg-gray-700"></div>
            <div class="text-center">
                <div class="text-3xl font-bold text-purple-400">{betaTestersInfo.perSkill}</div>
                <div class="text-sm text-gray-400 uppercase tracking-wide">Per Course</div>
            </div>
            <div class="w-px bg-gray-700"></div>
            <div class="text-center">
                <div class="text-3xl font-bold text-purple-400">100%</div>
                <div class="text-sm text-gray-400 uppercase tracking-wide">Free Access</div>
            </div>
        </div>
    </div>

    <!-- Benefits Section -->
    <div class="mb-16">
        <h3 class="text-2xl font-bold text-center mb-8 text-purple-200">What You'll Get</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each betaTestersInfo.benefits as benefit, i}
                {@const IconComponent = benefitIcons[i]}
                <div
                        class="bg-gray-800/10 p-6 rounded-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 group"
                        in:scale={{ duration: 500, delay: 200 + i * 100, start: 0.9, easing: quintOut }}
                >
                    <div class="flex flex-col items-center text-center h-full">
                        <div class="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-all">
                            <IconComponent class="w-6 h-6 text-purple-400" />
                        </div>
                        <p class="text-gray-300 leading-relaxed">{benefit}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Application Steps -->
    <div>
        <h3 class="text-2xl font-bold text-center mb-8 text-purple-200">How to Apply</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each applicationSteps as step, i}
                {@const IconComponent = step.icon}
                <div
                        class="relative bg-gray-800/10 p-6 rounded-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 group"
                        in:fly={{ y: 30, duration: 600, delay: 300 + i * 150, easing: quintOut }}
                >
                    <!-- Step Number Badge -->
                    <div class="absolute -top-4 -right-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                        {step.number}
                    </div>

                    <!-- Icon -->
                    <div class="mb-4">
                        <div class="w-14 h-14 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                            <IconComponent class="w-7 h-7 text-purple-400" />
                        </div>
                    </div>

                    <!-- Content -->
                    <h4 class="text-lg font-bold text-purple-300 mb-2">{step.title}</h4>
                    <p class="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
            {/each}
        </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-12 text-center">
        <div class="inline-flex items-center gap-2 text-sm text-gray-400">
            <Info class="w-5 h-5 text-purple-400" />
            <span>Applications are reviewed on a rolling basis. Apply early to secure your spot!</span>
        </div>
    </div>
</section>

<style>
    section {
        position: relative;
        transition: all 0.3s ease-in-out;
    }

    .gradient-text {
        background: linear-gradient(135deg, #e4c9ff 0%, #ffffff 50%, #c4b5fd 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradient-shift 3s ease infinite;
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

    /* Hover effects */
    a:hover {
        color: #f9f9f9;
    }
</style>