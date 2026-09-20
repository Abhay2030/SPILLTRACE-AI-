<div align="center">

# SPILLTRACE AI

### Maritime Geospatial Intelligence for Oil-Spill Detection, Source Reconstruction & Vessel Attribution

<p>
  <em>
    Detect the spill. Reconstruct its movement. Correlate vessel activity. Surface the evidence.
  </em>
</p>

<br>

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=111111)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgis.net/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

<br>

**Smart India Hackathon 2026 · Problem Statement 26143 · Disaster Management**

</div>

---

## Table of Contents

- [Overview](#overview)
- [Smart India Hackathon 2026](#smart-india-hackathon-2026)
- [The Problem](#the-problem)
- [Our Approach](#our-approach)
- [How SpillTrace Works](#how-spilltrace-works)
- [Core Capabilities](#core-capabilities)
- [Investigation Workflow](#investigation-workflow)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [AI and Computer Vision](#ai-and-computer-vision)
- [Ocean Drift and Source Reconstruction](#ocean-drift-and-source-reconstruction)
- [AIS and Vessel Intelligence](#ais-and-vessel-intelligence)
- [Attribution and Evidence Fusion](#attribution-and-evidence-fusion)
- [Geospatial Intelligence](#geospatial-intelligence)
- [Data Architecture](#data-architecture)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Configuration](#configuration)
- [API](#api)
- [Testing](#testing)
- [Security](#security)
- [Responsible Use](#responsible-use)
- [Current Implementation Status](#current-implementation-status)
- [Limitations](#limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Research Direction](#research-direction)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

# Overview

**SpillTrace AI** is a maritime geospatial intelligence platform designed to support the detection and investigation of oil-spill events at sea.

The platform brings together multiple forms of maritime evidence—satellite observations, geospatial information, environmental conditions, and vessel tracking data—into a single investigation workflow.

Instead of stopping at:

> **“There is an oil-like feature here.”**

SpillTrace is designed to investigate the larger question:

> **“Where did this spill likely originate, which vessel trajectories are consistent with that origin, and what evidence supports the result?”**

The platform follows an evidence-oriented pipeline:

```text
Satellite Observation
        │
        ▼
Oil-Spill Detection
        │
        ▼
Spill Localization
        │
        ▼
Drift Analysis
        │
        ▼
Probable Source Reconstruction
        │
        ▼
AIS Vessel Correlation
        │
        ▼
Candidate Vessel Generation
        │
        ▼
Evidence Fusion
        │
        ▼
Attribution Confidence
        │
        ▼
Risk Assessment
        │
        ▼
Response Support






Smart India Hackathon 2026
Selected Problem Statement

Problem Statement ID: 26143

“Leveraging satellite imagery to determine Oil spills at sea along with AIS data correlations to identify vessel responsible for the spill.”

Field	Details
Competition	Smart India Hackathon 2026
Theme	Disaster Management
Category	Software
Problem Statement	26143
Project	SpillTrace AI
Problem interpretation

The central challenge is not simply detecting a surface anomaly.

A useful investigation requires the combination of:

Satellite imagery + geospatial analysis + ocean dynamics + AIS trajectories + temporal correlation + spatial correlation.

SpillTrace is designed around that chain.

The Problem
Why detecting an oil spill is difficult
01 · Open-water scale

Maritime areas are vast. Identifying and investigating suspicious surface features across large regions can require substantial manual analysis.

02 · SAR ambiguity

A dark feature in SAR imagery does not automatically represent oil.

Natural and environmental phenomena can create similar signatures, so a detection pipeline must account for look-alikes and uncertainty.

03 · The spill moves

The location observed by a satellite may not be the location where the spill originated.

Wind and surface currents can change the position and shape of the slick over time.

Observed Spill
      │
      ▼
Environmental Transport
      │
      ▼
Different Location
      │
      ▼
Need to reconstruct probable origin
04 · Evidence is fragmented

An investigation may require several independent sources:

Satellite
   +
AIS
   +
Wind
   +
Ocean Currents
   +
GIS
   +
Vessel Metadata

These sources must be aligned in space and time before they can provide useful investigative context.

Our Approach

SpillTrace connects the evidence chain into one workflow.

                ┌───────────────────┐
                │   SATELLITE DATA  │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │   AI PERCEPTION   │
                │  Spill / Look-    │
                │  alike Analysis   │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ SPILL GEOMETRY    │
                │ Location + Extent │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ DRIFT INTELLIGENCE│
                │ Wind + Currents   │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ SOURCE REGION     │
                │ Backward Analysis │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ AIS INTELLIGENCE  │
                │ Vessel Trajectories│
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ EVIDENCE FUSION   │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ ATTRIBUTION       │
                │ CONFIDENCE        │
                └───────────────────┘

The intended result is not a single unexplained prediction. It is an investigable evidence chain.

How SpillTrace Works
1. Observe

Acquire and process satellite observations over an area of interest.

2. Detect

Identify candidate surface anomalies and classify them using the available imagery and model pipeline.

3. Localize

Convert the detected region into usable geospatial information such as:

location
geometry
extent
observation time
confidence
4. Reconstruct

Use environmental conditions and drift modelling to estimate:

current spill position
probable source region
potential future movement
5. Correlate

Query and analyze AIS observations within the relevant:

geographic area
time window
trajectory corridor
6. Attribute

Compare candidate vessels using multiple evidence dimensions rather than simply selecting the nearest vessel.

7. Explain

Present the evidence behind the candidate result.

8. Assess

Provide environmental and operational context to support response decisions.

Core Capabilities
Satellite Intelligence
Satellite imagery workflow
SAR-oriented analysis
Satellite metadata
Image preprocessing
Image segmentation architecture
Spill geometry
Confidence representation
Before/after comparison
Geospatial Intelligence
Interactive maritime map
Spill polygons
Vessel positions
Vessel trajectories
Geographic overlays
Investigation layers
Timeline-based spatial analysis
Ocean Intelligence
Wind integration
Ocean-current integration
Drift modelling architecture
Forward prediction
Backward source reconstruction
Uncertainty representation
Vessel Intelligence
AIS-oriented analysis
Vessel identification
Vessel trajectory reconstruction
Spatial correlation
Temporal correlation
Candidate-vessel investigation
Investigation
Investigation workstation
Incident-oriented workflow
Timeline navigation
Evidence presentation
Candidate comparison
Presentation / demonstration mode
Decision Support
Attribution confidence
Risk analysis architecture
Alerts
Incident reports
Evidence traceability
Investigation Workflow

A typical SpillTrace investigation is structured as:

┌──────────────────────┐
│ SELECT INCIDENT      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ REVIEW SATELLITE     │
│ OBSERVATION          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ REVIEW SPILL         │
│ GEOMETRY             │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ ANALYZE DRIFT        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ RECONSTRUCT SOURCE   │
│ REGION               │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ CORRELATE AIS        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ REVIEW CANDIDATES    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ REVIEW EVIDENCE      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ ASSESS RISK          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ GENERATE REPORT      │
└──────────────────────┘
Architecture
Architectural principles

SpillTrace separates major responsibilities:

Layer	Responsibility
Frontend	User experience and visualization
API	Request handling and service orchestration
Backend Services	Domain/business logic
AI	Image perception and classification
GIS	Spatial computation
AIS	Vessel and trajectory intelligence
Drift	Environmental transport modelling
Database	Structured + spatial persistence
Object Storage	Large data/artifacts
Workers	Long-running processing
Technology Stack
Frontend
Technology	Purpose
Next.js 16	Web application framework
React 19	UI components
TypeScript	Static typing
Tailwind CSS	Styling
MapLibre GL	Interactive maps
React Map GL	Map integration
Three.js	3D visualization
React Three Fiber	React-based 3D
GSAP	Animation / presentation
Framer Motion	UI motion
Recharts	Charts
Backend
Technology	Purpose
Python	Scientific/backend ecosystem
FastAPI	API framework
Pydantic	Validation
SQLAlchemy	Database access
GeoAlchemy2	PostGIS integration
Celery	Background processing
Infrastructure
Technology	Purpose
PostgreSQL	Relational database
PostGIS	Geospatial database capabilities
Redis	Cache / task infrastructure
Docker	Containerization
Docker Compose	Local infrastructure orchestration
AI and Computer Vision

The intended computer-vision pipeline is:

Potential model families include:

U-Net
SegFormer
other suitable segmentation architectures

The model should be selected using measurable criteria such as:

segmentation quality
generalization
inference cost
available training data
deployment requirements
Oil vs look-alike

The system should not treat:

Dark SAR region = Oil

as a sufficient rule.

A robust detection workflow should account for:

PROBABLE OIL
LOOK-ALIKE
NO OIL
UNCERTAIN

where the available data supports those classifications.

Ocean Drift and Source Reconstruction

SpillTrace separates three different geographic concepts:

Current spill location

Where the spill is observed now.

Probable source region

Where the spill may have originated based on backward reconstruction.

Predicted future location

Where the spill may move under the selected environmental conditions.

Conceptually:

                   FUTURE
                     ▲
                     │
              PREDICTED PATH
                     │
                     │
            ┌────────●────────┐
            │ CURRENT SPILL   │
            └────────┬────────┘
                     │
                     │ BACKWARD
                     ▼
              SOURCE REGION

Potential environmental inputs:

wind
surface currents
timestamp
spill geometry

The final implementation should preserve model uncertainty instead of presenting one trajectory as absolute truth.

AIS and Vessel Intelligence

AIS provides the vessel-side context required for correlation.

Depending on the configured source, relevant attributes may include:

MMSI
IMO
vessel name
vessel type
latitude
longitude
timestamp
speed
course
heading

The conceptual workflow is:

Attribution and Evidence Fusion

SpillTrace is not based on:

Nearest Vessel = Culprit

Instead, candidate vessels can be evaluated against multiple evidence dimensions.

Spatial Consistency
        +
Temporal Consistency
        +
Drift Consistency
        +
Trajectory Consistency
        +
Source-Region Overlap
        +
AIS Reliability
        ↓
Evidence Fusion
        ↓
Attribution Confidence
Explainable result

A candidate-vessel view should make the evidence understandable.

Example:

Candidate Vessel
────────────────────────────────

Temporal Consistency      HIGH
Spatial Consistency      HIGH
Drift Consistency        HIGH
Trajectory Consistency   MEDIUM
AIS Reliability          HIGH

────────────────────────────────

Attribution Confidence
0.87

────────────────────────────────

Supporting Evidence

• Vessel track intersects the
  reconstructed source region.

• Track timing is consistent
  with the estimated window.

• Drift reconstruction supports
  the candidate source region.

• AIS data contains limited gaps.

The exact evidence displayed must correspond to actual system calculations.

Geospatial Intelligence

The map is the primary investigation surface.

Possible layers include:

Satellite
├── Sentinel-1
└── Sentinel-2

Spill
├── Detection
├── Polygon
├── Source Region
└── Uncertainty

Vessels
├── Current Position
├── Historical Track
└── Candidate Vessel

Ocean
├── Wind
├── Currents
└── Drift

Context
├── Coastline
├── Ports
├── Fisheries
└── Protected Areas

Layer visibility should be controlled through the UI so analysts are not overwhelmed by simultaneous overlays.

Data Architecture

SpillTrace works conceptually with four classes of data.

Observation
Satellite Imagery
AIS Observations
Environmental
Wind
Ocean Currents
Weather
Geospatial Context
Coastline
Ports
Protected Areas
Fisheries
Risk Zones
Analytical
Spill Events
Spill Geometry
Drift Runs
Source Regions
Candidate Vessels
Attribution Results
Evidence
Reports
Data Provenance

Important analytical results should be traceable to their inputs.

DATA SOURCE
     ↓
TIMESTAMP
     ↓
PROCESSING
     ↓
MODEL VERSION
     ↓
RESULT

This becomes particularly important when interpreting:

satellite observations
model predictions
drift reconstructions
vessel candidates
attribution results
Project Structure

The repository is organized around the application and supporting scientific components.

spilltrace-ai/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── api/
│   ├── ai/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── workers/
│
├── data/
│
├── docs/
│   ├── architecture/
│   ├── research/
│   ├── api/
│   └── images/
│
├── tests/
│
├── Dockerfile
├── docker-compose.yml
└── README.md

The repository itself remains the authoritative source for the exact current structure.

Screenshots
Investigation Workstation

Place the primary workstation screenshot here:

docs/images/investigation-workstation.png
![SpillTrace Investigation Workstation](docs/images/investigation-workstation.png)
Recommended screenshot gallery

Use a small number of strong screenshots rather than dozens of images.

<p align="center">
  <img
    src="docs/images/investigation-workstation.png"
    alt="SpillTrace investigation workstation"
    width="95%"
  />
</p>

<p align="center">
  <img
    src="docs/images/spill-analysis.png"
    alt="Spill analysis interface"
    width="47%"
  />
  <img
    src="docs/images/vessel-analysis.png"
    alt="Vessel investigation interface"
    width="47%"
  />
</p>

<p align="center">
  <img
    src="docs/images/drift-analysis.png"
    alt="Drift analysis interface"
    width="47%"
  />
  <img
    src="docs/images/attribution.png"
    alt="Vessel attribution interface"
    width="47%"
  />
</p>

Only add these images after the files actually exist in the repository.

Installation
Prerequisites

Install:

Git
Node.js 18+
Python 3.10+
Docker
Docker Compose
Clone the repository
git clone <REPOSITORY_URL>
cd spilltrace-ai
Start infrastructure
docker-compose up -d

This starts the infrastructure defined by the repository, such as PostgreSQL/PostGIS and Redis where configured.

Backend

Create a virtual environment:

cd backend

python -m venv venv
Windows
venv\Scripts\activate
macOS / Linux
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Start FastAPI:

uvicorn main:app --reload --port 8000

API:

http://localhost:8000

Swagger/OpenAPI:

http://localhost:8000/docs

Replace these commands with the repository's current commands if the entrypoint or scripts differ.

Frontend

In a separate terminal:

npm install

Start the development server:

npm run dev

Open:

http://localhost:3000
Configuration

Create environment configuration according to the variables expected by the application.

Example:

DATABASE_URL=
REDIS_URL=

NEXT_PUBLIC_API_URL=

AIS_API_KEY=
SATELLITE_API_KEY=

The exact variable names used by the repository are authoritative.

Secret management

Never commit:

.env
.env.local
API keys
private tokens
database passwords
cloud credentials

Use placeholders in documentation.

API

The backend is organized around domain-level functionality.

Potential API domains include:

/incidents
/spills
/satellites
/ais
/vessels
/drift
/attribution
/alerts
/reports

Example conceptual endpoints:

GET    /api/v1/incidents
POST   /api/v1/incidents

GET    /api/v1/spills/{id}
POST   /api/v1/spills/detect

POST   /api/v1/drift/runs
GET    /api/v1/drift/runs/{id}

GET    /api/v1/vessels
GET    /api/v1/vessels/{id}

POST   /api/v1/attribution/analyze

GET    /api/v1/alerts

POST   /api/v1/reports
GET    /api/v1/reports/{id}

Endpoint availability must be verified against the current FastAPI/OpenAPI implementation before treating these examples as an authoritative API contract.

Testing

SpillTrace should be validated at multiple levels.

Unit tests

Test:

service logic
utility functions
business rules
GIS operations
attribution logic
Integration tests

Test:

API + database
API + AI
API + GIS
AIS + database
drift + database
End-to-end tests

The most important workflow is:

Login
  ↓
Select Incident
  ↓
Review Satellite
  ↓
Detect Spill
  ↓
Review Geometry
  ↓
Run Drift
  ↓
Reconstruct Source
  ↓
Load AIS
  ↓
Review Candidates
  ↓
Review Evidence
  ↓
Generate Report

Only publish test results that have actually been executed.

Security

Security should be treated as a system-wide concern.

Important areas include:

authentication
authorization
role-based access
input validation
output validation
secret management
API security
rate limiting
file handling
dependency security
audit logging
transport security
Never expose
API secrets
Database credentials
Private tokens
Authentication secrets
Internal credentials

through frontend code or source control.

Responsible Use

SpillTrace is an analytical decision-support system.

An attribution result should be treated as:

Analytical Candidate
        +
Supporting Evidence
        +
Confidence
        +
Uncertainty

not as an automatic legal finding.

The system should therefore distinguish between:

Observed

Directly obtained from a data source.

Derived

Calculated from observations.

Predicted

Produced by a model.

Inferred

Produced through analytical correlation.

Simulated

Generated for demonstration or testing.

Current Implementation Status

SpillTrace is an evolving SIH research and software prototype.

Component	Status
Investigation Workstation	✅ Implemented
Next.js Frontend	✅ Implemented
Interactive Mapping	✅ Implemented
Timeline / Investigation UI	✅ Implemented
Presentation / Demo Mode	✅ Implemented
Local Demo Data	✅ Implemented
FastAPI Backend	🟡 Scaffolded / In Development
PostgreSQL + PostGIS	🟡 Configured / In Development
Celery + Redis	🟡 Prepared / In Development
AI Spill Detection	🔵 Under Development
Drift Engine	🔵 Under Development
AIS Correlation	🔵 Under Development
Attribution Engine	🔵 Under Development
Live Satellite Feeds	🔵 Planned
Live AIS Feeds	🔵 Planned

Status should be updated whenever implementation changes.

Limitations

SpillTrace operates in a domain with significant observational and modelling uncertainty.

Potential limitations include:

satellite revisit constraints
SAR look-alikes
environmental variability
incomplete or interrupted AIS observations
drift-model uncertainty
source-region uncertainty
external data availability
limited labelled datasets
operational data licensing
computational constraints

The system should communicate uncertainty rather than hide it.

Data Classification

SpillTrace should clearly distinguish:

Classification	Meaning
Live	Current operational stream
Near-real-time	Recently acquired data with processing delay
Historical	Previously collected observations
Precomputed	Previously generated analytical result
Simulated	Synthetic information
Demo	Controlled demonstration data

The application must never imply a freshness guarantee that its underlying data source does not provide.

Roadmap
Phase I — Investigation Foundation
 Investigation workstation
 Interactive map experience
 Timeline interface
 Demonstration mode
Phase II — Satellite Intelligence
 Satellite ingestion
 SAR preprocessing
 Oil/look-alike dataset integration
 Segmentation model
 Spill polygon extraction
 Model benchmarking
Phase III — Ocean Intelligence
 Environmental-data integration
 Drift engine
 Forward prediction
 Backward reconstruction
 Uncertainty modelling
Phase IV — AIS Intelligence
 AIS ingestion
 Track reconstruction
 Candidate filtering
 Temporal correlation
 Spatial correlation
Phase V — Evidence Fusion
 Attribution engine
 Candidate scoring
 Evidence explanation
 Confidence calibration
 Data provenance
Phase VI — Operations
 Incident management
 Alerts
 Risk assessment
 Reports
 Audit trail
Phase VII — Production Hardening
 Authentication
 Authorization
 Security hardening
 Automated testing
 Observability
 Performance optimization
 CI/CD
 Deployment
Research Direction

The long-term SpillTrace concept follows:

DETECT
   ↓
TRACE
   ↓
ATTRIBUTE
   ↓
ASSESS
   ↓
RESPOND
   ↓
RECOVER

Potential future research areas include:

multi-sensor fusion
improved look-alike discrimination
advanced source reconstruction
uncertainty-aware prediction
response optimization
autonomous response systems
intelligent recovery coordination

These represent future development directions and should not be interpreted as current production capabilities unless implemented and verified.

Engineering Principles
Evidence over assumptions

Important system outputs should be traceable to source data.

Uncertainty over false precision

When the evidence is insufficient, the system should communicate uncertainty.

Integration over feature count

A smaller set of well-integrated capabilities is preferable to a large collection of disconnected features.

Physics where physics matters

Physical constraints should be used where they provide meaningful modelling advantages.

Human oversight

Automated analysis should support responsible investigation rather than replace accountable human decisions.

Reproducibility

Results should ideally be associated with:

Data
+
Timestamp
+
Processing
+
Model Version
+
Result
Contributing

Contributions are welcome across:

frontend development
backend engineering
AI/ML
remote sensing
GIS
ocean modelling
AIS analytics
data engineering
visualization
security
testing
documentation
Contribution workflow
Fork
  ↓
Create Branch
  ↓
Implement
  ↓
Test
  ↓
Document
  ↓
Commit
  ↓
Pull Request

Suggested branch naming:

feat/spill-detection
feat/drift-engine
feat/ais-analysis
feat/attribution
feat/investigation-workspace

fix/map-performance
fix/api-validation

test/attribution
docs/architecture
Documentation

As the project grows, technical documentation should be organized separately from the main README.

Recommended structure:

docs/
│
├── architecture/
│   ├── system.md
│   ├── frontend.md
│   ├── backend.md
│   └── data-flow.md
│
├── ai/
│   ├── detection.md
│   ├── datasets.md
│   └── evaluation.md
│
├── ais/
│   ├── ingestion.md
│   ├── tracking.md
│   └── attribution.md
│
├── gis/
│   ├── geometry.md
│   ├── projections.md
│   └── map.md
│
├── deployment/
│   ├── local.md
│   ├── production.md
│   └── security.md
│
└── research/
    ├── methodology.md
    └── references.md
Frequently Asked Questions
<details> <summary><strong>What is SpillTrace AI?</strong></summary>

SpillTrace AI is a maritime geospatial intelligence platform designed to support oil-spill detection, movement analysis, source reconstruction, and vessel-correlation investigations.

</details> <details> <summary><strong>What is the main objective?</strong></summary>

The objective is to connect satellite observations, environmental dynamics, and AIS vessel trajectories into a unified investigation workflow.

</details> <details> <summary><strong>Does SpillTrace automatically prove that a vessel caused a spill?</strong></summary>

No.

The system is designed to generate candidate-vessel results and supporting evidence. Such results should be independently reviewed before any operational, regulatory, or legal action.

</details> <details> <summary><strong>Why is drift modelling important?</strong></summary>

A spill may move between the time it originates and the time it is observed. Drift analysis helps estimate how the spill may have travelled and where it may have originated.

</details> <details> <summary><strong>Why is AIS correlation important?</strong></summary>

AIS provides vessel identity and movement context that can be compared with the estimated location and timing of a potential spill source.

</details> <details> <summary><strong>Is every dark SAR feature an oil spill?</strong></summary>

No.

SAR observations can contain look-alike phenomena and other sources of uncertainty. Detection systems must therefore account for classification uncertainty.

</details> <details> <summary><strong>Does the current repository use live satellite and AIS feeds?</strong></summary>

The current workstation includes simulated/local data for portions of the demonstration experience. Live external data integration is part of the broader development roadmap.

</details>
Acknowledgements

SpillTrace builds upon open-source and research ecosystems in:

satellite remote sensing
geospatial computing
maritime tracking
ocean modelling
machine learning
data engineering

Datasets, libraries, APIs, scientific frameworks, and research publications should be credited according to their respective licenses and attribution requirements.

References

Project references should cover:

Smart India Hackathon problem statement
satellite and remote-sensing documentation
AIS documentation
GIS and geospatial libraries
ocean-modelling frameworks
datasets
peer-reviewed research
relevant maritime surveillance literature

Maintain implementation references separately from research references where useful.

License

No license has been specified in this README.

If a LICENSE file is added to the repository, update this section to reference it.

Security

For security vulnerabilities, avoid publishing sensitive details in public issue trackers.

A dedicated SECURITY.md should be added when the project moves toward broader deployment.

Recommended security documentation should include:

vulnerability reporting
responsible disclosure
secret management
authentication
authorization
<div align="center">
SPILLTRACE AI
Detect · Trace · Attribute · Assess · Respond
<sub> Maritime Geospatial Intelligence for Oil-Spill Investigation </sub>

<br><br>

Smart India Hackathon 2026 · Problem Statement 26143

</div> ```
A few important visual changes

For the GitHub repository, I would not put a giant decorative banner image before the title. A cleaner structure is:

LOGO / TITLE
     ↓
one-line description
     ↓
badges
     ↓
hero screenshot
     ↓
overview

Add your main screenshot immediately below the badges:

<p align="center">
  <img
    src="docs/images/investigation-workstation.png"
    alt="SpillTrace AI Investigation Workstation"
    width="96%"
  />
</p>

Then use three smaller screenshots later for the important workflows:

Investigation
Satellite Analysis
Attribution / AIS

That gives GitHub visitors an immediate visual understanding of the product without turning the README into a slideshow.

Recommended docs/images/
docs/
└── images/
    ├── hero.png
    ├── investigation-workstation.png
    ├── spill-analysis.png
    ├── drift-analysis.png
    ├── ais-analysis.png
    ├── attribution.png
    ├── risk-analysis.png
    └── architecture.png

The strongest visual for the hero should be your actual application screenshot showing the map, spill polygon, vessel tracks and investigation panels—not an AI-generated ocean illustration.
