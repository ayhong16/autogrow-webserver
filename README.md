# AutoGrow Webserver

AutoGrow is a partially automated, smart hydroponic system that allows users to view pH levels, temperatures, and humidity values in realtime from anywhere. It also collects and displays historical data with live updating so that users can view previous trends in order to learn and optimize their hydroponic systems. AutoGrow is also a proof of concept that hydroponics can be automated by implementing an automatic grow light scheduler.

This is 1 of 2 repositories relating to the final project for ECE 590: Full Stack IoT at Duke University. This repository contains the code for the Flask server and React frontend.

- The /server folder contains all files relating to the Flask backend, including code and DockerFiles. To run the server locally, go into the /server folder and run `python dev.py`
- The /client folder contains all files relating to the React frontend, including code, DockeFiles, and NGINX config. To run the code locally, go into the /client folder and run `pnpm dev`.

The Flask server acts as a middleman for the client and the ESP32 end-device. It provides routing for the EPS32 to retrieve information and post data from the pH and DHT11 sensors to the PostgreSQL database. It also serves all routes from the React frontend so that the client can display sensor data or alter settings for their AutoGrow system.

The React frontend uses Tailwind CSS for styling, as well as the Preline UI component library and the Chart.js library.
