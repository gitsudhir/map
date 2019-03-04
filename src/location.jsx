import React, { useState, useEffect } from "react";
import geolib from "geolib";
export const Location = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [dist, setDist] = useState();
  const [bearing, setBearing] = useState();
  const [x, setX] = useState(3);
  const [y, setY] = useState(2);
  const [ans, setAns] = useState({});
  const [zoom, setZoom] = useState(22);
  const [angle, setAngle] = useState(0);
  const [src, setSrc] = useState(
    "https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7Clabel:C%7C19.017699,72.8338119&zoom=15&size=600x400&key=AIzaSyACNJdJe4jcgeWOg7aJxLgh96OWd2SKYx4"
  );
  const answer = () => {
    console.log(x, y, dist, bearing);

    //alert(`${latitude}  and ${longitude}`);
    var initialPoint = { lat: latitude, lon: longitude };
    //var dist =1234
    //var bearing = 45;

    const destination = geolib.computeDestinationPoint(
      initialPoint,
      dist,
      bearing
    );
    console.table(destination);
    setAns(destination);
    console.log("calulation");
    setSrc(
      `https://maps.googleapis.com/maps/api/staticmap?markers=color:green%7Clabel:C%7C${latitude},${longitude}&markers=color:red%7Clabel:D%7C${
        destination.latitude
      },${
        destination.longitude
      }&zoom=${zoom}&size=600x400&key=AIzaSyACNJdJe4jcgeWOg7aJxLgh96OWd2SKYx4`
    );
  };

  function calcAngleDegrees(x, y) {
    const d = (Math.atan2(y, x) * 180) / Math.PI;
    return d >= 0 ? d : 360 + d;
  }
  const findYourLocation = e => {
    console.log(e.target.value);
    try {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      });
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(calcAngleDegrees(2, 3));
  useEffect(
    () => {
      setDist(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
      setBearing(
        calcAngleDegrees(y, x) - angle >= 0
          ? calcAngleDegrees(y, x) - angle
          : 360 + (calcAngleDegrees(y, x) - angle)
      );
    },
    [x, y, angle]
  );

  useEffect(
    () => {
      setSrc(
        `https://maps.googleapis.com/maps/api/staticmap?markers=color:green%7Clabel:C%7C${latitude},${longitude}&markers=color:red%7Clabel:D%7C${
          ans.latitude
        },${
          ans.longitude
        }&zoom=${zoom}&size=600x400&key=AIzaSyACNJdJe4jcgeWOg7aJxLgh96OWd2SKYx4`
      );
    },
    [zoom]
  );

  return (
    <>
      <h1>Find location on map</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          answer();
        }}
      >
        <label htmlFor="lat">latitude : </label>
        <input
          name="lat"
          type="text"
          onChange={e => setLatitude(e.target.value)}
          value={latitude}
          required
        />
        <br />
        <label htmlFor="long">longitude : </label>
        <input
          name="long"
          type="text"
          onChange={e => setLongitude(e.target.value)}
          value={longitude}
          required
        />
        <br />
        <input
          onClick={findYourLocation}
          type="checkbox"
          name="findyourlocation"
          id="findyourlocation"
        />
        <label htmlFor="findyourlocation">Your Location</label> <br />
        <label htmlFor="angle">device angle : </label>
        <input
          type="text"
          name="angle"
          onChange={e => setAngle(e.target.value % 360)}
          value={angle}
        />{" "}
        <br />
        <label htmlFor="x">x: </label>
        <input
          name="x"
          type="text"
          onChange={e => setX(e.target.value)}
          value={x}
          required
        />
        <br />
        <label htmlFor="y"> y : </label>
        <input
          name="y"
          type="text"
          onChange={e => setY(e.target.value)}
          value={y}
          required
        />
        <br />
        <label htmlFor="dist">distance (in meters) : </label>
        <input name="dist" type="text" value={dist} required />
        <br />
        <label htmlFor="bearing">bearing (in degrees) : </label>
        <input name="bearing" type="text" value={bearing} required />
        <br />
        <button type="submit">click</button>
        <br />
        <h3>{ans.latitude}</h3>
        <h3>{ans.longitude}</h3>
      </form>
      <div>
        <button onClick={() => setZoom(zoom - 1)}>-</button>
        <span>ZOOM{zoom}</span>
        <button onClick={() => setZoom(zoom + 1)}>+</button>
      </div>
      <br />
      {/*  <img
        src="http://academic.brooklyn.cuny.edu/geology/leveson/core/graphics/mapgraphics/circ-360newsx.gif"
        alt="ij"
      />
      */}
      <img alt="mapp" src={src} />
      <ul>
        Reference:
        <li>
          <a href="https://math.stackexchange.com/questions/1596513/find-the-bearing-angle-between-two-points-in-a-2d-space">
            find-the-bearing-angle-between-two-points-in-a-2d-space
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/geolib">npm install geolib</a>
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2">
            Math.atan2(y,x)
          </a>
        </li>
        <li>
          <a href="https://www.movable-type.co.uk/scripts/latlong.html">
            final
          </a>
        </li>
        <li>
          <a href="https://sudhirkumar.me">sudhirkumar</a>
        </li>
      </ul>
    </>
  );
};
