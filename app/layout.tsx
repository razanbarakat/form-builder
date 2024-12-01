import {
  ClerkProvider,

} from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
