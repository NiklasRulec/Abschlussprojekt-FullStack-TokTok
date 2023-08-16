import './LoadingScreen.css'

import Logo from "../../images/Logo.png"
// import LoadingImg from "../../images/LoadingAnimation.png"

import leaf1 from "../../images/LoadingLeafs/Vector.png"
import leaf2 from "../../images/LoadingLeafs/Vector1.png"
import leaf3 from "../../images/LoadingLeafs/Vector2.png"
import leaf4 from "../../images/LoadingLeafs/Vector3.png"
import leaf5 from "../../images/LoadingLeafs/Vector4.png"
import leaf6 from "../../images/LoadingLeafs/Vector5.png"
import leaf7 from "../../images/LoadingLeafs/Vector6.png"
import leaf8 from "../../images/LoadingLeafs/Vector7.png"

import { useEffect } from 'react'

const LoadingScreen = () => {
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       window.location.href = "/";
    //     }, 5000);
    
    //     return () => clearTimeout(timer);
    //   }, []);
    return ( 
        <>
        <section className='loader'>
            <div className='splash'>
                <div className='top-splash'>
                    <img src={leaf1} alt=""/>
                    <img src={leaf2} alt=""/>
                    <img src={leaf3} alt=""/>
                    <img src={leaf4} alt=""/>
                </div>
                <img src={Logo} className='splash-logo' alt="" />
                <div className='bottom-splash'>
                    <img src={leaf7} alt=""/>
                    <img src={leaf6} alt=""/>
                    <img src={leaf5} alt=""/>
                    <img src={leaf8} alt=""/>                    

                </div>
            </div>
                <div className='bottom-splash'>
                    {/* <img src={LoadingImg} alt="" /> */}
                    <div class="loading-img"></div>
                </div>                
        </section>
            
        </>
     );
}
 
export default LoadingScreen;