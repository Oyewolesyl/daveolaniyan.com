const sharePanel = document.querySelector("#share-panel");
const shareTrigger = document.querySelector(".share-trigger");
const closeShare = document.querySelector(".close-share");
const copyLink = document.querySelector(".copy-link");
const nativeShare = document.querySelector(".native-share");

const cardUrl = "https://daveolaniyan.com";
const shareData = {
  title: "Dave Olaniyan",
  text: "Dave Olaniyan - design engineer, product builder, and founder.",
  url: cardUrl,
};

shareTrigger?.addEventListener("click", () => {
  if (typeof sharePanel?.showModal === "function") {
    sharePanel.showModal();
  }
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
      nativeShare.textContent = "Share";
    }, 1400);
  }
});
