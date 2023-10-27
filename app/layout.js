import "./globals.css"
import "./style.css"
import Footer from "./../components/common/Footer"
import Navbar from "./../components/common/Navbar"
import StoreProvider from "@/states/store"
import NextTopLoader from "nextjs-toploader"
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className="bg-slate-50">
      <NextTopLoader color="#010C80" height={2} shadow={false} showSpinner={false} />
        <StoreProvider>
          <main className='bg-slate-200 min-h-screen m-0 p-0 w-full'>
              <Navbar />
              <div className='cs-container'>
                  {children}
              </div>
              <Footer />
          </main>
        </StoreProvider>
      </body>
    </html>
  )
}
