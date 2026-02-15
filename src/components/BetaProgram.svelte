<script>
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import {
        Sparkles, Users, GraduationCap, Award,
        UserPlus, FileCheck, Heart, Calendar,
        CheckCircle2, Zap
    } from 'lucide-svelte';

    // Props
    export let betaTestersInfo = {
        total: 10,
        perSkill: 4,
        benefits: [
            { title: "Early Access", desc: "Full access to beta content before public launch.", icon: Zap },
            { title: "1-on-1 Mentorship", desc: "Direct guidance from industry experts.", icon: Users },
            { title: "Certification", desc: "Official badge of completion for your CV.", icon: Award },
            { title: "Teaching Role", desc: "Opportunity to become a paid TA.", icon: GraduationCap }
        ]
    };

    let visible = false;

    // Trigger animations on mount
    onMount(() => {
        // Set a timeout fallback to ensure visibility
        setTimeout(() => {
            visible = true;
        }, 1000);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visible = true;
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.1,  // Lower threshold for earlier triggering
            rootMargin: '0px 0px -50px 0px'  // Trigger when element is 50px into viewport
        });

        const section = document.querySelector('#beta-section');
        if (section) {
            observer.observe(section);
        } else {
            // Fallback if section not found
            setTimeout(() => visible = true, 500);
        }
    });

    const steps = [
        { num: "01", title: "Join Waitlist", desc: "Complete the form above", icon: UserPlus },
        { num: "02", title: "The Survey", desc: "Check email for application", icon: FileCheck },
        { num: "03", title: "Interview", desc: "Brief culture-fit chat", icon: Heart },
        { num: "04", title: "Onboarding", desc: "Get your exclusive access", icon: CheckCircle2 }
    ];
</script>

<section id="beta-section" class="relative py-24 overflow-hidden">

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full opacity-50 pointer-events-none"></div>

    <div class="container mx-auto px-4 relative z-10">

        <div class="text-center max-w-3xl mx-auto mb-20">
            {#if visible}
                <div in:fly={{ y: 20, duration: 800 }} class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold uppercase tracking-wider mb-6">
                    <Sparkles class="w-4 h-4 text-purple-400 animate-pulse" />
                    <span>Beta Program Access</span>
                </div>

                <h2 in:fly={{ y: 20, duration: 800, delay: 100 }} class="text-4xl md:text-5xl font-bold text-white mb-6">
                    Help Shape the <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Future</span>
                </h2>

                <p in:fly={{ y: 20, duration: 800, delay: 200 }} class="text-lg text-gray-400 leading-relaxed">
                    We are looking for <span class="text-white font-bold">{betaTestersInfo.total} founding students</span> to test our platform.
                    In exchange for your feedback, you get lifetime benefits and direct access to the founding team.
                </p>
            {/if}
        </div>

        {#if visible}
            <div in:scale={{ duration: 600, delay: 300, start: 0.95, easing: quintOut }}
                 class="grid grid-cols-1 md:grid-cols-3 gap-1 max-w-4xl mx-auto bg-gray-800/50 rounded-2xl p-1 border border-gray-700/50 mb-24 backdrop-blur-md">

                <div class="bg-[#0B0F19]/80 rounded-xl p-8 text-center group hover:bg-gray-800/50 transition-colors">
                    <div class="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{betaTestersInfo.total}</div>
                    <div class="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Spots</div>
                </div>

                <div class="bg-[#0B0F19]/80 rounded-xl p-8 text-center group hover:bg-gray-800/50 transition-colors">
                    <div class="text-4xl font-bold text-purple-400 mb-1 group-hover:scale-110 transition-transform duration-300">100%</div>
                    <div class="text-xs font-bold text-gray-500 uppercase tracking-widest">Tuition Off</div>
                </div>

                <div class="bg-[#0B0F19]/80 rounded-xl p-8 text-center group hover:bg-gray-800/50 transition-colors">
                    <div class="text-4xl font-bold text-blue-400 mb-1 group-hover:scale-110 transition-transform duration-300">Lifetime</div>
                    <div class="text-xs font-bold text-gray-500 uppercase tracking-widest">Access Granted</div>
                </div>
            </div>
        {/if}

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {#each betaTestersInfo.benefits as item, i}
                {#if visible}
                    <div in:fly={{ y: 30, delay: 400 + (i * 100), duration: 800 }}
                         class="group relative bg-gray-900/40 border border-gray-800 p-8 rounded-2xl hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                        <div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div class="relative w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                            <svelte:component this={item.icon} class="w-6 h-6 text-gray-400 group-hover:text-purple-300" />
                        </div>

                        <h3 class="relative text-lg font-semibold text-white mb-2">{item.title}</h3>
                        <p class="relative text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                            {item.desc}
                        </p>
                    </div>
                {/if}
            {/each}
        </div>

        <div class="max-w-5xl mx-auto">
            <h3 class="text-2xl font-bold text-center text-white mb-12">Application Process</h3>

            <div class="relative">
                <div class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {#each steps as step, i}
                        {#if visible}
                            <div in:scale={{ delay: 600 + (i * 150), duration: 500, start: 0.8 }}
                                 class="relative z-10 flex flex-col items-center text-center group">

                                <div class="w-16 h-16 rounded-full bg-[#0B0F19] border-4 border-gray-800 flex items-center justify-center mb-6 group-hover:border-purple-500 transition-colors duration-300 shadow-xl">
                                    <svelte:component this={step.icon} class="w-6 h-6 text-gray-400 group-hover:text-purple-400" />
                                </div>

                                <div class="absolute top-0 right-[calc(50%-40px)] w-6 h-6 rounded-full bg-gray-700 text-[10px] font-bold text-white flex items-center justify-center border border-gray-900 group-hover:bg-purple-500 transition-colors">
                                    {step.num}
                                </div>

                                <h4 class="text-white font-semibold mb-1">{step.title}</h4>
                                <p class="text-sm text-gray-500 px-4">{step.desc}</p>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>

        <div class="mt-20 text-center">
            <div class="inline-flex items-center gap-3 px-6 py-3 bg-purple-900/20 border border-purple-500/20 rounded-lg text-purple-200 text-sm">
                <Calendar class="w-4 h-4" />
                <span>Rolling admissions until spots are filled.</span>
            </div>
        </div>

    </div>
</section>