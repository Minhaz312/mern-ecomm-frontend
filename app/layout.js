"use client"
import "./globals.css"
import Footer from "./../components/common/Footer"
import Navbar from "./../components/common/Navbar"
import BottomNav from "@/components/common/navigationbar/MobileNav"
import { Provider } from "react-redux"
import store from "@/states/store"
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className="bg-slate-50">
        <Provider store={store}>
        <main className='bg-slate-100 min-h-screen m-0 p-0 w-full'>
            <Navbar />
            <div className='cs-container'>
                {children}
            </div>
            <Footer />
        </main>
        </Provider>
      </body>
    </html>
  )
}
