/* 桜和高校同窓会 — 画面の動き（通常は編集不要。内容の更新は data.js へ） */

const yen = (n) => n.toLocaleString("ja-JP") + "円";
const fmtDate = (d) => d.replaceAll("-", ".");
const percent = (p) => Math.min(100, Math.round((p.raised / p.goal) * 100));
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const STATUS = {
    open: { label: "支援受付中", cls: "is-open" },
    preparing: { label: "準備中", cls: "" },
    done: { label: "目標達成", cls: "is-done" }
};

/* ---------- プロジェクト ---------- */
function renderProjects() {
    const list = document.getElementById("projectList");
    list.innerHTML = PROJECTS.map((p) => {
        const st = p.sample ? { label: "企画例", cls: "" } : (STATUS[p.status] || STATUS.preparing);
        const hasGoal = p.goal && p.raised != null;
        const pct = hasGoal ? percent(p) : 0;
        const button = p.status === "open" && p.donateUrl
            ? `<a class="btn btn-accent" href="${escapeHtml(p.donateUrl)}" target="_blank" rel="noopener">この挑戦を支援する ↗</a>`
            : `<span class="btn btn-disabled btn-block" aria-disabled="true">${p.featured ? "準備中（オンライン決済 連携予定）" : "詳細準備中"}</span>`;

        return `
        <article class="project reveal ${p.featured ? "is-featured" : ""}">
            ${p.image ? `<div class="project-img"><img src="${escapeHtml(p.image)}" alt="" loading="lazy"></div>` : ""}
            <div class="project-body">
                ${p.featured ? `<p class="ribbon">ALWAYS OPEN</p>` : ""}
                <div class="project-top">
                    <span class="tag">${escapeHtml(p.category)}</span>
                    <span class="status ${st.cls}">${st.label}</span>
                </div>
                <h3>${escapeHtml(p.title)}</h3>
                <p class="project-text">${escapeHtml(p.text)}</p>
                ${p.note ? `<p class="project-note">${escapeHtml(p.note)}</p>` : ""}
                ${hasGoal ? `
                <div class="project-progress">
                    <div class="progress-row">
                        <span class="progress-pct">${pct}<small>%</small></span>
                        <span class="progress-goal">${yen(p.raised)} / 目標 ${yen(p.goal)}</span>
                    </div>
                    <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span data-width="${pct}"></span></div>
                </div>` : ""}
                <div class="project-cta">${button}</div>
            </div>
        </article>`;
    }).join("");
}

/* ヒーローの浮きカード：受付中プロジェクトの先頭を表示 */
function renderHeroStat() {
    const p = PROJECTS.find((x) => x.status === "open" && x.goal && !x.sample);
    if (!p) return;
    const card = document.getElementById("heroStat");
    const pct = percent(p);
    card.querySelector(".float-label").textContent = p.category;
    card.querySelector(".float-title").textContent = p.title;
    card.querySelector(".progress span").dataset.width = pct;
    card.querySelector(".float-meta").innerHTML = `<b>${pct}%</b> 達成 ・ 目標 ${yen(p.goal)}`;
    card.hidden = false;
}


/* ---------- 桜和Boost：活動支援 ---------- */
const ICONS = {
    mic: "<path d=\"M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z\"/><path d=\"M19 11a7 7 0 0 1-14 0M12 18v3\"/>",
    chat: "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/><path d=\"M8 9h8M8 13h5\"/>",
    flag: "<path d=\"M4 21V4M4 4h12l-2 4 2 4H4\"/>",
    bulb: "<path d=\"M9 18h6M10 21h4\"/><path d=\"M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z\"/>"
};

function renderActivities() {
    const list = document.getElementById("activityList");
    if (!list || typeof ACTIVITY_SUPPORT === "undefined") return;
    list.innerHTML = ACTIVITY_SUPPORT.menu.map((a) => `
        <article class="activity reveal">
            <span class="activity-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[a.icon] || ICONS.bulb}</svg></span>
            <h4>${escapeHtml(a.title)}</h4>
            <p>${escapeHtml(a.text)}</p>
            <span class="activity-format">${escapeHtml(a.format)}</span>
        </article>`).join("");
    const url = ACTIVITY_SUPPORT.formUrl;
    document.getElementById("activityCta").innerHTML = url
        ? `<a class="btn btn-primary" href="${escapeHtml(url)}" target="_blank" rel="noopener">活動支援に申し込む ↗</a>
           <p class="activity-note">公式LINEのメニュー「桜和生を支援する」からも申し込めます。</p>`
        : `<span class="btn btn-disabled" aria-disabled="true">申し込み受付準備中</span>`;
}

/* ---------- お知らせ ---------- */
function renderNews() {
    const list = document.getElementById("newsList");
    const items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
    list.innerHTML = items.map((n, i) => `
        <li class="news-item ${n.locked ? "is-locked" : ""}">
            <button class="news-link" type="button" data-index="${i}" ${n.locked ? 'disabled aria-label="近日公開"' : ""}>
                <time class="news-date" datetime="${n.date}">${fmtDate(n.date)}</time>
                <span class="tag">${n.locked ? "近日公開" : escapeHtml(n.tag)}</span>
                <span class="news-title">${escapeHtml(n.title)}</span>
                <span class="news-arrow" aria-hidden="true">${n.locked ? "" : "→"}</span>
            </button>
        </li>`).join("");

    const dialog = document.getElementById("newsDialog");
    list.addEventListener("click", (e) => {
        const btn = e.target.closest(".news-link");
        if (!btn || btn.disabled) return;
        const n = items[btn.dataset.index];
        document.getElementById("dialogDate").textContent = fmtDate(n.date);
        document.getElementById("dialogTag").textContent = n.tag;
        document.getElementById("dialogTitle").textContent = n.title;
        document.getElementById("dialogContent").innerHTML = (n.body || []).map((t) => `<p>${escapeHtml(t)}</p>`).join("")
            + (n.link ? `<p><a class="btn btn-accent dialog-link" href="${escapeHtml(n.link.url)}" target="_blank" rel="noopener">${escapeHtml(n.link.label)} ↗</a></p>` : "");
        dialog.showModal();
    });
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog || e.target.closest("[data-close]")) dialog.close();
    });
}

/* ---------- ナビ ---------- */
function setupNav() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", open);
        toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
        nav.classList.toggle("is-open", open);
    });
    nav.addEventListener("click", (e) => {
        if (e.target.closest("a")) { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
    });
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

/* ---------- スクロールで表示 & 進捗バーのアニメーション ---------- */
function setupReveal() {
    document.querySelectorAll(".pillar, .step, .join-card, .news-list, .faq").forEach((el) => el.classList.add("reveal"));
    const fill = (root) => root.querySelectorAll(".progress span[data-width]").forEach((s) => (s.style.width = s.dataset.width + "%"));

    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
        fill(document);
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add("is-visible");
            fill(en.target);
            io.unobserve(en.target);
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    setTimeout(() => fill(document.querySelector(".hero")), 400);
}

renderProjects();
renderActivities();
renderHeroStat();
renderNews();
setupNav();
setupReveal();
