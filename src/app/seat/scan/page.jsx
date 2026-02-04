// "use client";
// import { useEffect, useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import axios from "axios";

// export default function QRScannerPage() {
//   const [scannedData, setScannedData] = useState("");
//   const [isScanning, setIsScanning] = useState(false);
//   const [showMarkPresent, setShowMarkPresent] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const scannerRef = useRef(null);
//   const html5QrCodeRef = useRef(null);

//   // Get your domain - adjust this to match your actual domain
//   const ALLOWED_DOMAIN = window.location.origin; // e.g., "http://localhost:3000" or your production domain

//   useEffect(() => {
//     return () => {
//       // Cleanup on unmount
//       if (html5QrCodeRef.current && isScanning) {
//         html5QrCodeRef.current
//           .stop()
//           .then(() => {
//             html5QrCodeRef.current?.clear();
//           })
//           .catch((err) => console.error("Error stopping scanner:", err));
//       }
//     };
//   }, [isScanning]);

//   const startScanning = async () => {
//     try {
//       const html5QrCode = new Html5Qrcode("qr-reader");
//       html5QrCodeRef.current = html5QrCode;

//       const config = {
//         fps: 10,
//         qrbox: { width: 250, height: 250 },
//         aspectRatio: 1.0,
//       };

//       await html5QrCode.start(
//         { facingMode: "environment" }, // Use back camera
//         config,
//         (decodedText, decodedResult) => {
//           // QR code successfully scanned
//           handleQRScanned(decodedText);
//         },
//         (errorMessage) => {
//           // Scanning error (can be ignored, happens frequently)
//         }
//       );

//       setIsScanning(true);
//       setMessage("Scanning... Point camera at QR code");
//     } catch (err) {
//       console.error("Error starting scanner:", err);
//       setMessage(`Error: ${err.message || "Failed to start camera"}`);
//     }
//   };

//   const stopScanning = async () => {
//     if (html5QrCodeRef.current && isScanning) {
//       try {
//         await html5QrCodeRef.current.stop();
//         html5QrCodeRef.current.clear();
//         setIsScanning(false);
//         setMessage("Scanner stopped");
//       } catch (err) {
//         console.error("Error stopping scanner:", err);
//       }
//     }
//   };

//   const handleQRScanned = (decodedText) => {
//     setScannedData(decodedText);
//     stopScanning();

//     // Check if the scanned data is a URL and matches the allowed domain
//     try {
//       const url = new URL(decodedText);
//       if (url.origin === ALLOWED_DOMAIN) {
//         setShowMarkPresent(true);
//         setMessage(`Valid QR code from: ${url.origin}`);
//       } else {
//         setShowMarkPresent(false);
//         setMessage(`QR code from different domain: ${url.origin}`);
//       }
//     } catch (error) {
//       // Not a valid URL
//       setShowMarkPresent(false);
//       setMessage("Scanned data is not a valid URL");
//     }
//   };

//   const markAsPresent = async () => {
//     if (!scannedData) return;

//     setIsLoading(true);
//     setMessage("Marking as present...");

//     try {
//       // Make GET request with the scanned URL/string
//       const response = await axios.get(scannedData);
      
//       setMessage("Successfully marked as present!");
//       console.log("Response:", response.data);
      
//       // Reset after success
//       setTimeout(() => {
//         setScannedData("");
//         setShowMarkPresent(false);
//         setMessage("");
//       }, 2000);
//     } catch (error) {
//       console.error("Error marking present:", error);
//       setMessage(
//         `Error: ${error.response?.data?.message || error.message || "Failed to mark as present"}`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-center">QR Code Scanner</h1>

//         {/* Scanner Container */}
//         <div className="bg-gray-800 rounded-lg p-4 mb-6">
//           <div
//             id="qr-reader"
//             className="w-full rounded-lg overflow-hidden"
//             style={{ minHeight: isScanning ? "300px" : "0" }}
//           ></div>
//         </div>

//         {/* Controls */}
//         <div className="flex gap-4 justify-center mb-6">
//           {!isScanning ? (
//             <button
//               onClick={startScanning}
//               className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
//             >
//               Start Scanning
//             </button>
//           ) : (
//             <button
//               onClick={stopScanning}
//               className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
//             >
//               Stop Scanning
//             </button>
//           )}
//         </div>

//         {/* Message Display */}
//         {message && (
//           <div
//             className={`p-4 rounded-lg mb-4 ${
//               message.includes("Error")
//                 ? "bg-red-600/20 border border-red-500"
//                 : message.includes("Success")
//                 ? "bg-green-600/20 border border-green-500"
//                 : "bg-blue-600/20 border border-blue-500"
//             }`}
//           >
//             <p className="text-center">{message}</p>
//           </div>
//         )}

//         {/* Scanned Data Display */}
//         {scannedData && (
//           <div className="bg-gray-800 rounded-lg p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-3">Scanned Data:</h2>
//             <div className="bg-gray-700 p-4 rounded break-all">
//               <p className="text-sm">{scannedData}</p>
//             </div>
//           </div>
//         )}

//         {/* Mark as Present Button */}
//         {showMarkPresent && (
//           <div className="flex justify-center">
//             <button
//               onClick={markAsPresent}
//               disabled={isLoading}
//               className={`px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
//                 isLoading
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/50"
//               }`}
//             >
//               {isLoading ? "Processing..." : "✓ Mark as Present"}
//             </button>
//           </div>
//         )}

//         {/* Instructions */}
//         <div className="mt-8 bg-gray-800 rounded-lg p-6">
//           <h3 className="text-lg font-semibold mb-3">Instructions:</h3>
//           <ul className="space-y-2 text-gray-300">
//             <li>• Click "Start Scanning" to activate the camera</li>
//             <li>• Point your camera at a QR code</li>
//             <li>• The scanner will automatically detect and read the QR code</li>
//             <li>
//               • If the QR contains a URL from this domain, a "Mark as Present"
//               button will appear
//             </li>
//             <li>• Click the button to mark attendance</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
