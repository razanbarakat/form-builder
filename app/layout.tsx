import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/ui/toaster";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import DesignerContextProvider from "@/components/context/DesignerContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Creat Next App",
  description: "Genareate by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <DesignerContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
       </DesignerContextProvider>
      </body>
    </html>
     </ClerkProvider>
  );
}
