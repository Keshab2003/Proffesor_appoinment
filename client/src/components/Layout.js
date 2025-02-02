import React from 'react'
// import { MutationExtraOptions } from './../../node_modules/@reduxjs/toolkit/src/query/endpointDefinitions';
import "../styles/LayoutStyles.css";
import { sideMenu } from "../SideMenu/sideMenu";
import { Link  , useLocation} from 'react-router-dom';


const Layout = ({children}) => {
const location = useLocation();
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
                        {sideMenu.map(menu =>{
                            const isActive = location.pathname === menu.path;
                            return(
                                <>
                                    <div key={menu.id} className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                
                                </>
                            )
                        })}
                    </div>
                </div>




                <div className='content'>
                     <div className='header'>Header</div>
                     <div className='body'>{children}</div>            
                
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout