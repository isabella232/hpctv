export default {
    computed: {
        autoPlayEnabled() {
            return this.$store.state.autoplay.enabled;
        }
    },
    methods: {
        /**
         * The container for automating the app when there is no user input available.
         * @param {Array<Object>} scripts [{delay: Number, trigger: Function}] where number is the number of milliseconds to delay from the previous action, and action is a function.
         */
        async automate(scripts) {
            const vue = this;

            function delay(ms) {
                return new Promise((resolve) => {
                    const timer = setTimeout(() => {
                        resolve();
                    }, ms);
                    // keep track of the timers so we can clear them later.
                    vue.$store.commit('pushTimer', timer);
                });
            }
            for (const action of scripts) {
                await delay(action.delay);
                action.trigger();
            }
        },

        /**
         * Responsible for handling the click gestures on each page to enable or disable autoplay functionality.
         */
        handleAutoplayGesture() {
            this.$store.commit('changeClicks', '++');
        },

        /**
         * Override this method in each component to script the automated tasks.
         *
         */
        beginAutoplay() {
            // override this method.
        }
    },

    watch: {
        autoPlayEnabled(newVal) {
            if (newVal) {
                document.getElementsByTagName('body')[0].classList.add('autoplay');
                this.beginAutoplay();
            } else {
                // invalidate all timers
                this.$store.commit('clearTimers');
                document.getElementsByTagName('body')[0].classList.remove('autoplay');
            }
        }
    },

    mounted(){
        if (this.autoPlayEnabled) {
            this.beginAutoplay();
        }
    }
}