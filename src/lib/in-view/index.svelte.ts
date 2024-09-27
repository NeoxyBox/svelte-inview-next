export const INVIEW_PREFIX = 'prousInView';

type InViewState = IntersectionObserverEntry;

type InViewStates = {
    [key: string]: InViewState;
};

type InViewOptions = {
    /** Unique identifier of inview data. */
    id: string;
    /** It changes intersection area and observing behaviour.
     * 
     * Must be ancestor of `node`. */
    root?: HTMLElement;
    /** Expands or narrows intersection area.
     * 
     * It can be any valid CSS margin expression like
     * `0px 40px -40px 0px` or `20%`. */
    rootMargin?: string,
    /** It can be a single number or an array of numbers.
     * 
     * In example, if the value is `0.5`, the observer waits
     * for visibility of the element passes `50%` to trigger.
     * When `treshold` is an array of numbers, the observer
     * will trigger on all treshold points. Value can be
     * between `0.0`-`1.0`. */
    threshold?: number | number[];
    /** It defines whether or not trigger for just once. */
    once?: boolean;
    /** Runs after state set. */
    observerAction?: (entry: IntersectionObserverEntry) => {}
};

export let inViewStates = $state<InViewStates>({});

export function inView(node: HTMLElement, { id, root, rootMargin, threshold, once = false, observerAction }: InViewOptions) {
    const contextName = getPrefixedId(id);

    if (IntersectionObserver && node) {
        const observer = new IntersectionObserver((entries, _observer) => {
            entries.forEach((entry) => {
                inViewStates[contextName] = entry;

                if (observerAction) {
                    observerAction(entry);
                }

                if (once && entry.isIntersecting) {
                    _observer.unobserve(node);
                }
            })
        }, { root, rootMargin, threshold });

        observer.observe(node);

        return {
            destroy() {
                observer.unobserve(node);
            }
        };
    }
}

export function isInView(id: string): boolean | undefined {
    const contextName = getPrefixedId(id);

    return inViewStates[contextName]?.isIntersecting;
}

export function inViewData(id: string): InViewState | undefined {
    const contextName = getPrefixedId(id);

    return inViewStates[contextName];
}

export function currentInViewIds(withoutPrefix: boolean = true) {
    return Object.entries(inViewStates).filter(([_, value]) => value.isIntersecting).map(([key, _]) => withoutPrefix ? key.replace(INVIEW_PREFIX, "") : key);
}

export function currentInViewData() {
    return Object.entries(inViewStates).filter(([_, value]) => value.isIntersecting).map(([_, value]) => value);
}

function getPrefixedId(id: string) {
    return INVIEW_PREFIX + id;
}
