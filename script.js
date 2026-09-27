const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle?.querySelector('i');
const menuToggle = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

function setTheme(theme) {
	const isLight = theme === 'light';
	document.body.classList.toggle('light-theme', isLight);

	if (themeIcon && themeToggle) {
		themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
		themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
		themeToggle.title = `Switch to ${isLight ? 'dark' : 'light'} theme`;
	}

	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLight ? '#f5f6f3' : '#0b0d10');
}

let savedTheme = 'dark';
try {
	savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
} catch {
	// The page still works when browser storage is disabled.
}
setTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
	const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
	setTheme(nextTheme);
	try {
		localStorage.setItem('portfolio-theme', nextTheme);
	} catch {
		// Theme switching remains available for the current page session.
	}
});

function closeMenu() {
	menuToggle?.setAttribute('aria-expanded', 'false');
	menuToggle?.setAttribute('aria-label', 'Open navigation menu');
	navLinks?.classList.remove('is-open');
}

menuToggle?.addEventListener('click', () => {
	const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
	menuToggle.setAttribute('aria-expanded', String(isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
	navLinks?.classList.toggle('is-open', isOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add('is-visible'));
}

const currentYear = document.querySelector('#currentYear');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

contactForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!contactForm.reportValidity()) return;

	if (formStatus) {
		formStatus.textContent = 'Thanks for reaching out! This demo form is not connected to email yet.';
	}
	contactForm.reset();
});
