## Project setup
1. unzip file, go to MYSTORE folder.
2. folder don't contain node modules, so just run,
   npm install command
3. After successful installation start server using command
   npm start
   for development purpose : npm run dev

# API calls
NOTE : ID will be generated from mongoDB, so the routes that require ID, while testing you have to provide it after listing product and cart like GET all product and then you can get ID from their.
and token format at header => authorization : bearer token...

------------------------------PRODUCTS----------------------------------

1. Get all product :
   method : GET
   route : /products
   live link : https://api-mystore8472.vercel.app/products

2. Update product :
   method : PUT
   route : /product/:id
   live link : https://api-mystore8472.vercel.app/product/:id
   requirement : token at header with key name 'authorization', as it is PUT request then whole record will be update so in body object should include name,price,stock,description (description is not mandatory).

3. Delete product :
   method : DELETE
   route : /product/:id
   live link : https://api-mystore8472.vercel.app/product/:id
   requirement : token at header with key name 'authorization'

4. Add product:
   method : POST
   route : /product
   live link : https://api-mystore8472.vercel.app/product
   requirement : token at header with key name 'authorization',body object should include name,price,stock,description (description is not mandatory).

5. Get product by ID :
   method : GET
   route : /product/:id
   live link : https://api-mystore8472.vercel.app/product/:id
   requirement : only ID that you will get from GET all product request

------------------------------CART------------------------------------

6. Get all Cart Item :
   method : GET
   route : /cart
   live link : https://api-mystore8472.vercel.app/cart
   requirement : token at header with key name 'authorization'

7. Clear Cart :
   method : DELETE
   route : /clear_cart
   live link : https://api-mystore8472.vercel.app/clear_cart
   requirement : token at header with key name 'authorization'

8. Update Cart Item :
   method : PATCH (because here we are not updating whole item, instead we are only manipulating with quantity using increment and decrement)
   route : /cart/:id
   live link : https://api-mystore8472.vercel.app/cart:id
   requirement : token at header with key name 'authorization' and ID that you can get while fetching all cart item

9. Delete Cart Item :
   method : DELETE
   route : /cart/:id
   live link : https://api-mystore8472.vercel.app/cart/:id
   requirement : token at header with key name 'authorization' and ID that you can get while fetching all cart item

10. Add Cart Item :
    method : POST
    route : /cart/:id
    live link : https://api-mystore8472.vercel.app/cart/:id
    requirement : token at header with key name 'authorization' and ID that you can get while fetching all product
    Note : Here we are sending ID through url and to create new record we only need id, quantity will be assigned by default as 1

------------------------------AUTH----------------------------------

11. Register new User
    method : POST
    route : /register
    live link : https://api-mystore8472.vercel.app/register
    requirement : body with object that includes firstname,lastname,gender,email,password,mobile

12. Log In User
    method:POST
    route:/login
    live link : https://api-mystore8472.vercel.app/login
    requirement : body with object that includes email,password

# Submission Link :
Github : https://github.com/harrysingh17022552/myStore
Vercel : https://api-mystore8472.vercel.app
