const akey = "gx_XzOZFNX20BfYFCp1Gxesaw7lXU8CGCWP2VHBrxhE";

const searchform = document.getElementById("search-form");
const searchbox = document.getElementById("search-input");
const searchresult = document.getElementById("search-results");
const showmorebtn = document.getElementById("see-more-btn");

let input = "";
let page = 1;

async function searchimg() {
    input = searchbox.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${akey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchresult.innerHTML="";
    }

    results.map((result)=>
    {
        const imgwrap = document.createElement('div');
        const imgl = document.createElement('a');
        imgl.href=result.links.html;
        imgl.target = "_blank";
        imgwrap.classList.add("search-result");
        const img = document.createElement('img');
        img.src = result.urls.small;
        img.alt=result.alt_description;
        const imglink = document.createElement('a');
        imglink.href=result.links.html;
        imglink.target = "_blank";
        imglink.textContent=result.alt_description;
        imgl.appendChild(img);
        imgwrap.appendChild(imgl);
        imgwrap.appendChild(imglink);
        searchresult.appendChild(imgwrap);

    });
    page++;
    if(page>1)
    {
        showmorebtn.style.display="block";
    }
    
}
searchform.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchimg();
})
showmorebtn.addEventListener("click",()=>{
    searchimg();
})