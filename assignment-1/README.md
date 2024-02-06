# Assignment 1

* *Date Created*: 01 Feb 2024
* *Last Modification Date*: 05 Feb 2024
* *Assignment URL*: https://ketul-patel-web-assignment-1.netlify.app/
* *Git URL*: https://git.cs.dal.ca/ketulp/csci-5709-assignments/-/tree/main/assignment-1?ref_type=heads

## Authors

* [Ketul Patel](kt390621@dal.ca)

## Deployment

I mirrored project code from Gitlab to Github, and setup a Netlify to deploy from Github. With every commit on main branch Netlify automatically deploys the application. I configured some build settings on Netlify.

## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - Frontend Development Framework
* [npm](https://docs.npmjs.com//) - Dependency Management Tool
* [node](https://nodejs.org/en) - Javascript Runtime used for development 

## Sources Used

Header.tsx

Line: 6-24

```
    <Navbar expand='md' className='py-2 px-4'>
        <Navbar.Brand
          href='/'
          className='flex-row flex items-center text-textSecondary'
        >
          <FaCar className='mr-2 text-3xl text-textSecondary' />
          <p className='text-textSecondary'>Park Help</p>
        </Navbar.Brand>
        <Navbar.Toggle className='bg-white' />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            <Nav.Link className='!text-textSecondary'>Login</Nav.Link>
            <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
            <Nav.Link className='!text-textSecondary'>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
```

The above code is implemented by studying the code about navigation bar from react bootstrap [React bootstrap navigation bar](
https://react-bootstrap.netlify.app/docs/components/navbar/)

Below is example code which I studied:

```
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandExample() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Brand link</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Brand text</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;

```

## Acknowledgments


* Code snippets provided me with insights and ideas how I can develop a functionality for me. Learning by observing and understanding those codes makes learning quick and efficient for me.