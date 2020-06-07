import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // USING udacity-api-restapi AS TEMPLATE:
  // router.get('/signed-url/:fileName',
  //     requireAuth,
  //     async (req: Request, res: Response) => {
  //     let { fileName } = req.params;
  //     const url = AWS.getPutSignedUrl(fileName);
  //     res.status(201).send({url: url});
  // });

  app.get( "/filteredimage", async ( req, res ) => {

    var image_url = req.query.image_url;
    if (!image_url) {
      return res.status(400).send(`id is required`);
    }

    //this helped alot!
    //https://stackoverflow.com/questions/59134016/simple-api-endpoint-in-nodejs
    var myAsyncFilter = async function (in_url:string) {
      try {
        var filtered_path = await filterImageFromURL(in_url);
        return filtered_path;
      } catch(err) {
        return "Error";
      }
    };

    const filtered_image = await myAsyncFilter(image_url);

    // https://knowledge.udacity.com/questions/151148
    // this helped alot!
    res.status(200).sendFile(filtered_image , () => deleteLocalFiles([filtered_image]));

  });

  // @image_url: a publicly available url to an image
  // app.get("/filteredimage/:image_url", async(req : Request, res: Response) => {
  //
  //           let { image_url } = req.query;
  //           console.log("Image url: "+image_url);
  //           //const image_url = req.query.image_url; //<-- what is the diff between using these two options?
  //
  //           if(!image_url){
  //             // status code 400 is bad request
  //             // https://www.restapitutorial.com/httpstatuscodes.html
  //             res.status(400).send("image_url parameter is missing");
  //           }else{
  //             const filtered_image = await filterImageFromURL(image_url);
  //             //res.sendFile(filtered_image);
  //             return res.status(200).send(`Welcome to the Cloud, ${image_url}!`);
  //             //deleteLocalFiles([filtered_image]);
  //           }
  // })

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
