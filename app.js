// Fills the pages from details.js. You shouldn't need to edit this file —
// change details.js instead. It runs on both index.html and our-story.html;
// each block only runs if the page has the matching element.
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
  document.title = document.body.dataset.page === "story"
    ? `Our Story · ${one} & ${two}`
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

  // ---- Our Story: text ----
  const S = W.story || {};
  fill("[data-story-text]", (S.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join(""));

  // ---- Our Story: slideshow ----
  const show = $("[data-slideshow]");
  const photos = S.photos || [];
  if (show && photos.length) {
    const ms = Math.max(1, S.secondsPerPhoto || 3) * 1000;
    show.style.setProperty("--ss-ms", ms + "ms");
    const stage = show.querySelector("[data-slides]");
    stage.innerHTML = photos
      .map((_, i) => `<figure class="slide" aria-hidden="true"><div class="slide-bg"></div><img alt="Photo ${i + 1} of ${photos.length}"></figure>`)
      .join("");
    const slides = [...stage.children];
    const progress = show.querySelector("[data-ss-progress]");
    let cur = -1;
    let timer = null;

    // Only load a photo when it's about to be shown (keeps the page fast on phones)
    const load = (i) => {
      const s = slides[i];
      if (s.dataset.loaded) return;
      s.dataset.loaded = "1";
      s.querySelector("img").src = photos[i];
      s.querySelector(".slide-bg").style.backgroundImage = `url("${photos[i]}")`;
    };
    const go = (i) => {
      i = (i + photos.length) % photos.length; // wraps around to the start after the last photo
      load(i);
      load((i + 1) % photos.length);
      if (cur >= 0) {
        slides[cur].classList.remove("is-active");
        slides[cur].setAttribute("aria-hidden", "true");
      }
      slides[i].classList.add("is-active");
      slides[i].removeAttribute("aria-hidden");
      cur = i;
      // restart the thin progress line along the bottom
      progress.classList.remove("run");
      void progress.offsetWidth;
      progress.classList.add("run");
    };
    const start = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), ms); };

    // don't keep flipping while the tab is in the background
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearInterval(timer);
      else { go(cur + 1); start(); }
    });

    go(0);
    start();
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
