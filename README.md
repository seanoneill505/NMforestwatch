# NMforestwatch
echo "# NMforestwatch" >> README.md


# Welcome to the nmforestwatch development portal!

The New Mexico Forest Watch portal has the following workflow and technologies:
* Automation of Data Ingest Via Google Earth Engine (GEE)//Landsat 8 TOA Teir 1 Import to Google Earth Engine via Python script

# Javascript//Python interaction with Google Earth Engine API
Google Earth Engine makes use of Javascript as well as Python for users to interact with the GEE API.  While this repoository has javascript code in place for the workflow, the end goal is using the Python API to increase flexibility of use with the GEE API to automate tasks. 
# Javascript in Google Earth Engine 
* Image Collections for New Mexico AOI defined 
* Datarange of image collections (3 month interval) 
* Cloud Masking performed over AOI
* NDVI band calculated and added to image 
* Feature collections defined/ Hosted as Google Fusion Table
* Mean NDVI calculated from individual pixels to perform time scale analysis over vector polygons
* Charts for time series created
* Values of charts exported
* Feature collection exported as GeoTiff's

# Once Images are exported, Workflow to host site
* Images collected in Spatiallite Database
* Raster Images imported into GeoServer
* GeoServer Hosts Web Coverage Service (WCS) for images
* Javascript imports images to HTML webpage hosted by GitHub
* User selects pre-processed datasets to see NDVI time series

