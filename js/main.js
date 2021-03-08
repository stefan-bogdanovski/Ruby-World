window.onload = function()
{
    $('.carousel').carousel(0);
    dohvatiPogodnosti();
    dohvatiProizvode();
    dodajDogadjaj(document.getElementsByName("price"), sortirajPoCeni);
    dodajDogadjaj(document.getElementsByName("RAM"), filtrirajRAM);
    dodajDogadjaj(document.getElementsByName("brand"), filtrirajBrand)
};
var reset;

function dohvatiProizvode()
{
    $.ajax(
    {
        method : "GET",
        url : "data/products.json",
        dataType : "json",
        success: function(data)
        {
            reset = data;
            ispisiProizvode(data);
        },
        error: function(xhr, status, error)
        {

        }
    });
}
function dohvatiPogodnosti()
{
    $.ajax(
        {
            method : "GET",
            url : "data/benefits.json",
            dataType : "json",
            success: function(data)
            {
                ispisiPogodnosti(data);
            },
            error: function(xhr, status, error)
            {
    
            }
        });
}
function ispisiProizvode(proizvodi)
{
        let proizvodiNew = [];
        if(localStorage.getItem("BrandOnly")!="All" && localStorage.getItem("BrandOnly"))
        {
            proizvodiNew = proizvodi.filter(p => p.brand == localStorage.getItem("BrandOnly"));
            proizvodi = proizvodiNew;
        }
        if(localStorage.getItem("Sort"))
        {
            if(localStorage.getItem("Sort")=="ASC")
            {
                    proizvodiNew = proizvodi.sort(function(a,b)
                    {
                        if(a.price.newPrice > b.price.newPrice)
                        {
                            return 1;
                        }
                        else if(a.price.newPrice < b.price.newPrice)
                        {
                            return -1;
                        }
                        else return 0;
                    });
            }
            else
            {
                proizvodiNew = proizvodi.sort(function(a,b)
                {
                    if(a.price.newPrice > b.price.newPrice)
                    {
                        return -1;
                    }
                    else if(a.price.newPrice < b.price.newPrice)
                    {
                        return 1;
                    }
                    else return 0;
                });
            }
            proizvodi = proizvodiNew;
        }
        if(localStorage.getItem("RAM"))
        {
            for(let i = 0; i < proizvodi[0].specifications.length; i++)
            {
                if(proizvodi[0].specifications[i].name == "RAM")
                {
                    rb = i;
                    break;
                }
            }
            proizvodiNew = proizvodi.filter(p => p.specifications[rb].value.includes(localStorage.getItem("RAM")));
            proizvodi = proizvodiNew;
        }
        let html=``;
            for(let p of proizvodi)
            {
                html+=
                `
                <div class="item text-center mb-3">
                <figure class="text-center">
                <img src="images/laptops/${p.image.src}" alt="${p.image.alt}" class="img-fluid"/>
                <caption class="text-center"> <h3 class="twinds"> ${p.name} </h3></caption>   
                </figure>
                <ul class="mx-auto text-center malifontLista">
                `
                p.specifications.forEach(element => {
                    html+= `<li> ${element.name} : ${element.value}</li>`
                });
                html+=`
                </ul>
                <del class="malifontLista"> $${p.price.oldPrice}.00 </del> 
                <span class="d-block redColor pb-2"> $${p.price.newPrice}.00 </span>
                <a href="order.html" class="bg-danger p-2 t-left order text-light" data-id="${p.id}">Order now</a>  
            </div>
                `;
            }
        if(proizvodi.length)
            {
                document.getElementById("products").innerHTML = html;
                localStorage.setItem("Products", JSON.stringify(proizvodi));
            }
        else
            {
                document.getElementById("products").innerHTML = `No products available with given criteria.`;
            }

}
function ispisiPogodnosti(data)
{
    let html= ``;
    for(let p of data)
    {
        html+=
        `
        <div class="text-light col-lg-3 col-sm-6 text-center"><p class="smallFont"> <h1><i class="redColor bigFont">${p.naziv}</i></h1>
             <i class="${p.ikonica} bigFont m-3"></i>
             <br/> ${p.opis} 
             </p>
          </div>
        `
    }
    $("#Icons").html(html);
}
function dodajDogadjaj(array, func)
{
    array.forEach(element => {
        element.addEventListener("click", func)
    });
}
//sortiranje
function sortirajPoCeni()
{ 
    if(this.value == 1)
    {
        localStorage.setItem("Sort", "ASC");
    }
    else if(this.value == -1)
    {
        localStorage.setItem("Sort", "DESC");
    }
    ispisiProizvode(reset);
}
//filteri RAM
function filtrirajRAM()
{
   localStorage.setItem("RAM", this.value);
   ispisiProizvode(reset);    
}
//filteri BRAND
function filtrirajBrand()
{
    localStorage.setItem("BrandOnly", this.value);
    ispisiProizvode(reset);
}
window.onunload = function()
{
    localStorage.clear();
}