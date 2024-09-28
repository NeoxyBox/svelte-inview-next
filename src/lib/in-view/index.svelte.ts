export const INVIEW_PREFIX = 'prousInView';

type InViewState = IntersectionObserverEntry;

type InViewStates = {
	[key: string]: InViewState;
};

type InViewOptions = {
	id: string;
	root?: HTMLElement;
	rootMargin?: string;
	threshold?: number | number[];
	once?: boolean;
	observerAction?: (entry: IntersectionObserverEntry) => unknown;
};

export const inViewStates = $state<InViewStates>({});

export function inView(
	node: HTMLElement,
	{ id, root, rootMargin, threshold, once = false, observerAction }: InViewOptions
) {
	const contextName = getPrefixedId(id);

	if (IntersectionObserver && node) {
		const observer = new IntersectionObserver(
			(entries, _observer) => {
				const entry = entries[0];
				inViewStates[contextName] = entry;

				if (observerAction) {
					observerAction(entry);
				}

				if (once && entry.isIntersecting) {
					_observer.unobserve(node);
				}
			},
			{ root, rootMargin, threshold }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.unobserve(node);
				observer.disconnect();
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
	return Object.entries(inViewStates)
		.filter(([, value]) => value.isIntersecting)
		.map(([key]) => (withoutPrefix ? key.replace(INVIEW_PREFIX, '') : key));
}

export function currentInViewData() {
	return Object.entries(inViewStates)
		.filter(([, value]) => value.isIntersecting)
		.map(([, value]) => value);
}

function getPrefixedId(id: string) {
	return INVIEW_PREFIX + id;
}
