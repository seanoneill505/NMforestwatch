# NMforestwatch
echo "# NMforestwatch" >> README.md


# Welcome to the NMforestwatch development portal!

The purpose of this README file is to describe the workflows and tools in place to make the NMforestwatch portal a reality.  The NMforestwatch portal has the following workflow and technologies in place:


# Javascript//Python interaction with Google Earth Engine API
>Google Earth Engine makes use of Javascript as well as Python for users to interact with the GEE API.  While this repository has javascript code in place for the workflow, the end goal is using the Python API to increase flexibility of use with the GEE API to automate tasks. The two approaches are similar, but the Python based workflow has critical differences to help automation of all tasks.

# Javascript API workflow for Google Earth Engine 
* Data Ingest Via Google Earth Engine (GEE)//Landsat 8 TOA Teir 1 Import to Google Earth Engine 
  * This step is accomplished through importing the imagery from Google Earth engine servers.  Google has a robust catalogue of image collections to choose from, including Landsat (1,2,3,4,5,6,7,8), MODIS, Sentinel (1,2,3), as well as many products derived from these image collections.
* Image Collections for New Mexico AOI defined 
  * This is accomplished through the ee.ImageCollection() .filter); function in the Google Earth Engine API.  One of ee.Image() functions is to define polygons and take only imagery intersecting defined polygons.  
* Datarange of image collections (3 month interval)
  * Also handled by the ee.ImageCollection() function, selecting date ranges for Imagery availible inthe GEE catalogue.
* Creating a quality mosiac and eliminating as many discontinuities in the selected image collection as possible.
  * This is accomplished with the qualityMosiac() function.  qualityMosiac() can make the disparate spectral values coused by image collecttion time differences (time between sattelite passes) in vegitation more congruent by attempting to set pixel values from the same stage of growth of the vegitation being imaged. 
* Cloud Masking performed over AOI
  * Cloud masking is accomplished by using the Median.Reduce() function, which can pull cloud free data from the selected image collections over the defined date range.  The pootential problem with this method can be found with short short date ranges.  The shorter the date range, the less opportunity for cloud free imagery exists.  Another method for cloud free mosiacs is using the ee.Algorithms.Landsat.simpleCloudScore() function.  Here, a score is assigned to pixels between 1 and 100, with the higher the number representing a cloudier pixel.  The user can define a preferable score for the pixels over a image collection. Then the scored.select(['cloud']).lte(%%) can be used to mask the clouds in the images.  
* NDVI band calculated and added to image 
  * Here, the %%.map() function is used to apply the NDVI band to the entire image collection.  While an NDVI calculation is trivial with the availible tools for manipulating bands (example: var nir = image.select('B5'); var red = image.select('B4'); var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');) an NDVI layer is also provided due to the ubuquitous nature of NDVI usage in remote sensing realms. The pre-computed NDVI can simply be added to the map and analyzed.  
* Feature collections defined/ Hosted as Google Fusion Table
  * Shapefiles can be converted into .KML files and then can be uploaded as tables to Google's Drive service as Fusion Tables.  Since the tables are hosted by Google in the cloud, the tables can then be imported into Earth Engine and can be used for analysis over each feature in the feature collection.  
* Mean NDVI calculated from individual pixels to perform time scale analysis over vector polygons
  * Earth Engine creates a mean from each pixel within a defined range by using the ee.reduce() function.  The larger the area to create mean statistics, the greater the number of pixels to be defined within the redcer.  
* Charts for time series created
  * Google has a a function that can also create charts over a time series for an image collection.  The ui.Chart() function is used for this.  ee.Reduce() and ui.Chart() are often used together due to the need to reduce when an area exceeds 10,000,000 pixels. 
* Values of charts exported
* Image collection exported as GeoTiff's


## Once Images are exported, Javascript based Workflow to host site
* Images collected into SpatialLite Database repositories connected to GeoServer
* Database imported into GeoServer
* GeoServer Hosts Web Coverage Service (WCS) for images to be served to web (found @ http://129.24.65.163:8080/geoserver/web)
* Javascript imports images to HTML webpage hosted by GitHub
* User selects pre-processed datasets to see NDVI time series

# Python API workflow for Google Earth Engine
## Docker Implementation
* Creation of a containerized python environment for transportability from host to host and improved collaboration opportunities and outcomes.  

## Python API Workflow
* Automation of Data Ingest Via Google Earth Engine (GEE)//Landsat 8 TOA Teir 1 Import to Google Earth Engine
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

## Web Application hosting
* Google Cloud Datalab hosted locally 
* Scripts executed via Ipython (Jupyter notebook)
* Web application lives in the Google Cloud platform's app engine
* need for local backend greatly reduced 


