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
  
            <div
              id="ww_0ec8394aca416"
              v="1.3"
              loc="auto"
              a='{"t":"responsive","lang":"lt","sl_lpl":1,"ids":["wl9775"],"font":"Arial","sl_ics":"one","sl_sot":"celsius","cl_bkg":"rgba(32,137,188,1)","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'
            >
              More forecasts:
              <a
                href="https://oneweather.org/melbourne/30_days/"
                id="ww_0ec8394aca416_u"
                target="_blank"
                >30 days Melbourne weather
                </a>
            </div>
        </aside>
  
      </div>
    );
}

export default Aside;