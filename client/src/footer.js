const Footer = () => {
const Fullname = sessionStorage.getItem('Fullname')  
    return <footer>You are logged in as {Fullname}</footer>;
  };
  
  export default Footer;