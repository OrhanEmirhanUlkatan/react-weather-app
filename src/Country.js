import React, { useEffect, useState } from "react";
import axios from "axios";

function Country({ props }) {
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const handleCountry = (e) => {
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    console.log(states);
    setState(states);
  };

  const handleState = (e) => {
    let cities = data.filter((city) => city.subcountry === e.target.value);
    console.log(cities);
  };

  return (
    <>
      <div>
        <label>Countries</label>
        <select onChange={(e) => handleCountry(e)}>
          {country.map((items) => (
            <option key={items} value={getCountry}>
              {items}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>City</label>
        <select onChange={(e) => handleState(e)}>
          {getState.map((items) => (
            <option key={items} value={selectedState}>
              {items}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
export default Country;
