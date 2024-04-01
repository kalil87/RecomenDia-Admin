import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import AuthService from "../hooks/AuthService"
import { PATHS } from "../routes/paths"
import { SideBar } from "../components/SideBar/SideBar"
import { Header } from "../components/Header/Header"
import './Dashboard.css'
import useScreenWidth from "../hooks/UseScreenWidth"


export const DashboardLayout = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 1100;

  useEffect(() => {
    if(AuthService.getCurrentUser() == null) {
      navigate(PATHS.auth.root)
    }
  })

  return (
    <div className='home-container'>

      {
        !isMobile ? (
          <SideBar />
        ) : isMobile && open && (
          <>
            {open && (
              <div
                className="modal-background"
                onClick={() => {
                  setOpen(false);
                }}
              />
            )}
            <div className={`sidebar-mobile ${open ? 'open' : ''}`}>
              <SideBar />
            </div>
          </>
        )
      }

      {/* <div className={ `${!isMobile || open ? 'sidebar-mobile open' : 'sidebar-mobile'}` } >
        <SideBar />
      </div> */}

      
      <div className='home-main'>
        <Header handleOpen={() => setOpen(true)} />
        <div className='content-wrapper'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
