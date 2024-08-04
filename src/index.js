import './scss/main.scss';

const url = 'https://api.nasa.gov/EPIC/api/natural/?api_key=';
const apiKey = 'YyhXjir0NUcQWUKAMVTYSXxEsnKj8fuYa3KvVXoh';

fetch(url + apiKey)
  .then(res => res.json())
  .then((data) => {
    // console.log(data);

    const urlDate = data[0].date.slice(0, 10).split('-').join('/'); //один раз, без цикла
    //здесь будет переменная с выводимой датой

    // console.log(urlDate);

    const container = document.querySelector('.container');
    // container.innerHTML = `
    //   <img src="https://epic.gsfc.nasa.gov/archive/natural/${urlDate}/png/${data[0].image}.png"/>
    // `;

  })

{/* <img src="https://epic.gsfc.nasa.gov/archive/natural/${urlDate}/png/${data[0].image}.png"/> */}
