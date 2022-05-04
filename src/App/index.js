import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Paper from "@mui/material/Paper";
import {
  Chart,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, BarSeries } from "@devexpress/dx-react-chart";
import "./style.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
const startDate =
  prompt("Type Start Date in YYYY-MM-DD format") + "T07%3A12%3A00Z";
const endDate = prompt("Type End Date in YYYY-MM-DD format") + "T07%3A12%3A00Z";
const Launch = () => {
  const [launches, setLaunch] = useState([]);
  useEffect(() => {
    fetch(
      `https://lldev.thespacedevs.com/2.2.0/launch/?name=&slug=&rocket__configuration__name=&rocket__configuration__id=&status=&rocket__spacecraftflight__spacecraft__name=&rocket__spacecraftflight__spacecraft__name__icontains=&rocket__spacecraftflight__spacecraft__id=&rocket__configuration__manufacturer__name=&rocket__configuration__manufacturer__name__icontains=&rocket__configuration__full_name=&rocket__configuration__full_name__icontains=&mission__orbit__name=&mission__orbit__name__icontains=&r_spacex_api_id=&net__gt=&net__lt=&net__gte=&net__lte=&window_start__gt=${startDate}&window_start__lt=&window_start__gte=&window_start__lte=&window_end__gt=&window_end__lt=${endDate}&window_end__gte=&window_end__lte=&last_updated__gte=&last_updated__lte=`,
      {
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((data) => setLaunch(data.results));
  }, []);
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  const chartData = launches.map((launch) => {
    return {
      country: launch.pad.location.country_code,
      launches: launch.pad.location.total_launch_count,
    };
  });
  const markers = launches.map((launch) => {
    return { coordinates: launch.pad.longitude + ", " + launch.pad.latitude };
  });
  return (
    <div className="row pt-5">
      <React.Fragment>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <br />
              <th>Location</th>
              <br />
              <th>Window Start</th>
              <br />
              <th>Launch Window End </th>
              <br />
              <th>Rocket Name</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch) => {
              return (
                <tr>
                  <td>{launch.name}</td>
                  <br />
                  <td>{launch.pad.location.name}</td>
                  <br />
                  <td>{launch.window_start}</td>
                  <br />
                  <td>{launch.window_end}</td>
                  <br />
                  <td>{launch.rocket.configuration.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="launches" argumentField="country" />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {markers.map(({ coordinates }) => (
          <Marker coordinates={coordinates}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default Launch;
