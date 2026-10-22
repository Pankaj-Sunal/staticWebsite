document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- Fill contact details from config ----------
  const waLink = (text) =>
    `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(text)}`;

  $$("[data-site-name]").forEach((el) => (el.textContent = cfg.name));
  $$("[data-phone-link]").forEach((el) => (el.href = `tel:${cfg.phoneTel}`));
  $$("[data-phone-text]").forEach((el) => (el.textContent = cfg.phoneDisplay));
  $$("[data-email-link]").forEach((el) => (el.href = `mailto:${cfg.email}`));
  $$("[data-email-text]").forEach((el) => (el.textContent = cfg.email));
  $$("[data-whatsapp-link]").forEach((el) => (el.href = waLink(cfg.whatsappDefaultMessage)));
  $$("[data-address]").forEach((el) => (el.textContent = cfg.address));
  $$("[data-map]").forEach((el) => (el.src = cfg.mapEmbedUrl));
  $("#year").textContent = new Date().getFullYear();

  // ---------- Header: solid background after scrolling ----------
  const header = $("#site-header");
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("bg-brand-900/95", scrolled);
    header.classList.toggle("shadow-lg", scrolled);
    header.classList.toggle("backdrop-blur", scrolled);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Mobile menu ----------
  const menuBtn = $("#menu-btn");
  const mobileMenu = $("#mobile-menu");
  const setMenu = (open) => {
    mobileMenu.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));
  };
  menuBtn.addEventListener("click", () => setMenu(mobileMenu.classList.contains("hidden")));
  $$("a", mobileMenu).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  // ---------- Gallery ----------
  const grid = $("#gallery-grid");
  let visible = cfg.gallery;

  const renderGallery = (filter) => {
    visible = filter === "all" ? cfg.gallery : cfg.gallery.filter((p) => p.category === filter);
    grid.innerHTML = "";
    visible.forEach((photo, i) => {
      const btn = document.createElement("button");
      btn.className =
        "group relative aspect-square overflow-hidden rounded-xl bg-stone-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500";
      btn.setAttribute("aria-label", `View photo: ${photo.alt}`);
      btn.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}" loading="lazy"
             class="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <span class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 sm:text-sm">${photo.alt}</span>`;
      btn.addEventListener("click", () => openLightbox(i));
      grid.appendChild(btn);
    });

    $$(".filter-btn").forEach((b) => {
      const active = b.dataset.filter === filter;
      b.classList.toggle("bg-brand-700", active);
      b.classList.toggle("text-white", active);
      b.classList.toggle("bg-white", !active);
      b.classList.toggle("text-stone-700", !active);
      b.classList.toggle("border", !active);
      b.classList.toggle("border-stone-300", !active);
    });
  };

  $$(".filter-btn").forEach((b) => b.addEventListener("click", () => renderGallery(b.dataset.filter)));
  renderGallery("all");

  // ---------- Lightbox ----------
  const lb = $("#lightbox");
  const lbImg = $("#lb-img");
  const lbCaption = $("#lb-caption");
  let current = 0;

  const show = (i) => {
    current = (i + visible.length) % visible.length;
    lbImg.src = visible[current].src;
    lbImg.alt = visible[current].alt;
    lbCaption.textContent = `${visible[current].alt}  (${current + 1} / ${visible.length})`;
  };
  const openLightbox = (i) => {
    show(i);
    lb.classList.remove("hidden");
    lb.classList.add("flex");
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    lb.classList.add("hidden");
    lb.classList.remove("flex");
    document.body.style.overflow = "";
  };

  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", () => show(current - 1));
  $("#lb-next").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => e.target === lb && closeLightbox());
  document.addEventListener("keydown", (e) => {
    if (lb.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Swipe left/right on touch devices
  let touchX = null;
  lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  // ---------- Enquiry form -> WhatsApp / Email ----------
  const form = $("#enquiry-form");
  const errorEl = $("#form-error");
  const today = new Date().toISOString().split("T")[0];
  form.checkin.min = today;
  form.checkout.min = today;
  form.checkin.addEventListener("change", () => (form.checkout.min = form.checkin.value || today));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));

    let error = "";
    if (!d.name.trim()) error = "Please enter your name.";
    else if (!d.checkin || !d.checkout) error = "Please choose check-in and check-out dates.";
    else if (d.checkout <= d.checkin) error = "Check-out must be after check-in.";
    else if (!d.guests || Number(d.guests) < 1) error = "Please enter the number of guests.";
    errorEl.textContent = error;
    errorEl.classList.toggle("hidden", !error);
    if (error) return;

    const text =
      `Hi, I'd like to enquire about a stay at ${cfg.name}.\n\n` +
      `Name: ${d.name}\n` +
      `Check-in: ${d.checkin}\n` +
      `Check-out: ${d.checkout}\n` +
      `Guests: ${d.guests}\n` +
      `Occasion: ${d.occasion}` +
      (d.message.trim() ? `\nMessage: ${d.message.trim()}` : "");

    if (e.submitter?.dataset.channel === "email") {
      const subject = `Stay enquiry: ${d.checkin} to ${d.checkout} (${d.guests} guests)`;
      window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(waLink(text), "_blank", "noopener");
    }
  });
});
