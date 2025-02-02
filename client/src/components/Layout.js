import React from 'react'
// import { MutationExtraOptions } from './../../node_modules/@reduxjs/toolkit/src/query/endpointDefinitions';
import "../styles/LayoutStyles.css";
import { userSideMenu ,adminSideMenu} from "../SideMenu/sideMenu";
import { Link  , useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';


const Layout = ({children}) => {

const {user} = useSelector(state => state.user)    
const location = useLocation();
const navigate = useNavigate();


//logout function

    const handleLogout = () => {
        localStorage.clear();
        message.success("Logout Successfully");
        // <Navigate></>
        navigate("/login");
    }



    //rendering Sidemenu
    const SideMenu = user?.isAdmin ? adminSideMenu : userSideMenu;


  return (
    <>
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'>
                        <h6>Appointment's App</h6>
                        <hr/>
                    </div>
                    <div className='menu'>
                        {SideMenu.map(menu =>{
                            if (!menu) return null;
                            const isActive = location.pathname === menu.path;
                            return(
                                
                                <div className={`menu-item ${isActive && "active"}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                                </div>            
                                
                                
                            );
                        })}

                        

                                    <div className={`menu-item`} onClick={handleLogout}>
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        <Link to="/login">Logout</Link>
                                    </div>
                    </div>
                </div>




                <div className='content'>
                     <div className='header'>
                        <div className='header-content'>
                        <i className="fa-solid fa-bell"></i>
                     {/* <Link to="/profile">{user.name}</Link> */}
                     {user && <Link to="/profile">{user.name}</Link>}
                     </div>
                     </div>
                     <div className='body'>{children}</div>            
                
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout;