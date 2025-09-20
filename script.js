// Smooth scroll for navigation links and buttons
document.querySelectorAll('.nav-link, .btn-cv, .btn-see-more, .btn-project-detail, .project-card').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.classList.contains('nav-link')) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        // } else if (link.classList.contains('project-card')) {
        //     e.preventDefault();
        //     const projectId = link.querySelector('.project-video')?.getAttribute('data-project') || link.querySelector('.project-name').textContent;
        //     alert(`Chuyển đến trang chi tiết của ${projectId}`);
        } else if (link.classList.contains('btn-see-more')) {
            e.preventDefault();
            window.location.href = 'all-projects.html'; // Chuyển đến trang tất cả dự án
        } 
        // else if (link.classList.contains('btn-project-detail')) {
        //     e.preventDefault();
        //     const projectId = link.closest('.project-card').querySelector('.project-name').textContent;
        //     window.location.href = `project-detail.html?id=${projectId}`; // Chuyển đến trang chi tiết dự án
        // } 
        // else {
        //     alert('Chức năng này chưa được triển khai!');
        // }
    });
});

// Xử lý chuyển ảnh trong image-project-review
document.querySelectorAll('.project-card').forEach(card => {
    const reviewImages = card.querySelectorAll('.review-image');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');
    let currentIndex = 0;

    if (reviewImages.length > 1) {
        reviewImages.forEach((img, index) => {
            img.style.display = index === currentIndex ? 'block' : 'none';
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + reviewImages.length) % reviewImages.length;
            updateReviewImage();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % reviewImages.length;
            updateReviewImage();
        });
    }

    function updateReviewImage() {
        reviewImages.forEach((img, index) => {
            img.style.display = index === currentIndex ? 'block' : 'none';
        });
    }
});





// project card và project pupup
const popup = document.getElementById('project-popup');
const closeBtn = popup.querySelector('.btn-close');
const titleEl = popup.querySelector('.popup-title');
const descEl = popup.querySelector('.popup-desc');
const techEl = popup.querySelector('.popup-tech');
const roleEl = popup.querySelector('.popup-role');
const videoEl = popup.querySelector('.popup-video');
const imagesEl = popup.querySelector('.popup-images');
const githubBtn = popup.querySelector('.btn-github');

                // phần project card
document.querySelectorAll('.project-card').forEach(card => {

  // Video
  const iframe = document.createElement('iframe');
  iframe.className = 'project-video';
  iframe.src = card.dataset.video;
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'autoplay; encrypted-media');
  iframe.setAttribute('allowfullscreen', true);
  card.prepend(iframe); // Cho video đứng đầu card

  // Tạo tên dự án
  let name = document.createElement('p');
  name.className = 'project-name';
  name.textContent = card.dataset.title;
  card.appendChild(name);

  // Tạo mô tả
  let desc = document.createElement('p');
  desc.className = 'project-description';
  desc.textContent = card.dataset.desc;
  card.appendChild(desc);

  // Tạo role (lấy phần tử đầu tiên trong data-role)
  let role = document.createElement('div');
  role.className = 'project-role';
  let roles = JSON.parse(card.dataset.role);
  role.innerHTML = `<p>My Role: ${roles[0]}</p>`;
  card.appendChild(role);
});

            // phần project pupup
document.querySelectorAll('.btn-project-detail').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const card = btn.closest('.project-card');

    // Fill data
    titleEl.textContent = card.dataset.title;
    descEl.textContent = card.dataset.desc;

    techEl.innerHTML = "";
    JSON.parse(card.dataset.tech).forEach(t => {
      techEl.innerHTML += `<li>${t}</li>`;
    });

    roleEl.innerHTML = "";
    JSON.parse(card.dataset.role).forEach(r => {
      roleEl.innerHTML += `<li>${r}</li>`;
    });

    videoEl.src = card.dataset.video;

    imagesEl.innerHTML = "";
    JSON.parse(card.dataset.images).forEach(img => {
      imagesEl.innerHTML += `<img src="${img}" alt="Screenshot">`;
    });

    githubBtn.href = card.dataset.github;

    popup.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
  videoEl.src = ""; // reset video
});

