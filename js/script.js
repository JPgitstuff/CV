document.addEventListener("DOMContentLoaded", () => {

  const MIN_WIDTH_FOR_SCRAMBLE = 450;
  const isWideEnough = window.innerWidth >= MIN_WIDTH_FOR_SCRAMBLE;

  // SPLITS THE SKILLS INTO SPANS WITH OPTIONAL SCRAMBLE
  document.querySelectorAll(".scramble-list").forEach(el => {
    const items = el.getAttribute("data-items").split(",");
    el.innerHTML = items
      .map((skill, index) => {
        const trimmed = skill.trim();
        const comma = (index < items.length - 1) ? ' , ' : ' ';
        return isWideEnough
          ? `<span class="scrambledSentence" data-scramble="${trimmed}"></span>${comma}`
          : `<span>${trimmed}</span>${comma}`;
      })
      .join("");
  });

  // Utility to generate random characters
  function getRandomChar() {
    const chars = "QWERTYUIOPASDFGHJKLZXCVBNM---____";
    return chars[Math.floor(Math.random() * chars.length)];
  }

  // Scramble function (only used if screen is wide enough)
  function scrambleText(element, text, callback, delay = 40) {
    let scrambledArray = Array.from({ length: text.length }, () => getRandomChar());
    let currentIndex = 0;
    element.textContent = scrambledArray.join("");

    const interval = setInterval(() => {
      scrambledArray[currentIndex] = text[currentIndex];
      element.textContent = scrambledArray.join("");

      if (currentIndex === text.length - 1) {
        clearInterval(interval);
        if (callback) callback();
      } else {
        currentIndex++;
      }
    }, delay);
  }

  // Scramble NAME on load if wide enough
  const nameElement = document.querySelector("#hero .scrambledSentence[data-scramble]");
  if (isWideEnough && nameElement) {
    scrambleText(nameElement, nameElement.getAttribute("data-scramble"));
  }

  // ROTATING ROLES with scramble (if screen is wide enough)
  const roles = ["Software Engineering Student", "Web Developer", "IoT Enthusiast"];
  let currentRoleIndex = 0;
  const rolesElement = document.getElementById("roles");

  function scrambleAndShowRole(text, callback) {
    if (!isWideEnough) {
      rolesElement.textContent = text;
      if (callback) callback();
      return;
    }

    let scrambledArray = Array.from({ length: text.length }, () => getRandomChar());
    let localIndex = 0;
    rolesElement.textContent = scrambledArray.join("");

    const interval = setInterval(() => {
      scrambledArray[localIndex] = text[localIndex];
      rolesElement.textContent = scrambledArray.join("");

      if (localIndex === text.length - 1) {
        clearInterval(interval);
        if (callback) callback();
      } else {
        localIndex++;
      }
    }, 60);
  }

  function rotateRoles() {
    scrambleAndShowRole(roles[currentRoleIndex], () => {
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      setTimeout(rotateRoles, 2000);
    });
  }

  rotateRoles();

  // Scramble SKILLS when visible (if wide enough)
  const skillsSection = document.querySelector("#skills");
  let skillsScrambled = false;

  function scrambleSkills() {
    if (!isWideEnough) return;
    const skillSpans = skillsSection.querySelectorAll(".scrambledSentence[data-scramble]");
    skillSpans.forEach(span => {
      scrambleText(span, span.getAttribute("data-scramble"), null, 80);
    });
  }

  // Intersection Observer to detect when #skills is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsScrambled) {
        skillsScrambled = true;
        scrambleSkills();
        observer.disconnect(); // Stop observing once scrambled
      }
    });
  }, { threshold: 0.7 });

  if (skillsSection && isWideEnough) {
    observer.observe(skillsSection);
  }
});





function openNav() {
  const sidenav = document.getElementById("Sidenav");
  const menuIcon = document.querySelector(".menu-icon");

  // Responsive width logic
  const screenWidth = window.innerWidth;
  let navWidth;

  if (screenWidth < 600) {
    navWidth = "60%";  //Small Screens 
  } else if (screenWidth < 900) {
    navWidth = "30%";   //Mid screens
  } else {
    navWidth = "15%"; //large screens
  }

  sidenav.style.width = navWidth;
  menuIcon.style.display = "none";
}

function closeNav() {
  document.getElementById("Sidenav").style.width = "0%";
  
  const menuIcon = document.querySelector(".menu-icon");
  menuIcon.style.display = "flex";
  menuIcon.style.width = ""; // Reset width to original
}

document.addEventListener("click", function (event) {
  const sidenav = document.getElementById("Sidenav");
  const menuIcon = document.querySelector(".menu-icon");

  if (
    sidenav.style.width !== "0%" &&
    !sidenav.contains(event.target) &&
    !menuIcon.contains(event.target)
  ) {
    closeNav();
  }
});

//Scroll remover
setTimeout(() => {
  const scrollHint = document.getElementById("scrollHint");
  if (scrollHint) {
    scrollHint.style.opacity = "0";
    setTimeout(() => scrollHint.style.display = "none", 500);
  }
}, 3000);


window.addEventListener("scroll", () => {
  const hero = document.getElementById("hero");
  let scrollY = window.scrollY;

  // Fade and slightly move hero
  let opacity = Math.max(0, 1 - scrollY / 300);
  hero.style.opacity = opacity;
  hero.style.transform = `translateY(${scrollY * 0.2}px)`; // slight move down
});
const scrollHint = document.getElementById("scrollHint");
window.addEventListener("scroll", () => {
  scrollHint.style.opacity = Math.max(0, 1 - window.scrollY / 150);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').substring(1); // remove '#'
      ScrollToSection(e, id);
    });
  });
});

function ScrollToSection(event, sectionId) {
  event.preventDefault(); // prevent default anchor jump
   

  //Specific scroll for hero
  if (sectionId === 'hero') {
    closeNav();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  const section = document.getElementById(sectionId);
  if (!section) return;

  const offset = window.innerHeight * 0.15; ///for offset padding so items display corectly when scrolling

  const y = section.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
}


