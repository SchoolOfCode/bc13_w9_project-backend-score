import {pool} from './index.js'

export async function createApisTable() {
    return await pool.query(
      `CREATE TABLE api_list (
        api_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        api_name character varying(50),
        api_url character varying(100),
        tags character varying(100),
        doclink character varying(100)
      ); 
      

      CREATE TABLE api_response (
        api_id integer REFERENCES api_list(api_id),
        response_id SERIAL,
        ping boolean,
        get boolean,
        response boolean,
        ping_time integer,
        response_code integer,
        response_body character varying(100),
        json character varying(50000)
      );`

    );
  }

  export async function dropApisTable(){
    return await pool.query(
      `DROP TABLE if exists api_response;
      DROP TABLE if exists api_list;`
    )
     
    }
  
  export async function seedApisTables(){
    return await pool.query(
      `INSERT into api_list (api_name, api_url, tags, doclink) VALUES ('Astronomy Picture of the Day','https://go-apod.herokuapp.com/apod',null,'https://go-apod.herokuapp.com/');
      INSERT into api_response (api_id,get,response,ping_time,response_code,response_body,json) VALUES (1,true,true,null,200,null,'{''copyright'':''Victor Lima'',''date'':''2022-11-29'',''explanation'':''Because the Gum Nebula is the closest supernova remnant, it is actually hard to see.  Spanning 40 degrees across the sky, the nebula appears so large and faint that it is easily lost in the din of a bright and complex background.  The Gum Nebula is highlighted nicely in red emission toward the right of the featured wide-angle, single-image photograph taken in late May. Also visible in the frame are the Atacama Desert in Chile in the foreground, the Carina Nebula in the plane of our Milky Way galaxy running diagonally down from the upper left, and the neighboring Large Magellanic Cloud (LMC) galaxy. The Gum Nebula is so close that we are much nearer the front edge than the back edge, each measuring 450 and 1500 light years respectively.  The complicated nebula lies in the direction of the constellations of Puppis and Vela.  Oddly, much remains unknown about the Gum Nebula, including the timing and even number of supernova explosions that formed it.'',''hdurl'':''https://apod.nasa.gov/apod/image/2211/Gum_Lima_1365.jpg'',''media_type'':''image'',''service_version'':''v1'',''title'':''The Gum Nebula Supernova Remnant'',''url'':''https://apod.nasa.gov/apod/image/2211/Gum_Lima_960.jpg''}');`
    )
  }

  export async function resetApisTable() {
    return [
      await dropApisTable(),
      await createApisTable(),
      await seedApisTables(),
    ];
  }

