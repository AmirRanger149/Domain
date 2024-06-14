addEventListener(

   "fetch", event => {

     let url = new URL(event.request.url);

       url.hostname = "core.rangershop.icu";

         url.protocol = "https";

           url.port = 443;

             let request = new Request(url, event.request);

               event.respondWith(

                  fetch(request)

                    )

                     }

                     )
