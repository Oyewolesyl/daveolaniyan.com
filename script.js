const sharePanel = document.querySelector("#share-panel");
const shareTriggers = document.querySelectorAll("[data-share-open]");
const closeShare = document.querySelector(".close-share");
const copyLink = document.querySelector(".copy-link");
const nativeShare = document.querySelector(".native-share");
const industryLinks = document.querySelectorAll("[data-industry-link]");
const industryPanels = document.querySelectorAll("[data-industry-panel]");
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

const cardUrl = "https://daveolaniyan.com";
const shareData = {
  title: "Dave Olaniyan",
  text: "Dave Olaniyan - design engineer, product builder, and founder.",
  url: cardUrl,
};

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  if (themeToggle) themeToggle.textContent = isDark ? "Light" : "Dark";
  themeColor?.setAttribute("content", isDark ? "#0f0f0d" : "#10100e");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    // Storage can be blocked in private or embedded browsers; theme still applies.
  }
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch {
  savedTheme = null;
}
setTheme(savedTheme || "light");

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  setTheme(current === "dark" ? "light" : "dark");
});

shareTriggers.forEach((shareTrigger) => {
  shareTrigger.addEventListener("click", () => {
    if (typeof sharePanel?.showModal === "function") {
      sharePanel.showModal();
    }
  });
});

closeShare?.addEventListener("click", () => sharePanel?.close());

sharePanel?.addEventListener("click", (event) => {
  if (event.target === sharePanel) sharePanel.close();
});

copyLink?.addEventListener("click", async () => {
  await navigator.clipboard?.writeText(cardUrl);
  copyLink.textContent = "Copied";
  window.setTimeout(() => {
    copyLink.textContent = "Copy link";
  }, 1400);
});

nativeShare?.addEventListener("click", async () => {
  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    await navigator.clipboard?.writeText(cardUrl);
    nativeShare.textContent = "Link copied";
    window.setTimeout(() => {
      nativeShare.textContent = "Send link";
    }, 1400);
  }
});

function showIndustry(id, shouldScroll = true) {
  industryPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.industryPanel === id);
  });
  industryLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.industryLink === id);
  });
  if (shouldScroll) {
    document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

industryLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.dataset.industryLink;
    if (!id) return;
    event.preventDefault();
    showIndustry(id);
    history.replaceState(null, "", `#${id}`);
  });
});

const initialIndustry = window.location.hash.replace("#", "");
if (document.querySelector(`[data-industry-panel="${initialIndustry}"]`)) {
  showIndustry(initialIndustry, false);
}

function updateHeaderState() {
  document.body.classList.toggle("is-scrolled", window.scrollY > 80);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
