# NMforestwatch
echo "# NMforestwatch" >> README.md


# Welcome to the nmforestwatch development portal!

The New Mexico Forest Watch portal has the following workflow and technologies:
* Automation of Data Ingest Via Google Earth Engine (GEE)//Landsat 8 TOA Teir 1 Import to Google Earth Engine via Python script

# Javascript//Python interaction with Google Earth Engine API
>Google Earth Engine makes use of Javascript as well as Python for users to interact with the GEE API.  While this repository has javascript code in place for the workflow, the end goal is using the Python API to increase flexibility of use with the GEE API to automate tasks. The two approaches are similar, but the Python based workflow has critical differences to help automation of all tasks.

# Javascript API workflow for Google Earth Engine 
* Image Collections for New Mexico AOI defined 
* Datarange of image collections (3 month interval) 
* Cloud Masking performed over AOI
* NDVI band calculated and added to image 
* Feature collections defined/ Hosted as Google Fusion Table
* Mean NDVI calculated from individual pixels to perform time scale analysis over vector polygons
* Charts for time series created
* Values of charts exported
* Image collection exported as GeoTiff's


# Once Images are exported, Javascript based Workflow to host site
* Images collected into Spatiallite Database repositories
* Database imported into GeoServer
* GeoServer Hosts Web Coverage Service (WCS) for images to be served to web
* Javascript imports images to HTML webpage hosted by GitHub
* User selects pre-processed datasets to see NDVI time series

# Python API workflow for Google Earth Engine
* Creation of a containerized python environment to ease moving the application from host to host/ improved collaboration outcomes
* Python script to automate workflow
* Image Collection retrieval
* Date Range definition
* AOI definition
* Cloud Masking over AOI
* NDVI band added
* Feature Collections Vectors imported from Fusion Tables
* Mean NDVI calculated for Polygons
* Charts of the time series created
* Chart values Exported to google storage
* Images exported as PNG to google storage 
* Google Cloud Datalab hosted locally 
* Scripts executed via Ipython (Jupyter notebook)
* Web application lives in the Google Cloud platform's app engine
* need for local backend greatly reduced 


