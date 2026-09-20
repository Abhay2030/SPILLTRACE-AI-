🚢 SpillTrace AI
Maritime Geospatial Intelligence for Oil-Spill Detection, Source Reconstruction & Vessel Attribution

<p align="center">
<img src="![Uploading Spil Traces logo 2.png…]()
" alt="SpillTrace Logo" width="200"/>
</p>

📖 Table of Contents
Overview

Problem Statement

Problem Context

Solution Pipeline

Core Capabilities

Investigation Workspace

Incident Lifecycle

System Architecture

Technology Stack

Repository Structure

Application Modules

Data Architecture

AI & Methodology

Implementation Status

Installation

API Documentation

Database

Security

Responsible Attribution

Reliability & Testing

Performance & Scalability

Research Methodology

Evaluation Framework

Limitations

Future Development

Long-Term Vision

🌍 Overview
SpillTrace AI is a maritime geospatial intelligence platform designed to support the detection, analysis, reconstruction, and investigation of oil-spill events at sea.

It integrates satellite observations, geospatial data, oceanographic information, and vessel tracking data into a unified workflow.

Workflow Pipeline:

text
DETECT → LOCATE → TRACE → RECONSTRUCT → CORRELATE → ATTRIBUTE → RESPOND
🎯 Problem Statement
Smart India Hackathon 2026 — Disaster Management  
Problem ID: 26143

“Leveraging satellite imagery to determine oil spills at sea along with AIS data correlations to identify the vessel responsible.”

⚠️ Problem Context
Large maritime areas → vast monitoring scale

Satellite ambiguity → SAR dark spots ≠ oil

Spill movement → observed ≠ origin location

Fragmented evidence → multiple data sources needed

SpillTrace fuses satellite imagery, AIS trajectories, wind, currents, vessel metadata, and geospatial boundaries into one investigation environment.

⚙️ Solution Pipeline
text
SATELLITE DATA → PREPROCESSING → AI DETECTION → SPILL GEOMETRY
→ DRIFT ANALYSIS → SOURCE RECONSTRUCTION → AIS CORRELATION
→ CANDIDATE GENERATION → EVIDENCE FUSION → ATTRIBUTION CONFIDENCE
→ RISK / RESPONSE
🔑 Core Capabilities
Satellite Intelligence → Sentinel-1 SAR, Sentinel-2 optical, preprocessing, segmentation

Oil-Spill Detection → Probable oil vs look-alike classification, precision/recall metrics

Spill Localization → Coordinates, polygons, area estimation

Drift Intelligence → Wind + currents for forward/backward drift modeling

AIS Vessel Intelligence → MMSI, IMO, vessel tracks, speed/course analysis

Evidence Fusion → Multi-factor correlation for attribution confidence

Explainable Attribution → Transparent candidate evaluation with confidence scores

🖥️ Investigation Workspace
Analysts can explore:

Satellite observations

Spill geometry & drift runs

AIS vessel tracks

Candidate vessels & attribution evidence

Risk assessment & reporting

🔄 Incident Lifecycle
text
DETECTED → UNDER INVESTIGATION → SOURCE RECONSTRUCTION
→ VESSEL CORRELATION → EVIDENCE REVIEW → RISK ASSESSMENT
→ ACTION / RESPONSE → CLOSED
🏗️ System Architecture
Layer	Responsibility
Frontend	User interaction & visualization
API	Request orchestration
Backend Services	Business & domain logic
AI	Satellite perception & classification
GIS	Spatial processing
Drift Engine	Environmental transport analysis
AIS Engine	Vessel trajectory intelligence
Attribution	Evidence correlation
Database	Structured + spatial persistence
Monitoring	Reliability & observability


🛠️ Technology Stack
Frontend: Next.js 16, React 19, TypeScript, Tailwind, MapLibre GL, Three.js
Backend: Python, FastAPI, SQLAlchemy, Celery
Infrastructure: PostgreSQL + PostGIS, Redis, Docker

📊 Evaluation Metrics
Detection: Precision, Recall, F1, IoU

Localization: Centroid Error, Polygon IoU

Drift: Position error at T+6h, T+12h, T+24h

Attribution: Candidate accuracy, confidence calibration

🔒 Responsible Attribution
SpillTrace provides evidence-oriented attribution.

Candidate vessels are investigative results, not legal proof.

Preserves Evidence + Confidence + Uncertainty + Provenance + Human Verification.

🚀 Roadmap
Phase I: Investigation foundation

Phase II: Satellite intelligence

Phase III: Ocean intelligence

Phase IV: AIS intelligence

Phase V: Evidence fusion

Phase VI: Operations & reporting

Phase VII: Production hardening

🌐 Long-Term Vision
From Detection → Attribution → Response → Recovery.
Future research includes:

Multi-sensor fusion

Advanced source reconstruction

Autonomous response systems

Robotic recovery coordination
