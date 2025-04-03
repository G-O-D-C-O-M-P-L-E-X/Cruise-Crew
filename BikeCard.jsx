import { useCart } from '../context/CartContext'

export default function BikeCard({ itemId, image, name, rating, rent, quantity }) {
  const { addToCart } = useCart() // Get the addToCart function from context

  // const handleAddToCart = () => {
  //   // addToCart({ image, name, rent, rating }) // Add bike details to cart
    
    
  // }

  const handleAddToCart = async () => {
    console.log(itemId)
    
    try {
      const token = localStorage.getItem("token"); // Ensure the user is authenticated
      console.log(token);
      if (!token) {
        alert("Please log in to add items to the cart.");
        return;
      }
  
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: JSON.stringify({ itemId, quantity}),
      });

      console.log(res)
  
      if (!res.ok) throw new Error("Failed to add item to cart");
  
      const updatedCart = await res.json();
      console.log("Cart Updated:", updatedCart);
      alert("Item added to cart!");
  
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Could not add item. Please try again.");
    }
  };
  

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {/* Rating Badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-stone-700 px-2 py-1 text-xs font-semibold text-white">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          {rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Available for daily rental
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 pt-0">
        <div className="text-lg font-bold text-gray-900">
          <span className="text-2xl">Rs.{rent}</span>
          <span className="text-sm text-gray-600">/day</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
