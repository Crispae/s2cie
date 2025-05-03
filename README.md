# S2CIE (Syntactic, Semantic and Contextual Information Extraction system)

S2CIE is a comprehensive information extraction system that combines syntactic, semantic, and contextual approaches to extract meaningful information from text documents.

## Update
1. Migrating API to FastAPI (In progress)
2. Adding streaming feature to deliver fast response (In progress)
3. Adding compoent to ingest full-text, dossiers and IUCLID reports

## System Components

### Frontend
- React-based web interface
- Interactive pattern search
- Visualization of search results
- Support for grammar-based queries

### Backend 
- Document processing script
- Flask REST API
- MongoDB integration for entity reterival
- Distributed search capabilities (Running search of multiple indexes)
- Entity annotation processing

## Resources
1. [odinson-index API (v0.5.0)](https://eu2.contabostorage.com/d1a2d105c028442a9d537e44356d5594:s2cie/APIs/v0.5.0-api.zip)
2. [Annotated documents](http://nlp.dmis.korea.edu/projects/bern2-sung-et-al-2022/annotation_v1.1.tar.gz) - Processed by BERN2
3. Indexes (Built until 2021, contact for access)
4. [context index](https://eu2.contabostorage.com/d1a2d105c028442a9d537e44356d5594:index/context/cpt.db)

## Setup Instructions

### Prerequisites

1. Install OpenJDK 11:
   - Download and install OpenJDK 11 (Temurin) from [Adoptium](https://adoptium.net/temurin/releases/?version=11)
   - Verify installation:
   ```bash
   java -version
   ```
   - Expected output:
   ```
   openjdk 11.0.23 2024-04-16
   OpenJDK Runtime Environment Temurin-11.0.23+9 (build 11.0.23+9)
   OpenJDK 64-Bit Server VM Temurin-11.0.23+9 (build 11.0.23+9, mixed mode)
   ```

### Backend Setup
First download the index rest-api and run the server, Intially server is not pointed to the indexes, it will just run empty API endpoint.

1. Index RESTAPI
```bash
cd backend
bash index-server.sh
```

2. Configure Index Endpoint:
   - After the server starts, locate the configuration file at `api/local/conf/reference.conf`
   - Update the following settings to point to your index location:
   ```conf
   odinson {
     # all data related to odinson is stored here
     dataDir = ${user.home}/indexes/index_3
   }
   ```
   - Restart the server after updating the configuration

3. Setup Context Database:
   - Download the context database:
     ```bash
     curl -L -o cpt.db "https://eu2.contabostorage.com/d1a2d105c028442a9d537e44356d5594:index/context/cpt.db"
     ```
   - Move the database to your desired location
   - For production deployment, it's recommended to migrate this data to a production-grade SQL database
  
5. Setup Entity Database (MongoDB):
   - Install MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Start MongoDB service:
     ```bash
     # Windows
     net start MongoDB
     ```
   
   - Download BERN2 annotations:
     ```bash
     curl -L -o annotation_v1.1.tar.gz "http://nlp.dmis.korea.edu/projects/bern2-sung-et-al-2022/annotation_v1.1.tar.gz"
     tar -xzf annotation_v1.1.tar.gz
     ```
    
    Populating the database with the entites, custom script can be written for this, code used for code will be updated soon

   Note: For production deployment, ensure:
   - MongoDB authentication is enabled
   - Database is properly secured
   - Regular backups are configured
   - Indexes are created for better query performance
   
4. 4. Configure Backend Settings:
   - Navigate to the backend directory and open `config.json`:
     ```bash
     cd backend
     code config.json  # or use your preferred editor
     ```
   
   - Update the following sections in `config.json`:
     ```json
     {
       "mongodb": {
         "url": "mongodb://localhost:27017",  // Your MongoDB connection string
         "db": "s2cie",                       // Your database name
         "collection": "entities",            // Collection name for BERN2 entities
         "db_version": "1.0.0"
       },

       "embed_db": {
         "path": "/path/to/your/cpt.db"      // Full path to your context database
       },

       "flask": {
         "debug": false,                      // Set to true for development
         "host": "0.0.0.0",                  // Listen on all network interfaces
         "port": 8050                        // API will be accessible at http://localhost:8050
       },

       "distributed_custom_search": {
         "port_range": [8585, 8594],
         "serverAddressList": [
           "localhost:9000"                   // Add your index server endpoints
         ]
       }
     }
     ```

   Key Configuration Points:
   - Flask API: By default runs on `http://localhost:8050`
   - MongoDB URL: Use your MongoDB connection string with proper authentication
   - Context DB Path: Absolute path to where you stored the `cpt.db` file
   - Server Addresses: List of all running index server endpoints

   Note: For production deployment:
   - Set `debug: false` for security
   - Configure proper network access if running on `0.0.0.0`
   - Use secure MongoDB connection strings
   - Ensure all listed server endpoints are accessible

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Configure settings in `config.json`
3. Start the server:
```bash
./start.sh
```

### Frontend Setup
1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Configure environment variables in `.env`
3. Start the development server:
```bash
npm start
```


## Document Processing Script

The document processing script (`scripts/document-processor.py`) integrates spaCy with MongoDB to process scientific documents and convert them into different formats. 

### Features
- Connects to MongoDB to fetch BERN2 annotated documents
- Processes documents using spaCy's scientific model (en_core_sci_scibert)
- Custom Named Entity Recognition (NER) component for BERN2 annotations
- Converts documents to CLU and Odinson formats
- Handles overlapping entity spans
- Batch processing capability

### Requirements
```bash
pip install spacy pymongo
python -m spacy download en_core_sci_scibert
```

### Usage
1. Ensure MongoDB is running with BERN2 annotations loaded
2. Run the script:
```bash
python scripts/document-processor.py
```

### Pipeline Steps
1. Fetches documents from MongoDB (BERN2 collection)
2. Processes documents through spaCy pipeline
3. Applies custom NER using BERN2 annotations
4. Converts processed documents to CLU format
5. Converts CLU documents to Odinson format

### Configuration
- MongoDB connection: localhost:27017 by default
- Database: "AOP"
- Collection: "Bern2"
- Document range: PMIDs 100-1000 (configurable in main())


## Contact
For access to indexes or additional information, please reach out to the development team.
## Acknowledgment

Special thanks to:
- BERN2 development team for providing freely available annotated documents
- ODIN framework developers for building the system, allowing application developers to use it freely
