document.addEventListener('DOMContentLoaded', () => {
	const nav = document.querySelector('nav > ul');
	const items = document.querySelectorAll('nav > ul li a');
	let anim = null;
	let currentActiveItem = null;

	const animate = (from, to) => {
		if (anim) clearInterval(anim);

		const start = Date.now();
		anim = setInterval(() => {
			const p = Math.min((Date.now() - start) / 500, 1);
			const e = 1 - Math.pow(1 - p, 3);

			const x = from + (to - from) * e;
			const y = -40 * (4 * e * (1 - e));
			const r = 200 * Math.sin(p * Math.PI);

			nav.style.setProperty('--translate-x', `${x}px`);
			nav.style.setProperty('--translate-y', `${y}px`);
			nav.style.setProperty('--rotate-x', `${r}deg`);

			if (p >= 1) {
				clearInterval(anim);
				anim = null;
				nav.style.setProperty('--translate-y', '0px');
				nav.style.setProperty('--rotate-x', '0deg');
			}
		}, 16);
	};

	const getCurrentPosition = () => parseFloat(nav.style.getPropertyValue('--translate-x')) || 0;

	const getItemCenter = (item) => {
		return item.getBoundingClientRect().left + item.offsetWidth / 2 - nav.getBoundingClientRect().left - 5;
	};

	const moveToItem = (item) => {
		const current = getCurrentPosition();
		const center = getItemCenter(item);
		animate(current, center);
		nav.classList.add('show-indicator');
	};

	const setActiveItem = (item) => {
		if (currentActiveItem) {
			currentActiveItem.classList.remove('active');
		}

		currentActiveItem = item;
		item.classList.add('active');
		moveToItem(item);
	};

	const handleMouseLeave = () => {
		if (currentActiveItem) {
			moveToItem(currentActiveItem);
		} else {
			nav.classList.remove('show-indicator');
			if (anim) clearInterval(anim);
		}
	};

	items.forEach(item => {
		item.addEventListener('mouseenter', () => moveToItem(item));
		item.addEventListener('mouseleave', handleMouseLeave);
		item.addEventListener('click', () => setActiveItem(item));
	});

	nav.addEventListener('mouseleave', handleMouseLeave);
	
	if (items.length > 0) {
		setTimeout(() => {
			setActiveItem(items[0]);
		}, 100);
	}

	// -- Observe sections and update active nav item on scroll -----------------
	// Map each nav link's hash to the corresponding section element (with fallbacks)
	const sectionLinkMap = new Map();

	items.forEach(item => {
		const href = item.getAttribute('href') || '';
		const hash = href.split('#')[1];
		if (!hash) return;

		// Try exact id, then common fallback variants, then any section containing the hash
		const sectionEl = document.getElementById(hash)
			|| document.getElementById(`${hash}-me`)
			|| document.querySelector(`section[id*="${hash}"]`)
			|| document.querySelector(`#${hash}`);

		if (sectionEl) sectionLinkMap.set(sectionEl, item);
	});

	if (sectionLinkMap.size > 0 && 'IntersectionObserver' in window) {
		const obs = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const item = sectionLinkMap.get(entry.target);
					if (item) setActiveItem(item);
				}
			});
		}, { root: null, rootMargin: '-35% 0px -35% 0px', threshold: 0.15 });

		sectionLinkMap.forEach((_, sectionEl) => obs.observe(sectionEl));
	}
});
