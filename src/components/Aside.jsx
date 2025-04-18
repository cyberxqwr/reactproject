import '../index.css';

function Aside() {


    return (

        <div className="ml-8 mr-8 bg-bermuda/[.75] rounded-md drop-shadow-md xl:col-span-3 lg:col-span-4 md:col-span-4 shadow-2xl">

        <aside>
          <p className="text-center lg:text-2xl md:text-xl sm:text-l pt-4 underline">NAUDINGA</p>
          <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FVilnius&showPrint=0&src=ZW1pbGlzdHBAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTAwMzc4NzY4NDMyNjA0Mzc0OTI4QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA1MjQ0MDgxNzUyNTEzNTQ1ODY5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=bHQubGl0aHVhbmlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%2333B679&color=%230047a8&color=%230047a8&color=%230B8043"
              className="border-black/30 border rounded-md block w-9/10 max-w-full mx-auto h-96 my-4 md:h-[250px]"
              frameborder="0"
              scrolling="no"
            >
            </iframe>
  
            <div className="h-1 w-max-full bg-white/40 mx-1 sm:mx-2" aria-hidden="true"></div>
  
            <p className="text-center lg:text-2xl md:text-xl sm:text-l pt-4 underline mb-4">ORAI</p>
  
            <a className="weatherwidget-io" href="https://forecast7.com/en/54d6925d28/vilnius/" data-label_1="VILNIUS" data-label_2="WEATHER" data-theme="original" >VILNIUS WEATHER</a>
        </aside>
  
      </div>
    );
}

export default Aside;