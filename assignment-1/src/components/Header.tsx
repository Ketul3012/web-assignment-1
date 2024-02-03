import { Navbar } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";

export const Header = () => {
  return (
    <header className='sticky w-full top-0 z-50 bg-white shadow-sm border-b-1 border-gray-400 '>
      <Navbar expand='md' className='py-2 px-4'>
        <Navbar.Brand href='/' className='flex-row flex items-center'>
          <FaCar className='mr-2 text-3xl' />
          Park Help
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            <Nav.Link>Login</Nav.Link>
            <div className='border-l-2 border-solid border-gray-400 mx-4 my-2 hidden lg:block'></div>
            <Nav.Link>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};