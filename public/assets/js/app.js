
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
    TableOutData    = document.getElementById('myoutputArea');


    // Create assist variable to identify mode
    let create= true;
    let assistIndexVar;
    // Array store all the Products 
    // retrive data that saved in the localstorage to rhe array
    let ALL_THE_PRODUCTS=[];
    if (window.localStorage.getItem('product') !== null) {
        ALL_THE_PRODUCTS = JSON.parse(window.localStorage.getItem('product'));
        
        ADD_PRODCT_TO_TABLE(ALL_THE_PRODUCTS)
    }
    let counter = document.getElementById('product_count').textContent = ALL_THE_PRODUCTS.length;

// Create events
// 
window.addEventListener('load',()=>{
    ProductTitle.focus()
})

SearchField.addEventListener('keyup',filterData)
pricingForm.addEventListener('submit',(e)=>{
    e.preventDefault();
})

ProductPrice.addEventListener('input',GET_TOTAL_PRICE);
ProductTaxes.addEventListener('input',GET_TOTAL_PRICE);
ProductAds.addEventListener('input',GET_TOTAL_PRICE);
ProductDiscount.addEventListener('input',GET_TOTAL_PRICE);

CreateBTN.addEventListener('click',()=>{
    if (ProductTitle.value !== '' && ProductPrice.value !== '' && create === true) {
        CREATE_PRODCT();
        ALERT_USER('<i class="bi bi-check-square-fill"></i>','The product has been successfully added','success')
        pricingForm.reset()
        REST_FIELD_PARAMETERS();
        counter.textContent = ALL_THE_PRODUCTS.length;
    }else if(ProductTitle.value !== '' && ProductPrice.value !== '' && create === false){
        CREATE_PRODCT('update' , assistIndexVar);
        REST_FIELD_PARAMETERS();
        pricingForm.reset();
        ALERT_USER('<i class="bi bi-info-square-fill"></i>','Product details have been successfully updated','warning');
        CreateBTN.textContent = 'search' ;
        CreateBTN.className = 'btn btn-success  bg-gradient shadow rounded-pill w-100 fw-bold' ;
    }else if(pricingForm.checkValidity() === false){
        pricingForm.classList.add('was-validated');
        ALERT_USER('<i class="bi bi-x-circle-fill"></i>',"You can't leave an empty entry field",'danger')
        if(pricingForm.checkValidity() === true){
            pricingForm.classList.remove('was-validated');
        }
    }

})


CHECK_IF_PRODCT();

// create functions
// 
function REST_FIELD_PARAMETERS(){
    ProductInnerTotal.classList.remove('bg-warning');
    ProductInnerTotal.classList.remove('fw-bold');
    ProductInnerTotal.textContent = '0.00';
}


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

function CREATE_PRODCT(sendStatus,index){
    productObject={
        product_name            : (ProductTitle.value).toUpperCase(),
        product_price_amount    : +(ProductPrice.value),
        product_taxes_amount    : +(ProductTaxes.value),
        product_ads_amount      : +(ProductAds.value),
        product_discount_amount : +(ProductDiscount.value),
        product_total_amount    : +(ProductInnerTotal.textContent),
        product_count           : +(ProductCount.value),
        product_category        : (ProductCategory.value).toUpperCase(),
        
    }

    if(sendStatus === 'update'){
        ALL_THE_PRODUCTS.splice(index,1,productObject);
    }else{
        ALL_THE_PRODUCTS.push(productObject);
    }
    window.localStorage.setItem('product',JSON.stringify(ALL_THE_PRODUCTS));
    ADD_PRODCT_TO_TABLE(ALL_THE_PRODUCTS)
}

function ALERT_USER(icon,message,classname){
    const wrapper = document.createElement('div');
    const msgholder = document.createElement('h4');
    const dismissBTN = document.createElement('button');
    
    wrapper.className = `alert alert-dismissible fade show alert-${classname} m-0 d-flex justify-content-between align-item-center`
    msgholder.className = 'd-flex gap-3 m-0'
    wrapper.setAttribute('role','alert');
    wrapper.setAttribute('data-bs-dismiss','alert');
    wrapper.appendChild(msgholder);
    msgholder.innerHTML += `${icon}` ;
    msgholder.appendChild(document.createTextNode(message));
    wrapper.appendChild(dismissBTN);
    dismissBTN.className = 'btn-close';
    dismissBTN.setAttribute('aria-labe','close');

    alertBox_Container.appendChild(wrapper);
    setTimeout(() => {
        alertBox_Container.removeChild(wrapper)
    }, 3000);
}

function ADD_PRODCT_TO_TABLE(product){
    TableOutData.innerHTML = '';
    for(let i=0 ; i < product.length ; i++){

        const tableData =`
        <tr>
            <th scope="row">${i+1}</th>
            <td>${product[i].product_name }</td>
            <td>${product[i].product_category }</td>
            <td>${product[i].product_price_amount }</td>
            <td>${product[i].product_taxes_amount }</td>
            <td>${product[i].product_ads_amount }</td>
            <td>${product[i].product_discount_amount }</td>
            <td>${product[i].product_count}</td>
            <td>${product[i].product_total_amount }</td>
            <td class="me-0 py-1 pe-0"><button type="button" class="btn btn-dark" onclick='UPDATE_PRODCT_DATA(${i})'>
                <i class="bi bi-pencil-square"></i>
                Update
            </button></td>
            <td class="ms-0 py-1 ps-0"><button type="button" class="btn btn-danger" onclick="DELETE_IT(${i})" >
                <i class="bi bi-trash3"></i> 
                Delete
            </button></td>
        </tr>
        `

        TableOutData.innerHTML += tableData;
    }
}

function DELETE_IT(index){
    ALL_THE_PRODUCTS.splice(index,1);
    if (ALL_THE_PRODUCTS.length === 0) {
        window.localStorage.removeItem('product');
    }else{
        window.localStorage.setItem('product',JSON.stringify(ALL_THE_PRODUCTS));
    }
    ADD_PRODCT_TO_TABLE(ALL_THE_PRODUCTS);
}

function UPDATE_PRODCT_DATA(index){
    // full of input fields with old product data
    ProductTitle.value = ALL_THE_PRODUCTS[index].product_name;
    ProductCategory.value = ALL_THE_PRODUCTS[index].product_category;
    ProductPrice.value = ALL_THE_PRODUCTS[index].product_price_amount;
    ProductTaxes.value = ALL_THE_PRODUCTS[index].product_taxes_amount;
    ProductAds.value = ALL_THE_PRODUCTS[index].product_ads_amount;
    ProductDiscount.value = ALL_THE_PRODUCTS[index].product_discount_amount;
    ProductCount.value = ALL_THE_PRODUCTS[index].product_count;
    
    // toggle mode to update 
    create = false ;
    assistIndexVar = index ;
    CreateBTN.innerHTML = '<i class="bi bi-pencil-square fs-5 me-3"></i>'+" "+" "+'Update' ;
    CreateBTN.className = 'btn btn-outline-success bg-gradient shadow rounded-pill w-100 fw-bold'

    //triger calculator function
    GET_TOTAL_PRICE();


    // scroll window to inputs location
    window.scrollBy(0,-window.innerHeight)
    
}

// check if there is product or not to inner 'delet all' button

function CHECK_IF_PRODCT(){
    if (ALL_THE_PRODUCTS.length <= 0) {
        return document.getElementById('clearAllContainer').style.display = 'none'
    }else{
        return document.getElementById('clearAllContainer').style.display = 'flex'
        
    }
}

// Delet all 
function DELETE_ALL(){
    ALL_THE_PRODUCTS.splice(0);
    window.localStorage.removeItem('product');
    CHECK_IF_PRODCT();
    ADD_PRODCT_TO_TABLE(ALL_THE_PRODUCTS);
}

function filterData(){
    let NewAllProductsArr ;
    if (searchMethod.value === "product_price_amount" ) {
        NewAllProductsArr = ALL_THE_PRODUCTS.filter(product=> product[`${searchMethod.value}`] === +SearchField.value );
    }else{
        NewAllProductsArr = ALL_THE_PRODUCTS.filter(product=> product[`${searchMethod.value}`].includes(SearchField.value.toUpperCase()) );
    }
    ADD_PRODCT_TO_TABLE(NewAllProductsArr);
}
