import { Email, Facebook, Instagram, Phone, Room, Twitter, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";



const Footer = () => {
    return (
        <div className="flex flex-col md:flex-row px-2 lg:px-20 py-6 gap-8 border-t-[1px] border-[#00674F]">
            <div className="flex-1">
                <h2 className="mb-2 text-xl font-medium">BOB'S STORE</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing
                    dolor eligendi quibusdam quam, iste voluptas,
                    dicta alias sit maiores beatae officiis quas.</p>
                <div className="flex gap-2 mt-6">
                    <div className="bg-[#3B5999] socialBtn" ><Facebook /></div>
                    <div className="bg-[#55ACEE] socialBtn" ><Twitter /></div>
                    <div className="bg-[#E4405F] socialBtn" ><Instagram /></div>
                    <div className="bg-[#E60023] socialBtn" ><YouTube /></div>
                </div>
            </div>
            <div className="flex-1">
                <h2 className="mb-2 text-xl font-medium">روابط مفيدة</h2>
                <div className="grid grid-cols-2 gap-2 underline">
                    <Link to="#">الرئيسية</Link>
                    <Link to="#">السلة</Link>
                    <Link to="#">عنا</Link>
                    <Link to="#">التواصل معنا</Link>
                </div>
            </div>
            <div className="flex-1">
                <h2 className="mb-2 text-xl font-medium">معلومات التواصل</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2"><Room />  <p>Cite koraichi - Reghaia</p></div>
                    <div className="flex gap-2"><Phone /> <p>+2135555555</p></div>
                    <div className="flex gap-2"><Email /> <p>Yakerdev@gmail.com</p></div>
                </div>
            </div>
        </div>)

    {/* <Container>
        <Right>
            <Title>Contact</Title>
            <ContactItem><Room/>  Cite 20 Aout - Boudouaou</ContactItem>
            <ContactItem><Phone/> +213554265298</ContactItem>
            <ContactItem><Email/> Yakerdev@gmail.com</ContactItem>
        </Right>
    </Container>); */}
}

export default Footer;