document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("[data-header]");
    const menu = document.querySelector("[data-menu]");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setMenu = (open) => {
        if (!menu || !menuToggle) return;
        menu.classList.toggle("is-open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    };

    menuToggle?.addEventListener("click", () => {
        setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenu(false);
    });

    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;

                navLinks.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${visible.target.id}`;
                    link.classList.toggle("is-active", isActive);
                    if (isActive) link.setAttribute("aria-current", "location");
                    else link.removeAttribute("aria-current");
                });
            },
            { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.55] },
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    const revealElements = document.querySelectorAll(".reveal");

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: "0px 0px -8%", threshold: 0.12 },
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    const year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
});
