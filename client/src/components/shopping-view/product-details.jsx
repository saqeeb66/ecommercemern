import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

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

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] h-[80vh] p-4 sm:p-12">
        {/* Left: Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right: Product Details + Reviews */}
        <div className="flex flex-col overflow-y-auto max-h-full">
          {/* Product Info */}
          <div className="mb-5">
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-lg mt-2 mb-4">
              {productDetails?.description}
            </p>

            <div className="flex items-center justify-between mb-2">
              <p
                className={`text-2xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                INR {productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 && (
                <p className="text-2xl font-bold text-muted-foreground">
                  INR {productDetails?.salePrice}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <StarRatingComponent rating={averageReview} />
              <span className="text-muted-foreground">
                ({averageReview.toFixed(2)})
              </span>
            </div>

            <div className="mt-5 mb-5">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Reviews Section */}
          <div className="flex-1 overflow-y-auto mt-5">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {reviews && reviews.length > 0 ? (
              <div className="grid gap-6">
                {reviews.map((reviewItem) => (
                  <div className="flex gap-4" key={reviewItem._id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Reviews</p>
            )}

            {/* Add Review */}
            <div className="mt-6 flex flex-col gap-2">
              <Label>Write a review</Label>
              <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review..."
              />
              <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
