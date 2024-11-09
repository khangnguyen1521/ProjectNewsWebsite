let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

const toggle = (e)=>{
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click',toggle)



window.addEventListener('scroll',()=>{
    if(window.scrollY>50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
})


// fetching news data with API

const apiKey = "pub_58721416a1710dbca9a2cc3f7425bce3949cc";

const fetchData = async (category, size) => {
    try {
        const url = `https://newsdata.io/api/1/latest?country=vi&category=${category}&size=${size}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

const add_breakingNews = (data) => {
    if (data && data.length > 0) {
        breakingImg.innerHTML = `<img src="${data[0].image_url || 'default-image.jpg'}" alt="Breaking News Image">`
        breakingNews_title.innerHTML = `<a href="${data[0].link || '#'}" target="_blank"><h2>${data[0].title || 'No Title'}</h2></a>`
        breakingNews_desc.innerHTML = `${data[0].description || 'No description available'}`
    } else {
        breakingImg.innerHTML = '';
        breakingNews_title.innerHTML = 'No breaking news';
        breakingNews_desc.innerHTML = '';
    }
}

const add_topNews = (data) => {
    const validArticles = data.filter(element => 
        element.image_url && element.link && element.title
    );

    if (validArticles.length === 0) {
        topNews.innerHTML = '<p>No news articles available</p>';
        return;
    }

    const html = validArticles.map((element) => {
        const title = element.title.length > 100 
            ? element.title.slice(0, 100) + "..." 
            : element.title;

        return `
            <div class="news">
                <div class="img">
                    <img src="${element.image_url}" alt="News Image" onerror="this.onerror=null; this.src='default-image.jpg';">
                </div>
                <div class="text">
                    <div class="title">
                        <a href="${element.link}" target="_blank">
                            <p>${title}</p>
                        </a>
                    </div>
                </div>
            </div>`;
    }).join('');

    topNews.innerHTML = html;
}

// Fetch tin nong
fetchData('top', 5)
    .then(add_breakingNews)
    .catch(error => {
        console.error("Error in breaking news fetch process:", error);
        // Optionally, update UI to show error
        breakingNews_title.innerHTML = 'Failed to load breaking news';
    });

// Fetch tin top
fetchData('top', 10)
    .then(add_topNews)
    .catch(error => {
        console.error("Error in top news fetch process:", error);
        // Optionally, update UI to show error
        topNews.innerHTML = '<p>Failed to load top news</p>';
    });

    const add_sportsNews = (data) => {
        const validArticles = data.filter(element => 
          element.image_url && element.link && element.title
        );
      
        if (validArticles.length === 0) {
          sportsNews.innerHTML = '<p>No news articles available</p>';
          return;
        }
      
        const html = validArticles.map((element) => {
          const title = element.title.length > 100 
            ? element.title.slice(0, 100) + "..." 
            : element.title;
      
          return `
            <div class="newsCard">
              <div class="img">
                <img src="${element.image_url}" alt="News Image">
              </div>
              <div class="text">
                <div class="title">
                  <a href="${element.link}" target="_blank"><p>${title}</p></a>
                </div>
              </div>
            </div>`;
        }).join('');
      
        sportsNews.innerHTML = html;
      }
      
    fetchData('sports',5)
        .then(add_sportsNews)
        .catch(error => {
          console.error("Error in top news fetch process:", error);
          sportsNews.innerHTML = '<p>Failed to load sports news</p>';
        });

        const add_businessNews = (data) => {
            const validArticles = data.filter(element =>
                element.image_url && element.link && element.title  
            );

        if(validArticles.length === 0){
            sportsNews.innerHTML = '<p>No news articles available</p>';
          return;
        }
        const html = validArticles.map((element) => {
            const title = element.title.length > 100 ? element.title.slice(0,100) + "..." : element.title;
            return `<div class="newsCard">
              <div class="img">
                <img src="${element.image_url}" alt="News Image">
              </div>
              <div class="text">
                <div class="title">
                  <a href="${element.link}" target="_blank"><p>${title}</p></a>
                </div>
              </div>
            </div>`
        }).join('');
        businessNews.innerHTML = html;
        }
    fetchData('business',5)
    .then(add_businessNews)
    .catch(error => {
        console.error("Error in business news fetch process:", error);
          businessNews.innerHTML = '<p>Failed to load business news</p>';
    });

    const add_techNews = (data) => {
      const validArticles = data.filter(element =>
          element.image_url && element.link && element.title  
      );

  if(validArticles.length === 0){
      sportsNews.innerHTML = '<p>No news articles available</p>';
    return;
  }
  const html = validArticles.map((element) => {
      const title = element.title.length > 100 ? element.title.slice(0,100) + "..." : element.title;
      return `<div class="newsCard">
        <div class="img">
          <img src="${element.image_url}" alt="News Image">
        </div>
        <div class="text">
          <div class="title">
            <a href="${element.link}" target="_blank"><p>${title}</p></a>
          </div>
        </div>
      </div>`
  }).join('');
  techNews.innerHTML = html;
  }
    fetchData('technology',5)
    .then(add_techNews)
    .catch(error => {
        console.error("Error in top news fetch process:", error);
          techNews.innerHTML = '<p>Failed to load tech news</p>';
    });