import './scss/main.scss';

const url = 'https://api.nasa.gov/EPIC/api/natural/?api_key=';
const apiKey = 'YyhXjir0NUcQWUKAMVTYSXxEsnKj8fuYa3KvVXoh';

fetch(url + apiKey)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Потеряли связь со спутником... Пожалуйста, обновите страницу &#129402;');
    }
  })
  .then((data) => {

    //data output
    const urlDate = data[0].date.slice(0, 10).split('-').join('/');
    const outputDate = data[0].date.slice(0, 10).split('-').reverse().join('-');
    const list = document.querySelector('.data-list');

    for (let i = 0; i < data.length; i++) {
      list.innerHTML += `
      <li class="data-item">
        <div class="data-pic">
          <a href="https://epic.gsfc.nasa.gov/archive/natural/${urlDate}/png/${data[i].image}.png" class="data-pic-link" target="_blank">
            <img src="https://epic.gsfc.nasa.gov/archive/natural/${urlDate}/png/${data[i].image}.png" alt="Земля из космоса" class="data-img">
          </a>
        </div>

        <div class="data-info">
          <p class="data-info-date">${outputDate}</p>
          <p class="data-info-desc">
            Это изображение было получено камерой EPIC (Earth Polychromatic Imaging Camera) с борта космического
            аппарата NOAA DSCOVR агентства NASA.
          </p>

          <ul class="data-info-list">

            <li class="data-info-item">
              <p class="data-info-title">Кватернионы</p>
              <p class="data-info-text">
                <span class="data-info-text-accent">q0: </span>
                ${data[i].attitude_quaternions.q0}
              </p>
              <p class="data-info-text">
                <span class="data-info-text-accent">q1: </span>
                ${data[i].attitude_quaternions.q1}
              </p>
              <p class="data-info-text">
                <span class="data-info-text-accent">q2: </span>
                ${data[i].attitude_quaternions.q2}
              </p>
              <p class="data-info-text">
                <span class="data-info-text-accent">q3: </span>
                ${data[i].attitude_quaternions.q3}
              </p>
            </li>

            <li class="data-info-item">
              <p class="data-info-title">Геоцентрические координаты</p>
              <p class="data-info-text">
                <span class="data-info-text-accent">широта: </span>
                ${data[i].centroid_coordinates.lat}
              </p>
              <p class="data-info-text">
                <span class="data-info-text-accent">долгота: </span>
                ${data[i].centroid_coordinates.lon}
              </p>
            </li>

            <li class="data-info-item">
              <p class="data-info-title">Позиция аппарата DSCOVR</p>
              <p class="data-info-text">
                <span class="data-info-text-accent">x: </span>
                ${data[i].dscovr_j2000_position.x}
              </p>
              <p class="data-info-text">
                <span class="data-info-text-accent">y: </span>
                ${data[i].dscovr_j2000_position.y}
              </p>
              <p class="data-info-text">
                <span class="data-info-text-accent">z: </span>
                ${data[i].dscovr_j2000_position.z}
              </p>
            </li>

            <li class="data-info-item">
              <p class="data-info-title">Позиция Солнца</p>
              <p class="data-info-text">
                <span class="data-info-text-accent">x: </span>
                ${data[i].sun_j2000_position.x}
              </p>
              <p class="data-info-text">
                <span class="data-info-text-accent">y: </span>
                ${data[i].sun_j2000_position.y}
              </p>
              <p class="data-info-text">
                <span class="data-info-text-accent">z: </span>
                ${data[i].sun_j2000_position.z}
              </p>
            </li>

            <li class="data-info-item">
              <p class="data-info-title">Расстояние аппарата DSCOVR до Земли</p>
              <p class="data-info-text">
                ~1 600 000 км
              </p>
            </li>

            <li class="data-info-item">
              <p class="data-info-title">Расстояние аппарата DSCOVR до Солнца</p>
              <p class="data-info-text">
                ~148 000 000 км
              </p>
            </li>
          </ul>
        </div>
      </li>
    `;
    }

    //slider
    const slides = document.querySelectorAll('.data-item');
    const slidesControl = document.querySelectorAll('.slider-control');
    const slidesCounter = document.querySelector('.slider-counter');
    let slideIndex = 0;

    function showSlides(index) {
      slides[slideIndex].classList.remove('active');
      slides[index].classList.add('active');
      slideIndex = index;
      slidesCounter.textContent = `${slideIndex + 1} / ${slides.length}`;
    }

    slidesControl.forEach((item) => {
      item.addEventListener('click', (e) => {

        if (e.target.classList.contains('slider-prev-arrow')) {
          let index = slideIndex - 1;

          if (index < 0) {
            index = slides.length - 1;
          }

          showSlides(index);

        } else if (e.target.classList.contains('slider-next-arrow')) {
          let index = slideIndex + 1;

          if (index >= slides.length) {
            index = 0;
          }

          showSlides(index);
        }
      })
    })

    showSlides(slideIndex);
  })
.catch((err) => {
  const list = document.querySelector('.data-list');
  const slider = document.querySelector('.slider');

  list.innerHTML = `<li class="data-error">${err.message}</li>`;
  slider.innerHTML = '';
})
