<script>
    import { onMount, onDestroy } from 'svelte';
    import { spring } from 'svelte/motion';
    import { tick } from 'svelte';

    // Props with defaults
    export let title = "Launching In";
    export let theme = "blue"; // options: blue, purple, green
    export let onComplete = () => {};

    // Unified spring store with optimized config
    const springConfig = {
        stiffness: 0.1,
        damping: 0.5,
        precision: 0.1
    };

    const countdown = spring({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }, springConfig);

    // Animation states tracking
    let animating = {
        days: false,
        hours: false,
        minutes: false,
        seconds: false
    };

    // Store previous values for exit animations
    let prevValues = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    // Initial render animation states
    let containerVisible = false;
    let titleVisible = false;
    let unitsVisible = false;

    let interval;
    let isCountdownComplete = false;

    // Theme color maps (glow removed)
    const themeColors = {
        blue: {
            text: "text-blue-500",
            accent: "text-blue-400"
        },
        purple: {
            text: "text-purple-500",
            accent: "text-purple-400"
        },
        green: {
            text: "text-green-500",
            accent: "text-green-400"
        }
    };

    // Get current theme
    $: colors = themeColors[theme] || themeColors.blue;

    // Animation controller
    function animateValue(type) {
        if (animating[type]) return Promise.resolve();

        animating[type] = true;

        return new Promise(resolve => {
            const timer = setTimeout(() => {
                animating[type] = false;
                resolve();
            }, 600);

            return () => {
                clearTimeout(timer);
                animating[type] = false;
            };
        });
    }

    async function updateCountdown() {
        const now = new Date();
        const diff = new Date(2025, 6, 1) - now;

        if (diff <= 0) {
            clearInterval(interval);
            await countdown.set({days: 0, hours: 0, minutes: 0, seconds: 0});

            if (!isCountdownComplete) {
                isCountdownComplete = true;
                onComplete();
            }
            return;
        }

        const newValues = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };

        const animationPromises = [];

        Object.keys(newValues).forEach(unit => {
            if (Math.floor($countdown[unit]) !== newValues[unit]) {
                prevValues[unit] = Math.floor($countdown[unit]);
                animationPromises.push(animateValue(unit));
            }
        });

        countdown.set(newValues);

        if (animationPromises.length > 0) {
            await Promise.all(animationPromises);
            await tick();
        }
    }

    function runInitialAnimation() {
        containerVisible = true;

        const titleTimer = setTimeout(() => {
            titleVisible = true;
        }, 300);

        const unitsTimer = setTimeout(() => {
            unitsVisible = true;
        }, 500);

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(unitsTimer);
        };
    }

    onMount(() => {
        updateCountdown();
        const cleanupAnimation = runInitialAnimation();
        interval = setInterval(updateCountdown, 1000);

        return () => {
            clearInterval(interval);
            cleanupAnimation();
        };
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });

    function padNumber(num) {
        return num.toString().padStart(2, '0');
    }
</script>

<div class="countdown-container" aria-label="Countdown timer" class:container-visible={containerVisible}>
    <div class="p-6">
        {#if title}
            <h2 class="title {colors.accent} text-center mb-8 font-bold text-xl tracking-wider"
                class:title-visible={titleVisible}>
                {title}
            </h2>
        {/if}

        <div class="flex flex-wrap justify-center gap-6 md:gap-10">
            <!-- Days -->
            <div class="unit-container" class:unit-visible={unitsVisible} style="transition-delay: 100ms;">
                <div class="digit-container">
                    {#if animating.days}
                        <div class="digit previous slide-out {colors.text}">
                            {Math.floor(prevValues.days)}
                        </div>
                    {/if}
                    <div class="digit current {animating.days ? 'slide-in' : ''} {colors.text}">
                        {Math.floor($countdown.days)}
                    </div>
                </div>
                <span class="unit-label {colors.accent}">DAYS</span>
            </div>

            <!-- Hours -->
            <div class="unit-container" class:unit-visible={unitsVisible} style="transition-delay: 200ms;">
                <div class="digit-container">
                    {#if animating.hours}
                        <div class="digit previous slide-out {colors.text}">
                            {padNumber(prevValues.hours)}
                        </div>
                    {/if}
                    <div class="digit current {animating.hours ? 'slide-in' : ''} {colors.text}">
                        {padNumber(Math.floor($countdown.hours))}
                    </div>
                </div>
                <span class="unit-label {colors.accent}">HOURS</span>
            </div>

            <!-- Minutes -->
            <div class="unit-container" class:unit-visible={unitsVisible} style="transition-delay: 300ms;">
                <div class="digit-container">
                    {#if animating.minutes}
                        <div class="digit previous slide-out {colors.text}">
                            {padNumber(prevValues.minutes)}
                        </div>
                    {/if}
                    <div class="digit current {animating.minutes ? 'slide-in' : ''} {colors.text}">
                        {padNumber(Math.floor($countdown.minutes))}
                    </div>
                </div>
                <span class="unit-label {colors.accent}">MINUTES</span>
            </div>

            <!-- Seconds -->
            <div class="unit-container" class:unit-visible={unitsVisible} style="transition-delay: 400ms;">
                <div class="digit-container">
                    {#if animating.seconds}
                        <div class="digit previous slide-out {colors.text}">
                            {padNumber(prevValues.seconds)}
                        </div>
                    {/if}
                    <div class="digit current {animating.seconds ? 'slide-in' : ''} {colors.text}">
                        {padNumber(Math.floor($countdown.seconds))}
                    </div>
                </div>
                <span class="unit-label {colors.accent}">SECONDS</span>
            </div>
        </div>
    </div>
</div>

<style>
    /* Container animations */
    .countdown-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        opacity: 0;
        transform: translateY(20px) scale(0.98);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, opacity;
    }

    .container-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    /* Title animations */
    .title {
        opacity: 0;
        transform: translateY(-15px);
        transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, opacity;
    }

    .title-visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Unit container animations */
    .unit-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        transform: translateY(30px) scale(0.9);
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, opacity;
    }

    .unit-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    /* Digit container and animations */
    .digit-container {
        position: relative;
        height: 80px;
        width: 90px;
        overflow: visible;
    }

    .digit {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3.5rem;
        font-weight: 700;
    }

    .slide-in {
        animation: slide-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .slide-out {
        animation: slide-out 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes slide-in {
        from {
            opacity: 0;
            scale: 0.2;
            transform: translateY(-100px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            opacity: 1;
            scale: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            scale: 0.4;
            transform: translateY(100%);
        }
    }

    .unit-label {
        font-size: 0.7rem;
        font-weight: 600;
        margin-top: 0.75rem;
        letter-spacing: 2px;
        opacity: 0.9;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .digit-container {
            height: 70px;
            width: 70px;
        }

        .digit {
            font-size: 2.5rem;
        }

        .unit-container {
            padding: 0 5px;
        }
    }

    /* Hover effect for desktop only */
    @media (hover: hover) {
        .digit:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease;
        }
    }
</style>