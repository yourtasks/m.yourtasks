import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";
import { Montserrat } from "next/font/google";
import NavProvider from "@/components/providers/NavProvider";
import { Toaster } from "react-hot-toast";
import ModalProvider from "@/components/providers/ModalProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "YourTasks - Get All Tasks in one place",
  description: "YourTasks is a dedicated social media for ToDo's",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Toaster />
        <AuthProvider>
          <NavProvider />
          <ModalProvider />
          <main className="h-screen w-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
