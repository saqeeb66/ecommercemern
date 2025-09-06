import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBasket,
  Sparkle,
  Shield,
  Trophy,
  Globe,
  MountainSnow,
  IceCreamBowl,
  Crown,
  FerrisWheel,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "banarasi", label: "Banarasi Saree", icon: ShoppingBasket },
  { id: "kanjeevaram", label: "Kanjeevaram Saree", icon: ShoppingBasket },
  { id: "bandhani", label: "Bandhani Saree", icon: ShoppingBasket },
  { id: "chanderi", label: "Chanderi Saree", icon: ShoppingBasket },
  { id: "paithani", label: "Paithani Saree", icon: ShoppingBasket },
  { id: "baluchari", label: "Baluchari Saree", icon: ShoppingBasket },
  { id: "bhagalpuri", label: "Bhagalpuri Silk Saree", icon: ShoppingBasket },
];

const brandsWithIcon = [
  { id: "sabyasachi", label: "Sabyasachi", icon: Sparkle },
  { id: "manishmalhotra", label: "Manish Malhotra", icon: Shield },
  { id: "ritukumar", label: "Ritu Kumar", icon: Trophy },
  { id: "bharatsthali", label: "BharatSthali", icon: Globe },
  { id: "jaypore", label: "Jaypore", icon: MountainSnow },
  { id: "libas", label: "Libas", icon: IceCreamBowl },
  { id: "soch", label: "Soch", icon: FerrisWheel },
  { id: "rmkv", label: "RmKV", icon: Crown },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen font-serif text-gray-800 bg-gray-50">
      {/* Banner Slider with warm gradient */}
      <div className="relative w-full h-[500px] overflow-hidden bg-gradient-to-br from-[#FFFAF0] via-[#FDF6F0] to-[#FFE5B4]">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                alt={`Banner slide ${index + 1}`}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000`}
              />
            ))
          : null}
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 hover:bg-white transition-colors shadow-md rounded-full"
          aria-label="Previous Slide"
        >
          <ChevronLeftIcon className="w-6 h-6 text-[#BA7D55]" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white transition-colors shadow-md rounded-full"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="w-6 h-6 text-[#BA7D55]" />
        </Button>
      </div>

      {/* Category Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-semibold text-center mb-6 text-[#BA7D55]">
            Shop by Category
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#BA7D55] to-[#D9A06B] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 rounded-lg border border-gray-200"
              >
                <CardContent className="flex flex-col items-center justify-center p-8 text-[#7B4B24]">
                  <categoryItem.icon className="w-14 h-14 mb-4 text-[#BA7D55]" />
                  <span className="font-semibold text-lg tracking-wide text-center">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-semibold text-center mb-6 text-[#BA7D55]">
            Shop by Brand
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#BA7D55] to-[#D9A06B] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 rounded-lg border border-gray-300"
              >
                <CardContent className="flex flex-col items-center justify-center p-8 text-[#7B4B24]">
                  <brandItem.icon className="w-14 h-14 mb-4 text-[#BA7D55]" />
                  <span className="font-semibold text-lg tracking-wide text-center">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Added */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://res.cloudinary.com/di27vloho/image/upload/v1756912510/saree2_wyrd7s.jpg"
              alt="About Us"
              className="rounded-lg shadow-lg object-cover w-full h-96"
            />
          </div>
          <div className="md:w-1/2 text-[#7B4B24]">
            <h2 className="text-4xl font-semibold mb-6 text-[#BA7D55]">About Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#BA7D55] to-[#D9A06B] mb-8 rounded-full"></div>
            <p className="text-lg leading-relaxed mb-4">
              Welcome to our exquisite saree collection! We are passionate about offering you timeless elegance, rich heritage, and unique craftsmanship. Each saree is carefully curated to bring you the finest quality and styles — from traditional Banarasi silks to vibrant Bandhanis and luxurious Kanjeevarams.
            </p>
            <p className="text-lg leading-relaxed">
              Our mission is to celebrate the beauty of Indian textiles and empower you with stunning sarees perfect for every occasion. Join us on this beautiful journey of tradition, culture, and style.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-semibold text-center mb-6 text-[#BA7D55]">
            Featured Products
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#BA7D55] to-[#D9A06B] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <div
                    key={productItem.id}
                    className="hover:scale-[1.03] transition-transform duration-300"
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
