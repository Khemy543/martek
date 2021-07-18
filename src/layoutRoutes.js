import DetailsPage from "./views/DetailsPage.js";
import Cart from "./views/Cart";
import Categories from "./views/Categories.js";
import AddProduct from "./views/AddProduct.js";
import SearchResults from "./views/SearchResults.js";
import Profile from "./views/Profile.js";
import EditProfile from "./views/EditProfile.js";
import UploadImages from "./views/UploadImages.js";
import ShopView from "./views/ShopView.js";
import ShopFollowing from "./views/ShopFollowing.js";

import AddToShop from "./views/AddToShop.js";
import Settings from "./views/Settings.js";
import EditProduct from "./views/EditProduct.js";
import ShopDetailsPage from "./views/ShopPageDetails.js";
import ShopUploadImages from "./views/ShopProductUpload.js";
import ShopPage from "views/examples/ShopPage.js";
import UserProducts from "./views/UserProducts.js";

import RegisterPage from "./views/RegisterPage.js";
import LoginPage from "views/examples/LoginPage.js";
import OwnShop from "./views/OwnShop.js";
import ShopLoginPage from "./views/ShopLogin.js";
import Verification from "./views/Verification.js";
import UploadShopAvatar from "./views/UploadShopAvatar.js";
import VerifyEmail from "./views/VerifyEmail.js";
import WaitVerification from "./views/wait-verification.js";

import UserProductDetails from "views/UserProductDetails.js";
import UserEditProduct from "views/UserEditProduct.js";
import VerifyShopEmail from "views/verifyShopMail.js";
import WaitShopVerification from "views/await-shopVerification.js";
import ForgotPassword from "views/ForgetPassword/ForgotPassword.js";
import ResetPassword from "views/ResetPassword/ResetPassword.js";
import ContactUs from "views/ContactUs.js";
import UserDetails from "views/Payment/UserDetails.js";
import UserAccountDetails from "views/Payment/UserAccountDetails.js";
import ShopForgetPassword from "views/ForgetPassword/ShopForgetPassword.js";
import ShopResetPassword from "views/ResetPassword/ShopResetPassword.js";
import Charges from "views/Documents/Charges.js";
import HelpCenter from "views/Documents/HelpCenter"
import BuyOnMartek from "views/Documents/BuyOnMartek.js";
import OwnShopMartek from "views/Documents/OwnShop.js";
import SellOnMartek from "views/Documents/SellOnMartek.js";
import TermsAndCondition from "views/Documents/TermsAndConditon.js";
import PrivacyPolicy from "views/Documents/Privacy.js";
import AboutUs from "views/Documents/AboutUs.js";
import UploadValidID from "views/UploadFirstTimeID.js";
import ReportShop from "views/ReportShop.js";
import All from "views/Home/All.js";
import ReportProduct from "views/ReportProduct.js";
import DeleteShop from 'views/Delete/DeleteShop.js';
import ShopAccountDetails from "views/Payment/ShopAccountDetails.js";
import ShopDetails from "views/Payment/ShopDetails.js";
import ProductPaymentVerification from "views/Payment/productPaymentVerificaton.js";
import ShopPaymentVerification from "views/Payment/shopPaymentVerification.js";
import UserTransactions from "views/Transactions/UserTransactions.js";
import ShopTransactions from "views/Transactions/ShopTransactions.js";
import FreeConditions from "views/Payment/freeCondtions.js";
import ProductFreeTrial from "views/Payment/ProductFreeTrial.js";

import ManageAd from 'views/ManageAd.js';
import Terms from "views/Documents/Terms.js";
import Privacy from "views/Documents/PrivacyPolicy.js";



var routes = [
    {
      path: "/home",
      component: All,
      layout: "/user"
    },
    {
        path: "/product-details/:id/:product_name",
        component: DetailsPage,
        layout: "/user"
      },
      {
        path: "/cart",
        component: Cart,
        layout: "/user"
      },
      {
        path: "/categories",
        component: Categories,
        layout: "/user"
      },
      {
        path: "/add-product",
        protectedRoute:true,
        component: AddProduct,
        layout: "/user"
      },
      {
        path: "/add-product-validation",
        protectedRoute:true,
        component: UploadValidID,
        layout: "/user"
      },
      {
        path: "/search-results",
        component: SearchResults,
        layout: "/user"
      },
      {
        path: "/profile",
        protectedRoute:true,
        component: Profile,
        layout: "/user"
      },
      {
        path: "/edit-profile",
        protectedRoute:true,
        component: EditProfile,
        layout: "/user"
      },
      {
        path: "/user-products",
        component: UserProducts,
        layout: "/user"
      },
      {
        path: "/edit-user-products",
        component: UserEditProduct,
        layout: "/user"
      },
      {
        path: "/user-product-details",
        component: UserProductDetails,
        layout: "/user"
      },
      {
        path: "/upload-images",
        component: UploadImages,
        layout: "/user"
      },
      {
        path: "/shop-view/:id/:shop_name",
        component: ShopView,
        layout: "/user"
      },
      {
        path: "/following",
        protectedRoute:true,
        component: ShopFollowing,
        layout: "/user"
      },
      {
        path: "/contact-us",
        component: ContactUs,
        layout: "/user"
      },
      
      {
        path: "/payment/information",
        component: UserDetails,
        layout: "/user"
      },
      {
        path: "/payment/account",
        component: UserAccountDetails,
        layout: "/user"
      },
      {
        path: "/payment/verification",
        component: ProductPaymentVerification,
        layout: "/user"
      },
      {
        path: "/payment/information",
        component: ShopDetails,
        layout: "/shop"
      },
      {
        path: "/payment/account",
        component: ShopAccountDetails,
        layout: "/shop"
      },
      {
        path: "/payment/verification",
        component: ShopPaymentVerification,
        layout: "/shop"
      },
      {
        path: "/transactions",
        component: UserTransactions,
        layout: "/user"
      },
      {
        path: "/transactions",
        component: ShopTransactions,
        layout: "/shop"
      },
      {
        path: "/service-charges",
        component: Charges,
        layout: "/user"
      },
      {
        path: "/help-center",
        component: HelpCenter,
        layout: "/user"
      },
      {
        path: "/how-to-buy-on-martek",
        component: BuyOnMartek,
        layout: "/user"
      },
      {
        path: "/own-shop-on-martek",
        component: OwnShopMartek,
        layout: "/user"
      },
      {
        path: "/sell-on-martek",
        component: SellOnMartek,
        layout: "/user"
      },
      {
        path: "/terms-and-condition",
        component: TermsAndCondition,
        layout: "/user"
      },
      {
        path: "/privacy-policy",
        component: PrivacyPolicy,
        layout: "/user"
      },
      {
        path: "/about-us",
        component: AboutUs,
        layout: "/user"
      },
      {
        path: "/add-to-shop",
        protectedShopRoute:true,
        component: AddToShop,
        layout: "/shop"
      },
      {
        path: "/settings",
        protectedShopRoute:true,
        component: Settings,
        layout: "/shop"
      },
      {
        path: "/:id/manage-ad",
        protectedShopRoute:true,
        component: ManageAd,
        layout: "/shop"
      },
      {
        path: "/edit-product",
        component: EditProduct,
        layout: "/shop"
      },
      {
        path: "/shop-product-details",
        component: ShopDetailsPage,
        layout: "/shop"
      },
      {
        path: "/upload-shop-images",
        component: ShopUploadImages,
        layout: "/shop"
      },
      {
        path: "/shop-page",
        protectedShopRoute:true,
        component: ShopPage,
        layout: "/shop"
      },
      {
        path: "/shop-register",
        protectedShopLogin:true,
        component: OwnShop,
        layout: "/user"
      },
      {
        path: "/login-page",
        component: LoginPage,
        protectedLogin:true,
        layout: "/auth"
      },
      {
        path: "/register",
        protectedLogin:true,
        component: RegisterPage,
        layout: "/user"
      },
      {
        path: "/shop-login",
        protectedShopLogin:true,
        component: ShopLoginPage,
        layout: "/auth"
      },
      {
        path: "/forgot-password",
        component: ForgotPassword,
        layout: "/auth"
      },
      {
        path: "/shop-forgot-password",
        component: ShopForgetPassword,
        layout: "/auth"
      },
      {
        path: "/reset-password",
        component: ResetPassword,
        layout: "/auth"
      },
      {
        path: "/shop-reset-password",
        component: ShopResetPassword,
        layout: "/auth"
      },
      {
        path: "/upload-avatar",
        component: UploadShopAvatar,
        layout: "/auth"
      },
      {
        path: "/verification",
        component: Verification,
        layout: "/auth"
      },
      {
        path: "/email/verify",
        component: VerifyEmail,
        layout: "/api/auth"
      },
      {
        path: "/wait-verification",
        component: WaitVerification,
        layout: "/auth"
      },
       {
        path: "/shopmail/verify",
        component: VerifyShopEmail,
        layout: "/api/auth"
      },
      {
        path: "/wait-shop-verification",
        component: WaitShopVerification,
        layout: "/auth"
      },
      {
        path: "/report-shop",
        component: ReportShop,
        layout: "/user"
      },
      {
        path: "/report-product",
        component: ReportProduct,
        layout: "/user"
      },
      {
        path: "/delete-shop",
        component: DeleteShop,
        layout: "/shop"
      },
      {
        path: "/shop/free-trial",
        protectedShopLogin:true,
        component: FreeConditions,
        layout: "/user"
      },
      {
        path: "/product/free-trial",
        component: ProductFreeTrial,
        layout: "/user"
      },
      {
        path: "/terms-conditions",
        component: Terms,
        layout: "/user"
      },
      {
        path: "/privacy-and-policy",
        component: Privacy,
        layout: "/user"
      },

];
export default routes;