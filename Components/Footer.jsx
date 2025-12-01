import {Fot1, Fot2 } from '../Components/index'

export default () => {
  const footerNavs = [
    {
      href : "javascript:void()",
      name : "Terms",
    },
    {
      href : "javascript:void()",
      name :"License",
    },
    {
      href : "javascript:void()",
      name :"Privacy",
    },
    {
      href : "javascript:void()",
      name :"About us",
    },
  ];
  return (
    <footer className="pt-10">
      <div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'
      >
        <div className='justify-between sm:flex'>
          <div className='space-y-6'>
            <img src="https://www.floatui.com/logo.svg" className="w-32" />
            
          </div>
          <div className='mt-6'>
              <p className='text-gray-700 font-semibold'>
                Get the App
              </p>
              <div className='flex items-center gap-3 mt-3 sm:block'>
                <a href="javascript:void()">
                  <Fot1 />
                </a>
                <a href="javascript:void()" className='mt-0 block sm:mt-3'>
                  <Fot2 />
                </a>
              </div>
          </div>
        </div>
              <div className="mt-10 py-10 border-t md:text-center">
<p>© 2025 Shivam Srivastava. All rights reserved.</p>
              </div>
      </div>
    </footer>
  );
}
