<script>
    import { onMount, onDestroy } from 'svelte';
    import { spring } from 'svelte/motion';

    // Props with defaults
    export let launchDate = new Date();
    export let title = "Launching In";
    export let theme = "blue"; // options: blue, purple, green

    // State for countdown values
    let days = spring(0, { stiffness: 0.1, damping: 0.4 });
    let hours = spring(0, { stiffness: 0.1, damping: 0.4 });
    let minutes = spring(0, { stiffness: 0.1, damping: 0.4 });
    let seconds = spring(0, { stiffness: 0.1, damping: 0.4 });

    // State for flipping animation
    let prevDays = 0;
    let prevHours = 0;
    let prevMinutes = 0;
    let prevSeconds = 0;

    let interval;
    let visible = false;

    // Theme color maps
    const themeColors = {
        blue: {
            text: "text-blue-400",
            border: "border-blue-500/50",
            bg: "bg-blue-500/10",
            glow: "shadow-blue-500/20"
        },
        purple: {
            text: "text-purple-400",
            border: "border-purple-500/50",
            bg: "bg-purple-500/10",
            glow: "shadow-purple-500/20"
        },
        green: {
            text: "text-green-400",
            border: "border-green-500/50",
            bg: "bg-green-500/10",
            glow: "shadow-green-500/20"
        }
    };

    // Get current theme
    $: colors = themeColors[theme] || themeColors.blue;

    function updateCountdown() {
        const now = new Date();
        const diff = launchDate - now;

        if (diff <= 0) {
            // Handle launch time reached
            clearInterval(interval);
            $days = 0;
            $hours = 0;
            $minutes = 0;
            $seconds = 0;
            return;
        }

        // Store previous values
        prevDays = Math.floor($days);
        prevHours = Math.floor($hours);
        prevMinutes = Math.floor($minutes);
        prevSeconds = Math.floor($seconds);

        // Calculate new values
        const newDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const newHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const newMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const newSeconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update spring values
        days.set(newDays);
        hours.set(newHours);
        minutes.set(newMinutes);
        seconds.set(newSeconds);
    }

    onMount(() => {
        // Initial update
        updateCountdown();

        // Update every second
        interval = setInterval(updateCountdown, 1000);

        // Animate entrance
        setTimeout(() => {
            visible = true;
        }, 100);

        return () => {
            clearInterval(interval);
        };
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });

    // Helper to determine if a unit has changed
    $: daysChanged = Math.floor(prevDays) !== Math.floor($days);
    $: hoursChanged = Math.floor(prevHours) !== Math.floor($hours);
    $: minutesChanged = Math.floor(prevMinutes) !== Math.floor($minutes);
    $: secondsChanged = Math.floor(prevSeconds) !== Math.floor($seconds);
</script>

<div class="countdown-container transition-all duration-1000 transform {visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}" aria-label="Countdown timer">
    <div class="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl border {colors.border} shadow-lg {colors.glow}">
        <p class="{colors.text} text-center mb-4 font-semibold text-lg">{title}</p>

        <div class="flex flex-wrap justify-center gap-4 md:gap-8">
            <!-- Days -->
            <div class="unit-container">
                <div class="flip-card {daysChanged ? 'flip' : ''}">
                    <div class="digit relative">
                        <span class="absolute inset-0 flex items-center justify-center">{Math.floor($days)}</span>
                    </div>
                </div>
                <span class="unit-label {colors.text}">DAYS</span>
            </div>

            <!-- Hours -->
            <div class="unit-container">
                <div class="flip-card {hoursChanged ? 'flip' : ''}">
                    <div class="digit relative">
                        <span class="absolute inset-0 flex items-center justify-center">{Math.floor($hours).toString().padStart(2, '0')}</span>
                    </div>
                </div>
                <span class="unit-label {colors.text}">HOURS</span>
            </div>

            <!-- Minutes -->
            <div class="unit-container">
                <div class="flip-card {minutesChanged ? 'flip' : ''}">
                    <div class="digit relative">
                        <span class="absolute inset-0 flex items-center justify-center">{Math.floor($minutes).toString().padStart(2, '0')}</span>
                    </div>
                </div>
                <span class="unit-label {colors.text}">MINUTES</span>
            </div>

            <!-- Seconds -->
            <div class="unit-container">
                <div class="flip-card {secondsChanged ? 'flip' : ''}">
                    <div class="digit relative">
                        <span class="absolute inset-0 flex items-center justify-center">{Math.floor($seconds).toString().padStart(2, '0')}</span>
                    </div>
                </div>
                <span class="unit-label {colors.text}">SECONDS</span>
            </div>
        </div>
    </div>
</div>

<style>
    .countdown-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }

    .unit-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        position: relative;
    }

    .flip-card {
        perspective: 600px;
        position: relative;
        width: 60px;
        height: 70px;
    }

    .digit {
        font-size: 2.5rem;
        font-weight: 700;
        width: 100%;
        height: 100%;
        background: rgba(30, 41, 59, 0.8);
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .unit-label {
        font-size: 0.7rem;
        font-weight: 600;
        margin-top: 0.5rem;
        letter-spacing: 1px;
    }

    /* Flip animation */
    .flip-card.flip .digit {
        animation: flip 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
    }

    @keyframes flip {
        0% {
            transform: rotateX(0);
        }
        50% {
            transform: rotateX(90deg);
        }
        100% {
            transform: rotateX(0);
        }
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .flip-card {
            width: 50px;
            height: 60px;
        }

        .digit {
            font-size: 2rem;
        }
    }
</style>