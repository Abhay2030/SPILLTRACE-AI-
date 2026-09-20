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
