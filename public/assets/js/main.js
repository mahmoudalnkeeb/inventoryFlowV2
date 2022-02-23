
// Get inputs variables

const pricingForm = document.querySelector('#mainPriceingForm'),
    ProductTitle  = document.getElementById('title'),
    ProductCategory = document.getElementById('Category'),
    ProductPrice    = document.getElementById('price'),
    ProductTaxes    = document.getElementById('tax'),
    ProductAds      = document.getElementById('ads'),
    ProductDiscount    = document.getElementById('discount'),
    ProductCount       = document.getElementById('count'),
    ProductInnerTotal  = document.getElementById('innerTotal'),
    CreateBTN          = document.getElementById('CreateBtn'),
    SearchField        = document.getElementById('searchField'),
    SearchBTN_category = document.getElementById('search_Category'),
    SearchBTN_Title    = document.getElementById('search_title'),
    searchMethod    = document.getElementById('searchMethod'),
    alertBox_Container = document.getElementById('alertBox_Container'),
    updateBTN = document.getElementById('updateBtn'),
    mainLinks = document.querySelector('.mainLinks'),
    togglerBTN = document.querySelector('.togglerBTN'),
    TableOutData    = document.getElementById('myoutputArea');



let apiurl = 'https://imsapi.onrender.com/products';
let mode   = false ; // means create
let productID     ;

// Start Events 
// 



window.addEventListener('load',()=>{
    ProductTitle.focus()
    if (document.querySelector('html').lang === 'ar') {
        document.body.style.fontFamily = "'cairo' ,system-ui"
        document.getElementById('langBTN').style.marginLeft= 'initial'
        document.getElementById('langBTN').style.marginRight= '28px'
    }else{
        document.body.style.fontFamily = "'Poppins' ,system-ui"
    }
})

togglerBTN.addEventListener('click',(e)=>{
    mainLinks.classList.toggle('active');
})

pricingForm.addEventListener('submit',(e)=>{
    e.preventDefault();
})

ProductPrice.addEventListener('input',GET_TOTAL_PRICE);
ProductTaxes.addEventListener('input',GET_TOTAL_PRICE);
ProductAds.addEventListener('input',GET_TOTAL_PRICE);
ProductDiscount.addEventListener('input',GET_TOTAL_PRICE);


CreateBTN.addEventListener('click',async ()=>{
    if (ProductTitle.value !== '' && ProductPrice.value !== '') {
        if (mode === true) {
            
            FETCH_DATABASE_WITH_UPDATE();
            
            pricingForm.reset();
            REST_FIELD_PARAMETERS();
            CreateBTN.textContent= 'Create';
            CreateBTN.className ='btn btn-dark  bg-gradient shadow rounded w-100 fw-bold';
            let updateicon = document.createElement('i');
            updateicon.className = 'bi bi-arrow-clockwise fs-4 me-2'
            CreateBTN.appendChild(updateicon);
            mode = false ;

        }else{
            CREATE_NEW_DATABASE_ITEM(apiurl);
            REST_FIELD_PARAMETERS()
            pricingForm.reset();

        }

        setTimeout(()=>{
            FETCH_DATABASE(apiurl);
        },500)

    }else{
        ALERT_MSG('bi bi-exclamation-triangle',"You can't leave an empty entry field",'warning')
    }
})

searchMethod.addEventListener('change',async ()=>{
    
    if (searchMethod.value == "price") {
        SEARCH_IN_DATABASE(searchMethod.value,SearchField.value,apiurl)
    }else{
        SEARCH_IN_DATABASE(searchMethod.value,SearchField.value.toUpperCase(),apiurl)
    }
})

FETCH_DATABASE(apiurl);

// Start Function declartion
// 
function GET_TOTAL_PRICE(){
    
    const result = +(ProductPrice.value) + +(ProductTaxes.value) + +(ProductAds.value);
    if (ProductDiscount.value !== '') {
        const resultWithDiscount = result - +(ProductDiscount.value);
        ProductInnerTotal.textContent = resultWithDiscount;
    }else{
        ProductInnerTotal.textContent = result;
    }

    if(ProductInnerTotal.textContent !== '0.00'){
        ProductInnerTotal.classList.add('bg-warning');
        ProductInnerTotal.classList.add('fw-bold');
    }
}



function REST_FIELD_PARAMETERS(){
    ProductInnerTotal.classList.remove('bg-warning');
    ProductInnerTotal.classList.remove('fw-bold');
    ProductInnerTotal.textContent = '0.00';
}

async function FETCH_DATABASE(api){

    try{

        let respone = await fetch(api);
        let data    = await respone.json()
        document.getElementById('product_count').textContent = data.length
        INNER_DATA_ELEMENTS(data);

    }catch(error){
        console.log('error from read function is : '+ error);
    }

}


function INNER_DATA_ELEMENTS(api){
    TableOutData.innerHTML = ''
    for(let i=0 ; i < api.length; i++){
        // HTML Elements
        let tableRow = document.createElement('tr'),
         tableHead = document.createElement('th'),
         tabledataName = document.createElement('td'),
         tabledataCategory = document.createElement('td'),
         tabledataPrice = document.createElement('td'),
         tabledataTaxes = document.createElement('td'),
         tabledataAds = document.createElement('td'),
         tabledataDiscount = document.createElement('td'),
         tabledataTotal = document.createElement('td'),
         tabledataCount = document.createElement('td'),
         tabledataBtnUpdate = document.createElement('td'),
         tabledataBtnSold = document.createElement('td'),
         buttunSold = document.createElement('button'),
         buttonUpdate = document.createElement('button'),
         buttonUpdateIcon = document.createElement('i'),
         buttonsoldIcon = document.createElement('i');


        tableRow.appendChild(tableHead);
        tableRow.appendChild(tabledataName);
        tableRow.appendChild(tabledataCategory);
        tableRow.appendChild(tabledataPrice);
        tableRow.appendChild(tabledataTaxes);
        tableRow.appendChild(tabledataAds);
        tableRow.appendChild(tabledataDiscount);
        tableRow.appendChild(tabledataTotal);
        tableRow.appendChild(tabledataCount);
        tableRow.appendChild(tabledataBtnUpdate);
        tabledataBtnUpdate.appendChild(buttonUpdate);



        tableHead.appendChild(document.createTextNode(i+1))
        tabledataName.appendChild(document.createTextNode(api[i].name));
        tabledataCategory.appendChild(document.createTextNode(api[i].category));
        tabledataPrice.appendChild(document.createTextNode(api[i].price));
        tabledataTaxes.appendChild(document.createTextNode(api[i].taxes));
        tabledataAds.appendChild(document.createTextNode(api[i].ads));
        tabledataDiscount.appendChild(document.createTextNode(api[i].discount));
        tabledataTotal.appendChild(document.createTextNode( +(api[i].price) + +(api[i].taxes) + +(api[i].ads) - +(api[i].discount) ));
        tabledataCount.appendChild(document.createTextNode(api[i].count));
        if (document.querySelector('html').lang === 'ar') {
            
            buttonUpdate.appendChild(document.createTextNode('تحديث'));       
            buttonUpdate.appendChild(buttonUpdateIcon);

        }else{
            buttonUpdate.appendChild(document.createTextNode('update'));
            buttonUpdate.appendChild(buttonUpdateIcon);   
        }


        if (api[i].count <= 10) {
            tableRow.className = 'isFew';
        }
        if (api[i].count == 0) {
            tableRow.className = 'row_item_sold';
        }

        buttonUpdate.className = 'btn btn-outline-warning rounded';
        buttonUpdate.setAttribute('data-id',api[i]._id);
        buttonUpdateIcon.className = 'bi bi-pencil-square px-2';

        buttonUpdate.addEventListener('click',async (e)=>{
            productID = await e.target.dataset.id
            UPDATE_DATABASE_DATA(api[i].name);
        })

        TableOutData.appendChild(tableRow);
    }
}

async function CREATE_NEW_DATABASE_ITEM(api){

    try{

        let respone = await fetch( api, 
            {headers:{"Content-Type" : "application/json"}
            ,method:"POST"
            ,body:JSON.stringify(
                {
                name : ProductTitle.value.toUpperCase(),
                category : ProductCategory.value.toUpperCase() ,
                price : +ProductPrice.value,
                taxes : +ProductTaxes.value,
                ads : +ProductAds.value,
                discount : +ProductDiscount.value,
                count : +ProductCount.value,
                }) })

        let data   = await respone.json();
        ALERT_MSG('bi bi-check2-all',Object.values(data),'dark')
        
    }catch(error){
        console.log('error from create function is : '+ error);
    }

}

function ALERT_MSG(icon,message,alertType){
    let alert = document.createElement('div');
    let alertMSG = document.createElement('h5');
    let dismissBTN = document.createElement('button');
    let alertIcon = document.createElement('i')

    alert.appendChild(alertIcon);
    alert.appendChild(alertMSG);
    alert.appendChild(dismissBTN);

    alertMSG.appendChild(document.createTextNode(message));

    alert.className = 'alert'+' '+'alert-dismissible fade show'+' '+ 'alert-'+alertType +' '+'m-0 d-flex justify-content-start align-item-center';
    alert.setAttribute('role','alert');
    alertMSG.className= 'lead'+' '+'m-0'+' '+'lh-lg';
    dismissBTN.setAttribute('data-bs-dismiss','alert');
    dismissBTN.setAttribute('type','button');
    dismissBTN.className = 'btn-close'
    alertIcon.className = icon +' '+ 'pe-3'+' '+'fs-4';

    alertBox_Container.appendChild(alert);
    setTimeout(()=>{
        alertBox_Container.removeChild(alert);
    },3000)
}

async function SEARCH_IN_DATABASE(searchMethod,searchString,api){

    try{
        let respone = await fetch(api+'/search' + '?' +searchMethod + '=' + searchString);
        let data = await respone.json();

        
        if (data !== null || data == '') {
            
            INNER_DATA_ELEMENTS(data);
        }else{
    
            TableOutData.innerHTML=''
            TableOutData.innerHTML=`
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Sorry , But There's Now Any Product Have This Name</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `
        }

    }catch(error){
        console.log('error from search function is : '+ error);
    }

    

}


async function UPDATE_DATABASE_DATA(retrivedProductName){

    mode = true;
    try {
        
        let response = await fetch(apiurl +'/search'+ '?'+'name'+'='+retrivedProductName )
        let data     = await response.json();
                    ProductTitle.value = data.name;
                    ProductCategory.value = data.category;
                    ProductPrice.value = data.price;
                    ProductTaxes.value = data.taxes;
                    ProductAds.value   = data.ads;
                    ProductDiscount.value = data.discount;
                    ProductCount.value = data.count;
    } catch (error) {
        console.log('update function says error is :')+ error;
    }

    CreateBTN.textContent = 'Update';
    CreateBTN.className = 'btn btn-outline-dark bg-gradient shadow rounded w-100 fw-bold'
    let updateicon = document.createElement('i');
    updateicon.className = 'bi bi-pen fs-5 px-3'
    CreateBTN.appendChild(updateicon)
    window.scroll(0,0);
    ProductTitle.focus()
    GET_TOTAL_PRICE();
    
}



async function FETCH_DATABASE_WITH_UPDATE( ){
    try {
        let respone = await fetch(apiurl 
            , {headers: {"Content-Type": 'application/json',} 
            , method: 'PUT' 
            , body:JSON.stringify
                ({
                    filter : productID,
                    name   : ProductTitle.value.toUpperCase(),
                    category : ProductCategory.value.toUpperCase(),
                    price  : +(ProductPrice.value),
                    taxes  : +(ProductTaxes.value),
                    ads    : +(ProductAds.value),
                    discount : +(ProductDiscount.value),
                    count  : +(ProductCount.value),
                })})
    
        let data = await respone.json();
        
        const recivedMSG = Object.values(data)
        ALERT_MSG('bi bi-pen fs-5 px-3',`The product is : [ ${recivedMSG}] darkfully`,'dark')

    } catch (error) {
        console.log('error from fetch updated data : '+ error);
    }

}
