import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        {/* Mobile Menu Button */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-richblack-800 text-richblack-100"
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="fixed left-0 top-0 h-full w-64 bg-richblack-800 border-r border-richblack-700 p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-richblack-5">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-richblack-100 hover:text-richblack-5"
                >
                  ✕
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}
        
        <div className="mx-auto w-11/12 max-w-[1000px] py-4 md:py-10 px-4 md:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard