
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http'); 
const server = http.createServer(app); // Create server from Express app
const io = require('socket.io')(server); 



const registerController = require('./src/controllers/register-controller');
const loginController = require('./src/controllers/login-controller');
const registerVendorController = require('./src/controllers/register-vendor-controller');
const loginVendorController = require('./src/controllers/login-vendor-controller');
const userDetailsController = require('./src/controllers/user_details-controller');
const categoryController = require('./src/controllers/category-controller');
const subcategoryController = require('./src/controllers/subcategory-controller');
const productController = require('./src/controllers/product-controller');
const reviewController = require('./src/controllers/reveiw-controller');
const addressController = require('./src/controllers/adress-controller');
const orderController = require('./src/controllers/order-controller');
const offerController = require('./src/controllers/special-offer-controller');
const notificationController = require('./src/controllers/notification-controller');
const fpController = require('./src/controllers/forget-password-controller');
const searchController = require('./src/controllers/search-controller');
const detailscontroller = require('./src/controllers/update-details-controller');
const chatController = require('./src/controllers/chat-controller');





io.on('connection',chatController.onConnect);

mongoose.connect('mongodb://127.0.0.1:27017/HalalDokan', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

app.post('/api/v1/register', registerController.registerUser);
app.post('/api/v1/registerVendor', registerVendorController.registerVendor);

app.post('/api/v1/login', loginController.loginUser);
app.post('/api/v1/loginVendor', loginVendorController.loginVendor);

app.get('/api/v1/details/:nidNumber', userDetailsController.getUserDetails);


app.post('/api/v1/createCategory',categoryController.saveCategory);
app.get('/api/v1/allCategory',categoryController.getUserCategory);

app.post('/api/v1/createSubCategory',subcategoryController.saveSubCategory);
app.get('/api/v1/allSubCategory',subcategoryController.getSubCategory);

app.post('/api/v1/createProduct',productController.saveProduct);
app.get('/api/v1/getAllProduct',productController.getProduct);
app.get('/api/v1/getProductBySubcategory/:subcategoryId', productController.getProductBySubCategory);

app.post('/api/v1/giveReveiw',reviewController.addReveiw);
app.get('/api/v1/getReview/:productId', reviewController.getReview);

app.get('/api/v1/getAddressById/:userId',addressController.getAddressByUserId);
app.post('/api/v1/addAdress',addressController.insertAdress);

app.post('/api/v1/newOrder',orderController.createOrder);
app.get('/api/v1/getOrderById/:orderid',orderController.getOrderById);

app.get('/api/v1/getActiveOrder/:userid',orderController.getActiveOrder)
app.get('/api/v1/getPendingOrder/:userid',orderController.getPendingeOrder)
app.get('/api/v1/getCompletedOrder/:userid',orderController.getCompletedOrder)


app.post('/api/v1/newOffer',offerController.giverOffer);
app.get('/api/v1/getOffer/:userid',offerController.getOfferforUser);

app.get('/api/v1/getNotifications/:userid',notificationController.getNotification);
app.get('/api/v1/search/:string/:userId',searchController.search);
app.get('/api/v1/resetPassword/:number',fpController.checkUser);
app.get('/api/v1/verifyOtp/:number',fpController.verifyOtp);
app.get('/api/v1/changePassword/:number/:password',fpController.changePassword);

app.get('/api/v1/changeDetails/:id/:name',detailscontroller.changeName);
app.get('/api/v1/changeDetailsProfession/:id/:profession',detailscontroller.changeProfession);
app.post('/api/v1/updateNid', detailscontroller.updateNid);
app.post('/api/v1/getOldMessages',chatController.sendOldMessage);

app.get('/',(req,res)=>{
    
  res.send("Hi");
});

const PORT = process.env.PORT || 6969;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
