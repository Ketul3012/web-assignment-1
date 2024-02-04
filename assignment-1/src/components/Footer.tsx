export const Footer = () => {
  return (
    <footer className='px-4 pb-2 pt-4 bg-footer'>
      <div className='flex flex-row'>
        <div className='flex flex-col flex-[2]'>
          <p className='m-0 p-0'>Park help</p>
          <p className='m-0 p-0'>&copy;2024</p>
        </div>
        <div className='flex flex-col lg:flex-row justify-between flex-1 mx-6'>
          <p className='m-0 p-0'>Privacy</p>
          <p className='m-0 p-0'>Terms</p>
          <p className='m-0 p-0'>Support</p>
          <p className='m-0 p-0'>About</p>
        </div>
      </div>
    </footer>
  );
};
