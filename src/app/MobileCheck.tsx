import React, { useState, useEffect } from "react";

const MobileCheck = ({ children }: { children: React.ReactNode }) => {
  const [isMobileClient, setIsMobileClient] = useState<boolean | null>(null);

  const checkIfMobile = () => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Mobi|Android/i.test(userAgent);
      setIsMobileClient(isMobileDevice);
    }
  };

  useEffect(() => {
    checkIfMobile();

    const handleResize = () => {
      checkIfMobile();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobileClient === true) {
    return <>{children}</>;
  }

  const title =
    isMobileClient === null ? "Loading..." : "Mobile Only Application";
  const message =
    isMobileClient === null
      ? "Checking device type..."
      : "This application is designed for mobile devices only. Please access it from your smartphone or tablet.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1E1E1E] text-white p-4">
      <div className="max-w-md text-center p-8 border border-[#FFBB03] rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MobileCheck;
