// Fills the page from details.js. You shouldn't need to edit this file —
// change details.js instead.
(function () {
  const W = window.WEDDING;
  if (!W) return;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const setText = (sel, text) => $$(sel).forEach((el) => (el.textContent = text));

  // ---- Names & date ----
  const { one, two } = W.couple;
  setText("[data-name-one]", one);
  setText("[data-name-two]", two);
  setText("[data-names-full]", `${one} & ${two}`);
  setText("[data-names-short]", `${one[0]} & ${two[0]}`);
  setText("[data-date-text]", W.dateText);
  document.title = `${one} & ${two} · Riviera Maya 2028`;

  if (W.hashtag) {
    const h = $("[data-hashtag]");
    h.textContent = W.hashtag;
    h.hidden = false;
  }

  if (W.rsvp && W.rsvp.link) {
    const b = $("[data-rsvp-btn]");
    b.href = W.rsvp.link;
    b.target = "_blank";
    b.rel = "noopener";
    b.textContent = W.rsvp.deadline ? `RSVP by ${W.rsvp.deadline}` : "RSVP";
    b.hidden = false;
  }

  // ---- Countdown ----
  const target = new Date(W.ceremonyStart).getTime();
  function tick() {
    let diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 864e5);
    diff -= days * 864e5;
    const hours = Math.floor(diff / 36e5);
    diff -= hours * 36e5;
    const mins = Math.floor(diff / 6e4);
    $('[data-cd="days"]').textContent = days.toLocaleString();
    $('[data-cd="hours"]').textContent = hours;
    $('[data-cd="mins"]').textContent = mins;
  }
  tick();
  setInterval(tick, 30000);

  // ---- Updates ----
  const fmtDate = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  $("[data-updates]").innerHTML = (W.updates || [])
    .map(
      (u, i) => `
      <article class="update${i === 0 ? " is-latest" : ""}">
        <time datetime="${esc(u.date)}">${esc(fmtDate(u.date))}</time>
        <h3>${esc(u.title)}${i === 0 ? ' <span class="tag tag-new">New</span>' : ""}</h3>
        <p>${esc(u.text)}</p>
      </article>`
    )
    .join("");

  // ---- Schedule ----
  $("[data-schedule]").innerHTML = (W.schedule || [])
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
    .join("");

  // ---- Travel agent ----
  const A = W.agent;
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

  // ---- FAQ ----
  $("[data-faq]").innerHTML = (W.faq || [])
    .map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("");

  // ---- Mobile nav ----
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Nav gets a solid background once you scroll past the top
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
