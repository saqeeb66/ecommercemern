import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom"; // ✅ for redirection

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // ✅ default set to COD
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ for redirect

  const DELIVERY_CHARGE = "FREE DELIVERY";

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const finalAmount = totalCartAmount + DELIVERY_CHARGE;

  function handleInitiatePayment() {
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    // 🚫 Restrict PayPal and Razorpay
    if (paymentMethod === "paypal" || paymentMethod === "razorpay") {
      toast({
        title: "This service will come soon 🚀",
        variant: "destructive",
      });
      return;
    }

    // ✅ Only COD allowed
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: paymentMethod, // only cod now
      paymentStatus: "pending",
      totalAmount: finalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Order placed successfully 🎉",
          description: "Your order has been placed with Cash on Delivery.",
        });
        setTimeout(() => {
          navigate("/shop/account");
        }, 2000);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* Address Section */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        {/* Cart + Payment Section */}
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}

          {/* Price Summary */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">Subtotal</span>
              <span className="font-bold">INR {totalCartAmount}</span>
            </div>
            {/* <div className="flex justify-between">
              <span className="font-bold">Delivery Charges</span>
            </div> */}
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold">INR {totalCartAmount}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Select Payment Method</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal (🚫 Coming soon)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Razorpay (🚫 Coming soon)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery ✅
              </label>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePayment}
              className="w-full"
              style={{
                backgroundColor: "#FFC0CB",
                color: "#fff",
                border: "none",
              }}
            >
              {isPaymentStart && paymentMethod === "paypal"
                ? "Processing Paypal Payment..."
                : `Checkout with ${
                    paymentMethod.charAt(0).toUpperCase() +
                    paymentMethod.slice(1)
                  }`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
