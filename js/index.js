
// ==================== load news cetagory ===================

const loadCetagory = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        // const url = 'https://openapi.programming-hero.com/api/news/category'
        const res = await fetch(url)
        const data = await res.json();
        return data.data;
    }
    catch (err) {
        alert("Something is worng !!!")
    }


}

const displayCetagory = async () => {
    const data = await loadCetagory();
    const cetagoryUl = document.getElementById('newsCetagoryContainer')
    const cetagoryName = data.news_category
    // console.log(cetagoryName)

    for (const cetagory of cetagoryName) {
        const li = document.createElement('li');
        let idCetagory = cetagory.category_id
        let cetagoryName = cetagory.category_name
        li.classList.add('nav-item')
        li.innerHTML = `
        <li >
        <button class="nav-link cetagoryBtn" onclick="loadCetagoryNews(${idCetagory},'${cetagoryName}')">${cetagory.category_name}</button>
        </li> 
        `
        cetagoryUl.appendChild(li)
    }

    // stop lodaer 
    toggoleSpiner(true)
}

displayCetagory()


// ==================== load news cetagory end ==================
// ==================== load news start ==================

const loadCetagoryNews = (category_id, cetagoryName) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displayNewsCategory(data.data, cetagoryName))
    }
    catch (err) {
        // console.log('somthing is worng !!')
        alert("Something is worng !!!")
    }


}

const displayNewsCategory = (eliment, cetagoryName) => {
    let shoryArry = eliment
    shoryArry.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    var size = Object.keys(eliment).length;
    const newsDiv = document.getElementById('newsContainer')
    newsDiv.innerHTML = ''

    // display all news item
    const monitorDiv = document.getElementById('counterNews')
    monitorDiv.innerHTML = ''

    const h1 = document.createElement('h5')
    h1.classList.add('monitor')
    h1.innerHTML = `
    <span> ${size} items found <span class="text-warning"> ${cetagoryName ? cetagoryName : `All News`} </span></span>
    `
    monitorDiv.appendChild(h1)

    // Sort an Array of Objects in JavaScript

    eliment.forEach(newsElement => {
        let totalView = eliment.total_view
        console.log(totalView)

        const div = document.createElement('div')
        div.classList.add('row', 'g-2', 'shadow', 'p-3', 'mb-5', 'bg-body', 'rounded')
        div.innerHTML = `
        <div class="col-md-4">
        <img src="${newsElement.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${newsElement.title}</h5>
            <p class="card-text text-muted">${newsElement.details.slice(0, 200) + '.....'}</p>
            <div class='d-flex mt-4 flex-wrap'>
                <div class='mx-2'>
                <img src="${newsElement.author.img}" class="rounded-circle" alt="..." width="50px" height="50px">
                </div>
                <div>
                <p class="text-muted mb-1">${newsElement.author?.name ? newsElement.author?.name : 'No Name Available'}</p>
                <p class="text-muted mb-1">${newsElement.author?.published_date ? newsElement.author?.published_date : 'No Date Available'}</p>
                </div>
                <div class="mx-5">
                    <span> 
                    <i class="fas fa-eye"></i>
                    <span>${newsElement.total_view ? newsElement.total_view : '000'}</span>
                    </span>
                </div>
                <div>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                </div>
                <div class="mx-4">
                <!-- Button trigger modal -->
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal" onclick="loadNewsDetails('${newsElement._id}')">
                    Details
                </button>
                </div>
            </div>
        </div>
        </div>
        `
        newsDiv.appendChild(div)
    })
    toggoleSpiner(false)
}

loadCetagoryNews(08)

// ==================== load news end ==================

// lodad sppinar ==========

const toggoleSpiner = (isLodaing) => {
    const loadingSection = document.getElementById('loading')
    if (isLodaing) {
        // loadingSection.classList.remove('d-none')
        loadingSection.style.display = 'block'
    } else {
        // loadingSection.classList.add('d-none')
        loadingSection.style.display = 'none'
    }
}

// ===================== news detais =====================

const loadNewsDetails = async news_id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`
        const res = await fetch(url)
        const data = await res.json()
        displayNewsDetail(data.data)
    }
    catch (err) {
        alert("Something is worng !!!")
    }


}

const displayNewsDetail = newsDetail => {
    const newsBody = document.getElementById('newsDetailsContainer')

    newsDetail.forEach(allNewsDetails => {
        const newsTitleContent = document.getElementById('newsModalLabel')
        newsTitleContent.innerText = allNewsDetails.title

        const div = document.createElement('div')
        div.classList.add('modal-body', 'mx-auto')
        div.innerHTML = `
        <div class="card mx-auto" style="width: 100%;">
        <img src="${allNewsDetails.thumbnail_url}" class="card-img-top" alt="...">
        <div class="card-body">

        <div>
        <p class="card-text text-muted">${allNewsDetails.details.slice(0, 150) + '.....'}</p>
        </div>
         
        <div class='d-flex mt-4 flex-wrap'>
        <div class='mx-2'>
        <img src="${allNewsDetails.author.img}" class="rounded-circle" alt="..." width="50px" height="50px">
        </div>
        <div>
        <p class="text-muted mb-1">${allNewsDetails.author?.name ? allNewsDetails.author?.name : 'No Name Available'}</p>
        <p class="text-muted mb-1">${allNewsDetails.author?.published_date ? allNewsDetails.author?.published_date : 'No Date Available'}</p>
        </div>
        <div class="mx-5">
            <span> 
            <i class="fas fa-eye"></i>
            <span>${allNewsDetails.total_view ? allNewsDetails.total_view : 'N/A'}</span>
            </span>
        </div>
        <div>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        </div>
        </div>
        </div>
      </div>
        
        `
        newsBody.appendChild(div)

    })

}