// document.addEventListener('DOMContentLoaded', () => {

//   const buttons = document.querySelectorAll('button');

//   buttons.forEach(button => {
//     button.addEventListener('mouseover', () => {
//       button.style.opacity = '0.8';
//     });

//     button.addEventListener('mouseout', () => {
//       button.style.opacity = '1';
//     });
//   });

//   // Mobile hamburger menu toggle
//   const hamburger = document.getElementById('hamburger');
//   const navMenu = document.querySelector('.nav-menu');

//   if (hamburger && navMenu) {
//     hamburger.addEventListener('click', () => {
//       navMenu.classList.toggle('active');
//     });

//     // Close menu when a nav link is clicked
//     navMenu.querySelectorAll('a').forEach(link => {
//       link.addEventListener('click', () => {
//         navMenu.classList.remove('active');
//       });
//     });
//   }

//   console.log("SABRA Website script geladen.");

// gallery
// NOTE:
// - index.html contains: #gallery and #showMoreBtn
//

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const showMoreBtn = document.getElementById('showMoreBtn');

  if (!gallery) {
    console.warn('Gallery element #gallery not found in index.html');
    return;
  }
  if (!showMoreBtn) {
    console.warn('Button element #showMoreBtn not found in index.html');
    return;
  }

  const startIndex = 4;
  const endIndex = 50;
  const basePath = 'media/';

  const allItems = [];

  for (let i = startIndex; i <= endIndex; i++) {
    const padded = String(i).padStart(4, '0');
    const fileName = `IMG-20260716-WA${padded}.jpg`;
    const imgSrc = `${basePath}${fileName}`;

    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';

    const link = document.createElement('a');
    link.href = imgSrc;
    link.target = '_blank';

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = '';
    img.src = imgSrc;

    link.appendChild(img);
    wrapper.appendChild(link);

    gallery.appendChild(wrapper);
    allItems.push(wrapper);
  }

  // Show first N images, then reveal more per click
  const initialCount = 8;
  const step = 8;
  let shown = 0;

  function render() {
    allItems.forEach((el, idx) => {
      el.style.display = idx < shown ? 'block' : 'none';
    });

    const remaining = allItems.length - shown;
    if (remaining <= 0) {
      showMoreBtn.textContent = 'Done';
      showMoreBtn.disabled = true;
      showMoreBtn.style.cursor = 'not-allowed';
    }
  }

  shown = Math.min(initialCount, allItems.length);
  render();

  showMoreBtn.addEventListener('click', () => {
    shown = Math.min(shown + step, allItems.length);
    render();
  });
});

// Contact form

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {

  e.preventDefault();


  const naam = document.getElementById("naam").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefoon = document.getElementById("telefoon").value.trim();
  const bericht = document.getElementById("bericht").value.trim();
  const website = document.getElementById("website").value;


  // Anti bot controle
  if (website !== "") {
    return;
  }


  // Lengte controle
  if (naam.length < 2) {
    alert("Vul een geldige naam in.");
    return;
  }


  if (bericht.length < 10) {
    alert("Uw bericht is te kort.");
    return;
  }


  // Email controle
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailCheck.test(email)) {
    alert("Vul een geldig emailadres in.");
    return;
  }


  // Verboden scripts verwijderen
  const veilig = (tekst) => {
    return tekst.replace(/[<>]/g, "");
  };


  const onderwerp = "Nieuwe aanvraag Sabra website";


  const inhoud =
    `Naam: ${veilig(naam)}

Email: ${veilig(email)}

Telefoon: ${veilig(telefoon)}

Bericht:
${veilig(bericht)}`;


  const mail =
    "mailto:sabraalibrahim@gmail.com" +
    "?subject=" + encodeURIComponent(onderwerp) +
    "&body=" + encodeURIComponent(inhoud);


  window.location.href = mail;

});