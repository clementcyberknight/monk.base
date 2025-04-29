export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-[#F7F0D9] overflow-y-auto">
      {/* Header Section */}
      <div className="bg-[#1E1E1E] pt-12 pb-6 rounded-b-[40px] text-white">
        <div className="px-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            GM Wells <span className="text-yellow-400">👋</span>
          </h1>
          <button className="p-1">
            <img src="/icons/scan.svg" alt="" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="mx-6 my-6">
          <div className="bg-[#ffb800] rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10">
              <img
                src="/icons/monk-dashboard.svg"
                alt="monk"
                className="h-32"
              />
            </div>
            <div className="flex items-center mb-2">
              <img src="/icons/filter.svg" alt="filter" />
            </div>
            <h2 className="text-3xl mt-12 font-bold text-black">₦4,045,300</h2>
            <p className="text-black text-bold">@BigWells</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mx-6 mb-2">
          <button className="flex-1 bg-[#2C2C2B] text-white rounded-full py-3 px-6 flex items-center justify-start gap-2">
            <div className="bg-[#1E1E1E] rounded-full -ml-2 p-3">
              <img src="/icons/ArrowBendRightUp.svg" alt="" />
            </div>
            <span>Send</span>
          </button>
          <button className="flex-1 bg-[#2C2C2B] text-white rounded-full py-3 px-6 flex items-center justify-start gap-2">
            <div className="bg-[#1E1E1E] rounded-full -ml-2 p-3">
              <img src="/icons/ArrowBendLeftDown.svg" alt="" />
            </div>
            <span>Receive</span>
          </button>
        </div>
      </div>

      {/* Quick Services */}
      <div className="px-6 mt-6 mb-4">
        <h3 className="text-lg font-semibold mb-3">Quick Services</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "SimCard", label: "Airtime" },
            { icon: "WifiHigh", label: "Data" },
            { icon: "plant", label: "Invest" },
            { icon: "LightbulbFilament", label: "Bills" },
          ].map((service) => (
            <div
              key={service.label}
              className="bg-[#F2E6BE] shadow-inner rounded-lg p-3 flex flex-col items-center"
            >
              <div className="h-7 w-8 flex  items-center justify-center">
                <img src={`/icons/${service.icon}.svg`} alt={service.label} />
              </div>
              <span className="text-xs font-semibold mt-1">
                {service.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Recent</h3>
          <button className="text-sm text-[#1E1E1E]">more</button>
        </div>
        <div className="space-y-3">
          {[
            {
              img: "airtel",
              title: "Airtime Top-up",
              time: "2mins ago",
              amount: "- ₦2,000",
            },
            {
              img: "usdc",
              title: "Sent: USDC",
              time: "30mins ago",
              amount: "- ₦27,000",
            },
            {
              img: "monie",
              title: "Received: Emeka",
              time: "2hrs ago",
              amount: "+ ₦132,500",
            },
            {
              img: "solana",
              title: "Received: Solana",
              time: "last week",
              amount: "+ ₦2,000,000",
            },
          ].map((tx) => (
            <div
              key={tx.title + tx.time}
              className="bg-[#F2E6BE] rounded-lg p-2 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-15 h-15 flex items-center justify-center">
                  <img
                    src={`/icons/${tx.img}.svg`}
                    alt={tx.title}
                    className="w-15 h-15"
                  />
                </div>
                <div>
                  <p className="font-semibold">{tx.title}</p>
                  <p className="text-xs text-[#1E1E1E]">{tx.time}</p>
                </div>
              </div>
              <span className="font-semibold text-[#1E1E1E]">{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
