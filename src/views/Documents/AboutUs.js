import React,{useState} from 'react';
import axios from 'axios';

//import reactstrap
import{
    Container,
    Col,
    Row,Table,
    Card,
    CardBody,
    Button, Alert,
    Form,Input, InputGroup,
    InputGroupAddon,InputGroupText,CardHeader
} from "reactstrap";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';


export default function AboutUs(){
    const [IsMobile, setIsMobile] = React.useState(false)


    React.useEffect(()=>{

        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 800);
        }, false);
    },[])

    const layout = IsMobile ? false : true 
    return(
        <div className="main"> 
                    <div className="section">
                    <Container>
                    <Row style={{marginTop:"40px"}}>
                        <Col>
                        <Card className="card-plain" style={{backgroundColor:"white"}}>
                            
                    <Row>
                        <Col md="10" style={{marginLeft:"auto", marginRight:"auto"}}>
                            <h3 style={{textAlign:"center", fontWeight:600}}>Welcome To Martek's Help And Support Page</h3>
                            <p style={{textAlign:"center"}}>Here you can find answers to our most frequently asked questions and learn about Martek, how to use it, how to stay safe and how to get in touch with us.</p>
                            <div style={{textAlign:"center"}}>
                            <img alt="#" src={require("assets/img/help.jpg")} style={{height:"auto", width:"100%"}} />
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <Row >
                        <Col>
                        <Tabs defaultTab="vertical-tab-one" vertical={layout}>
                            <TabList>
                            <Tab tabFor="vertical-tab-one" style={{textAlign:"left"}}>About Us <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-two" style={{textAlign:"left"}}>Terms & Conditions <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-three" style={{textAlign:"left"}}>Privacy <i className="fa fa-chevron-right"/></Tab>
                            </TabList>

                            <TabPanel tabId="vertical-tab-one">
                                <Container>
                                    <Row>
                                        <Col>
                                            <p>
                                            <b>About Us</b>
                                            <br/><br/>
                                            Martek is a multifunctional cross-campus e-commerce platform, which gives every student in any tertiary institution the opportunity to sell or buy items from their colleagues within or outside their campus. It is easy to use and extremely convenient. Martek aims to connect all kinds of student customers to all kinds of student businesses.
                                            <br/><br/>
                                            Before the introduction of Martek, social media was the students’ closest hope to buy or sell items and we are glad that the excruciating era is over. Social media is a good platform for socializing but not the most appropriate tool for growing a business. With Martek, all campus businesses will be collectively available on one platform.
                                            <br/><br/>
                                            Martek is the solution to the campus market needs and therefore has every single student's business need catered for. Martek was made by students, with students and for students. Although the idea was conceived in 2017, Martek was established in 2018 and officially launched in 2020.
                                            <br/><br/>
                                            If you'd like to get in touch with us go to Contact Us.
                                            <br/><br/><br/><br/>
                                            </p>
                                        </Col>
                                    </Row>
                                </Container>
                            </TabPanel>

                            <TabPanel tabId="vertical-tab-two">
                                <Container>
                                <Row>
                                    <Col md="12" lg="12" sm="12" xs="12" >
                                            <p>
                                            <b>Terms & Conditions</b>
                                            <br/>
                                            <br/>
                                            Martekgh.com is a service provided by Tech Marche Company Ltd (TMCL) (subject to your compliance with the Terms and Conditions stated below). Please read these Terms and Conditions before using this website. By using this site, you have agreed to the terms and conditions regulating the use of Martekgh.com
                                            <br/>
                                            <br/>
                                            <b>General</b>
                                            <br/><br/>
                                            Users are responsible for ensuring that content (text, images, and graphics) uploaded for inclusion on Martekgh.com complies with all applicable laws. Marketgh.com & TMCL assumes no responsibility for any illegality or any inaccuracy of the content.<br/><br/>
                                            
                                            Users guarantee that contents do not violate any copyright, intellectual property rights, or other rights of any person or entity, and agrees to release Martekgh.com & TMCL from all obligations, liabilities, and claims arising in connection with the use of (or the inability to use) the service.
                                            <br/><br/>
                                            <b>Copyright</b>
                                            <br/><br/>
                                            Advertisers/users grant Martekgh.com & TMCL a perpetual, royalty-free, irrevocable, non-exclusive right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from and distribute such content or incorporate such content into any form, medium, or technology now known or later developed.
                                            <br/><br/>
                                            All content included in or made available through Martekgh.com, such as text, graphics, logos, button icons, images, and data compilations is the property of Martekgh.com & TMCL and protected by The Companies Act of Ghana 2019(Act 992) and international copyright laws.   is the exclusive property of TMCL 
                                            Content Safety
                                            Martekgh.com & & TMCL reserves the right to change parts of content, for editorial purposes. Martekgh.com & TMCL reserves the right not to publish images, text, or graphics that are irrelevant, abusive, derogatory, or discriminative and that violate these terms and conditions.
                                            <br/><br/>
                                            <b>Your Account</b>
                                            <br/><br/>
                                            You may need your own Martekgh.com account to use certain services, and you may be required to be logged into the account(s) depending on what you decide to do on the website. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account, and you agree to accept responsibility for all activities that occur under your account or password. Martekgh.com & TMCL reserves the right to refuse service, terminate accounts, and terminate your rights to use Martekgh.com or to remove or edit content included on the website.
                                            <br/><br/>
                                            <b>Personal</b>
                                            <br/><br/>
                                            Martekgh.com & TMCL has the right to cooperate with authorities in case any content violates the law (engagement in fraudulent activities). Martekgh.com & TMCL may provide the identity of users or buyers and also give out images of Identification cards to appropriate authorities. IP addresses may also be registered to ensure compliance with the terms and conditions.
                                            <br/><br/>
                                            <b>Privacy</b>
                                            <br/><br/>
                                            Marketgh.com will collect information from Users. It is a condition of use of Martekgh.com that each User and advertiser consents and authorises Martekgh.com & TMCL to collect and use this information. Martekgh.com & TMCL will not disclose personal information to other users on the platform except for;
                                            <br/> <br/>
                                            I.	User’s name <br/>
                                            II.	User’s contact (upon purchase request)<br/>
                                            III.	User’s email address (upon purchase request)<br/>
                                            <br/><br/>
                                            Martekgh.com & TMCL also reserves the right to disclose it to Company Affiliates and any other person to administer, support and maintaining Martekgh.com & TMCL as well as for improving Martekgh.com. For example, by using the information for research, marketing, and product development and planning.
                                            <br/><br/>
                                            <b>User’s Information</b>
                                            <br/><br/>
                                            Users are required to submit a valid name, email address, images of their institution’s identification card, their institution’s name, and phone numbers before they are allowed to sell/advertise on Martekgh.com. The email address and phone number of the user may be displayed upon request to allow other users to make enquiries or purchases.
                                            <br/><br/>
                                            <b>Product Descriptions</b>
                                            <br/><br/>
                                            Martekgh.com does not guarantee that product description or other content of any seller is accurate, complete, reliable, current, or error-free. If a product is sold by a misleading description, the seller is held accountable and responsible. Martekgh.com reserves the right to remove any misleading product especially after reports from other users. 
                                            <br/><br/>
                                            <b>Verification</b>
                                            <br/><br/>
                                            Martekgh.com & TMCL reserves the right to vet advertisements, sellers, and shop profiles before they or their items are displayed on the website. All prospective sellers/shop profiles will be vetted and verified by Martekgh.com & TMCL before they are allowed to sell or advertise on the website. All images of identification cards submitted by prospective sellers or advertisers must be very clear to avoid automatic dismissals.
                                            <br/><br/>
                                            <b>Paid content and services</b>
                                             <br/><br/>
                                            Some content and services of Martekgh.com & Tech Marche require payment, including but not limited to, selling individual item(s), posting of advertisement, and owning shop(s).
                                            <br/><br/>
                                            Advertisers and sellers may be required to transfer Paid Content information fees through a third-party service provider, which may be governed by its terms of use. Linking to any third-party service providers is at the Users' own risk and Martekgh.com & TMCL disclaims all liability related thereto. Under no circumstances shall Martekgh.com & Tech Marche be obliged to refund any payments made concerning Paid Content.
                                            <br/><br/>
                                            Martekgh.com & Tech Marche reserves the right to modify the fees to be paid for owning a shop, posting, and item and posting an advertisement. Martekgh.com & Tech Marche is not obligated to refund money if any of the above services are cancelled early, for any reason.
                                            <br/><br/>
                                            <b>Advertisement and Products</b>
                                            <br/><br/>
                                            Every advertisement and product images/graphics on the website will require aesthetics and a quality that will complement the Martekgh.com brand’s look, feel, and user experience. Martekgh.com & Tech Marche will therefore not hesitate to dismiss any advertisement if it’s quality or aesthetics is below what is set by Martekgh.com & Tech Marche. Grammatical errors, organisation/layout, colours, and profanity are amongst the criteria used in verification of advertisement and products of Martekgh.com.
                                            <br/><br/>
                                            <b>Non-student shops</b>
                                            <br/><br/>
                                            Martekgh.com will be very selective about non-student shops, and will only be able to add shops belonging to outsiders who are known and verified by Martekgh.com & Tech Marche and can easily be located in the case of any violations of these terms and conditions. Non-student shops will therefore be more liable and can be trusted.
                                            <br/><br/>
                                            <b>Student Shops</b> 
                                            <br/><br/>
                                            Martekgh.com will create a Shop on behalf of the users who pass the verification process. A Shop is a dedicated webpage on Martekgh.com, maintained by Martekgh.com, with content provided by the user. Martekgh.com & Tech Marche has the right to any content added to the Shop by the user and has the right to remove or not publish the content if it violates any aspect of the Terms and Conditions.
                                            <br/><br/>
                                            <b>Site Availability</b>
                                            <br/><br/>
                                            Martekgh.com & Tech Marche does not guarantee continuous or secure access to the Web Site. The Web Site is provided "as is" and as and when available.
                                            <br/><br/>
                                            <b>Third-Party Websites</b>
                                            <br/><br/>
                                            Martekgh.com may contain links or references to other websites ('Third Party Websites'). Martekgh.com & TMCL shall not be responsible for the contents in Third-Party Websites. Third-Party Websites are not investigated or monitored. In the event where the user decides to leave Martekgh.com and access Third Party Sites, the user does so at his/her own risk.
                                            <br/><br/>
                                            <b>Disclaimer</b><br/><br/>
                                            Martekgh.com & TMCL assume no responsibility what so ever for the use of Martekgh.com and disclaims all responsibility for any injury, claim, liability, or damage of any kind resulting from or arising out of or any way related to <br/>
                                            a)	any errors on Martekgh.com or the Content, including but not limited to technical errors and typographical errors, <br/>
                                            b)	any third-party web sites or content directly or indirectly accessed through links in Martekgh.com,<br/>
                                            c)	the unavailability of Martekgh.com,<br/>
                                            d)	your use of Martekgh.com & TMCL, and<br/>
                                            e)	your use of any equipment (or software) in connection with Martekgh.com & Tech Marche <br/>
                                            <br/><br/>
                                            <b>Indemnification</b>
                                            <br/><br/>
                                            Users agree to indemnify Martekgh.com & Tech Marche as well as its officers, directors, employees, agents, from and against all losses, expenses, damages, and costs, including attorney's fees, resulting from any violation of this Terms and Conditions (including negligent or wrongful conduct).
                                            <br/><br/>
                                            <b>Modifications</b><br/><br/>
                                            Martekgh.com & TMCL reserves the right to modify these Terms and Conditions. Revised modifications shall be effective immediately modifications are posted on Martekgh.com. You are responsible for the reviewing of revised modifications. Your continued access or use of Martekgh.com shall be deemed your acceptance of the modified terms and conditions.
                                            <br/><br/>
                                            <b>overning Law</b>
                                            <br/><br/>
                                            Martekgh.com & Tech Marche is operated under the laws and regulations of Ghana. Advertisers, shops, and users agree that courts in Ghana will have jurisdiction over any dispute or claim relating to the use of Martekgh.com & TMCL.
                                            <br/><br/>
                                            We do not allow the following:<br/>
                                            •	an item or service that is illegal in Ghana<br/>
                                            •	an item or service that is not located in Ghana<br/>
                                            •	an invalid phone number or email address<br/>
                                            •	an unrealistic offer<br/>
                                            •	offensive language<br/>
                                            •	offensive pictures<br/>
                                            •	text in the title or description that is not related to the advertised item or service<br/>
                                            •	pictures that do not match or clearly show the advertised item or service<br/>
                                            •	text in the picture (except logos and product codes)<br/>
                                            •	a non-specific item or service, e.g. a description of a company in general terms<br/>
                                            •	a URL link that is not relevant to the advertised item or service<br/>
                                            •	multiple items in the same ad<br/>
                                            •	counterfeit goods, knockoffs, or replica versions of another company’s product<br/>
                                            <br/>
                                            <b>Cookies</b>
                                            <br/><br/>
                                            This site uses cookies, which means that you must have cookies enabled on your computer for all functionality on this site to work properly. A cookie is a small data file that is written to your hard drive when you visit certain Web sites. Cookie files contain certain information, such as a random number of the user ID that the site assigns to a visitor to track the pages visited. A cookie cannot read data off your hard disk or read cookie files created by other sites. Cookies, by themselves, cannot be used to find out the identity of any user.
                                            <br/><br/>
                                            <b>Updates</b><br/><br/>
                                            We may automatically modify or upgrade the Martekgh.com & Tech Marche website and associated services at any time and without notice to you.


                                            <br/>
                                            <br/>
                                            <br/>
                                            </p>
                                    </Col>    
                                </Row>
                                </Container>
                            </TabPanel>
                                    <TabPanel tabId="vertical-tab-three">
                                    <Container>
                                    <Row>
                                        <Col md="12" lg="12" sm="12" xs="12">
                                                <p>
                                                <b>Privacy Policy</b><br/><br/>
                                                <b>About this Notice</b><br/><br/>
                                                This Privacy and Cookie Notice provides information on how Martek collects and processes your personal data when you visit our website.
                                                <br/><br/>
                                                <b>The data we collect about you</b>
                                                <br/><br/>
                                                We collect your personal data in order to provide and continually improve our products and services.<br/>
                                                We may collect, use, store and transfer the following different kinds of personal data about you:<br/>
                                                •	Information you provide to us: We receive and store the information you provide to us including your identity data, contact data, delivery address and financial data.<br/>
                                                •	Information on your use of our website and/or mobile applications: We automatically collect and store certain types of information regarding your use of the Jumia marketplace including information about your searches, views, downloads and purchases.<br/>
                                                •	Information from third parties and publicly available sources: We may receive information about you from third parties including our carriers; payment service providers; merchants/brands; and advertising service providers.<br/>
                                                <br/>
                                                <b>Cookies and how we use them</b>
                                                <br/><br/>
                                                A cookie is a small file of letters and numbers that we put on your computer if you agree. Cookies allow us to distinguish you from other users of our website and mobile applications, which helps us to provide you with an enhanced browsing experience. For example we use cookies for the following purposes:<br/>
                                                •	Recognising and counting the number of visitors and to see how visitors move around the site when they are using it (this helps us to improve the way our website works, for example by ensuring that users can find what they are looking for).<br/>
                                                •	Identifying your preferences and subscriptions e.g. language settings, saved items, items stored in your basket and Prime membership; and<br/>
                                                •	Sending you newsletters and commercial/advertising messages tailored to your interests.<br/>
                                                <br/><br/>
                                                Our approved third parties may also set cookies when you use our marketplace. Third parties include search engines, providers of measurement and analytics services, social media networks and advertising companies.
                                                <br/><br/>
                                                <b>How we use your personal data</b><br/><br/>
                                                We use your personal data to operate, provide, develop and improve the products and services that we offer, including the following:<br/>
                                                •	Registering you as a new customer.<br/>
                                                •	Managing your relationship with us.<br/>
                                                •	Enabling you to participate in promotions, competitions and surveys.<br/>
                                                •	Improving our website, applications, products and services<br/>
                                                •	Recommending/advertising products or services which may be of interest to you.<br/>
                                                •	Complying with our legal obligations, including verifying your identity where necessary.<br/>
                                                •	Detecting fraud.<br/>
                                                <br/><br/>
                                                <b>How we share your personal data</b><br/><br/>
                                                We may need to share your personal data with third parties for the following purposes:<br/>
                                                •	Sale of products and services: In order to deliver your products and services purchased on our marketplace from third parties, we may be required to provide your personal data to such third parties.<br/>
                                                •	Working with third party service providers: We engage third parties to perform certain functions on our behalf. Examples include analysing data, providing marketing assistance, processing payments, transmitting content, assessing and managing credit risk, and providing customer service.<br/>
                                                •	Detecting fraud and abuse: We release account and other personal data to other companies and organizations for fraud protection and credit risk reduction, and to comply with the law.<br/>
                                                <br/><br/>
                                                When we share your personal data with third parties, we:<br/>
                                                •	require them to agree to use your data in accordance with the terms of this Privacy and Cookie Notice, our Privacy Policy and in accordance with the law; and<br/>
                                                •	only permit them to process your personal data for specified purposes and in accordance with our instructions. We do not allow our third-party service providers to use your personal data for their own purposes.<br/>
                                                <br/>
                                                <b>International transfers</b>
                                                <br/><br/>
                                                We may transfer your personal data to locations in another country, if this is permissible pursuant to applicable laws in your location. There are inherent risks in such transfers.
                                                In the event of international transfers of your personal data, we shall put in place measures necessary to protect your data, and we shall continue to respect your legal rights pursuant to the terms of this Privacy and Cookie Notice and applicable laws in your location.
                                                <br/><br/>
                                                <b>Data security</b>
                                                <br/><br/>
                                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
                                                In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                                                We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
                                                <br/><br/>
                                                <b>Your legal rights,</b>
                                                <br/><br/>
                                                It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.
                                                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct or erase your personal data, object to or restrict processing of your personal data, and unsubscribe from our emails and newsletters.
                                                <br/><br/>
                                                <b>Further details,</b>
                                                If you are looking for more information on how we process your personal data, or you wish to exercise your legal rights in respect of your personal data, please contact support@martek.com
                                                <br/><br/><br/><br/>
                                                </p>
                                        </Col>    
                                    </Row>
                                    </Container>
                                    </TabPanel>
                                    
                                </Tabs>
                                </Col>
                            </Row>
                            </Card>
                        </Col>
                    </Row>
                    </Container>
                </div>
        </div>
    );
}