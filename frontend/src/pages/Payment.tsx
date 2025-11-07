/** @format */

const Payment = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-bg-image px-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Payment Details</h2>

        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-gray-800">Cardholder Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white focus:outline-none"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1 text-gray-800">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1 text-gray-800">CVV</label>
              <input
                type="password"
                placeholder="•••"
                className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff4757] hover:bg-[#ff5c67] text-white py-2 rounded-lg shadow-md transition"
          >
            Pay ₹120
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
