
import Home from "./views/Home.js";
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

import RegisterPage from "./views/RegisterPage.js";
import LoginPage from "views/examples/LoginPage.js";
import OwnShop from "./views/OwnShop.js";
import ShopLoginPage from "./views/ShopLogin.js";
import Verification from "./views/Verification.js";
import UploadShopAvatar from "./views/UploadShopAvatar.js";
import VerifyEmail from "./views/VerifyEmail.js";
import WaitVerification from "./views/wait-verification.js";

import Knust from "./views/CampusHome/KNUST.js";
import Ucc from "./views/CampusHome/UCC.js";
import Legon from "./views/CampusHome/LEGON.js";
import Uner from "./views/CampusHome/UNER.js";
import Umat from "./views/CampusHome/UMAT.js";
import Upsa from "./views/CampusHome/UPSA.js";



var routes = [
    {
      path: "/home",
      component: Home,
      layout: "/user"
    },
    {
      path: "/campus-home/KNUST",
      component: Knust,
      layout: "/user"
    },
    {
      path: "/campus-home/UCC",
      component: Ucc,
      layout: "/user"
    },
    {
      path: "/campus-home/LEGON",
      component: Legon,
      layout: "/user"
    },
    {
      path: "/campus-home/UENR",
      component: Uner,
      layout: "/user"
    },
    {
      path: "/campus-home/UMAT",
      component: Umat,
      layout: "/user"
    },
    {
      path: "/campus-home/UPSA",
      component: Upsa,
      layout: "/user"
    },
    {
        path: "/product-details",
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
        path: "/upload-images",
        component: UploadImages,
        layout: "/user"
      },
      {
        path: "/shop-view",
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
        layout: "/auth"
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
        layout: "/auth"
      },
      {
        path: "/shop-login",
        protectedShopLogin:true,
        component: ShopLoginPage,
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
        path: "/email/verify/:userId",
        component: VerifyEmail,
        layout: "/api/auth"
      },,
      {
        path: "/wait-verification",
        component: WaitVerification,
        layout: "/auth"
      },

];
export default routes;