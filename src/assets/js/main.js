(function () {
  "use strict";

  var EMAIL = "afkfence@gmail.com";
  var BASE = document.documentElement.getAttribute("data-base") || "";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMobileNav() {
    var toggle = $(".nav-toggle");
    var panel = $("#mobile-nav");
    if (!toggle || !panel) return;
    var closeBtn = $(".nav-close", panel);
    var setOpen = function (open) {
      panel.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
      if (open) { (closeBtn || panel).focus(); } else { toggle.focus(); }
    };
    toggle.addEventListener("click", function () { setOpen(!panel.classList.contains("is-open")); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
    });
    $$("a", panel).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
  }

  function initReveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  function initShowcase() {
    var root = $("[data-showcase]");
    if (!root) return;
    var tabs = $$("[role=tab]", root);
    var pics = $$(".showcase__frame picture", root);
    var title = $("[data-spec-title]", root);
    var body = $("[data-spec-body]", root);
    var index = 0;
    var timer = null;

    var select = function (i) {
      index = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, n) {
        var on = n === index;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      pics.forEach(function (p, n) { p.classList.toggle("is-active", n === index); });
      title.textContent = tabs[index].getAttribute("data-title");
      body.textContent = tabs[index].getAttribute("data-body");
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };

    tabs.forEach(function (tab, n) {
      tab.addEventListener("click", function () { stop(); select(n); });
      tab.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault(); stop();
          select(index + (e.key === "ArrowRight" ? 1 : -1));
          tabs[index].focus();
        }
      });
    });
    select(0);
    if (!reduceMotion) timer = setInterval(function () { select(index + 1); }, 4500);
  }

  function initBuildLine() {
    var lines = $$("[data-build-line]");
    if (!lines.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      lines.forEach(function (l) { l.classList.add("is-built"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-built"); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    lines.forEach(function (l) { io.observe(l); });
  }

  function initPlanner() {
    var form = $("[data-planner]");
    if (!form) return;
    var feet = $("#plan-feet", form);
    var feetOut = $("#plan-feet-out", form);
    var viz = $(".planner__viz", form);
    var out = {
      material: $("[data-out=material]", form),
      height: $("[data-out=height]", form),
      feet: $("[data-out=feet]", form),
      gates: $("[data-out=gates]", form),
      purpose: $("[data-out=purpose]", form)
    };
    var link = $("[data-planner-link]", form);
    var colors = { "Wood": "#d9a25b", "Cedar Horizontal": "#c9783e", "Vinyl": "#f2f2ee", "Aluminum": "#2a2f2a", "Chain Link": "#7d857b", "Not sure yet": "#f3a712" };

    var val = function (name) { var el = $("input[name=" + name + "]:checked", form); return el ? el.value : ""; };
    var render = function () {
      var data = {
        material: val("material"), height: val("height"),
        feet: feet.value, gates: val("gates"), purpose: val("purpose")
      };
      feetOut.textContent = data.feet + " ft";
      out.material.textContent = data.material;
      out.height.textContent = data.height;
      out.feet.textContent = "~" + data.feet + " linear ft";
      out.gates.textContent = data.gates;
      out.purpose.textContent = data.purpose;
      var count = Math.max(6, Math.min(28, Math.round(data.feet / 15)));
      var h = { "4 ft": 50, "5 ft": 65, "6 ft": 85, "8 ft": 100 }[data.height] || 80;
      var bars = "";
      for (var i = 0; i < count; i++) bars += "<b style=\"height:" + h + "%;background:" + (colors[data.material] || "#f3a712") + "\"></b>";
      viz.innerHTML = bars;
      var qs = new URLSearchParams(data).toString();
      link.href = BASE + "/contact/?" + qs + "#quote";
    };
    form.addEventListener("input", render);
    form.addEventListener("change", render);
    render();
  }

  function initTilt() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$(".tilt").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", (x * 6).toFixed(2) + "deg");
        el.style.setProperty("--rx", (-y * 6).toFixed(2) + "deg");
      });
      el.addEventListener("pointerleave", function () { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
    });
  }

  function initLightbox() {
    var dialog = $("#lightbox");
    if (!dialog || typeof dialog.showModal !== "function") return;
    var img = $("img", dialog);
    var cap = $("p", dialog);
    $$("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        img.src = btn.getAttribute("data-lightbox");
        img.alt = btn.getAttribute("data-alt") || "";
        cap.textContent = btn.getAttribute("data-caption") || "";
        dialog.showModal();
      });
    });
    $(".lightbox__close", dialog).addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  }

  function prefillQuote(form) {
    var params = new URLSearchParams(window.location.search);
    if (!params.has("material")) return;
    var mat = form.elements.service;
    if (mat) {
      var m = params.get("material");
      $$("option", mat).forEach(function (o) { if (o.value === m) mat.value = m; });
    }
    var msg = form.elements.message;
    if (msg && !msg.value) {
      msg.value = "Fence plan: " + [
        params.get("material"), params.get("height"),
        "~" + params.get("feet") + " linear ft", "Gates: " + params.get("gates"),
        "Purpose: " + params.get("purpose")
      ].filter(Boolean).join(" | ") + "\n\n";
    }
  }

  function validate(form) {
    var ok = true;
    $$("[required]", form).forEach(function (field) {
      var err = $("#" + field.id + "-err", form);
      var msg = "";
      var v = (field.value || "").trim();
      if (!v) msg = "This field is required.";
      else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Enter a valid email address.";
      else if (field.type === "tel" && v.replace(/\D/g, "").length < 10) msg = "Enter a 10-digit phone number.";
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
      if (msg && ok) { field.focus(); ok = false; }
    });
    return ok;
  }

  function mailtoFallback(form) {
    var f = form.elements;
    var body = [
      "Name: " + f.name.value, "Phone: " + f.phone.value, "Email: " + f.email.value,
      "City/ZIP: " + f.location.value, "Service: " + f.service.value, "", f.message.value
    ].join("\n");
    return "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Fence quote request - " + f.name.value) + "&body=" + encodeURIComponent(body);
  }

  function initQuoteForm() {
    var form = $("[data-quote-form]");
    if (!form) return;
    prefillQuote(form);
    if (form.elements.ts) form.elements.ts.value = String(Date.now());
    var status = $(".form-status", form);
    var btn = $("button[type=submit]", form);
    var show = function (kind, html) { status.className = "form-status is-" + kind; status.innerHTML = html; };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      if (form.elements.website && form.elements.website.value) return;
      btn.disabled = true;
      btn.textContent = "Sending...";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) { return res.json().catch(function () { return { ok: false }; }).then(function (j) { return { status: res.status, body: j }; }); })
        .then(function (r) {
          if (r.body && r.body.ok) {
            form.reset();
            window.location.href = BASE + "/thank-you/";
            return;
          }
          throw new Error((r.body && r.body.error) || "send_failed");
        })
        .catch(function () {
          show("err", "We couldn't send that automatically. <a href=\"" + mailtoFallback(form) + "\">Tap here to email it</a> or call <a href=\"tel:+12406156308\">(240) 615-6308</a>.");
        })
        .then(function () { btn.disabled = false; btn.textContent = "Send My Quote Request"; });
    });
  }

  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  initHeader();
  initMobileNav();
  initReveal();
  initShowcase();
  initBuildLine();
  initPlanner();
  initTilt();
  initLightbox();
  initQuoteForm();
  initYear();
})();
