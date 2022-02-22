# Endpoints

## Get All Products

- ENDPOINT

    `/products`

- METHOD

    - GET

- BODY

    - N/A
 
## Get All Sold Out Products

- ENDPOINT

    `/products/sold`

- METHOD

    - GET

- BODY

    - N/A
## Get One Product

- ENDPOINT

    in case of search by name

    `/products/search?name=product_name`

    in case of search by price

    `/products/search?price=product_price`

    in case of search by category

    `/products/search?category=category_name`

- METHOD

    - GET

- BODY

    - N/A

## Create Product

- ENDPOINT

    `/products/`

- METHOD

    - POST

- BODY

    
    name : string

    price : number

    taxes : number

    ads : number

    discount : number

    count : number

    category : string 
    

## Update Product

- ENDPOINT

    `/products/`

- METHOD

    - PUT

- BODY

    filter : product id => string

    name : string

    price : number

    taxes : number

    ads : number

    discount : number

    count : number
    
    category : string 

## Delete Product

- ENDPOINT

    `/products/`

- METHOD

    - DELETE

- BODY

    filter : product id => string
