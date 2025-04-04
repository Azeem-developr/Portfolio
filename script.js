const lenis = new Lenis({
  wrapper: document.querySelector("main"),
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

function typeWriter(selector) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const phrases = ["Freelancer", "Web developer", "Web designer", "Programmer"];
  const el = document.querySelector(selector);

  let sleepTime = 100;

  let curPhraseIndex = 0;

  const writeLoop = async () => {
    while (true) {
      let curWord = phrases[curPhraseIndex];

      for (let i = 0; i < curWord.length; i++) {
        el.innerText = curWord.substring(0, i + 1);
        await sleep(sleepTime);
      }

      await sleep(sleepTime * 10);

      for (let i = curWord.length; i > 0; i--) {
        el.innerText = curWord.substring(0, i - 1);
        await sleep(sleepTime);
      }

      await sleep(sleepTime * 5);

      if (curPhraseIndex === phrases.length - 1) {
        curPhraseIndex = 0;
      } else {
        curPhraseIndex++;
      }
    }
  };
  writeLoop();
}
typeWriter(".prfsn span");

function showToast(txt) {
  let toast = document.createElement("h6");
  toast.classList.add("toast");
  toast.innerText = txt;
  document.body.prepend(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}

function cursorAnimate() {
  const cursor = document.createElement("div");
  cursor.id = "cursor";
  document.querySelector("main").prepend(cursor);
  document.querySelector("main").prepend(cursor);
  document.querySelector("main").addEventListener("mousemove", function (val) {
    gsap.to("#cursor", {
      x: val.x - 15,
      y: val.y - 15,
      opacity: 1,
      duration: 0.6,
    });
  });
}

document.querySelector("#msg-form").addEventListener("submit", sendMsg);

function sendMsg(e) {
  e.preventDefault();
  const prams = {
    name: document.querySelector("#msg-name").value,
    email: document.querySelector("#msg-eml").value,
    message: document.querySelector("#msg-msg").value,
  };
  const serviseId = "service_ugrt83u";
  const tmpltId = "template_icwltko";

  emailjs
    .send(serviseId, tmpltId, prams)
    .then((resp) => {
      document.querySelector("#msg-name").value = "";
      document.querySelector("#msg-eml").value = "";
      document.querySelector("#msg-msg").value = "";
      console.log(resp);
      showToast("Massage sent Successfully!");
    })
    .catch((err) => {
      console.error(err);
      showToast("Something went wrong!");
    });
}

function responsive() {
  if (window.innerWidth <= 768) {
    document.querySelector(".mbl-nav").style.height = "0px";
    document.querySelector("#menu").addEventListener("click", () => {
      if (document.querySelector(".mbl-nav").style.height !== "0px") {
        document.querySelector("#menu i").classList.remove("fa-xmark");
        document.querySelector("#menu i").classList.add("fa-bars");
        gsap.to(".mbl-nav", {
          height: "0px",
          opacity: 0,
          duration: 0.7,
        });
        setTimeout(() => {
          document.querySelector(".mbl-nav").style.display = "none";
        }, 700);
      } else {
        document.querySelector(".mbl-nav").style.display = "block";
        document.querySelector("#menu i").classList.remove("fa-bars");
        document.querySelector("#menu i").classList.add("fa-xmark");
        gsap.to(".mbl-nav", {
          height: "auto",
          opacity: 1,
          duration: 0.7,
        });
      }
    });

    Array.from(document.querySelectorAll(".mbl-nav>ul>li")).forEach((li) => {
      li.addEventListener("click", () => {
        document.querySelector(".mbl-nav").style.display = "none";
        document.querySelector("#menu i").classList.remove("fa-xmark");
        document.querySelector("#menu i").classList.add("fa-bars");
        gsap.to(".mbl-nav", {
          height: "0px",
          opacity: 0,
          duration: 0.7,
        });
      });
    });
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  } else {
    cursorAnimate();
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }
}
responsive();

window.addEventListener("resize", responsive);

function gsapAnimation() {
  const tl = gsap.timeline()
  tl.from("main", {
    height: "0%",
    width: "70%",
    borderRadius: "50px",
    duration: 2.5,
    ease: "power4.inOut",
    left: "15%",
    top: "50%",
  });
  tl.from("nav", {
    y: -20,
    opacity: 0,
    duration: 1,
  });
  
  tl.from("#hero-head>span", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: .15,
    ease: "back.out(4)",
  })
  tl.from(".scrl-arr-btn-con", {
    opacity: 0,
    y: -40,
    duration: 1,
  });

  document
    .querySelector(".my-pic-con>img")
    .addEventListener("mousemove", (d) => {
      gsap.to(".my-pic-con>img", {
        x: 30 - d.x * 0.05 + "px",
        y: 1 - d.y * 0.05 + "px",
        duration: 2,
      });
    });

}
gsapAnimation();
