import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { DynamicThemeProvider } from "./providers";
import { Toaster } from "@/components/ui/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <DynamicThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </DynamicThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
