document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // WhatsApp
  // =========================
  const whatsappNumber = "85246185584";

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const message =
      "你好，我想了解 Kura Mynis 終極抗糖王及香港優惠配套。";

    link.href =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    link.target = "_blank";
    link.rel = "noopener";
  });


  // =========================
  // Package / Stripe
  // =========================
  const packages = [
    {
      title: "3盒入門療程",
      price: "HK$2,280",
      image: "assets/package-3-boxes.png",
      description: "適合初次體驗及開始日常管理",
      stripe:
        "https://buy.stripe.com/test_cNi5kD26Z0iO7RpfRo8IU02"
    },
    {
      title: "買5送1 調理療程",
      price: "HK$3,800",
      image: "assets/package-6-boxes.png",
      description: "6盒配套｜適合持續調理及管理",
      stripe:
        "https://buy.stripe.com/test_cNi6oH12V3v0dbJ48G8IU01",
      popular: true
    },
    {
      title: "買7送2 完整療程",
      price: "HK$4,800",
      image: "assets/package-9-boxes.png",
      description: "9盒配套｜適合較完整的日常管理",
      stripe:
        "https://buy.stripe.com/test_6oUfZh5jbfdIdbJfRo8IU00"
    }
  ];

  const packageContainer = document.querySelector("[data-packages]");

  if (packageContainer) {
    packageContainer.innerHTML = packages
      .map(
        (item) => `
        <article class="package-card reveal ${item.popular ? "popular" : ""}">
          ${item.popular ? '<span class="package-badge">熱門推薦</span>' : ""}

          <img
            src="${item.image}"
            alt="${item.title}"
            loading="lazy"
          >

          <h3>${item.title}</h3>

          <strong class="package-price">${item.price}</strong>

          <p>${item.description}</p>

          <div class="package-actions">
            <a
              class="btn btn-primary"
              href="${item.stripe}"
              target="_blank"
              rel="noopener"
            >
              立即購買
            </a>

            <a
              class="btn btn-secondary"
              href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `你好，我想了解 ${item.title}。`
              )}"
              target="_blank"
              rel="noopener"
            >
              WhatsApp 查詢
            </a>
          </div>
        </article>
      `
      )
      .join("");
  }


  // =========================
  // Mobile Menu
  // =========================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const opened = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  // =========================
  // Reveal Animation
  // =========================
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
          classList.add("is-visible")
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }


  // =========================
  // Number Counter
  // =========================
  const counters = document.querySelectorAll("[data-count]");

  const startCounter = (element) => {
    if (element.dataset.started === "true") return;

    element.dataset.started = "true";

    const target = parseFloat(element.dataset.count);
    const suffix = element.dataset.suffix || "";

    const duration = 1200;
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const current = target * progress;

      element.textContent =
        (Number.isInteger(target)
          ? Math.round(current)
          : current.toFixed(1)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    counters.forEach((counter) =>
      counterObserver.observe(counter)
    );
  } else {
    counters.forEach(startCounter);
  }


  // =========================
  // Certification Slider
  // =========================
  const certSlider = document.querySelector("[data-cert-slider]");

  if (certSlider) {
    const track = certSlider.querySelector(".cert-track");
    const slides = certSlider.querySelectorAll(".cert-slide");
    const prev = certSlider.querySelector("[data-cert-prev]");
    const next = certSlider.querySelector("[data-cert-next]");
    const dots = certSlider.querySelectorAll("[data-cert-dot]");

    let index = 0;

    const showSlide = (newIndex) => {
      index = (newIndex + slides.length) % slides.length;

      track.style.transform =
        `translateX(-${index * 100}%)`;

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle(
          "active",
          dotIndex === index
        );
      });
    };

    prev?.addEventListener("click", () =>
      showSlide(index - 1)
    );

    next?.addEventListener("click", () =>
      showSlide(index + 1)
    );

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.certDot));
      });
    });

    showSlide(0);
  }


  // =========================
  // Testimonial Slider
  // =========================
  const proofSlider = document.querySelector(
    "[data-proof-slider]"
  );

  if (proofSlider) {
    const track = proofSlider.querySelector(".proof-track");
    const slides = proofSlider.querySelectorAll(".proof-slide");
    const prev = proofSlider.querySelector("[data-proof-prev]");
    const next = proofSlider.querySelector("[data-proof-next]");
    const dots = proofSlider.querySelectorAll("[data-proof-dot]");

    let index = 0;

    const showSlide = (newIndex) => {
      index = (newIndex + slides.length) % slides.length;

      track.style.transform =
        `translateX(-${index * 100}%)`;

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle(
          "active",
          dotIndex === index
        );
      });
    };

    prev?.addEventListener("click", () =>
      showSlide(index - 1)
    );

    next?.addEventListener("click", () =>
      showSlide(index + 1)
    );

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.proofDot));
      });
    });

    showSlide(0);
  }


  // =========================
  // YouTube Videos
  // =========================
  const videos = {
    main: "RhnIxd3F9vA",
    technology: "IwmerzDU4I4",
    testimonial: "J2mIXHlC5zk"
  };

  const videoButtons = document.querySelectorAll("[data-video]");
  const existingModal = document.querySelector("[data-video-modal]");

  // Replace original placeholder modal
  if (existingModal) {
    existingModal.outerHTML = `
      <div class="youtube-modal" data-youtube-modal aria-hidden="true">
        <div class="youtube-modal-backdrop"></div>

        <div class="youtube-modal-content">
          <button
            class="youtube-modal-close"
            type="button"
            aria-label="關閉影片"
          >
            ×
          </button>

          <div class="youtube-frame">
            <iframe
              src=""
              title="Kura Mynis Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    `;
  }

  const modal = document.querySelector("[data-youtube-modal]");

  if (modal) {
    const iframe = modal.querySelector("iframe");
    const closeButton = modal.querySelector(
      ".youtube-modal-close"
    );
    const backdrop = modal.querySelector(
      ".youtube-modal-backdrop"
    );

    const openVideo = (videoId) => {
      iframe.src =
        `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";
    };

    const closeVideo = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");

      iframe.src = "";

      document.body.style.overflow = "";
    };

    videoButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.video;

        if (videos[key]) {
          openVideo(videos[key]);
        }
      });
    });

    closeButton?.addEventListener("click", closeVideo);
    backdrop?.addEventListener("click", closeVideo);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeVideo();
      }
    });
  }

});
