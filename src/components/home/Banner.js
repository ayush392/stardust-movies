import React from 'react'
import Carousel from 'react-material-ui-carousel'
import './banner.css';
import { useNavigate } from 'react-router-dom'


const Banner = () => {

    const imag1 = "https://th.bing.com/th/id/R.c934282c6facb2af3914b2083772b1ae?rik=XFXzAstONoPUAg&riu=http%3a%2f%2fthefilmstage.com%2fwp-content%2fuploads%2f2014%2f09%2finterstellar_banner.jpg&ehk=OkYhM7vVZs%2bJU43lH27TZ60%2b5380r%2bYqWTUI%2f6sq8%2f4%3d&risl=&pid=ImgRaw&r=0"
    const imag2 = "https://themarketactivity.com/wp-content/uploads/2020/07/maxresdefault.jpg"
    const imag3 = 'https://posterspy.com/wp-content/uploads/2020/04/DuneFINAL-1200x609.jpg'
    const imag4 = 'https://4.bp.blogspot.com/-Mv9IWmbh_XU/Wlj3Pjmi-zI/AAAAAAAAVRQ/HZbApZJfI9YDiJPACij78PFLY6VSletlACLcBGAs/s1600/Coco-Pre-Order.JPG'
    
    const history = useNavigate('');


    return (
        <Carousel
            className="carasousel"
            autoPlay={true}
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            navButtonsProps={{
                style: {
                    background: "rgba(114, 114, 114,.2)",
                    color: "rgb(114, 114, 114)",
                    borderRadius: '5px',
                    marginTop: -22,
                    height: "104px",
                }
            }}>


            <img src={imag1} alt="img" onClick={() => history('/movie/157336')} className="banner_img" />
            <img src={imag2} alt="img" onClick={() => history('/movie/361743')} className="banner_img" />
            <img src={imag3} alt="img" onClick={() => history('/movie/438631')} className="banner_img" />
            <img src={imag4} alt="img" onClick={() => history('/movie/354912')} className="banner_img" />


        </Carousel>
    )
}

export default Banner