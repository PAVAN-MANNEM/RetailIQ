# RetailIQ: Retail Business Intelligence & Analytics Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://retail-iq-eosin.vercel.app)

> Transforming retail transaction data into actionable business intelligence through advanced analytics, forecasting, customer segmentation, and interactive dashboards.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![License](https://img.shields.io/badge/License-Portfolio-green)

---

# Overview

RetailIQ is an end-to-end Retail Business Intelligence and Analytics Platform built on the Global Superstore dataset.

The project combines advanced Exploratory Data Analysis (EDA), customer intelligence, profitability analysis, forecasting, and executive-level business recommendations through a modern multi-page React dashboard.

Rather than simply visualizing historical sales data, RetailIQ focuses on identifying business drivers, uncovering growth opportunities, reducing profitability risks, and supporting data-driven decision making.

---

# Business Problem

Retail organizations generate large volumes of transactional data every day.

However, raw sales data alone does not answer critical business questions such as:

- Which customers generate the most value?
- Which products drive profit or loss?
- How do discounts impact profitability?
- Which regions require strategic attention?
- What future sales trends can be expected?
- Which actions should management prioritize?

RetailIQ addresses these challenges by transforming retail transaction data into strategic business intelligence.

---

# Key Objectives

- Analyze sales, profit, customer, product, shipping, and regional performance
- Identify key profitability drivers
- Detect loss-making categories and geographic regions
- Segment customers using RFM analysis
- Forecast future sales trends
- Generate executive-level business recommendations
- Deliver insights through an interactive analytics dashboard

---

# Architecture

```text
Raw Data (Global_Superstore.csv)
        │
        ▼
Data Cleaning Notebook
(notebooks/data_cleaning.ipynb)
        │
        ▼
cleaned_superstore.csv
        │
        ▼
EDA Notebook (EDA.ipynb)
        │
        ├── 37 Analytics Export CSVs
        └── 3 Search Databases (JSON)
        │
        ▼
React + TypeScript Dashboard
        │
        ▼
Business Intelligence & Insights
```

---

# Project Workflow

```text
Raw Dataset
    ↓
Data Cleaning
    ↓
Feature Engineering
    ↓
Business Analysis
    ↓
Customer Segmentation
    ↓
Forecasting
    ↓
Insight Generation
    ↓
Dashboard Data Exports
    ↓
Interactive Analytics Dashboard
```

---

# Features

## Executive Dashboard

- KPI Monitoring
- Revenue Analysis
- Profitability Tracking
- Business Performance Overview
- Strategic Risk Identification

## Sales Analytics

- Revenue Trends
- Monthly Sales Performance
- Seasonal Analysis
- Growth Tracking

## Profitability Analytics

- Margin Analysis
- Profit Driver Identification
- Loss-Making Product Detection
- Discount Impact Assessment

## Customer Intelligence

- RFM Segmentation
- Customer Value Analysis
- Loyalty Assessment
- Retention Opportunities

## Product Analytics

- Category Analysis
- Sub-Category Performance
- Product Contribution Analysis
- Product Search Engine

## Geographic Analytics

- Regional Performance
- State-Level Insights
- City Analysis
- Geographic Profitability Assessment

## Forecasting & Predictive Analytics

- Time Series Forecasting
- Trend Analysis
- Forecast Validation
- Confidence Interval Estimation

## Business Intelligence

- Root Cause Analysis
- Strategic Recommendations
- Profit Leakage Detection
- Opportunity Identification

---

# Customer Segmentation (RFM)

RetailIQ uses RFM (Recency, Frequency, Monetary) Analysis to classify customers into meaningful business segments:

| Segment | Description |
|----------|------------|
| Champions | Highest-value and most engaged customers |
| Loyal Customers | Frequent and profitable customers |
| Potential Loyalists | Customers showing growth potential |
| At Risk | Previously valuable customers losing engagement |
| Lost Customers | Customers with low recent activity |

This segmentation helps businesses improve retention, customer engagement, and marketing effectiveness.

---

# Forecasting Methodology

The forecasting module uses historical sales data to:

- Identify long-term sales trends
- Predict future business performance
- Estimate uncertainty through confidence intervals
- Support planning and inventory decisions

The forecasting layer extends the project beyond traditional EDA and into predictive business analytics.

---

# Analytics Modules

| Module | Description |
|----------|------------|
| Sales Analytics | Revenue, trends, growth, seasonality |
| Profitability Analytics | Margin analysis and profit drivers |
| Customer Analytics | RFM segmentation and customer insights |
| Product Analytics | Product and category performance |
| Geographic Analytics | Regional and location-based performance |
| Shipping Analytics | Fulfillment and delivery analysis |
| Forecasting | Future sales projections |
| Strategic Insights | Business recommendations and action plans |

---

# Dashboard Pages

| Route | Description |
|---------|------------|
| Executive Dashboard | Business overview and KPIs |
| Sales Performance | Revenue and trend analysis |
| Profitability | Margin and discount analysis |
| Customers | Customer intelligence and RFM |
| Products | Product performance analysis |
| Geography | Regional and geographic insights |
| Reports | Forecasting and validation outputs |
| Settings | Dataset and configuration details |

---

# Repository Structure

```text
RetailIQ/
│
├── src/                     # React dashboard source code
├── public/                  # Static assets
├── data/                    # Processed datasets and search databases
├── exports/                 # Analytics exports generated by EDA
│
├── notebooks/
│   ├── data_cleaning.ipynb
│   └── EDA.ipynb
│
├── utils/                   # Python helper modules
│
├── package.json
├── requirements.txt
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# Technology Stack

## Analytics & Data Science

- Python
- Pandas
- NumPy
- SciPy
- Statsmodels

## Data Visualization

- Plotly
- Matplotlib
- Seaborn

## Dashboard Development

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- shadcn/ui
- Radix UI

## Data Processing

- Jupyter Notebook
- CSV Processing
- JSON Data Pipelines

---

# Dataset

**Source:** Global Superstore Dataset

Dataset Link:

https://www.kaggle.com/datasets/apoorvaappz/global-super-store-dataset

The dataset contains:

- Orders
- Customers
- Products
- Sales
- Profit
- Discounts
- Shipping Information
- Geographic Information

across multiple global markets.

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/your-username/retailiq.git
cd retailiq
```

---

## Python Setup

```bash
pip install -r requirements.txt
```

Run the data cleaning notebook:

```bash
jupyter notebook notebooks/data_cleaning.ipynb
```

Run the EDA notebook:

```bash
jupyter notebook notebooks/EDA.ipynb
```

This generates:

- Analytics Export CSVs
- Search Databases
- Dashboard Data Sources

---

## Dashboard Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Key Business Insights

RetailIQ uncovers insights such as:

- High-performing products and categories
- Loss-making product segments
- Geographic profit concentration
- Discount thresholds impacting margins
- Customer retention opportunities
- Future sales expectations
- Strategic growth opportunities

---

# Business Value

The platform helps organizations:

- Improve profitability
- Increase customer retention
- Optimize discount strategies
- Improve operational efficiency
- Identify growth opportunities
- Make evidence-based business decisions

---

# Future Enhancements

- Customer Lifetime Value (CLV) Modeling
- Market Basket Analysis
- Inventory Optimization
- Demand Forecasting
- Machine Learning Recommendations
- Real-Time Data Integration

---

# Author

**Mannem Pavan Sai Ram**



GitHub: https://github.com/PAVAN-MANNEM

LinkedIn: https://www.linkedin.com/in/pavan-sai-ram-mannem-342430224/

---

# License

This project is intended for educational, portfolio, and learning purposes.
