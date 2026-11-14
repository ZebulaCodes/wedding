// Fills the pages from details.js. You shouldn't need to edit this file —
// change details.js instead. Runs on both index.html and resort.html; each
// block only runs if that page has the matching element.
(function () {
  const W = window.WEDDING;
  if (!W) return;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const setText = (sel, text) => $$(sel).forEach((el) => (el.textContent = text));
  const fill = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; return el; };

  // ---- Names & date ----
  const { one, two } = W.couple;
  setText("[data-name-one]", one);
  setText("[data-name-two]", two);
  setText("[data-names-full]", `${one} & ${two}`);
  setText("[data-names-short]", `${one[0]} & ${two[0]}`);
  setText("[data-date-text]", W.dateText);
  document.title = document.body.dataset.page === "resort"
    ? `The Resort · ${one} & ${two}`
    : `${one} & ${two} · Riviera Maya 2028`;

  if (W.hashtag && $("[data-hashtag]")) {
    const h = $("[data-hashtag]");
    h.textContent = W.hashtag;
    h.hidden = false;
  }

  if (W.rsvp && W.rsvp.link && $("[data-rsvp-btn]")) {
    const b = $("[data-rsvp-btn]");
    b.href = W.rsvp.link;
    b.target = "_blank";
    b.rel = "noopener";
    b.textContent = W.rsvp.deadline ? `RSVP by ${W.rsvp.deadline}` : "RSVP";
    b.hidden = false;
  }

  // ---- Countdown ----
  if ($('[data-cd="days"]')) {
    const target = new Date(W.ceremonyStart).getTime();
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 864e5);
      diff -= days * 864e5;
      const hours = Math.floor(diff / 36e5);
      diff -= hours * 36e5;
      const mins = Math.floor(diff / 6e4);
      $('[data-cd="days"]').textContent = days.toLocaleString();
      $('[data-cd="hours"]').textContent = hours;
      $('[data-cd="mins"]').textContent = mins;
    };
    tick();
    setInterval(tick, 30000);
  }

  // ---- Updates ----
  const fmtDate = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  fill("[data-updates]", (W.updates || [])
    .map(
      (u, i) => `
      <article class="update${i === 0 ? " is-latest" : ""}">
        <time datetime="${esc(u.date)}">${esc(fmtDate(u.date))}</time>
        <h3>${esc(u.title)}${i === 0 ? ' <span class="tag tag-new">New</span>' : ""}</h3>
        <p>${esc(u.text)}</p>
      </article>`
    )
    .join(""));

  // ---- Schedule ----
  fill("[data-schedule]", (W.schedule || [])
    .map(
      (d) => `
      <div class="day${d.highlight ? " is-highlight" : ""}">
        <div class="day-head">
          <span class="day-label">${esc(d.label || "")}</span>
          <h3>${esc(d.day)}</h3>
        </div>
        <ol class="events">
          ${d.events
            .map(
              (e) => `
            <li class="event">
              <div class="event-time">${esc(e.time)}</div>
              <div class="event-body">
                <h4>${esc(e.title)}${e.tentative ? ' <span class="tag">Tentative</span>' : ""}</h4>
                ${e.place ? `<p class="event-place">📍 ${esc(e.place)}</p>` : ""}
                ${e.note ? `<p class="event-note">${esc(e.note)}</p>` : ""}
              </div>
            </li>`
            )
            .join("")}
        </ol>
      </div>`
    )
    .join(""));

  // ---- Travel agent ----
  const A = W.agent;
  if (A && $("[data-agent-name]")) {
    setText("[data-agent-name]", A.name);
    setText("[data-agent-first]", A.name.split(" ")[0]);
    setText("[data-agent-company]", A.company);
    setText("[data-agent-blurb]", A.blurb);
    const subject = encodeURIComponent(`Booking for ${one} & ${two}'s wedding (April 13, 2028)`);
    const mail = `mailto:${A.email}?subject=${subject}`;
    $$("[data-agent-email], [data-agent-email-btn]").forEach((a) => (a.href = mail));
    $("[data-agent-email] span").textContent = A.email;
    $$("[data-agent-web], [data-agent-web-btn]").forEach((a) => (a.href = A.website));
    $("[data-agent-web] span").textContent = A.website.replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (A.phone) {
      const tel = "tel:" + A.phone.replace(/[^\d+]/g, "");
      $("[data-agent-phone-row]").hidden = false;
      $("[data-agent-phone]").href = tel;
      $("[data-agent-phone] span").textContent = A.phone;
      const c = $("[data-agent-call-btn]");
      c.href = tel;
      c.hidden = false;
    }
    if (A.bookBy) {
      const b = $("[data-agent-bookby]");
      b.textContent = `Please book by ${A.bookBy} to get the group rate.`;
      b.hidden = false;
    }
  }

  // ---- FAQ ----
  fill("[data-faq]", (W.faq || [])
    .map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join(""));

  // ---- Resort gallery ----
  const photos = W.resortPhotos || [];
  const creditHtml = (p) =>
    p.credit
      ? `Photo: ${p.source ? `<a href="${esc(p.source)}" target="_blank" rel="noopener">${esc(p.credit)}</a>` : esc(p.credit)}` +
        (p.license ? `, <a href="${esc(p.licenseUrl || "#")}" target="_blank" rel="noopener">${esc(p.license)}</a>` : "")
      : "";
  const gallery = fill("[data-gallery]", photos
    .map(
      (p, i) => `
      <figure class="g-item${p.wide ? " is-wide" : ""}">
        <button class="g-open" data-index="${i}" aria-label="View larger: ${esc(p.caption)}">
          <img src="${esc(p.thumb || p.src)}" alt="${esc(p.caption)}" loading="${i < 3 ? "eager" : "lazy"}">
        </button>
        <figcaption><span>${esc(p.caption)}</span>${p.credit ? `<small>${creditHtml(p)}</small>` : ""}</figcaption>
      </figure>`
    )
    .join(""));
  fill("[data-galleries]", (W.resortGalleries || [])
    .map((g) => `<a class="btn btn-outline-dark" href="${esc(g.url)}" target="_blank" rel="noopener">${esc(g.label)}</a>`)
    .join(""));

  // Lightbox
  const lb = $("[data-lightbox]");
  if (gallery && lb && photos.length) {
    const img = lb.querySelector("img");
    const cap = lb.querySelector("[data-lb-caption]");
    let cur = 0;
    let lastFocus = null;
    const show = (i) => {
      cur = (i + photos.length) % photos.length;
      const p = photos[cur];
      img.src = p.src;
      img.alt = p.caption;
      cap.innerHTML = `<span>${esc(p.caption)}</span>${p.credit ? `<small>${creditHtml(p)}</small>` : ""}<small class="lb-count">${cur + 1} / ${photos.length}</small>`;
    };
    const open = (i) => {
      lastFocus = document.activeElement;
      show(i);
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      lb.querySelector("[data-lb-close]").focus();
    };
    const close = () => {
      lb.hidden = true;
      document.body.style.overflow = "";
      img.src = "";
      if (lastFocus) lastFocus.focus();
    };
    gallery.addEventListener("click", (e) => {
      const b = e.target.closest(".g-open");
      if (b) open(+b.dataset.index);
    });
    lb.querySelector("[data-lb-close]").addEventListener("click", close);
    lb.querySelector("[data-lb-prev]").addEventListener("click", () => show(cur - 1));
    lb.querySelector("[data-lb-next]").addEventListener("click", () => show(cur + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
    // Swipe on phones
    let sx = null;
    lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  // ---- Menu (hamburger) ----
  const toggle = $(".nav-toggle");
  const menu = $(".nav-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!menu.classList.contains("open"));
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("open") && !menu.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  // Nav gets a solid background once you scroll past the top
  const nav = $(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
