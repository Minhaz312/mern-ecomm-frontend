import "./globals.css"
import Footer from "./../components/common/Footer"
import Navbar from "./../components/common/Navbar"
import StoreProvider from "@/states/store"
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className="bg-slate-50">
        <StoreProvider>
          <main className='bg-slate-100 min-h-screen m-0 p-0 w-full'>
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
