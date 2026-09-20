# 🚢 SpillTrace AI

<p align="center">
  <strong>Maritime Geospatial Intelligence for Oil-Spill Detection, Source Reconstruction & Vessel Attribution</strong>
</p>

<p align="center">
  <img src="SpillTraceAI_logo.jpeg" alt="SpillTrace AI Logo" width="220">
</p>

---

## 🌍 Overview

**SpillTrace AI** is a maritime geospatial intelligence platform that integrates **satellite imagery, oceanographic data, geospatial intelligence, and AIS vessel tracking** into a unified investigation workflow.

Rather than stopping at spill detection, SpillTrace is designed to support the complete investigative chain:

```text
DETECT → LOCATE → TRACE → RECONSTRUCT → CORRELATE → ATTRIBUTE → RESPOND



````markdown
# 🚢 SpillTrace AI

<p align="center">
  <strong>Maritime Geospatial Intelligence for Oil-Spill Detection, Source Reconstruction & Vessel Attribution</strong>
</p>

<p align="center">
  <img src="SpillTraceAI_logo.jpeg" alt="SpillTrace AI Logo" width="220">
</p>

---

## 🌍 Overview

**SpillTrace AI** is a maritime geospatial intelligence platform that integrates **satellite imagery, oceanographic data, geospatial intelligence, and AIS vessel tracking** into a unified investigation workflow.

Rather than stopping at spill detection, SpillTrace is designed to support the complete investigative chain:

```text
DETECT → LOCATE → TRACE → RECONSTRUCT → CORRELATE → ATTRIBUTE → RESPOND
````

---

## 🎯 Problem Statement

**Smart India Hackathon 2026 — Disaster Management**
**Problem Statement ID:** `26143`

> *“Leveraging satellite imagery to determine oil spills at sea along with AIS data correlations to identify the vessel responsible.”*

### Key Challenges

* **Large Maritime Areas** — Monitoring vast ocean regions efficiently.
* **Satellite Ambiguity** — SAR dark spots do not necessarily represent oil.
* **Spill Movement** — The observed location may differ from the probable origin.
* **Fragmented Evidence** — Satellite, environmental, geospatial, and vessel data must be correlated.

---

## ⚙️ Solution Pipeline

SpillTrace connects multiple evidence sources through a unified analytical pipeline:

```text
SATELLITE DATA
      ↓
PREPROCESSING
      ↓
AI SPILL DETECTION
      ↓
SPILL GEOMETRY
      ↓
DRIFT ANALYSIS
      ↓
SOURCE RECONSTRUCTION
      ↓
AIS CORRELATION
      ↓
CANDIDATE VESSEL GENERATION
      ↓
EVIDENCE FUSION
      ↓
ATTRIBUTION CONFIDENCE
      ↓
RISK & RESPONSE
```

---

## 🔑 Core Capabilities

### 🛰️ Satellite Intelligence

**Sentinel-1 SAR**, Sentinel-2 optical imagery, preprocessing, segmentation, and geospatial analysis.

### 🛢️ Oil-Spill Detection

Identification of probable oil signatures with consideration for **oil, look-alikes, and uncertainty**.

### 📍 Spill Localization

Geographic coordinates, spill polygons, spatial extent, and area estimation.

### 🌊 Drift Intelligence

Environmental data, including **wind and surface currents**, for forward prediction and backward source reconstruction.

### 🚢 AIS Vessel Intelligence

Vessel identities, trajectories, MMSI/IMO information, speed, course, and temporal-spatial analysis where available.

### 🔎 Evidence Fusion

Multi-factor correlation of spill, environmental, and vessel observations to generate candidate-vessel assessments.

### 🧠 Explainable Attribution

Transparent evidence breakdown showing why a vessel became a candidate and how the attribution confidence was derived.

---

## 🖥️ Investigation Workspace

SpillTrace provides an investigation-oriented interface for exploring:

* Satellite observations
* Spill geometry and extent
* Drift trajectories
* Probable source regions
* AIS vessel tracks
* Candidate vessels
* Attribution evidence
* Risk assessment
* Incident information and reporting

The objective is to keep the complete evidence chain accessible within a single workspace.

---

## 🏗️ System Architecture

| Layer                  | Responsibility                                   |
| ---------------------- | ------------------------------------------------ |
| **Frontend**           | User interaction and data visualization          |
| **API**                | Request handling and service orchestration       |
| **Backend Services**   | Business and domain logic                        |
| **AI / ML**            | Satellite perception and classification          |
| **GIS**                | Spatial processing and analysis                  |
| **Drift Engine**       | Environmental transport and trajectory modelling |
| **AIS Engine**         | Vessel and trajectory intelligence               |
| **Attribution Engine** | Evidence correlation and candidate assessment    |
| **Database**           | Structured and spatial data persistence          |
| **Monitoring**         | Reliability, logging, and observability          |

---

## 🛠️ Technology Stack

### Frontend

**Next.js 16 · React 19 · TypeScript · Tailwind CSS · MapLibre GL · Three.js**

### Backend

**Python · FastAPI · SQLAlchemy · Celery**

### Infrastructure

**PostgreSQL · PostGIS · Redis · Docker**

---

## 📊 Evaluation Framework

SpillTrace is designed around measurable system performance rather than unsupported accuracy claims.

| Area                 | Metrics                                            |
| -------------------- | -------------------------------------------------- |
| **Detection**        | Precision, Recall, F1 Score, IoU                   |
| **Localization**     | Centroid Error, Polygon IoU                        |
| **Drift Prediction** | Position Error at T+6h, T+12h, T+24h               |
| **Attribution**      | Candidate Ranking Accuracy, Confidence Calibration |

Only experimentally validated results should be reported as official project metrics.

---

## 🔒 Responsible Attribution

SpillTrace follows an **evidence-oriented attribution approach**.

A candidate vessel is an **investigative analytical result**, not an automatic legal determination.

The system is designed around:

```text
EVIDENCE
   +
CONFIDENCE
   +
UNCERTAINTY
   +
PROVENANCE
   +
HUMAN VERIFICATION
```

This approach helps prevent uncertain model outputs from being presented as definitive conclusions.

---

## 🚀 Roadmap

### Phase I — Investigation Foundation

Investigation workstation, geospatial visualization, timeline, and demonstration workflow.

### Phase II — Satellite Intelligence

Satellite ingestion, SAR preprocessing, spill segmentation, and look-alike handling.

### Phase III — Ocean Intelligence

Environmental-data integration, forward drift prediction, and backward source reconstruction.

### Phase IV — AIS Intelligence

AIS ingestion, trajectory reconstruction, temporal-spatial filtering, and candidate generation.

### Phase V — Evidence Fusion

Attribution engine, evidence scoring, confidence, explainability, and provenance.

### Phase VI — Operations & Reporting

Incident management, risk assessment, alerts, reporting, and audit trails.

### Phase VII — Production Hardening

Security, testing, observability, performance optimization, CI/CD, and deployment.

---

## 🌐 Long-Term Vision

SpillTrace is designed to evolve from detection and investigation toward broader maritime response intelligence:

```text
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
```

### Future Research Directions

* Multi-sensor data fusion
* Advanced source reconstruction
* Improved uncertainty modelling
* Large-scale maritime intelligence
* Autonomous response planning
* Robotic recovery coordination

---

## ⚠️ Important Note

SpillTrace AI is an evolving **SIH research and software project**.

The capabilities described above should be interpreted according to their actual implementation status. Historical, simulated, precomputed, or prototype data must not be represented as live operational data.

---

<p align="center">
  <strong>SPILLTRACE AI</strong><br>
  <sub>Detect · Trace · Attribute · Assess · Respond</sub>
</p>
```
