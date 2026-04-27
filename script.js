document.addEventListener("DOMContentLoaded", () => { 
 
  const $ = (sel) => document.querySelector(sel); 
  const $$ = (sel) => document.querySelectorAll(sel); 
 
  const prefersReducedMotion = 
    typeof window.matchMedia === "function" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches; 
 
  const splash = $("#splash"); 
  if (splash) { 
    setTimeout(() => splash.classList.add("hidden"), 1500); 
  } 
 
  const hamburger = $("#hamburger"); 
  const sideMenu = $("#sideMenu"); 
  const overlay = $("#overlay"); 
 
  function closeMenu() { 
    if (!sideMenu || !overlay) return; 
    sideMenu.classList.remove("active"); 
    overlay.style.display = "none"; 
    document.body.style.overflow = ""; 
  } 
 
  if (hamburger && sideMenu && overlay) { 
    hamburger.addEventListener("click", () => { 
      const isOpen = sideMenu.classList.toggle("active"); 
      overlay.style.display = isOpen ? "block" : "none"; 
      document.body.style.overflow = isOpen ? "hidden" : ""; 
    }); 
 
    overlay.addEventListener("click", closeMenu); 
 
    $$("#sideMenu a").forEach(link => { 
      link.addEventListener("click", closeMenu); 
    }); 
  } 
 
  const navbar = $("#navbar"); 
 
  if (navbar) { 
    window.addEventListener("scroll", throttle(() => { 
      navbar.classList.toggle("scrolled", window.scrollY > 50); 
    }, 100)); 
  } 
 
  $$("[data-scroll]").forEach(btn => { 
    btn.addEventListener("click", () => { 
      const target = $("#" + btn.dataset.scroll); 
      if (target) { 
        target.scrollIntoView({ 
          behavior: prefersReducedMotion ? "auto" : "smooth" 
        }); 
      } 
    }); 
  }); 
 
  const slides = $$(".slide"); 
  const next = $(".next"); 
  const prev = $(".prev"); 
  const slider = $("#slider"); 
 
  let current = 0; 
  let interval = null; 
 
  let dots = $$(".dot"); 
 
  if (slider && slides.length && dots.length === 0) { 
    const dotsContainer = document.createElement("div"); 
    dotsContainer.className = "dots"; 
 
    slides.forEach((_, i) => { 
      const dot = document.createElement("span"); 
      dot.className = "dot"; 
      if (i === 0) dot.classList.add("active"); 
 
      dot.addEventListener("click", () => { 
        current = i; 
        showSlide(current); 
        restartSlider(); 
      }); 
 
      dotsContainer.appendChild(dot); 
    }); 
 
    slider.appendChild(dotsContainer); 
    dots = $$(".dot"); 
  } 
 
  function showSlide(index) { 
    slides.forEach(s => s.classList.remove("active")); 
    dots.forEach(d => d.classList.remove("active")); 
 
    slides[index]?.classList.add("active"); 
    dots[index]?.classList.add("active"); 
  } 
 
  function moveSlide(step) { 
    current = (current + step + slides.length) % slides.length; 
    showSlide(current); 
  } 
 
  function startSlider() { 
    if (!slides.length || prefersReducedMotion) return; 
    stopSlider(); 
    interval = setInterval(() => moveSlide(1), 5000); 
  } 
 
  function stopSlider() { 
    if (interval) { 
      clearInterval(interval); 
      interval = null; 
    } 
  } 
 
  function restartSlider() { 
    stopSlider(); 
    startSlider(); 
  } 
 
  if (slides.length) { 
    startSlider(); 
 
    next?.addEventListener("click", () => { 
      moveSlide(1); 
      restartSlider(); 
    }); 
 
    prev?.addEventListener("click", () => { 
      moveSlide(-1); 
      restartSlider(); 
    }); 
 
    if (slider) { 
      slider.addEventListener("mouseenter", stopSlider); 
      slider.addEventListener("mouseleave", startSlider); 
    } 
 
    document.addEventListener("keydown", e => { 
      if (e.key === "ArrowRight") moveSlide(1); 
      if (e.key === "ArrowLeft") moveSlide(-1); 
    }); 
 
    document.addEventListener("visibilitychange", () => { 
      document.hidden ? stopSlider() : startSlider(); 
    }); 
  } 
 
  const brandCards = $$(".brand-card"); 
 
  if (brandCards.length) { 
    brandCards.forEach(card => { 
      card.addEventListener("click", () => { 
        brandCards.forEach(c => c.classList.remove("active")); 
        card.classList.add("active"); 
      }); 
    }); 
  } 
 
  $$(".filter-btn").forEach(btn => { 
    btn.addEventListener("click", () => { 
 
      $$(".filter-btn").forEach(b => b.classList.remove("active")); 
      btn.classList.add("active"); 
 
      const brand = btn.dataset.filter; 
 
      $$(".car-card").forEach(car => { 
        const match = brand === "all" || car.dataset.brand === brand; 
        car.style.display = match ? "block" : "none"; 
      }); 
 
    }); 
  }); 
 
  const modal = $("#carModal"); 
  const closeBtn = $(".close"); 
 
  if (modal) { 
 
    $$(".car-card").forEach(card => { 
      card.addEventListener("click", () => { 
 
        const titleEl = $("#carTitle"); 
        const priceEl = $("#carPrice"); 
 
        if (titleEl && priceEl) { 
          titleEl.innerText = card.querySelector("h3")?.innerText || ""; 
          priceEl.innerText = card.querySelector("p")?.innerText || ""; 
        } 
 
        modal.classList.add("show"); 
        document.body.style.overflow = "hidden"; 
      }); 
    }); 
 
    function closeModal() { 
      modal.classList.remove("show"); 
      document.body.style.overflow = ""; 
    } 
 
    closeBtn?.addEventListener("click", closeModal); 
 
    modal.addEventListener("click", e => { 
      if (e.target === modal) closeModal(); 
    }); 
 
    document.addEventListener("keydown", e => { 
      if (e.key === "Escape") closeModal(); 
    }); 
  } 
 
  const form = $("#contactForm"); 
 
  if (form) { 
    form.addEventListener("submit", e => { 
      e.preventDefault(); 
 
      const name = $("#name")?.value.trim(); 
      const email = $("#email")?.value.trim(); 
      const phone = $("#phone")?.value.trim(); 
 
      if (!name || !email || !phone) { 
        alert("Please fill all fields"); 
        return; 
      } 
 
      alert("Booking request sent!"); 
      form.reset(); 
    }); 
  } 
 
  const reveals = $$(".reveal"); 
 
  function reveal() { 
    reveals.forEach(el => { 
      if (el.getBoundingClientRect().top < window.innerHeight - 100) { 
        el.classList.add("active"); 
      } 
    }); 
  } 
 
  window.addEventListener("scroll", throttle(reveal, 100)); 
  reveal(); 
 
}); 
 
function throttle(fn, wait) { 
let last = 0; 
return function () { 
const now = Date.now(); 
if (now - last >= wait) { 
fn(); 
last = now; 
} 
}; 
} 