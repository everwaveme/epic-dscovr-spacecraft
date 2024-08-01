import './scss/main.scss';

fetch('https://api.nasa.gov/EPIC/api/natural?api_key=YyhXjir0NUcQWUKAMVTYSXxEsnKj8fuYa3KvVXoh')
.then(res => res.json())
.then((data) => {
    console.log(data);
})
