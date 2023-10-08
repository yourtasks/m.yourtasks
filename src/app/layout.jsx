import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "YourTasks - Get All Tasks in one place",
  description: "YourTasks is a dedicated social media for ToDo's",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="h-screen w-screen">{children}</main>
      </body>
    </html>
  );
}
